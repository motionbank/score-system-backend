node :id do
  locals[:object].id.to_s
end
attributes :title, :description, :type
node :poster_image do
  image = locals[:object].poster_image
  image.as_json[:poster_image]
end

attribute :additional_fields
