# Motion Bank API

## GET /api/cells
Returns a JSON object, containing an array of all cells. 

The cell fields returned are:
* additional_fields: Object (all additional fields as key-value pairs)
* css_class_name: String
* description: String
* id: String
* poster_image: Object
** url: String (relative system path)
** urls to the small and medium versions of the image
* title: String
* type: String


## GET /api/cells/:id
Requests one specific cell. The id is a 24 character hexadecimal string unique to every set. So one example request could be GET /api/cells/2404da044d6f6a2520690100.

This request returns a JSON Object with the following values:
* additional_fields: Object (all additional fields as key-value pairs)
* css_class_name: String
* description: String
* id: String
* poster_image: Object
** url: String (relative system path)
** urls to the small and medium versions of the image
* title: String
* type: String

The server will return a 404 response if no cell with the specified id is found.


## GET /api/sets
Returns a JSON object, containing an array of all cell sets. 

The values returned are:
* cell_height: Number
* cell_width: Number
* css_class_name: String
* description: String
* grid_cols: Number
* grid_rows: Number
* id: String
* path: String
* poster: String
* published: Boolean
* title: String


## GET /api/sets/:id
Requests one specific set. The id is a 24 character hexadecimal string unique to every set. So one example request could be GET /api/sets/0104da044d6f6a2520680100.

This request returns a JSON Object with the following values:
* cell_height: Number
* cell_width: Number
* cells: Array of all cells in the set.
* css_class_name: String
* description: String
* grid_cols: Number
* grid_rows: Number
* id: String
* path: String
* poster: String
* published: Boolean
* title: String

The server will return a 404 response, if no set with that id is found.


## POST /api/cell/new
A POST request to create a new cell. Returns a 201 status and the cell as a JSON object if the cell was created successfully. Returns error message with a 422 status if the cell couldn't be created. 

The method expects a JSON object with "cell" as its key.

Permitted attributes are:
* type: String (must be one of html, iframe, image, vimeo, visualization, set_link, text, title, recording or context)
* title: String
* description: String
* css_class_name: String (must be unique)
* poster_image: String (the image file as base64 encoded string, permitted file types are jpg, jpeg, png)
* image_name: String (the file name for the image, including the file extension, example: "movement.jpg")
* additional_fields: Object of key-value pairs

### Example:
> { cell: {
>  title: "A new cell",
>  type: "text",
>  poster_image: "[base64 encoded string]",
>  image_name: "movement.jpg",
>  description: "This is a new cell.",
>  css_class_name: "cell201",
>  additional_fields: { "key": "value" }
> }}


## POST /api/cell/:id/update
A POST request to update an existing cell. All specified fields will be updated, omitted fields will remain the same. If the cell is successfully updated a string saying 'Cell was successfully updated.' is returned. In case the cell couldn't be updated a JSON object with the error message is returned with a status 422.

The submitted JSON should be formatted the same as when creating a new cell, with only the fields that should be changed. 


## PUT /api/cell/:id/remove_poster_image
A PUT request to remove the poster image of a specific cell. If the image was removed successfully a message 'Cell was successfully updated.' is returned. If the image couldn't be deleted a JSON object with the error message and a status 422 is returned. 
