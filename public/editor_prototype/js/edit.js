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
			return false;
			//prevent form from reloading the page
			event.preventDefault();
		});
	},

	setValues: function(title, type, description, posterImage){
		console.log("set the values!" + title + type + description);
		this.title = title;
		this.type = type;
		this.description = description;
		this.posterImage = posterImage;
		this.updateHTMLContent();
	},

	updateHTMLContent: function(){
		var dialog = $("#dialog-modal #editCell");
		console.log(dialog);
		console.log(this.title);
		$(dialog).find("#editTitle").val(this.title);
		$(dialog).find("#editType").val(this.type);
		$(dialog).find("#editDescription").val(this.description);
		$(dialog).find("#editImageSrc").val(this.posterImage);

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