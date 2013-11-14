module ApiHelper

  # merge the values of each grid cell with those of the canonical cell of the grid cell
  def merge_grid_cells_with_cells(collection)
    collection.map do |grid_cell|
      grid_cell.instance_eval do
        self.title = title.presence || cell.title
        self.description = description.presence || cell.description
        self.additional_fields = cell.additional_fields.merge(self.additional_fields)
      end
      grid_cell
    end
  end
end
