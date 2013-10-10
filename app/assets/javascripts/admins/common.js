/*global initUploader,initRedactor,setupPublishingWidget,initKalendae,flashTimeout:true */

INIT.addInitializers({
	common: {
		init: function () {
			flashTimeout();
		},

		_form: function () {
			initUploader();
			initRedactor();
			setupPublishingWidget();
			initKalendae();

			$(document).on('nested:fieldAdded', initRedactor);
		}
	}
});


function flashTimeout() {
	setTimeout(function () {
		$('#flash .alert').alert('close');
	}, 4000);
}


function initKalendae() {
	if (document.querySelectorAll) {
		I18n.initKalendae();

		$('input.kalendae_field').kalendae({
			weekStart: 1,
			format: I18n.t('kalendae.dateFormat')
		});
	}
}
