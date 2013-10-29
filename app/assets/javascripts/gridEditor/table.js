function initTabs(){
		$(function() {
			$( "#tabs" ).tabs();
		});
}


function createDraggableCellHelper(event){

	var cell = $(event.currentTarget);
	var title = cell.find(".contentCellTitle").html();
	var description = cell.find(".contentCellDescription").html();
	var cellClone = "<div class='dragHelper'>";

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
	var htmlBasicStructure = 	"<div id='usedContentCell_" + id + "' class='row-fluid contentCell usedCell'>\
									<div class='span1 contentCellPosterImage'></div>\
									<div class='span9'>\
										<h5 class='contentCellTitle'></h5>\
										<p class='contentCellDescription'></p>\
									</div>\
									<div class='span2 contentCellEditButton'>Edit Info</div>\
								</div>";
	$("#usedContentCellTable").prepend(htmlBasicStructure);
	var usedContentCell = $("#usedContentCell_"+id);
	usedContentCell.find(".contentCellPosterImage").append("<img src='" + src + "' />");
	usedContentCell.find(".contentCellTitle").append(title);
	usedContentCell.find(".contentCellDescription").append(description);
	$( "#usedContentCellTable div" ).hover(onMouseIn, onMouseOut); 
}


function initTableEvents(){
	$( "#usedContentCellTable" ).on("click", ".contentCellEditButton", editCellInformation);
}
