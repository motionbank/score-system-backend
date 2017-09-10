var currentMousePos = {
	x: -1,
	y: -1
};
var currentCellToEdit;
var setCurrentCellToEdit = function (cell) {
    currentCellToEdit = cell;
	var newCellEvent = new CustomEvent('currentCellChanged',{
		detail: {
			cell: currentCellToEdit
		},
		bubbles: true,
		cancelable: true
	})
    theGrid.container.get(0).dispatchEvent(newCellEvent)
}
var theGrid;

$(document).ready(function() {

	//registrate mouse position and update it in a global variable
	getMousePosition();

	//initialize the components
	initialize();

	function getMousePosition() {
		$(document).mousemove(function(event) {
			currentMousePos.x = event.pageX;
			currentMousePos.y = event.pageY;
		});
	}

	function initialize() {

		//table.js
		initTabs();
		initTableEvents();

		//initiating works now with number of rows & columns
		//new Grid ( numberOfColumns, numberOfRows, numberOfMaxColumns, numberOfMaxRows, cellWidth, cellHeight)
		//grid.js
		var columns = APPLICATION.columns || 3;
		var rows = APPLICATION.rows || 3;
		theGrid = new Grid(columns, rows, 200, 25, "50px", "25px");

		//edit.js
		editBox = new EditDialog("Default Title", "text", "Default Description", "");

		// now fill the grid with existing cells
		var scoreId = APPLICATION.score_id;
		$.get(
			Routes.cell_set_grid_cells_path(scoreId, APPLICATION.resource_id),
			populateTheGrid
		);

		/*$( window ).resize(function() {
  			theGrid.onWindowResize();
		});*/

		initFilter();
		setScrollbarHeight();
		$(window).on('resize', setScrollbarHeight);
	}
});


function setScrollbarHeight() {
	$('.cellTable').height($(window).height() - $('#boundsForGrid').height() - 360);
}


// populate the grid with cells already added to this set
function populateTheGrid(data) {
	$.each(data, function(idx, gridCell) {
		createGridCell(gridCell);
	});
}

//create new GridCell when contentCell is dropped in grid
function onDrop(event) {

	var droppedCell = $(event.target);
	var id = droppedCell.attr("id");
	var title = droppedCell.find(".contentCellTitle").html();
	var description = droppedCell.find(".contentCellDescription").html();
	var imageLink = droppedCell.find(".contentCellPosterImage img").attr("src");
	var type = "text";
	var additional_fields = {};

	var grid = theGrid.container;
	var gridOffset = grid.offset();
	if (gridOffset.left < currentMousePos.x && currentMousePos.x < gridOffset.left + grid.width()) {
		if (gridOffset.top < currentMousePos.y && currentMousePos.y < gridOffset.top + grid.height()) {

			id = id.split('_')[1];
			$.each(theGrid.cells, function(index, value) {
				if (id == value.id) {
					id = id + "-2";
				}
			});

			var scoreId = APPLICATION.score_id;
			var setId = APPLICATION.resource_id;
			var gridPosition = theGrid.mapPixelsToGrid(currentMousePos.x - gridOffset.left,
				currentMousePos.y - gridOffset.top);
			var cellAttributes = {
				cell_id: id, //this will make sure a reference to the canonical cell is kept
                type: type,
                title: title,
                description: description,
				x: gridPosition.x,
				y: gridPosition.y,
                css_class_name: '',
                additional_fields: additional_fields
			};
			$.post(
				Routes.cell_set_grid_cells_path(scoreId, setId), {
					grid_cell: cellAttributes
				},
				createGridCell
			);
		}
	}
}

//create new GridCell when contentCell is dropped in grid
function onDropJson (event, data) {

    var id = data.id || undefined;
    var title = data.title;
    var description = data.description;
    var imageLink = data.imageSrc;
    var type = data.type || "text";
    var additional_fields = data.additional_fields || {};

    var grid = theGrid.container;
    var gridOffset = grid.offset();

    var scoreId = APPLICATION.score_id;
    var setId = APPLICATION.resource_id;

    function createNewCell (next) {
        $.ajax({
            type: "POST",
            url: Routes.cell_new_path(APPLICATION.score_id),
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            data: JSON.stringify({
                cell: {
                    type: type,
                    title: title,
                    description: description,
                    css_class_name: type + '_' + parseInt(Math.random((new Date()).getTime())*100000,10),
                    // poster_image : imageBase64,
                    // image_name : imageName,
                    additional_fields: additional_fields
                }
            }),
            success: function(cell, status) {
                id = cell._id.$oid;
                console.log('Cell created:', id)
                next();
            }
        });
    }

    createNewCell(function () {
        var x = event.originalEvent.pageX;
        var y = event.originalEvent.pageY;

        var gridPosition = theGrid.mapPixelsToGrid( x - gridOffset.left, y - gridOffset.top );

        if ( gridOffset.left < x &&
             x < (gridOffset.left + grid.width()) &&
             gridOffset.top < y &&
             y < (gridOffset.top + grid.height()) ) {

                $.each(theGrid.cells, function(index, value) {
                    if (id == value.id) {
                        id = id + "-2";
                    }
                });
                var cellAttributes = {
                    cell_id: id, //this will make sure a reference to the canonical cell is kept
                    x: gridPosition.x,
                    y: gridPosition.y
                };
                $.post(
                    Routes.cell_set_grid_cells_path(scoreId, setId), {
                        grid_cell: cellAttributes
                    },
                    createGridCell
                );

        } else {
            console.log( 'Dropped outside?',
                gridOffset,
                {x2: gridOffset.left + grid.width(), y2: gridOffset.top + grid.height()},
                currentMousePos,
                gridPosition,
                event)
        }
    })
}

function createGridCell(data) {
	if (!data.grid_cell.canonical_cell) {
		return;
	}

	//cell.js
	var newGridCell = new GridCell(data);
	theGrid.addCell(newGridCell);

	var title = newGridCell.title || newGridCell.canonicalCell.title;
	var description = newGridCell.description || newGridCell.canonicalCell.description;

	//table.js
	createUsedContentRow(newGridCell.id, newGridCell.src, title, description, newGridCell.canonicalCell.type);
}

//edit cell information when click in table on Edit
function editCellInformation(event) {
	var id = getIdOfHoveredCell(event);
	theGrid.setCurrentCell(id);
	editBox.openDialog(currentCellToEdit);
}

function onMouseIn(event) {
	var id = getIdOfHoveredCell(event);
	//console.log("hovered " + id);
	$("#usedContentCell_" + id).addClass("activeCell");
	$("#gridCell_" + id).addClass("activeCell");
}

function onMouseOut(event) {
	var id = getIdOfHoveredCell(event);
	$("#usedContentCell_" + id).removeClass("activeCell");
	$("#gridCell_" + id).removeClass("activeCell");
}

function removeSelectedCell() {
	var scoreId = APPLICATION.score_id;
	var setId = APPLICATION.resource_id;
	var gridCellId = currentCellToEdit.id;
	$.post(
		Routes.cell_set_grid_cell_path(scoreId, setId, gridCellId), {
			_method: "delete"
		},
		function() {
			theGrid.removeCell(currentCellToEdit);
            setCurrentCellToEdit(null)
		}
	);
}

function getIdOfHoveredCell(event) {
	var id;
	if ($(event.currentTarget).attr("id")) {
		id = $(event.currentTarget).attr("id");
	} else {
		id = $(event.currentTarget).parent().attr("id");
	}
	id = id.split("_")[1];
	return id;
}