# This is basically the container for all types of data. There are multiple scores in the system.
# Each containing cells and sets.
#
# The URL proccessed name of score documents (its slug) will serve as the first part of the URL. This makes it
# resemble a folder even more.
class Score
  include Mongoid::Document
  include Mongoid::Slug

  field :name, type: String

  slug :name do |cur_object|
    cur_object.slug_builder.to_s.parameterize('_').gsub('-','_')# dashes will cause uncomfortable handling in some places and
                                                                # may cause problems with symbols
  end

  validates_presence_of :name

  # Making sure that the name doesn't contain characters that will be problematic in a collection name.
  NAME_FORMAT_REGEXP = /\A[a-z@_].*\Z/i
  validates_format_of :name, with: NAME_FORMAT_REGEXP, message: "should comply to the format #{NAME_FORMAT_REGEXP.inspect}"
end
