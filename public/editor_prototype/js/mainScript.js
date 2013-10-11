// TODO Check CSS (position, left, top) of Grid and BoundsForGrid, not clear written
// .addCell -> .contentCell
// implement images for cells
// Klasse .gridCell ohne Content
// if cell used in grid mark .contentCell as "used", background-color: grey
// used cells have class .usedCell
// .usedCells need to have id to mark their equivalents in the grid
// add "Remove" to graffle table "Used Cell"




var currentMousePos = { x: -1, y: -1 };
var currentCellToEdit;


$(document).ready(function() { 

	/*could be used for creating poster image
	var defaultSrc = '<iframe id="loadedVideo" src="http://player.vimeo.com/video/58098447?title=0&amp;byline=0&amp;portrait=0&amp;color=c9ff23&amp;autoplay=1" width="600" height="337" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
	$("#iframeCell").click(function(){
		var newCell = new Cell("newCell", "cell", "Lorem Title", "Lorem Ipsum Description", 0, 0, defaultSrc );
	});*/
	
	//TODO: make a table in which several cells are, which all can be dragged into the grid
	createCellForAdding();
	//TODO: create div as a border for grid to limit size of grid
	//DONE! NEW TODO: Correct CSS and position grid correctly
	makeGridResizable();
	//create Edit Box
	//TODO: Interface mit Matthias besprechen, modale Box mit background ausgreyen
	//DONE! Modale Box implementiert! Still TODO: Interface mit Matthias besprechen
	createEditBox();
	//registrate mouse position and update it in a global variable
    getMousePosition();


	function createCellForAdding(){
		$( ".addCell" ).draggable({ opacity: 0.7, helper: "clone", revert: false, });
		$( ".addCell" ).on("dragstop", checkIfInsideGrid);
	}

	function makeGridResizable(){
		$("#grid").resizable({
            grid: [ $(".cell").width() , $(".cell").height() ],
            containment: "#boundsForGrid",
        });
	}

	function createEditBox(){
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
			//set new content for cell
			currentCellToEdit.setContent(newTitle, newDescription);
			$("#dialog-modal").dialog("close");
			$("#editCell")[0].reset();
			//prevent event from reloading the page
			event.preventDefault();
		});
	}

	function getMousePosition(){
		$(document).mousemove(function(event) {
	        currentMousePos.x = event.pageX;
	        currentMousePos.y = event.pageY;
	    });
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


function checkIfInsideGrid(){
	var grid = $("#grid");
	var gridPosition = grid.offset();
	if(gridPosition.left < currentMousePos.x && currentMousePos.x < gridPosition.left + grid.width()){
		if(gridPosition.top < currentMousePos.y && currentMousePos.y < gridPosition.top + grid.height()){
			//TODO: Prepare for reading from Database
			var imageLink = '<img class="cell" src="http://www.zdf-enterprises.de/de/sites/default/files/imagecache/player_posterframe/catalogue/en/1726/dance_academy.jpg.crop_display.jpg"></img>';
			var newCell = new Cell("newCell", "cell", "Default Title", "Default Description", currentMousePos.x - gridPosition.left, currentMousePos.y - gridPosition.top, imageLink);
		}
	}
}

