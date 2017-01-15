function googleApiClientReady () {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

var YTA_loaded = false;
function onYouTubeApiLoad () {
	gapi.client.setApiKey('AIzaSyAJbBRGqwVDfB77v71Ru7RoPmgP2VBVrbg');
	YTA_loaded = true;

	var $input = $('#searchYouTube').find('#searchTermYT');
	var $button = $("#searchYouTube").find('button');
	$button.click(function(evt){
		evt.preventDefault();
		var request = gapi.client.youtube.search.list({
	        part: 'snippet',
	        type: 'video',
	        q: $input.val(),
	    });
	    request.execute(function(response) {
	        if (response.items.length > 0) {
	        	populateTable(response.items);
	        }
	    });
	    return false;
	});
}

function populateTable ( items ) {
	var template = _.template(
	  '<div id="youtubeContentCell_<%= id %>" data-yt-id="<%= yt_id %>" class="row-fluid contentCell availableCell">'+
	    '<div class="contentCellPosterImage span1"><img src="<%= poster_image.url %>"></div>'+
	    '<div class="span10">'+
	    	'<h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> '+
	    	'<span class="contentCellID">[YouTube-ID:&nbsp;<a href="https://www.youtube.com/watch?v=<%= yt_id %>" target="_blank"><%= yt_id %>]</a></span>'+
	    	'<p class="contentCellDescription"><%= description %></p></div>'+
	  	'<a class="btn" href="/<%= APPLICATION["score_id"] %>/cells/<%= id %>/edit"><i class="icon-edit"></i> Edit</a>'+
	  '</div>');

	var $tabContent = $('#youtubeContentCells');
	var $table = $('.cellTable',$tabContent);

	var html = '';

	items.forEach(function(e,i){
		//console.log(e);
		html += template({
			id:'-1',
			type: 'youtube-video',
			title: e.snippet.title,
			description: e.snippet.description,
			poster_image: {
				url: e.snippet.thumbnails.default.url
			},
			yt_id: e.id.videoId
		});
	});

	$table
		.html(html)
		.off("dragstop", ".availableCell", onDropYT)
		.on("dragstop", ".availableCell", onDropYT)
		.find(".availableCell").draggable({
			opacity: 0.7,
			helper: createDraggableCellHelper,
			cursorAt: {
				left: 5,
				top: 5
			},
			revert: false
		});
}

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}

function onDropYT (event) {

	var droppedCell = 	$(event.target);
	var video_id = 		droppedCell.data('yt-id');
	var title = 		droppedCell.find(".contentCellTitle").html();
	var description = 	droppedCell.find(".contentCellDescription").html();
	var imageLink = 	droppedCell.find(".contentCellPosterImage img").attr("src");
	var imageName =		video_id + '-' + 
						randomString(10,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + '-' + 
						imageLink.split('/').pop().replace(/([^?]+)(\?.*)?/,'$1');
	var imageBase64 = 	undefined;
	var	id =			undefined;

	var grid = theGrid.container;
	var gridOffset = grid.offset();
	
	// http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com

	function getImageBase64 (next) {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/api/v1.0/img/base64-from-url',
			data: {
				url: imageLink
			},
			success	: function ( data, status ) {
				imageBase64 = data.base64;
				next();
			}
		});
	}

	function createNewCell (next) {
		$.ajax({
			type: "POST",
			url: Routes.cell_new_path(APPLICATION.score_id),
			headers: {
				'Content-Type': 'application/json',
				'user_token': 'zBy5gjdPJWHUyKYpEtrG'
			},
			dataType: 'json',
			data: JSON.stringify({
				cell: {
					type: "iframe",
					title: title,
					description: description,
					css_class_name: "youtube_" + parseInt(Math.random(100000)*100000,10),
					poster_image : imageBase64,
					image_name : imageName,
					additional_fields: {
						"iframe-src": "http://www.youtube.com/embed/" + video_id
					}
				}
			}),
			success: function(cell, status) {
				id = cell._id.$oid;
				next();
			}
		});
	}

	getImageBase64(function(){
		createNewCell(function(){
			if (gridOffset.left < currentMousePos.x && currentMousePos.x < gridOffset.left + grid.width()) {
				if (gridOffset.top < currentMousePos.y && currentMousePos.y < gridOffset.top + grid.height()) {

					$.each(theGrid.cells, function(index, value) {
						if (id == value.id) {
							id = id + "-2";
						}
					});

					var scoreId = APPLICATION.score_id;
					var setId = APPLICATION.resource_id;
					var gridPosition = theGrid.mapPixelsToGrid(currentMousePos.x - gridOffset.left,
						currentMousePos.y - gridOffset.top);
					var cellAttributes = {
						cell_id: id, //this will make sure a reference to the canonical cell is kept
						x: gridPosition.x,
						y: gridPosition.y
					};
					$.post(
						Routes.cell_set_grid_cells_path(scoreId, setId), {
							grid_cell: cellAttributes
						},
						createGridCell
					);
				}
			}
		});
	});
}

