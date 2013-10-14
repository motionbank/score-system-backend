// 	TODO Check CSS (position, left, top) of Grid and BoundsForGrid, not clear written
//	because e.g. boundaries for grid do not work at the moment
// 	DONE 	//////	implement deleting of images
//  TODO: Difference between poster Image in Grid and poster image in Table? Same? Wie wird Removement angezeigt?
//  DONE	//////	Sync gridCell mit contentCell
// 	TODO: mark used cells and make it reversible if cell gets deleted in grid
// 	.usedCells need to have id to mark their equivalents in the grid
// 	--> TODO: check hover state and mark hovered cell in grid (correctly)
// 	TODO: add "Remove" Button to graffle table "Used Cell" and implement it in table
//	TODO: Add Edit Button In Table
//	TODO: resize image src cell when added dynamically
// 	TODO: make gridCell background grün when hovering

// 	TODO: Rewrite Collision Detection
//	TODO: Layouts implementieren



// TODO CLEAN CODE


var currentMousePos = { x: -1, y: -1 };
var currentCellToEdit;


$(document).ready(function() { 
	
	//TODO: Correct CSS and position grid correctly
	makeGridResizable();
	//init Edit Box
	initEditBox();
	//registrate mouse position and update it in a global variable
    getMousePosition();

    //create dummy rows
    for(var i = 0; i < 8; i++){
    	createContentRow(i,"","MyTitle of Cell"+i,"MyDescription");
    }

    
	function makeGridResizable(){
		$("#grid").resizable({
            grid: [ $(".cell").width() , $(".cell").height() ],
            containment: "#boundsForGrid",
        });
	}

	function initEditBox(){
		$("#dialog-modal").dialog({
			height: 500,
			autoOpen: false,
			show: {
				effect:"blind",
				duration: 800
			},
			hide: {
				effect:"blind",
				duration:400
			},
			modal:true
		});
		//register submit event of form
	    $( "#editCell" ).submit(function( event ) {
			var newTitle = $("input#editTitle").val();
			var newDescription = $("input#editDescription").val();
			var newSrc = $("input#editImageSrc").val();

			//set new content for contentCell
			currentCellToEdit.setContent(newTitle, newDescription, newSrc);
			$("#dialog-modal").dialog("close");
			//$("#editCell")[0].reset();

			//prevent form from reloading the page
			event.preventDefault();
		});
	}

	function getMousePosition(){
		$(document).mousemove(function(event) {
	        currentMousePos.x = event.pageX;
	        currentMousePos.y = event.pageY;
	    });
	}

	function createContentRow(id, src, title, description){
		var htmlBasicStructure = 	"<tr id='contentCell_" + id + "' class='contentCell ui-widget-content'>\
										<td class='contentCellPosterImage'></td>\
										<td class='contentCellTitle'></td>\
										<td class='contentCellDescription'></td>\
										<td id='add_" + id + "' class='contentCellAddButton'>Add</td>\
										<td id='edit_" + id + "' class='contentCellEditButton'>Edit</td>\
									</tr>";
		$("#contentCellTable tbody").prepend(htmlBasicStructure);
		$("#contentCell_"+id+" .contentCellPosterImage").append(src);
		$("#contentCell_"+id+" .contentCellTitle").append(title);
		$("#contentCell_"+id+" .contentCellDescription").append(description);

		$( "#contentCell_" + id ).draggable({ opacity: 0.7, helper: "clone", revert: false, });
		$( "#contentCell_" + id ).on("dragstop", onDrop);
		$( "#add_"+id).on("click", addOrRemoveButton);
		$( "#edit_"+id).on("click", editCellInformation);

	}

	

});

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


function onDrop(event){
	var droppedCell = $(event.target);
	var id = droppedCell.attr("id");
	var title = droppedCell.find(".contentCellTitle").html();
	var description = droppedCell.find(".contentCellDescription").html();
	var imageLink = "";

	var grid = $("#grid");
	var gridPosition = grid.offset();
	if(gridPosition.left < currentMousePos.x && currentMousePos.x < gridPosition.left + grid.width()){
		if(gridPosition.top < currentMousePos.y && currentMousePos.y < gridPosition.top + grid.height()){
			//TODO: Prepare for reading from Database
			id = id.split('_')[1];
			var newGridCell = new GridCell(	id, title, description, 
											currentMousePos.x - gridPosition.left, 
											currentMousePos.y - gridPosition.top, 
											imageLink);
			droppedCell.addClass("usedCell");
			droppedCell.find(".contentCellAddButton").html("Remove");
		}
	}
}



function onDrop(addedCell){
	var id = addedCell.attr("id");
	var title = addedCell.find(".contentCellTitle").html();
	var description = addedCell.find(".contentCellDescription").html();
	var imageLink = "";
	id = id.split('_')[1];
	var newGridCell = new GridCell(	id, title, description, 0, 0, imageLink);
	addedCell.addClass("usedCell");
	addedCell.find(".contentCellAddButton").html("Remove");
}


function removeCellFromGrid(){
	$("#gridCell_"+currentCellToEdit.id).slideUp();
	$("#contentCell_"+currentCellToEdit.id).removeClass("usedCell");
	$("#contentCell_"+ currentCellToEdit.id + " .contentCellAddButton").html("Add");
	$("#dialog-modal").dialog("close");
}

function hideCellFromGrid(clickedObject){
	var id = clickedObject.id.split("_")[1];
	$("#contentCell_" + id).removeClass("usedCell");
	$("#contentCell_"+ id + " .contentCellAddButton").html("Add");
	$("#gridCell_"+ id ).slideUp();
	$("#dialog-modal").dialog("close");
}

function addOrRemoveButton(){
	//console.log($(this).html());
	if($(this).html() == "Add"){
		addCellToGrid(this);
	}
	else {
		hideCellFromGrid(this);
	}

}

function addCellToGrid(clickedObject){
	var id = clickedObject.id.split("_")[1];
	$("#contentCell_"+id).addClass("usedCell");
	if($("#gridCell_"+id).length == 0 ){
		//console.log("add new one!");
		onDrop($(clickedObject).parent());

	}
	else{
		$("#gridCell_"+id).slideDown();
	}
	$("#contentCell_"+ id + " .contentCellAddButton").html("Remove");
}

function editCellInformation(){
	console.log(this.id);
	//currentCellToEdit = 
}

