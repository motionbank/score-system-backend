node :id do
  locals[:object].id.to_s
end
attributes :title, :description
node :poster_image do
  locals[:object].poster_image.as_json[:poster_image]
end

