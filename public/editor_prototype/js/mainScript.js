// 	TODO Check CSS (position, left, top) of Grid and BoundsForGrid, not clear written
//	because e.g. boundaries for grid do not work at the moment
// 	TODO: check implementation of deleting of images
// 	TODO: check hover in table and mark cell in grid (correctly)
//	TODO: Implement Edit Function from Table
//	TODO: resize image src cell when added dynamically
// 	TODO: make gridCell background grün when hovering

// 	TODO: Rewrite Collision Detection
//	TODO: Layouts implementieren



// TODO CLEAN && COMMENT CODE


// 	NOTES: Add Button entfernen // "Merken" der Zelle nicht notwendig
//	Draggen: direkt die Zelle, nicht die Zeile
// 	TODO: Tabs implementieren --> Used Cells in Used Tab schieben

//	______________ DONE _____________________________________________________________________
//	TODO: zu registrierende Events einmal beim initialize, nicht für jedes Element. 
//									Bsp: $( "#add_"+id).on("click", addOrRemoveButton); wird zu: 
//											$(".addButton").on("click", addOrRemoveButton);
//	nachdem alle Zeilen gerendert sind, Events !einmal! registrieren


// 	QUESTIONS:
//  TODO: Difference between poster Image in Grid and poster image in Table? Same? Wie wird Removement angezeigt?
//	EDIT Function auch in "Available Cells?" Edit als Button in Table in Used Cells?
// 	Vorschlag: "Show" in Table "Available Cells", read-only
//	"Edit" dann in Used Cells, write title, description & Poster image




var currentMousePos = { x: -1, y: -1 };
var currentCellToEdit;


$(document).ready(function() { 

	//registrate mouse position and update it in a global variable
    getMousePosition();
   	//initialize table
   	initTable();
   	//initialize Grid
   	initGrid();
   	//init Edit Box
	initEditBox();

	
	function getMousePosition(){
		$(document).mousemove(function(event) {
	        currentMousePos.x = event.pageX;
	        currentMousePos.y = event.pageY;
	    });
	}


    //table.js
	function initTable(){
		initTabs();
		createDummyRows();
	}

	//grid.js
	function initGrid(){
		//TODO: Correct CSS and position grid correctly
		makeGridResizable();
	}

	//edit.js
	function initEditBox(){
		addFormToEditBox();
		addDialogToEditBox();
	}

});



//create new GridCell when contentCell is dropped in grid
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



//edit cell information when click in table on Edit
function editCellInformation(event){
	console.log($(event.target).parent().attr("id"));
	//currentCellToEdit = 
}



