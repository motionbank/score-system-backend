class Cell
  include Mongoid::Document

  TYPES = [:html, :iframe, :image, :set_link, :text, :title]

  field :kind, type: Symbol
  field :title, type: String
  field :description, type: String
  field :additional_fields, type: Hash, default: {}

  mount_uploader :poster_image, ImageUploader


  belongs_to :cell_set


  validates_presence_of :title, :kind
  validates_inclusion_of :kind, in: TYPES

  def self.gender
    :m
  end
end
