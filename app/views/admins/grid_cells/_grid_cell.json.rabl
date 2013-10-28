locals ||= {}
locals[:object] ||= @grid_cell

object locals[:object]

extends 'shared/cell', object: locals[:object]
attributes :x, :y # the position in the grid
attributes :width, :height # the position in the grid

# now render the canonical cell
child locals[:object].cell => :canonical_cell do |canonical_cell|
  extends 'shared/cell', object: canonical_cell
  attribute :type
end

attribute :additional_fields