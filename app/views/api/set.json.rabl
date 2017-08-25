locals ||= {}
locals[:object] ||= @set

object locals[:object] => nil # the nil value means, don't wrap the object with its name

node :id do
  locals[:object].id.to_s
end
attributes :title, :description, :path
node :poster do |set|
  # TODO: this is currently broken, why?
  # set.poster_image_filename
end
attribute :columns => :grid_cols
attribute :rows => :grid_rows
attributes :cell_width, :cell_height
attribute :css_class_name
attribute :published

child locals[:object].creator do
  attributes :id, :name, :email
end

if params[:action] != 'sets'
	merged_grid_cells = merge_grid_cells_with_cells(locals[:object].grid_cells)
	child merged_grid_cells => :cells do |cells|
	  collection cells, object_root: false

	  extends 'shared/cell'
	  attributes :x, :y # the position in the grid
	  attributes :width, :height # the position in the grid
	  attributes :type
	end
end