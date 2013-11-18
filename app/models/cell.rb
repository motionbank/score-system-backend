# This is the canonical representation of a Cell and contains all the information that constitute
# this very cell.
class Cell
  include Mongoid::Document
  include Mongoid::Timestamps
  include MultiTenancy

  set_collection_hierarchy [:score]

  TYPES = [:html, :iframe, :image, :vimeo, :visualization, :set_link, :text, :title, :recording, :context]

  field :legacy_id, type: Integer # the ID in the legacy MySQL database

  field :type, type: Symbol
  field :title, type: String
  field :description, type: String
  field :additional_fields, type: Hash, default: {}
  field :css_class_name, type: String, default: ->{ "cell-#{legacy_id || id}" }

  mount_uploader :poster_image, ImageUploader


  validates_presence_of :title, :type, :css_class_name
  validates_inclusion_of :type, in: TYPES
  validates_uniqueness_of :css_class_name

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
