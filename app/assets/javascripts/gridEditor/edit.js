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
		this.addEvents();
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

		//register submit event of form
		$( ".form_submit" ).click(function( event ) {

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
		});

		$("#deleteImage").click(function(){
			$("#editImageSrc").val("");
		});
	},


	updateHTMLContent: function(){
		var dialog = $("#dialog-modal #editCell");
		$(dialog).find("#editTitle").val(this.title);
		$(dialog).find("#type").html(this.type);
		$(dialog).find("#editDescription").val(this.description);
		$(dialog).find("#editImageSrc").val(this.posterImage);
	},

	addEvents: function(){
		$("#removeCell").on("click", removeSelectedCell);
	},

	closeDialog: function(){
		theGrid.cellSelected = true;
		$("#dialog-modal").dialog("close");
	},

	openDialog: function(model){
		theGrid.cellSelected = false;
		this.model = model;
		this.updateHTMLContent();
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