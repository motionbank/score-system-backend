function initFilter() {
	var selectBox = $('select#cellType');
	var inputField = $('input#searchTerm');
	var dictionary = {};
	var searchIndex = {};
	var filterType = "all";
	var searchTerm = "";
	var tableRowTemplate = _.template('<div id="availableContentCell_<%= id %>" class="row-fluid contentCell availableCell"><div class="contentCellPosterImage span1"><img src="<%= poster_image.url %>"></div><div class="span10"><h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5><p class="contentCellDescription"><%= description %></p></div></div>');


	/* Private Functions */

	function search(term) {
		var regex = new RegExp(term, 'i');
		var items = [];
		_.each(searchIndex, function (value, key) {
			if(value.match(regex)) {
				items.push(dictionary[key]);
			}
		});
		return items;
	}

	function filter() {
		var updatedCells = APPLICATION.cells;

		if (!_.isEmpty(searchTerm)) {
			updatedCells = search(searchTerm);
		}

		if (filterType !== "all") {
			updatedCells = _.filter(updatedCells, function (cell) {
				return cell.type == filterType;
			});
		}

		return updatedCells;
	}

	function generateHtml() {
		var html = "";
		$.each(filter(), function (index, element) {
			html += tableRowTemplate(element);
		});

		return html;
	}

	function updateView() {
		$('#availableContentCellTable')
			.html(generateHtml())
			.on("dragstop", ".availableCell", onDrop)
			.find(".availableCell").draggable({
				opacity: 0.7,
				helper: createDraggableCellHelper,
				cursorAt: { left: 5, top: 5 },
				revert: false
			});
	}


	/* Event Listeners */

	inputField.on('keyup change', _.debounce(function (event) {
		searchTerm = event.target.value;
		updateView();
	}, 150));

	selectBox.on('change', function (event) {
		filterType = selectBox.find('option:selected').val();
		updateView();
	});


	/* Initialization */

	$.each(APPLICATION.cells, function (index, cell) {
		dictionary[cell.id] = cell;
		searchIndex[cell.id] = JSON.stringify(cell);
	});

	updateView();
}