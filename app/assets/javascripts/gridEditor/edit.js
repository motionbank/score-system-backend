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
		this.editForm = $("#dialog-modal");
		this.addAdditionalAttributesTemplate = JST['templates/additional_field'];
	},

	submitForm: function(event) {
		$("#editCell").submit();
		//prevent form from reloading the page
		event.preventDefault();

		var dialog = $("#dialog-modal");
		var newTitle = $(dialog).find("#editTitle").val();
		var newDescription = $(dialog).find("#editDescription").val();
		var newSrc = $(dialog).find("#editImageSrc").val();

		//cells.js, set new content for contentCell
		currentCellToEdit.setContent(newTitle, newDescription, newSrc);

		//edit.js
		editBox.closeDialog();
	},


	deleteImage: function(e) {
		$("#editImageSrc").val("");
		$("#usedPosterImage").hide().attr('src', '');
		this.showDisplayDeleteBtn();
		e.preventDefault();
	},


	uploadNewImage: function(){
		$("#editImageSrc").val($("#cell_poster_image").val());
		$("#usedPosterImage").attr('src', $("#cell_poster_image").val()).show();
		this.showDisplayDeleteBtn();
	},


	addAdditionalAttributes: function() {
		$("#specialAttributes").append(this.addAdditionalAttributesTemplate);
	},


	addEvents: function(){
		$("#removeCell").on("click", removeSelectedCell);
		$("#deleteImage").on("click", $.proxy(this.deleteImage, this));
		$(".form_submit").on("click", this.submitForm);
		$("#addSpecialAttribute").on("click", $.proxy(this.addAdditionalAttributes, this));
		$("#cell_poster_image").on("change", $.proxy(this.uploadNewImage, this));
		this.showDisplayDeleteBtn();
	},


	showDisplayDeleteBtn: function() {
		if($("#usedPosterImage").attr('src') == ''){
			$("#deleteImage").hide();
		} else {
			$("#deleteImage").show();
		}
	},

	closeDialog: function(){
		theGrid.cellSelected = true;
		$("#dialog-modal").dialog("close");
	},

	openDialog: function(model){
		theGrid.cellSelected = false;
		this.model = model;
		this.editForm.empty();

		if (this.model.canonicalCell.poster_image.medium.url === this.model.src) {
			this.model.src = null;
		}

		//var usedCellAdditionalFields = this.model.additional_fields || this.model.canonicalCell.additional_fields;
		var usedCellAdditionalFields = this.model.additional_fields;
		this.formTemplate = JST['templates/edit_cell']({data: this.model, usedCellAdditionalFields: usedCellAdditionalFields});
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