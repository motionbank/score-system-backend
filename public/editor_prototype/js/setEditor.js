//	TODO: Layouts implementieren
// 	TODO CLEAN && COMMENT CODE

//	Draggen: direkt die Zelle, nicht die Zeile -> Problem: Zelle ist noch nicht angelegt

//	______________ DONE _____________________________________________________________________
//	TODO: zu registrierende Events einmal beim initialize, nicht für jedes Element. 
//									Bsp: $( "#add_"+id).on("click", addOrRemoveButton); wird zu: 
//											$(".addButton").on("click", addOrRemoveButton);
//	nachdem alle Zeilen gerendert sind, Events !einmal! registrieren

// 	Referenz auf Grid, nachdem es erzeugt wurde


var currentMousePos = { x: -1, y: -1 };
var currentCellToEdit;
var theGrid;


$(document).ready(function() { 

	//registrate mouse position and update it in a global variable
    getMousePosition();
   	
   	//initialize the components
   	initialize();

	
	function getMousePosition(){
		$(document).mousemove(function(event) {
	        currentMousePos.x = event.pageX;
	        currentMousePos.y = event.pageY;
	    });
	}


    
	function initialize(){
		//table.js
		initTabs();
		createDummyRows();

		//	TODO Grid als Klasse neu schreiben, var grid = new Grid(), Property: this.cells = [ ]
		//grid.js
		theGrid = new Grid( "800px", "200px", "1000px", "600px", "100px", "100px");

		//edit.js
		editBox = new EditDialog("Default Title", "text", "Default Description", "");
	}
});



//create new GridCell when contentCell is dropped in grid
function onDrop(event){
	var droppedCell = $(event.target);
	var id = droppedCell.attr("id");
	var title = droppedCell.find(".contentCellTitle").html();
	var description = droppedCell.find(".contentCellDescription").html();
	var imageLink = "";
	var type = "text";

	var grid = $("#grid");
	var gridPosition = grid.offset();
	if(gridPosition.left < currentMousePos.x && currentMousePos.x < gridPosition.left + grid.width()){
		if(gridPosition.top < currentMousePos.y && currentMousePos.y < gridPosition.top + grid.height()){
			//TODO: Prepare for reading from Database
			id = id.split('_')[1];
			//cell.js
			var newGridCell = new GridCell(	id, type, title, description, 
											currentMousePos.x - gridPosition.left, 
											currentMousePos.y - gridPosition.top, 
											imageLink);
			theGrid.addCell(newGridCell);
		}
	}

	//table.js
	createUsedContentRow(id, imageLink, title, description);
	
	droppedCell.remove();
}



//edit cell information when click in table on Edit
function editCellInformation(event){
	theGrid.setCurrentCell($(event.target).parent().attr("id"));
}

//edit cell information when click in table on Edit
function showCellInformation(event){
	theGrid.setCurrentCell($(event.target).parent().attr("id"));
}


function onMouseIn(event){
	var id;
	if( $(event.target).attr("id")){
		id = $(event.target).attr("id");
	}
	else {
		id = $(event.target).parent().attr("id");
	}
    $("#usedContentCell_" + id.split("_")[1]).addClass("activeCell");
    $("#gridCell_" + id.split("_")[1]).addClass("activeCell");
}

function onMouseOut(event){
	var id;
	if( $(event.target).attr("id")){
		id = $(event.target).attr("id");
	}
	else {
		id = $(event.target).parent().attr("id");
	}
    $("#usedContentCell_" + id.split("_")[1]).removeClass("activeCell");
    $("#gridCell_"+ id.split("_")[1]).removeClass("activeCell");
}
