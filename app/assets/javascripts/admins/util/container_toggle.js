/** will slide down a container if the associated checkbox is pressed
 *  the id of the container has to be encoded in the "data-toggleTarget" property
 *  of the checkbox.
 **/
function initContainerToggles() {

	var toggles = $('input.container_toggle');

	toggles.each(function (index, element) {
		initContainerToggle($(element));
	});


	function toggleContainer(container, state, method) {
		if (typeof container[method] !== 'function') { method = 'slideToggle'; }
		container[method](state);
	}


	function initContainerToggle(checkbox) {
		var target = $('#' + checkbox.data('toggle-target'));
		console.log(checkbox);

		if (target.length === 0) {
			throw("ERROR: couldn't find toggle container. supply via input[data-toggleTarget]");
		}

		checkbox.on('change', function () {
			toggleContainer(target, checkbox.is(':checked'));
		});

		toggleContainer(target, checkbox.is(':checked'), 'toggle');
	}


}
