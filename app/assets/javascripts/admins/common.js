/*global setupPublishingWidget,flashTimeout:true */

INIT.addInitializers({
	common: {
		init: function () {
			flashTimeout();
		},

		_form: function () {
			var additionalFields = $('.additional_fields');

			function addEmptyKeyValueFields() {
				var clonedEmptyFields = additionalFields.find('.field:last').clone();
				clonedEmptyFields.find('input').val(null);
				additionalFields.find('.fields').append(clonedEmptyFields);
			}

			additionalFields.find('.add.btn').click(addEmptyKeyValueFields);

			setupPublishingWidget();

			var collapsableBox = $('.form-inputs').find('.collapsable-box .box-title');
			if(collapsableBox.length > 0) {
				initBoxAccordion(collapsableBox);
			}
		}
	}
});


function flashTimeout() {
	setTimeout(function () {
		$('#flash .alert').alert('close');
	}, 4000);
}

function initBoxAccordion(collapsableBox){
	collapsableBox.each(function(){
		if($(this).parents('form').hasClass('new_cell_set')) {
			$(this).parent().addClass('always-open');
			$(this).find('h3').text('New set');
		} else {
			var titleReference = $(this).parent().find('#cell_set_title');
			$(this).find('h3').text(titleReference.val());
			titleReference.on('keyup', updateBoxTitle);
		}
	});
	collapsableBox.on('click',createContentAccordion);
}

function createContentAccordion (){
	$(this).next('.bubblebox').slideToggle(400);
	$(this).parent().toggleClass('open');
}

function updateBoxTitle () {
	var newTitle = $(this).val();
	$(this).parents('.collapsable-box').find('h3').text(newTitle);
}
