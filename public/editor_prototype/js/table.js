function initTabs(){
		$(function() {
			$( "#tabs" ).tabs();
		});
}


function createDummyRows(){
	//create dummy rows
    for(var i = 0; i < 8; i++){
    	createContentRow(i,"","MyTitle of Cell"+i,"MyDescription");
    	if(i==7){
    		initTableEvents();
    	}
    }
}



function createContentRow(id, src, title, description){
	var htmlBasicStructure = 	"<tr id='contentCell_" + id + "' class='contentCell ui-widget-content'>\
									<td class='contentCellPosterImage'></td>\
									<td class='contentCellTitle'></td>\
									<td class='contentCellDescription'></td>\
									<td class='contentCellEditButton'>Edit</td>\
								</tr>";
	$("#contentCellTable tbody").prepend(htmlBasicStructure);
	$("#contentCell_"+id+" .contentCellPosterImage").append(src);
	$("#contentCell_"+id+" .contentCellTitle").append(title);
	$("#contentCell_"+id+" .contentCellDescription").append(description);
}


function initTableEvents(){
	$( ".contentCellEditButton").on("click", editCellInformation);
	$( ".contentCell").draggable({ opacity: 0.7, helper: "clone", revert: false, });
	$( ".contentCell").on("dragstop", onDrop);
}