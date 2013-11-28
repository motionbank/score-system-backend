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
			width: 800,
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
		var form = $("#dialog-modal").find('form');

		// do a HTML 5 file upload, this will prevent it working in non-HTML 5 browsers
		var formData = new FormData(form[0]);
		var successHandler = function(data) {
			var newTitle = form.find("#editTitle").val();
			var newDescription = form.find("#editDescription").val();
			currentCellToEdit.updatePosterImageFromData(data);
			var newSrc = currentCellToEdit.src;
			var additional_fields = data.grid_cell.additional_fields;

			//cells.js, set new content for contentCell
			currentCellToEdit.setContent(newTitle, newDescription, newSrc, additional_fields);

			//edit.js
			editBox.closeDialog();
		};
		$.ajax({
			url: form.attr('action'),
			type: 'POST',
			// Form data
			data: formData,
			//event handlers
			success: successHandler,
			//Options to tell jQuery not to process data or worry about content-type.
			cache: false,
			contentType: false,
			processData: false
		});

		//prevent form from reloading the page
		event.preventDefault();
	},


	deleteImage: function(e) {
		$("#editImageSrc").val("");
		$("#usedPosterImage").hide().attr('src', '');
		$("#removeImageSrc").val("1"); // the ruby gem carrierwave uses a checkbox field to delete the current file.
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
		var scoreId = APPLICATION.score_id;
		var setId = APPLICATION.resource_id;
		this.formTemplate = JST['templates/edit_cell']({
			data: this.model,
			formTargetUrl: Routes.cell_set_grid_cell_path(scoreId, setId, this.model.id),
			usedCellAdditionalFields: usedCellAdditionalFields
		});
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
};
