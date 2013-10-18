//	TODO: Implement Edit Function from Table, has worked in prototype, not now anymore

function initTabs(){
		$(function() {
			$( "#tabs" ).tabs();
		});
}


function createDraggableCellHelper(event){
	var cell = $(event.currentTarget);
	var title = cell.find(".contentCellTitle").html();
	var description = cell.find(".contentCellDescription").html();
	var cellClone = "<div class='cell thumbnail'>";


	if(cell.find(".contentCellPosterImage img").attr("src").length > 0){
		cellClone += cell.find(".contentCellPosterImage").html();
	}
	else {
		cellClone += "<span id='class='cell-title'>" + title + "</span>\
						<br><span class='cell-content'>" + description + "</span></div>";
	}
	cellClone += "</div>";
	return cellClone;
}

function createUsedContentRow(id, src, title, description){
	var htmlBasicStructure = 	"<tr id='usedContentCell_" + id + "' class='contentCell usedCell cellTable ui-widget-content'>\
									<td class='contentCellPosterImage thumbnail'></td>\
									<td class='contentCellTitle'></td>\
									<td class='contentCellDescription'></td>\
									<td class='contentCellEditButton'>Edit Info</td>\
								</tr>";
	$("#usedContentCellTable tbody").prepend(htmlBasicStructure);
	var usedContentCell = $("#usedContentCell_"+id);
	usedContentCell.find(".contentCellPosterImage").append("<img src='" + src + "' />");
	usedContentCell.find(".contentCellTitle").append(title);
	usedContentCell.find(".contentCellDescription").append(description);
	$( "#usedContentCellTable tr" ).hover(onMouseIn, onMouseOut); 
}


function initTableEvents(){
	var availableCellsContainer = $('#availableContentCellTable');

	availableCellsContainer.on("click", ".contentCellShowButton", showCellInformation);
	$( "#usedContentCellTable" ).on("click", ".contentCellEditButton", editCellInformation);
	availableCellsContainer.on("dragstop", ".availableCell", onDrop);
	availableCellsContainer.find(".availableCell").draggable({
		opacity: 0.7,
		helper: createDraggableCellHelper,
		revert: false
	});
}
