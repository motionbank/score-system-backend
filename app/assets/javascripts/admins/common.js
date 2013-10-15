/*global setupPublishingWidget,flashTimeout:true */

INIT.addInitializers({
	common: {
		init: function () {
			flashTimeout();
		},

		_form: function () {
			var additionalFields = $('.additional_fields');
			additionalFields.find('.add.btn').click(function() {
				var clonedEmptyFields = additionalFields.find('.field:last').clone();
				clonedEmptyFields.find('input').val(null);
				additionalFields.find('.fields').append(clonedEmptyFields);
			});

			setupPublishingWidget();
		}
	}
});


function flashTimeout() {
	setTimeout(function () {
		$('#flash .alert').alert('close');
	}, 4000);
}
