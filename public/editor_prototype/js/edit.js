// 	TODO: check implementation of deleting of images


function addDialogToEditBox(){
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
}

function addFormToEditBox(){
	//register submit event of form
    $( "#editCell" ).submit(function( event ) {
		var newTitle = $("input#editTitle").val();
		var newDescription = $("input#editDescription").val();
		var newSrc = $("input#editImageSrc").val();

		//cells.js, set new content for contentCell
		currentCellToEdit.setContent(newTitle, newDescription, newSrc);
		$("#dialog-modal").dialog("close");
		//$("#editCell")[0].reset();

		//prevent form from reloading the page
		event.preventDefault();
	});
}