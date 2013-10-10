function setupPublishingWidget() {
	var section = $('section.publishing');
    var btns = $('div.btn-group', section);
	var dateFields = $('.publishing_dates', section);
    var publishField = $('input[name$="[published_flag]"]', section);
    var published = publishField.val();
    var dfWidth = dateFields.innerWidth();

    //getting the published state and setting the buttons accordingly
	if ((published === "true") || (published === "1")) {
        btns.find('div.btn[data-published="1"]').addClass('active');
        dateFields.show();
    } else {
        btns.find('div.btn[data-published="0"]').addClass('active');
        dateFields.hide();
    }

    //updating the hidden published field according to click on the buttons
    btns.on('click', 'div.btn', function (e) {
        if ($(e.target).is('input')) {
            return false;
        } else {
            var state = $(this).attr('data-published');
            if (state === '0') {
				dateFields.slideUp('fast');
            } else {
				dateFields.slideDown('fast');
            }
            publishField.val(state);
        }
    });
}
