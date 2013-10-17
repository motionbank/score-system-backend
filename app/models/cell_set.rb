class CellSet
  include Mongoid::Document

  field :title, type: String
  field :description, type: String

  mount_uploader :poster_image, ImageUploader

  field :path, type: String

  field :rows, type: Integer
  field :columns, type: Integer

  field :cell_width, type: Integer, default: 320
  field :cell_height, type: Integer, default: 240


  embeds_many :grid_cells
  belongs_to :creator, class_name: 'User'


  validates_presence_of :title

  def self.gender
    :m
  end
end
