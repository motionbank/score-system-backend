//	TODO: Implement Edit Function from Table
// 	TODO: check hover in table and mark cell in grid (correctly)
// 	TODO: make gridCell background grün when hovering über table&grid
// TODO Code vereinfachen, nicht mehrmals $("#beispielid .class") verwenden


function initTabs(){
		$(function() {
			$( "#tabs" ).tabs();
		});
}


function createDummyRows(){
	//create dummy rows
    for(var i = 0; i < 8; i++){
    	createAvailableContentRow(i,"","MyTitle of Cell"+i,"MyDescription");
    	if(i==7){
    		initTableEvents();
    	}
    }
    createUsedContentRow("-1","","Empty Title","Empty Description");
}


function createAvailableContentRow(id, src, title, description){
	var htmlBasicStructure = 	"<tr id='availableContentCell_" + id + "' class='contentCell availableCell cellTable ui-widget-content'>\
									<td class='contentCellPosterImage'></td>\
									<td class='contentCellTitle'></td>\
									<td class='contentCellDescription'></td>\
									<td class='contentCellShowButton'>Show Info</td>\
								</tr>";
	$("#availableContentCellTable tbody").prepend(htmlBasicStructure);
	var availableContentCell = $("#availableContentCell_"+id);
	availableContentCell.find(".contentCellPosterImage").append(src);
	availableContentCell.find(".contentCellTitle").append(title);
	availableContentCell.find(".contentCellDescription").append(description);

	availableContentCell.draggable(
						{
	 							opacity: 0.7, 
	 							helper: "clone", 
	 							revert: false, 
	 					});
}

function createUsedContentRow(id, src, title, description){
	var htmlBasicStructure = 	"<tr id='usedContentCell_" + id + "' class='contentCell usedCell cellTable ui-widget-content'>\
									<td class='contentCellPosterImage'></td>\
									<td class='contentCellTitle'></td>\
									<td class='contentCellDescription'></td>\
									<td class='contentCellEditButton'>Edit Info</td>\
								</tr>";
	$("#usedContentCellTable tbody").prepend(htmlBasicStructure);
	var usedContentCell = $("#usedContentCell_"+id);
	console.log(usedContentCell);
	usedContentCell.find(".contentCellPosterImage").append(src);
	usedContentCell.find(".contentCellTitle").append(title);
	usedContentCell.find(".contentCellDescription").append(description);
}


function initTableEvents(){
	$( "#availableContentCellTable" ).on("click", ".contentCellShowButton", showCellInformation);
	$( "#availableContentCellTable" ).on("click", ".contentCellEditButton", editCellInformation); 
	$( "#availableContentCellTable" ).on("dragstop", ".availableCell", onDrop);
}

