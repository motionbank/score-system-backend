function initFilter() {
	var selectBox = $('select#cellType');
	var inputField = $('input#searchTerm');
	var dictionary = {};
	var searchIndex = {};
	var filterType = "all";
	var searchTerm = "";

	$.each(APPLICATION.cells, function (index, cell) {
		dictionary[cell.id] = cell;
		searchIndex[cell.id] = JSON.stringify(cell);
	});

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

	inputField.on('change', function (event) {
		searchTerm = inputField.val();
		var cells = filter();
	});

	selectBox.on('change', function (event) {
		filterType = selectBox.find('option:selected').val();
		var cells = filter();
	});
}