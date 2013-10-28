//	TODO: Layouts implementieren
//	TODO: Templates für alle größeren Div-Inhalte schreiben und einbinden
//			welche wären: table.js -> createUsedContentRow, evtl. createDraggableCellHelper
//							cells.js -> render


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
		initTableEvents();

		//initiating works now with number of rows & columns
		//new Grid ( numberOfColumns, numberOfRows, numberOfMaxColumns, numberOfMaxRows, cellWidth, cellHeight)
		//grid.js
		var columns = APPLICATION.columns || 3;
		var rows = APPLICATION.rows || 3;
		theGrid = new Grid( columns, rows, 25, 15, "50px", "25px");

		//edit.js
		editBox = new EditDialog("Default Title", "text", "Default Description", "");


		// now fill the grid with existing cells
		$.get(
			Routes.cell_set_grid_cells_path(APPLICATION.resource_id),
			populateTheGrid
		);

		/*$( window ).resize(function() {
  			theGrid.onWindowResize();
		});*/

		initFilter();
	}
});


// populate the grid with cells already added to this set
function populateTheGrid(data) {
	$.each(data, function(idx, gridCell) {
		createGridCell(gridCell);
	});
}


//create new GridCell when contentCell is dropped in grid
function onDrop(event){
	var droppedCell = $(event.target);
	var id = droppedCell.attr("id");
	var title = droppedCell.find(".contentCellTitle").html();
	var description = droppedCell.find(".contentCellDescription").html();
	var imageLink = droppedCell.find(".contentCellPosterImage img").attr("src");
	var type = "text";

	var grid = theGrid.container;
	var gridOffset = grid.offset();
	if(gridOffset.left < currentMousePos.x && currentMousePos.x < gridOffset.left + grid.width()){
		if(gridOffset.top < currentMousePos.y && currentMousePos.y < gridOffset.top + grid.height()){

			id = id.split('_')[1];
			$.each(theGrid.cells, function(index, value) {
				if(id == value.id) {
					id = id + "-2";
				}
			});

			var setId = APPLICATION.resource_id;
			var gridPosition = theGrid.mapPixelsToGrid(	currentMousePos.x - gridOffset.left,
														currentMousePos.y - gridOffset.top);
			var cellAttributes = {
				cell_id: id,//this will make sure a reference to the canonical cell is kept
				x: gridPosition.x,
				y: gridPosition.y
			};
			$.post(
				Routes.cell_set_grid_cells_path(setId),
				{grid_cell: cellAttributes},
				createGridCell
			);
		}
	}
}

function createGridCell(data) {
	//cell.js
	var newGridCell = new GridCell(data);
	theGrid.addCell(newGridCell);

	//table.js
	createUsedContentRow(newGridCell.id, newGridCell.src, newGridCell.title, newGridCell.description);
  
}

//edit cell information when click in table on Edit
function editCellInformation(event){
	var id = getIdOfHoveredCell(event);
	theGrid.setCurrentCell(id);
	editBox.openDialog(currentCellToEdit);
}


function onMouseIn(event){
	var id = getIdOfHoveredCell(event);
    $("#usedContentCell_" + id.split("_")[1]).addClass("activeCell");
    $("#gridCell_" + id.split("_")[1]).addClass("activeCell");
}

function onMouseOut(event){
	var id = getIdOfHoveredCell(event);
    $("#usedContentCell_" + id.split("_")[1]).removeClass("activeCell");
    $("#gridCell_"+ id.split("_")[1]).removeClass("activeCell");
}

function removeSelectedCell(){
	theGrid.removeCell(currentCellToEdit);
}


function getIdOfHoveredCell(event){
	var id;
	if( $(event.currentTarget).attr("id")){
		id = $(event.currentTarget).attr("id");
	}
	else {
		id = $(event.currentTarget).parent().attr("id");
	}
	id = id.split("_")[1];
	return id;
}
