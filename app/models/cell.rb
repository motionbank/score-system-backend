class Cell
  include Mongoid::Document

  field :kind, type: String
  field :title, type: String
  field :description, type: String
  field :additional_fields, type: Hash, default: {}

  mount_uploader :poster_image, ImageUploader

  def self.gender
    :m
  end
end
