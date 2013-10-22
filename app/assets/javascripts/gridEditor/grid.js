// 	TODO Check CSS (position, left, top) of Grid and BoundsForGrid, not clear written
//	because e.g. boundaries for grid do not work at the moment
// 	TODO: Rewrite Collision Detection
//	TODO: Correct CSS and position grid correctly


function Grid(width, height, boundsWidth, boundsHeight, widthStep, heightStep ){
	this.width = width;
	this.height = height;
	this.boundsWidth = boundsWidth;
	this.boundsHeight = boundsHeight;
	this.widthStep = widthStep;
	this.heightStep = heightStep;
	this.canonicalCellWidth = 0;
	this.canonicalCellHeight = 0;
	this.cells = [ ];
	this.init();
}



Grid.prototype = {
	init: function(){
		var grid = $("#grid").css({ "width" : this.width, "height" : this.height });
		$("boundsForGrid").css({ "width" : $("boundsForGrid").parent().width(), "height" : this.boundsHeight });
		$(".cell").css({ "width" : this.widthStep, "height" : this.heightStep });

		this.canonicalCellWidth = grid.width() * parseInt(this.widthStep, 10)/100;
		this.canonicalCellHeight = grid.height() * parseInt(this.heightStep, 10)/100;
		grid.prepend(this.drawGridMesh());

		this.makeGridResizable();
	},

	makeGridResizable: function(){
		var context = this;
		$("#grid").resizable({
			grid: [ this.canonicalCellWidth , this.canonicalCellHeight ],
			containment: "#boundsForGrid"
    	});
	},
	
	//remove GridCell when clicking in Edit Form
	removeCell: function(cellToRemove){
		
		//remove cell from grid
		$("#gridCell_"+cellToRemove.id).remove();
		$("#usedContentCell_"+cellToRemove.id).remove();
		$("#dialog-modal").dialog("close");

		//remove cell from class Grid, if it maches return false and delete it by this
		this.cells = $.grep(this.cells, function(value, index){
			if(value.id == cellToRemove.id){
				return false;
			}
			else {
				return true;
			}
		});
	},

	addCell: function(cell){
		this.cells.push(cell);
	},

	setCurrentCell: function(idOfCell){
		$.each(this.cells, function(index, value){
			if(value.id == idOfCell){
				currentCellToEdit = value;
				return false;
			}
		});
	},

	onWindowResize: function(){
		console.log($(window).width());
		$("boundsForGrid").css({ "width" : $("boundsForGrid").parent().width(), "height" : this.boundsHeight });
		$("#grid")
			.css({ "width" : this.width, "height" : this.height })
			.prepend(this.drawGridMesh());
		$(".cell").css({ "width" : this.widthStep, "height" : this.heightStep });
	},

	drawGridMesh: function() {
		var grid = $('#grid');

		grid.find('svg').remove();

		var w = this.canonicalCellWidth;
		var h = this.canonicalCellHeight;

		var pathDescription = "M " + w + " 0 L 0 0 0 " + h;
		var path = '<path d="'+ pathDescription + '" fill="none" stroke="#fff" stroke-width="1"/>';
		var pattern = '<pattern id="gridPattern" width="'+ w +'" height="'+ h +'" patternUnits="userSpaceOnUse">' + path + '</pattern>';
		var rect = '<rect width="100%" height="100%" fill="url(#gridPattern)" />';
		var svg = '<svg width="100%" height="100%"><defs>' + pattern + '</defs>' + rect + '</svg>';

		return svg;
	}
}



/*
//TODO rewrite code, currently red cell is behind everything, because cells weren't draggable anymore
function checkCollisionsWithOthers(){
	//remove all current overlap marks
	$(".overlap").remove();
	//get all cells and loop through every other cell
	var cells = $(".cell");
    $.each(cells, function(index, item1){
    	$.each(cells, function(index, item2){
    		//check if it's a different item, so it's not detecting collision with itself
    		if(item1.id != item2.id){
    			var $item1 = $("#"+item1.id);
	            var overlap = $item1.collision("#"+item2.id, {as: "<div/>", mode:"body"});
	            if(overlap){
	            	//if overlap == true, add class and add to body
	            	overlap.addClass("overlap").appendTo("#grid");
	            	overlap.css("z-index", $item1.css("z-index")-1);
	            }
	        }
    	})
    });
}
*/
