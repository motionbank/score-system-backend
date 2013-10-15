function EditDialog(title, type, description, posterImage){
	this.title = title;
	this.type = type;
	this.description = description;
	this.posterImage = posterImage;
	this.init();
}


EditDialog.prototype = {

	init: function(){
		this.initDialog();
		this.initForm();
	},

	initDialog: function(){
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
	},

	initForm: function(){
		//register submit event of form
	    $( "#editCell" ).submit(function( event ) {
			var newTitle = $("input#editTitle").val();
			var newDescription = $("input#editDescription").val();
			var newSrc = $("input#editImageSrc").val();

			//cells.js, set new content for contentCell
			currentCellToEdit.setContent(newTitle, newDescription, newSrc);
			this.closeDialog();
			//$("#editCell")[0].reset();

			//prevent form from reloading the page
			event.preventDefault();
		});
	},

	setValues: function(title, type, description, posterImage){
		this.title = title;
		this.type = type;
		this.description = description;
		this.posterImage = posterImage;
	},

	addEvents: function(){
		$("#removeCell").on("click", removeSelectedCell);
	},

	closeDialog: function(){
		$("#dialog-modal").dialog("close");
	},

	openDialog: function(){
		$("#dialog-modal").dialog("open");
	}
}