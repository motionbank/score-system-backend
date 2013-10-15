class CellSet
  include Mongoid::Document

  field :title, type: String
  field :description, type: String

  mount_uploader :poster_image, ImageUploader

  field :path, type: String

  field :width, type: String
  field :height, type: String


  has_many :cells


  validates_presence_of :title

  def self.gender
    :m
  end
end
