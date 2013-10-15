//	TODO: Layouts implementieren
// 	TODO CLEAN && COMMENT CODE


// 	NOTES: Add Button entfernen // "Merken" der Zelle nicht notwendig
//	Draggen: direkt die Zelle, nicht die Zeile
// 	TODO: Tabs implementieren --> Used Cells in Used Tab schieben

//	______________ DONE _____________________________________________________________________
//	TODO: zu registrierende Events einmal beim initialize, nicht für jedes Element. 
//									Bsp: $( "#add_"+id).on("click", addOrRemoveButton); wird zu: 
//											$(".addButton").on("click", addOrRemoveButton);
//	nachdem alle Zeilen gerendert sind, Events !einmal! registrieren


var currentMousePos = { x: -1, y: -1 };
var currentCellToEdit;


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

		//grid.js
		makeGridResizable();

		//edit.js
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
		}
	}

	createUsedContentRow(id, imageLink, title, description);
	droppedCell.remove();
}



//edit cell information when click in table on Edit
function editCellInformation(event){
	console.log("edit: " + $(event.target).parent().attr("id"));
	//currentCellToEdit = 
}

//edit cell information when click in table on Edit
function showCellInformation(event){
	console.log("show: " + $(event.target).parent().attr("id"));
	//currentCellToEdit = 
}


function onMouseIn(event){
	var id;
	console.log(id);
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



