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
      sets: [:get_associated_cells]
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
  end


  def run
    [:users, :cells, :sets].each do |table|
      import(table)
    end
  end


  def self.config_format_message
<<-EOL
Please make sure that your config file does have at least the following yaml tree.
legacy_db:
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
end
