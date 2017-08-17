function initPinaBauschArchive () {

	var prefix ="PREFIX schema:<http://schema.org/>" +
				"PREFIX owl:<http://www.w3.org/2002/07/owl#>" +
				"PREFIX pext:<http://proton.semanticweb.org/protonext#>" +
				"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>" +
				"PREFIX psys:<http://proton.semanticweb.org/protonsys#>" +
				"PREFIX skos:<http://www.w3.org/2004/02/skos/core#>" +
				"PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>" +
				"PREFIX media:<http://purl.org/media#>" +
				"PREFIX frbr:<http://purl.org/vocab/frbr/core#>" +
				"PREFIX pba:<http://www.pinabausch.org/resource/>" +
				"PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#>" +
				"PREFIX places:<http://purl.org/ontology/places#>" +
				"PREFIX pbao:<http://www.pinabausch.org/pbao#>" +
				"PREFIX dct:<http://purl.org/dc/terms/>" +
				"PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>" +
				"PREFIX xml:<http://www.w3.org/XML/1998/namespace>" +
				"PREFIX tl:<http://purl.org/NET/c4dm/timeline.owl#>" +
				"PREFIX gnd:<http://d-nb.info/standards/elementset/gnd#>" +
				"PREFIX event:<http://purl.org/NET/c4dm/event.owl#>" +
				"PREFIX foaf:<http://xmlns.com/foaf/0.1/>" +
				"PREFIX dc:<http://purl.org/dc/elements/1.1/>";

	var endpoint = "https://pbproxy.herokuapp.com/repositories/PBAe";

	var $tabContent = $('#pbaContentCells');
	var $tableHeader = $('.table-header-form',$tabContent);
	var $table = $('.cellTable',$tabContent);

	function onDropPBA (event) {

		var droppedCell = $(event.target);
		var title = droppedCell.find(".contentCellTitle").html();
		var description = droppedCell.find(".contentCellDescription").html();
		var imageLink = droppedCell.find(".contentCellPosterImage img").attr("src");
		var type = droppedCell.data("type");
		var uri = droppedCell.data("pba-uri");

		var id = undefined;

		var grid = theGrid.container;
		var gridOffset = grid.offset();

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
						css_class_name: "pba_" + parseInt(Math.random(100000)*100000,10),
						// poster_image : "",
						// image_name : "",
						additional_fields: {
							"pba-uri" : uri,
							"pba-type" : type,
							"iframe-src" : 'http://lab.motionbank.org/pba/generic/?uri=' + uri.replace(/.+\/([a-z0-9]+)#(.+)$/ig,'$1:$2')
						}
					}
				}),
				success: function(cell, status) {
					id = cell._id.$oid;
					next();
				}
			});
		}

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
	}

	$tableHeader.find('a').each(function(i,e){
		var $e = $(e),
			id = $e.attr('id');
		$e.click(function(evt){
			evt.preventDefault();
			if ( id == 'pieces' ) {
				populatePieces();
			} else if ( id == 'people' ) {
				populatePeople();
			} else if ( id == 'locations' ) {
				populateLocations();
			}
			return false;
		});
	});

	function populatePieces () {
		var query = new SQB.SparqlQuery(endpoint).prefix(prefix);

		query.select('*')
			 .where([
			 	'?piece a pbao:Piece',
			 	'?piece rdfs:label ?piece_label'
			 ])
			 .filter('langMatches( lang(?piece_label), "de" )')
             .order('?date');

        query
        	.exec()
        	.then(function(response){
	        	var template = _.template(
				  '<div id="pbaContentCell_<%= id %>" data-pba-uri="<%= uri %>" data-type="piece" class="row-fluid contentCell availableCell">'+
				    '<div class="contentCellPosterImage span1"><img src=""></div>'+
				    '<div class="span10">'+
				    	'<h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> '+
				    	'<span class="contentCellID">[URI:&nbsp;<%= uri %>]</span>'+
				    	'<p class="contentCellDescription"><%= description %></p>'+
				    '</div>'+
				  '</div>');
	        	var pieces = response.bindings;
	        	var html = '';
	        	if ( pieces && pieces.length > 0 ) {
	        		pieces.forEach(function(r,n){
	        			var uri = r.piece.value;
	        			var label = r.piece_label.value;
	        			html += template({
	        				id : '-1',
	        				type : 'piece',
	        				uri : uri,
	        				title : label,
	        				description : ''
	        			});
	        		});
	        	}
	        	$table
	        		.html(html)
	        		.off("dragstop", ".availableCell", onDropPBA)
					.on("dragstop", ".availableCell", onDropPBA)
					.find(".availableCell").draggable({
						opacity: 0.7,
						helper: createDraggableCellHelper,
						cursorAt: {
							left: 5,
							top: 5
						},
						revert: false
					});
        	});
	}
	
	var peopleFirstLetter = 'p';

	function populatePeople () {

		var query = new SQB.SparqlQuery(endpoint).prefix(prefix);

		/*
		SELECT DISTINCT ?file
WHERE {
  ?file frbr:exemplarOf ?image .
  ?image a pbao:Photograph .
  FILTER regex( str(?file), "500$" )
  ?image pbao:depicts pbao:pina_bausch .
  OPTIONAL { ?image pbao:subseries pbao:subs47 }
}
ORDER BY ?file
LIMIT 10
*/

		query._transport.submit(
			prefix+' '+
			'SELECT DISTINCT ?person ?person_label '+
			'WHERE {'+
			'  ?person a pbao:Person .'+
			'  ?person rdfs:label ?person_label .'+
			'  FILTER regex( str(?person), "pbao#'+peopleFirstLetter+'" )'+
			'}'+
			'ORDER BY ?person_label'
		)
			// .select('*')
			// .where([
			// 	'?person a pbao:Person',
			// 	'?person rdfs:label ?person_label'
			// ])
			// .filter('regex(str(?person),"pbao#'+peopleFirstLetter+'")')
			// .order('?person_label')
   //      	.exec()
        	.then(function(response){
	        	var template = _.template(
				  '<div id="pbaContentCell_<%= id %>" data-pba-uri="<%= uri %>" data-type="person" class="row-fluid contentCell availableCell">'+
				    '<div class="contentCellPosterImage span1"><img src=""></div>'+
				    '<div class="span10">'+
				    	'<h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> '+
				    	'<span class="contentCellID">[URI:&nbsp;<%= uri %>]</span>'+
				    	'<p class="contentCellDescription"><%= description %></p>'+
				    '</div>'+
				  '</div>');
	        	var persons = response.bindings;
	        	var html = '';
	        	if ( persons && persons.length > 0 ) {
	        		persons.forEach(function(r,n){
	        			var uri = r.person.value;
	        			var label = r.person_label.value;
	        			html += template({
	        				id : '-1',
	        				type : 'person',
	        				uri : uri,
	        				title : label,
	        				description : ''
	        			});
	        		});
	        	}
	        	$table
	        		.html(html)
	        		.off("dragstop", ".availableCell", onDropPBA)
					.on("dragstop", ".availableCell", onDropPBA)
					.find(".availableCell").draggable({
						opacity: 0.7,
						helper: createDraggableCellHelper,
						cursorAt: {
							left: 5,
							top: 5
						},
						revert: false
					});
        	});
	}
}
