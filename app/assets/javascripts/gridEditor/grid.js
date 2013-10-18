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
	this.init();
}



Grid.prototype = {
	init: function(){
		$("#grid").css({ "width" : this.width, "height" : this.height });
		$("boundsForGrid").css({ "width" : $("boundsForGrid").parent().width(), "height" : this.boundsHeight });
		$(".cell").css({ "width" : this.widthStep, "height" : this.heightStep });
		this.makeGridResizable();
	},

	makeGridResizable: function(){
		$("#grid").resizable({
        	grid: [ $(".cell").width() , $(".cell").height() ],
        	containment: "#boundsForGrid",
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
		$("#grid").css({ "width" : this.width, "height" : this.height });
		$(".cell").css({ "width" : this.widthStep, "height" : this.heightStep });
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
