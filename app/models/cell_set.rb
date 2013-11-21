class CellSet
  include Mongoid::Document
  include Mongoid::Timestamps
  include MultiTenancy
  include Mongoid::Publish

  set_collection_hierarchy [:score]

  field :legacy_id, type: Integer # the ID in the legacy MySQL database

  field :title, type: String
  field :description, type: String

  mount_uploader :poster_image, ImageUploader

  field :path, type: String
  field :css_class_name, type: String, default: ->{ "set-#{legacy_id || id}" }

  field :rows, type: Integer
  field :columns, type: Integer

  field :cell_width, type: Integer, default: 320
  field :cell_height, type: Integer, default: 240


  embeds_many :grid_cells
  belongs_to :creator, class_name: 'User'


  validates_presence_of :title, :css_class_name

  before_validation :orphan_grid_cells_without_cells

  def self.gender
    :m
  end


  private

    def orphan_grid_cells_without_cells
      grid_cells.dup.each do |grid_cell|
        if grid_cell.cell.nil?
          # this would lead to validation errors for the whole set, thus we orphan that grid cell -> make it a
          # root document in the top-level (not tenanted) 'grid_cells' collection.
          self.grid_cells.delete(grid_cell)

          # use the pure ruby driver without any callbacks to save the document in the grid_cells collection
          score_id = MultiTenancy.current_score.id
          GridCell.collection.insert(grid_cell.attributes.merge(cell_set_id: self.id, score_id: score_id))
        end
      end
    end
end
