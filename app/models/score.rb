# This is basically the container for all types of data. There are multiple scores in the system.
# Each containing cells and sets.
class Score
  include Mongoid::Document

  field :name, type: String

  validates_presence_of :name
end
