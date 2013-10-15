// 	TODO Check CSS (position, left, top) of Grid and BoundsForGrid, not clear written
//	because e.g. boundaries for grid do not work at the moment
//	TODO: resize image src cell when added dynamically
// 	TODO: Rewrite Collision Detection
	//TODO: Correct CSS and position grid correctly


function makeGridResizable(){
	$("#grid").resizable({
        grid: [ $(".cell").width() , $(".cell").height() ],
        containment: "#boundsForGrid",
    });
}



//remove GridCell when clicking in Edit Form
function removeCellFromGrid(){
	$("#gridCell_"+currentCellToEdit.id).remove();
	$("#usedContentCell_"+currentCellToEdit.id).remove();
	//$("#usedContentCell_"+currentCellToEdit.id).removeClass("usedCell");
	createAvailableContentRow(currentCellToEdit.id, currentCellToEdit.src, currentCellToEdit.title, currentCellToEdit.description);
	$("#dialog-modal").dialog("close");
}




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

