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
    # trivial imports
    [:users, :cells, :sets].each do |table|
      straightly_import(table)
    end

    import_grid_cells
    import_additional_fields
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


    def import_grid_cells
      table = TABLE_MODEL_MAPPING.key(GridCell)
      results = @client.query "SELECT * FROM #{table}"
      results.each do |row|
        # get set
        id = row.delete 'sets_id'
        set = CellSet.find_by(legacy_id: id)

        # get cell
        id = row.delete 'cells_id'
        cell = Cell.find_by(legacy_id: id)

        # ignore this row if the set or cell couldn't be retrieved.
        if set.nil? || cell.nil?
          puts "#{row} was not imported. Broken foreign key(s): #{"sets_id" if set.nil} #{"cells_id" if cell.nil?}"
          next
        end

        map_primary_key(row, 'connection_id')

        row['cell_id'] = cell.id # cell_id is the foreign_key to the canonical cell in the new db. This is not an import.

        grid_cell = GridCell.new(row)
        set.grid_cells << grid_cell
        unless set.valid?
          puts "GridCell with connection_id #{grid_cell.legacy_id} was not imported because it had errors: #{grid_cell.errors.full_messages}"
        end
      end
    end


    def import_additional_fields
    end


    def straightly_import(table)
      results = @client.query "SELECT * FROM #{table}"
      model = TABLE_MODEL_MAPPING[table]
      results.each do |row|
        map_fields(table, row)
        model.create!(row)
      end
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
