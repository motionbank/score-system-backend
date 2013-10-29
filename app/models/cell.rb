# This is the canonical representation of a Cell and contains all the information that constitute
# this very cell.
class Cell
  include Mongoid::Document
  include MultiTenancy

  set_collection_hierarchy [:score]

  TYPES = [:html, :iframe, :image, :vimeo, :visualization, :set_link, :text, :title]

  field :legacy_id, type: Integer # the ID in the legacy MySQL database

  field :type, type: Symbol
  field :title, type: String
  field :description, type: String
  field :additional_fields, type: Hash, default: {}

  mount_uploader :poster_image, ImageUploader


  validates_presence_of :title, :type
  validates_inclusion_of :type, in: TYPES

  def self.dummy_poster_image
    "http://msmunited.com/wp-content/uploads/2013/02/dance1.jpg"
    # another placeholder image, in case the one above becomes unavailable
    # (as happened this morning)
    # "http://cezoe.com/wp-content/uploads/2012/05/Tanz.jpg"
  end


  def self.gender
    :m
  end
end
