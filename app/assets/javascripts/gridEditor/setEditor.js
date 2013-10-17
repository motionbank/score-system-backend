//	TODO: Layouts implementieren
//	TODO: Templates für alle größeren Div-Inhalte schreiben und einbinden
//			welche wären: table.js -> createAvailableContentRow, createUsedContentRow, evtl. createDraggableCellHelper
//							cells.js -> render


//	______________ DONE _____________________________________________________________________
//	TODO: zu registrierende Events einmal beim initialize, nicht für jedes Element. 
//									Bsp: $( "#add_"+id).on("click", addOrRemoveButton); wird zu: 
//											$(".addButton").on("click", addOrRemoveButton);
//	nachdem alle Zeilen gerendert sind, Events !einmal! registrieren

// 	Referenz auf Grid, nachdem es erzeugt wurde
//__________________________________________________________________________________________


//	TODO: Responsive, Skalierung & Neuberechnung wenn sich window-Größe verändert für Grid, Cells and EditBox
//	Anmerkung: Cells & Grid = responsive. wenn Cell jedoch größer gezogen wurde, nicht mehr responsive.
//  TO FIX: wenn Grid skaliert wird, wird dies auch als "window.resize"-Event behandelt. 


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
		theGrid = new Grid( "70%", "70%", "100%", "100%", "10%", "10%");

		//edit.js
		editBox = new EditDialog("Default Title", "text", "Default Description", "");


		/*$( window ).resize(function() {
  			theGrid.onWindowResize();
		});*/
	}
});



//create new GridCell when contentCell is dropped in grid
function onDrop(event){
	var droppedCell = $(event.target);
	var id = droppedCell.attr("id");
	var title = droppedCell.find(".contentCellTitle").html();
	var description = droppedCell.find(".contentCellDescription").html();
	var imageLink = droppedCell.find(".contentCellPosterImage img").attr("src");
	var type = "text";

	var grid = $("#grid");
	var gridPosition = grid.offset();
	if(gridPosition.left < currentMousePos.x && currentMousePos.x < gridPosition.left + grid.width()){
		if(gridPosition.top < currentMousePos.y && currentMousePos.y < gridPosition.top + grid.height()){

			//TODO: Prepare for reading from Database
			id = id.split('_')[1];
			$.each(theGrid.cells, function(index, value){
				//console.log(value);
				if(id == value.id)
					id = id + "-2";
			});

			//cell.js
			var newGridCell = new GridCell(	id, type, title, description, 
											currentMousePos.x - gridPosition.left, 
											currentMousePos.y - gridPosition.top, 
											imageLink);
			theGrid.addCell(newGridCell);
			//table.js
			createUsedContentRow(id, imageLink, title, description);

			//entfernt Zelle aus "available cells"; nicht erwünscht!
			//droppedCell.remove();
		}
	}
}



//edit cell information when click in table on Edit
function editCellInformation(event){
	theGrid.setCurrentCell($(event.target).parent().attr("id"));
	editBox.setValues(currentCellToEdit.title, currentCellToEdit.type, currentCellToEdit.description, currentCellToEdit.src);
	editBox.openDialog();
}

//edit cell information when click in table on Edit
function showCellInformation(event){
	theGrid.setCurrentCell($(event.target).parent().attr("id"));
	editBox.openDialog();
}


function onMouseIn(event){
	var id;
	
	if( $(event.currentTarget).attr("id")){
		id = $(event.currentTarget).attr("id");
	}
	else {
		id = $(event.currentTarget).parent().attr("id");
	}
    $("#usedContentCell_" + id.split("_")[1]).addClass("activeCell");
    $("#gridCell_" + id.split("_")[1]).addClass("activeCell");
}

function onMouseOut(event){
	var id;
	if( $(event.currentTarget).attr("id")){
		id = $(event.currentTarget).attr("id");
	}
	else {
		id = $(event.currentTarget).parent().attr("id");
	}
    $("#usedContentCell_" + id.split("_")[1]).removeClass("activeCell");
    $("#gridCell_"+ id.split("_")[1]).removeClass("activeCell");
}

function removeSelectedCell(){
	theGrid.removeCell(currentCellToEdit);

}
