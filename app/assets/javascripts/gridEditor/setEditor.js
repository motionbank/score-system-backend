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

		//grid.js
		theGrid = new Grid( "70%", "70%", "100%", "100%", "10%", "10%");

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

	var grid = $("#grid");
	var gridPosition = grid.offset();
	if(gridPosition.left < currentMousePos.x && currentMousePos.x < gridPosition.left + grid.width()){
		if(gridPosition.top < currentMousePos.y && currentMousePos.y < gridPosition.top + grid.height()){

			id = id.split('_')[1];
			$.each(theGrid.cells, function(index, value) {
				if(id == value.id) {
					id = id + "-2";
				}
			});

			var setId = APPLICATION.resource_id;
			var cellAttributes = {
				cell_id: id,//this will make sure a reference to the canonical cell is kept
				x: currentMousePos.x - gridPosition.left,
				y: currentMousePos.y - gridPosition.top
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
	// first get the information from the grid cell itself
	var id = data.grid_cell.id;
	var x = data.grid_cell.x, y = data.grid_cell.y;

	// for all other fields we want to get the information of the canonical cell
	var cellData = data.grid_cell.canonical_cell;
	var title = cellData.title, description = cellData.description;
	var type = cellData.type;
	var imageSrc = cellData.poster_image.thumb.url;

	//cell.js
	var newGridCell = new GridCell(	id, type, title, description,
									x, y, imageSrc);
	theGrid.addCell(newGridCell);

	//table.js
	createUsedContentRow(id, imageSrc, title, description);
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
