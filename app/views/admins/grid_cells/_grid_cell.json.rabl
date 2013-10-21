object @grid_cell

extends 'shared/cell', object: @grid_cell

# now render the canonical cell
child @grid_cell.cell => :canonical_cell do |canonical_cell|
  extends 'shared/cell', object: canonical_cell
end
