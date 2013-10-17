# This is the canonical representation of a Cell and contains all the information that constitute
# this very cell.
class Cell
  include Mongoid::Document

  TYPES = [:html, :iframe, :image, :set_link, :text, :title]

  field :legacy_id, type: Integer # the ID in the legacy MySQL database

  field :type, type: Symbol
  field :title, type: String
  field :description, type: String
  field :additional_fields, type: Hash, default: {}

  mount_uploader :poster_image, ImageUploader


  validates_presence_of :title, :type
  validates_inclusion_of :type, in: TYPES

  def self.gender
    :m
  end
end
