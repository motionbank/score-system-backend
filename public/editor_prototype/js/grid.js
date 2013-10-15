function makeGridResizable(){
	$("#grid").resizable({
        grid: [ $(".cell").width() , $(".cell").height() ],
        containment: "#boundsForGrid",
    });
}



//remove GridCell when clicking in Edit Form
function removeCellFromGrid(){
	$("#gridCell_"+currentCellToEdit.id).remove();
	$("#contentCell_"+currentCellToEdit.id).removeClass("usedCell");
	$("#contentCell_"+ currentCellToEdit.id + " .contentCellAddButton").html("Add");
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

