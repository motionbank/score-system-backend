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
		this.initModal();
		this.initForm();
	},

	initDialog: function(){
		$("#dialog-modal").dialog({
			height: 500,
			autoOpen: false,
			modal:true
		});
	},


	initModal: function (){
		$("#dialog-confirm").dialog({
			modal: true,
			autoOpen: false,
			buttons: {
			Ok: function() {
				removeSelectedCell();
				$( this ).dialog( "close" );
			}
		}
		});
	},


	initForm: function(){
		this.editForm = $("#dialog-modal").find('form');
	},

	submitForm: function(event) {
		$("#editCell").submit();
		//prevent form from reloading the page
		event.preventDefault();

		var dialog = $("#dialog-modal #editCell");
		var newTitle = $(dialog).find("#editTitle").val();
		var newDescription = $(dialog).find("#editDescription").val();
		var newSrc = $(dialog).find("#editImageSrc").val();

		console.log($(dialog).find("#editImageSrc").val());
		//cells.js, set new content for contentCell
		currentCellToEdit.setContent(newTitle, newDescription, newSrc);

		//edit.js
		editBox.closeDialog();
	},


	deleteImage: function() {
		$("#editImageSrc").val("");
	},


	addEvents: function(){
		$("#removeCell").on("click", removeSelectedCell);
		$("#deleteImage").on("click", this.deleteImage);
		$( ".form_submit" ).on("click", this.submitForm);
	},

	closeDialog: function(){
		theGrid.cellSelected = true;
		$("#dialog-modal").dialog("close");
	},

	openDialog: function(model){
		theGrid.cellSelected = false;
		this.model = model;
		this.editForm.empty();
		this.formTemplate = JST['templates/edit_cell']({data: this.model});
		this.editForm.append(this.formTemplate);
		this.addEvents();
		$("#dialog-modal").dialog("open");
	},

	openConfirmDialog: function(celltitle) {
		if(celltitle){
			$("#dialog-confirm").find('#cell-title-todelete').html('<li>' + celltitle + '</li>');
		}
		$("#dialog-confirm").dialog("open");
	},


	closeConfirmDialog: function() {
		$("#dialog-confirm").dialog("close");
	}
}