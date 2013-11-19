# encoding: utf-8

# LegacyImport is handling the import from the legacy MySQL database into the MongoDB database
# of the current environment.
class LegacyImport

  # This maps a SQL table name to a Model of the current application
  TABLE_MODEL_MAPPING = {
    users: User,
    cells: Cell,
    sets: CellSet,
    sets_cells: GridCell
  }

  ADDITIONAL_STEPS = {
      cells: [:get_additional_cell_fields],
      sets: [:get_associated_cells, :get_additional_grid_cell_fields]
  }

  # Only columns of the legacy database that are called differently than the fields in the MongoDB
  # will be listed here
  FIELD_MAPPINGS = {
      cells: {poster: :poster_image_filename},
      sets: {
          poster: :poster_image_filename,
          grid_rows: :rows,
          grid_cols: :columns
      }
  }

  VALUE_MAPPINGS = {
      cells: {
          type: {"set-link" => "set_link"}
      }
  }


  def initialize(source_config)
    raise ArgumentError.new("No source_config provided") unless source_config
    required_keys = ['username', 'password', 'database']
    unless required_keys.all? {|k| source_config.key?(k) }
      raise ArgumentError.new("Insufficient config. #{self.class.config_format_message}")
    end
    relevant_keys = required_keys + ['host']

    config = source_config.slice(*relevant_keys)
    begin
      @client = Mysql2::Client.new(config)
    rescue Mysql2::Error => e
      puts "Error while connecting: #{e}"
    end

    # these are for statistics
    @imported_cell_fields = 0
    @imported_grid_cell_fields = 0
  end


  def run
    [:users, :cells, :sets].each do |table|
      model = TABLE_MODEL_MAPPING[table]
      if model.count > 0
        puts "Skipping table #{table} as the Mongoid model #{model} already contains documents"
        next
      end
      import(table)
    end

    display_field_statistics
  end


  def self.config_format_message
<<-EOL
Please make sure that your config file does have at least the following yaml tree.
my_score_slug:
  database: YOUR_MySQL_DATABASE_NAME
  username: YOUR_MySQL_USER
  password: YOUR_MySQL_PASSWORD
  host: localhost # optional
EOL
  end


  private


    def import(table)
      results = @client.query "SELECT * FROM #{table}"
      imported = 0
      model = TABLE_MODEL_MAPPING[table]
      begin
        results.each do |row|
          map_fields(table, row)
          doc = model.create!(row)
          imported += 1

          # do any additional steps
          (ADDITIONAL_STEPS[table] || []).each do |step|
            send(step, doc)
          end
        end
      rescue => e
        raise e
      ensure
        puts "Imported #{imported}/#{results.count} rows from #{table}."
      end
    end


    def get_additional_cell_fields(doc)
      table = :cells_fields

      cell_id = doc.legacy_id

      # get all foreign_keys from the legacy table and use these to query the fields table
      # where no connection is setup. This means that these fields are on the canonical cell itself.
      field_ids = @client.query("SELECT fields_id FROM #{table} WHERE cells_id = #{cell_id} AND connection_id = 0").map(&:values).flatten
      return if field_ids.empty?

      # get those fields from the fields table
      fields = @client.query("SELECT * FROM fields WHERE id IN (#{field_ids.join(',')})")

      # make 'name' be a hash key and 'value' its value
      fields_as_hash = {}
      fields.each do |row|
        fields_as_hash[row['name']] = row['value']
      end

      # now add those fields to the cell
      if doc.update(additional_fields: fields_as_hash)
        @imported_cell_fields += fields.count
      else
        puts "#{fields} were not imported to the cell #{cell_id} because of errors in the cell: #{doc.errors.full_messages}"
      end
    end



    def get_additional_grid_cell_fields(doc)
      set_id = doc.legacy_id

      # get all connection_id values from the legacy table and use these to query the cells_fields table
      connection_ids = @client.query("SELECT connection_id FROM sets_cells WHERE sets_id = #{set_id}").map(&:values).flatten
      return if connection_ids.empty?

      # If we join cells_fields and fields taking only those cells_fields with connection ids from our set we get the actual fields
      field_rows = @client.query("SELECT connection_id, name, value FROM cells_fields AS c LEFT JOIN fields AS f ON c.fields_id = f.id WHERE c.connection_id IN (#{connection_ids.join(',')})")
      return if field_rows.count == 0

      # make 'connection_id' be a hash key and 'name' and 'value' will be a hash pair
      fields_as_hash = {}
      field_rows.each do |row|
        fields_as_hash[row['connection_id']] ||= {}
        fields_as_hash[row['connection_id']][row['name']] = row['value']
      end

      field_cnt_for_this_set = 0
      fields_as_hash.each do |connection_id, fields|
        field_cnt_for_this_set += fields.count
        cell = doc.grid_cells.find_by(legacy_id: connection_id) # the legacy_id of grid_cells is the connection_id in the legacy DB
        # now add those fields to the cell
        if cell.update(additional_fields: fields)
          @imported_grid_cell_fields += fields.count
        else
          puts "#{fields} were not imported to the grid cell in the set #{set_id} because of errors in the set: #{doc.errors.full_messages}"
        end
      end

      puts "\t#{field_cnt_for_this_set}/#{field_rows.count} fields were imported for the set #{doc.title} which has the ID: #{doc.id}"
    end


    def get_associated_cells(doc)
      table = TABLE_MODEL_MAPPING.key(GridCell)

      set_id = doc.legacy_id

      # get all foreign_keys from the legacy table and use these to query the MongoDB cells
      cell_ids = @client.query("SELECT cells_id FROM #{table} WHERE sets_id = #{set_id}").map(&:values).flatten

      # get those canonical cells from the new db by means of the legacy_id
      canonical_cells = Cell.where(:legacy_id.in => cell_ids).only(:_id, :legacy_id).to_a

      # now get the actual rows to be used for the grid cells/associated cells
      cell_rows = @client.query "SELECT * FROM #{table} WHERE sets_id = #{set_id}"
      imported = 0
      cell_rows.each do |row|
        # we already have the set -> the passed doc
        row.delete 'sets_id'

        map_primary_key(row, 'connection_id')

        # delete the cells_id as we'll use MongoDB IDs for this, but we'll use this field to get the proper cell from
        # our pre-fetched canonical cells without querying again
        legacy_id = row.delete 'cells_id'

        # this is not an import, it's the equivalent of the old foreign_key relationship. The new foreign key is named cell_id
        canonical_cell = canonical_cells.detect {|cell| cell.legacy_id == legacy_id }
        row['cell_id'] = canonical_cell._id if canonical_cell

        # actually create the GridCell
        grid_cell = GridCell.new(row)
        doc.grid_cells << grid_cell
        if doc.valid?
          imported += 1
        else
          puts "!!! GridCell with connection_id #{grid_cell.legacy_id} was not imported because it had errors: #{grid_cell.errors.full_messages}"
        end
      end

      puts "Imported #{imported}/#{cell_rows.count} cells associated to the set #{doc.title} which has the ID: #{doc.id}."
    end


    def map_fields(table, row)
      map_primary_key(row, 'id')

      # extra handling for devise's requirement to have a password_confirmation when creating users
      if table == :users
        row['password_confirmation'] = row['password']
      end

      # simply renamed fields
      (FIELD_MAPPINGS[table] || []).each do |old_name, new_name|
        row[new_name.to_s] = row.delete old_name.to_s
      end

      # values that need to be replaced/mapped to something else
      (VALUE_MAPPINGS[table] || []).each do |key, mapping|
        current = row[key.to_s]
        if mapping[current]
          row[key.to_s] = mapping[current]
        end
      end
    end


    # MongoDB uses a different paradigm for IDs, so we don't want to use MySQL's IDs as "primary key"
    # instead we save it as legacy_id to always have a mapping
    def map_primary_key(row, primary_key_name)
      row['legacy_id'] = row.delete primary_key_name
    end


    def display_field_statistics
      # first give feedback on imported cell fields.
      possible_cell_fields = @client.query("SELECT COUNT(*) AS count FROM cells_fields WHERE connection_id = 0").first['count']
      puts "#{@imported_cell_fields}/#{possible_cell_fields} fields were imported directly to cells."

      if @imported_cell_fields != possible_cell_fields
        puts "The #{possible_cell_fields-@imported_cell_fields} remaining fields were not imported because their" +
             " cells_id is not pointing to an existing cell. Their rows are:"

        fields_missing_cell = @client.query("SELECT f.fields_id, f.cells_id FROM cells_fields AS f LEFT JOIN cells AS c" +
                                            " ON f.cells_id = c.id WHERE f.connection_id = 0 AND c.id IS NULL")
        fields_missing_cell.each do |field|
          puts field
        end
      end

      # Now give feedback on imported grid cell fields.
      query = "SELECT COUNT(*) AS count FROM sets_cells AS s LEFT JOIN cells_fields AS c ON s.connection_id = c.connection_id WHERE c.connection_id != 0"
      possible_grid_cell_fields = @client.query(query).first['count']
      puts "#{@imported_grid_cell_fields}/#{possible_grid_cell_fields} fields were imported to grid cells in sets"

      puts "Import finished!"
    end
end
