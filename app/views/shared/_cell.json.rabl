node :id do
  locals[:object].id.to_s
end
attributes :title, :description, :type
node :poster_image do
  image = locals[:object].poster_image
  #TODO remove when the legacy assets are synced to this project
  #the following if/else is just to handle the situation of not having the legacy assets
  #instead simply locals[:object].poster_image.as_json[:poster_image] should be sufficient
  #once all those occasions are cleaned up, resolve Case 26650.
  if image.present? && !File.exists?(image.path)
    # insert dummy
    hash = image.as_json[:poster_image]
    hash[:url] = Cell.dummy_poster_image
    image.versions.each do |version, value|
      hash[version][:url] = Cell.dummy_poster_image
    end
    hash
  else
    image.as_json[:poster_image]
  end
end

attribute :additional_fields
