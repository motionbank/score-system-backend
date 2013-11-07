locals ||= {}
locals[:object] ||= @set

object locals[:object] => nil # the nil value means, don't wrap the object with its name

node :id do
  locals[:object].id.to_s
end
attributes :title, :description, :path
node :poster do |set|
  set.poster_image_filename
end
attribute :columns => :grid_cols
attribute :rows => :grid_rows
attributes :cell_width, :cell_height

child locals[:object].creator do
  attributes :id, :name, :email
end

child locals[:object].grid_cells => :cells do
  extends 'shared/cell'
end