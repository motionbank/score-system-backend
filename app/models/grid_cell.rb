# This is the representation of a Cell document in the CellSet. Because a cell can be embedded in
# a set multple times and can have extra/overriding information in this relationship (this is a
# rich-join in SQL lingo) we're not associating documents from the Cell model directly with the set.
class GridCell
  include Mongoid::Document

  field :legacy_id, type: Integer # connection_id in the legacy MySQL database (table sets_cells)

  # overriding fields (used to override the value from the canonical Cell)
  field :title, type: String
  field :description, type: String
  field :additional_fields, type: Hash, default: {}
  mount_uploader :poster_image, ImageUploader

  # grid placement
  field :x, type: Integer
  field :y, type: Integer
  field :width, type: Integer, default: 1
  field :height, type: Integer, default: 1

  belongs_to :cell # the canonical cell that this GridCell is an instance of
  embedded_in :cell_set


  validates_presence_of :cell, :x, :y, :width, :height


  def type
    cell.type
  end
end
