class Cell
  include Mongoid::Document
  field :kind, type: String
  field :title, type: String
  field :description, type: String
end
