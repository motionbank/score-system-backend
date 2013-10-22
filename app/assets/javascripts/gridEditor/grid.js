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
	this.cells = [ ];
	this.container = $('#grid');
	this.init();
}



Grid.prototype = {
	init: function(){
		this.container.css({ "width" : this.width, "height" : this.height });
		$(".cell").css({ "width" : this.widthStep, "height" : this.heightStep });
		
		this.saveCellSizeAsPixels();
		this.container.prepend(this.drawGridMesh());
		
        this.width = this.container.width();
		this.height = this.container.height();
		this.boundsWidth = this.container.parent().width();
		this.boundsHeight = this.container.parent().height();
		
		var addRowButton = '<div id="addRow"></div>';
        var addColumnButton = '<div id="addColumn"></div>';
    
		this.container.append(addRowButton);
        $("#addRow").click($.proxy(this.addRow, this));
    
		this.container.append(addColumnButton);
        $("#addColumn").click($.proxy(this.addColumn, this));
    
        this.updateButtonPositionAndSize();
	},


	saveCellSizeAsPixels: function() {
		var width = this.container.width() / 100 * parseInt(this.widthStep, 10);
		var height = this.container.height() / 100 * parseInt(this.heightStep, 10);
		this.cellSize = {width: Math.round(width), height: Math.round(height)};
	},


	getCellSizeAsPixels: function() {
		return this.cellSize;
	},


	mapPixelsToGrid: function(x, y) {
		var absCellSize = this.getCellSizeAsPixels();
		var column = Math.floor(x / absCellSize.width);
		var row = Math.floor(y / absCellSize.height);
		return {x: column, y: row};
	},
	
	
	addRow: function(){
		console.log(this.width + "and boundwidth: " + (this.boundsWidth - this.canonicalCellWidth));
		if(this.width < this.boundsWidth - this.canonicalCellWidth*2){
			this.width += this.canonicalCellWidth;
			this.updateButtonPositionAndSize();
		}
		else {
			alert("Maximum Width reached!");
		}
		
	},


	addColumn: function(){
		console.log(this.height + "and boundwidth: " + (this.boundsHeight - this.canonicalCellHeight));
		if(this.height < this.boundsHeight - this.canonicalCellHeight*2){
			this.height += this.canonicalCellHeight;
			this.updateButtonPositionAndSize();
		}
		else {
			alert("Maximum Height reached!");
		}

	},
	
	
	updateButtonPositionAndSize: function(){
		var addRowButton = $("#addRow");
		var addColumnButton = $("#addColumn");

		addRowButton.css({"left":this.width, "height": this.height});
		addColumnButton.css({"top":this.height, "width":this.width});

		$("#grid").css({"width":this.width,"height":this.height});
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
		this.container.css({ "width" : this.width, "height" : this.height });
		this.saveCellSizeAsPixels();
		this.container.prepend(this.drawGridMesh());
		$(".cell").css({ "width" : this.widthStep, "height" : this.heightStep });
	},

	drawGridMesh: function() {
		this.container.find('svg').remove();

		var absCellSize = this.getCellSizeAsPixels();
		var w = absCellSize.width;
		var h = absCellSize.height;
		
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
