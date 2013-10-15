/*global setupPublishingWidget,flashTimeout:true */

INIT.addInitializers({
	common: {
		init: function () {
			flashTimeout();
		},

		_form: function () {
			setupPublishingWidget();

			$(document).on('nested:fieldAdded', initRedactor);
		}
	}
});


function flashTimeout() {
	setTimeout(function () {
		$('#flash .alert').alert('close');
	}, 4000);
}
