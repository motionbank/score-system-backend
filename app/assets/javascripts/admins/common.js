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
		}
	}
});


function flashTimeout() {
	setTimeout(function () {
		$('#flash .alert').alert('close');
	}, 4000);
}
