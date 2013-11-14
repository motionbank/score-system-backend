// 	TODO Check CSS (position, left, top) of Grid and BoundsForGrid, not clear written
//	because e.g. boundaries for grid do not work at the moment
// 	TODO: Rewrite Collision Detection
//	TODO: Correct CSS and position grid correctly


function Grid(width, height, boundsWidth, boundsHeight, widthStep, heightStep ){
	
	this.width = width*parseInt(widthStep);
	this.height = height*parseInt(heightStep);
	this.boundsWidth = boundsWidth*parseInt(widthStep);
	this.boundsHeight = boundsHeight*parseInt(heightStep);
	this.widthStep = widthStep;
	this.heightStep = heightStep;
	this.cells = [ ];
	this.container = $('#grid');
  this.parentContainer = $('#boundsForGrid');
  this.cellSelected = false;
	this.init();
}



Grid.prototype = {
	init: function(){
		this.container.css({ "width" : this.width, "height" : this.height });
		$(".cell").css({ "width" : this.widthStep, "height" : this.heightStep });

		this.saveCellSizeAsPixels();
    	this.container.prepend(this.drawGridMesh());

		var addRowButtons = '<div><span id="removeRow">-</span><span id="addRow">+</span></div>';
		var addColumnButtons = '<div><span id="removeColumn">-</span><span id="addColumn">+</span></div>';

		$("#boundsForGrid").append(addRowButtons);
		$("#addRow").click($.proxy(this.addRow, this));
		$("#removeRow").click($.proxy(this.removeRow, this));

		$("#boundsForGrid").append(addColumnButtons);
		$("#addColumn").click($.proxy(this.addColumn, this));
		$("#removeColumn").click($.proxy(this.removeColumn, this));

		this.setPositionsOfButtons();
	},
	
	
    saveCellSizeAsPixels: function() {
		var width = parseInt(this.widthStep, 10);
		var height = parseInt(this.heightStep, 10);
		this.cellSize = {width: width, height: height};
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

	setPositionsOfButtons: function(){
		$("#grid").css({"width":this.width,"height":this.height});
    	$('#boundsForGrid').css({ "height" : (this.height + this.cellSize.height*2) });

		var addRowButton = $("#addRow");
		var removeRowButton = $("#removeRow");
		var addColumnButton = $("#addColumn");
		var removeColumnButton = $("#removeColumn");

		var parentContainer = addColumnButton.parent().parent();
		
		addColumnButton.css({"left":parentContainer.width()-addColumnButton.width(), "height": parentContainer.height()/2, "top":parentContainer.height()/2, "padding-top":parentContainer.height()*0.16});
		removeColumnButton.css({"left":parentContainer.width()-addColumnButton.width(), "height":parentContainer.height()/2, "padding-top":parentContainer.height()*0.16});
		addRowButton.css({"top":parentContainer.height()-addRowButton.height(), "width":parentContainer.width()/2, "left":parentContainer.width()/2});
		removeRowButton.css({"top":parentContainer.height()-addRowButton.height(), "width":parentContainer.width()/2});
	},


	persistSetSize: function() {
		var scoreId = APPLICATION.score_id;
		var setId = APPLICATION.resource_id;
		var columns = this.width/parseInt(this.widthStep);
		var rows = this.height/parseInt(this.heightStep);

		$.post(
			Routes.cell_set_path(scoreId, setId),
			{
				cell_set: {columns: columns, rows: rows},
				_method: "patch" // to get rails to handle this a update request
			}
		);
	},


	addColumn: function() {
		if(this.width < this.boundsWidth){
			this.width += this.cellSize.width;
			this.setPositionsOfButtons();
			this.persistSetSize();
		}
		else {
			alert("Maximum Columns reached! Maximum is: " + this.boundsWidth/parseInt(this.widthStep));
		}
		console.log("added column");
		$('.cellTable').width($('.cellTable').width() - this.cellSize.width);
	},


	removeColumn: function(){
		var cellsInColumnToRemove = 0;
		var currentWidth = this.width;
		$.each(this.cells, function(index, value){
			if(value.x + value.width >= currentWidth){
				cellsInColumnToRemove++;
			}
		});

		if(cellsInColumnToRemove == 0){
			this.width -= this.cellSize.width;
			this.setPositionsOfButtons();
			this.persistSetSize();
		}
		else {
			alert("There is a cell in the column you want to remove!\nPlease delete or move this cell.");
		}
	},

	
	addRow: function(){
		if(this.height < this.boundsHeight){
			this.height += this.cellSize.height;
			this.setPositionsOfButtons();
			this.persistSetSize();
		}
		else {
			alert("Maximum Rows reached! Maximum is: " + this.boundsHeight/parseInt(this.heightStep));
		}
    	$('.cellTable').height($('.cellTable').height() - this.cellSize.height);
    	console.log("added row");
	},

	removeRow: function(){
		var cellsInRowToRemove = 0;
		var currentHeight = this.height;

		$.each(this.cells, function(index, value){
			if(value.y + value.height >= currentHeight){
				cellsInRowToRemove++;
			}
		});

		if(cellsInRowToRemove == 0){
			this.height -= this.cellSize.height;
			this.setPositionsOfButtons();
			this.persistSetSize();
		}
		else {
			alert("There is a cell in the row you want to remove!\nPlease delete or move this cell.");
		}
    $('.cellTable').height($('.cellTable').height() + this.cellSize.height);
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
    this.cellSelected = false;
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
