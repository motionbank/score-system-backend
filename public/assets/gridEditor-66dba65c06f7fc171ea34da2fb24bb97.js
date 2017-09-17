function initTabs(){$(function(){$("#tabs").tabs()})}function createDraggableCellHelper(t){var e=$(t.currentTarget),i=e.find(".contentCellTitle").html(),l=e.find(".contentCellDescription").html(),s="<div class='dragHelper'>";return s+=e.find(".contentCellPosterImage img").attr("src").length>0?e.find(".contentCellPosterImage").html():"<span id='class='cell-title'>"+i+"</span>						<br><span class='cell-content'>"+l+"</span></div>",s+="</div>"}function createUsedContentRow(t,e,i,l,s){var n="<div id='usedContentCell_"+t+"' class='row-fluid contentCell usedCell'>									<div class='span1 contentCellPosterImage'></div>									<div class='span9'>										<span class='badge'></span>										<h5 class='contentCellTitle'></h5>										<span class='contentCellID'></span>										<p class='contentCellDescription'></p>									</div>									<div class='span2 contentCellEditButton'><span class='btn'><i class='icon-edit'></i> Edit/Info</btn></div>								</div>";$("#usedContentCellTable").prepend(n);var r=$("#usedContentCell_"+t);r.find(".contentCellPosterImage").append("<img src='"+e+"' />"),r.find(".contentCellTitle").append(i),r.find(".contentCellDescription").append(l),r.find(".contentCellID").append(" [ID:&nbsp;"+t+"]"),r.find(".badge").html(s),$("#usedContentCellTable div").hover(onMouseIn,onMouseOut)}function initTableEvents(){$("#usedContentCellTable").on("click",".contentCellEditButton",editCellInformation)}function GridCell(t){this.class="cell ui-widget-content",this.updateData(t),this.init()}function Grid(t,e,i,l,s,n){this.width=t*parseInt(s),this.height=e*parseInt(n),this.boundsWidth=i*parseInt(s),this.boundsHeight=l*parseInt(n),this.widthStep=s,this.heightStep=n,this.cells=[],this.container=$("#grid"),this.parentContainer=$("#boundsForGrid"),this.cellSelected=!1,this.init()}function initFilter(){function t(t){var e=new RegExp(t,"i"),i=[];return _.each(o,function(t,l){t.match(e)&&i.push(r[l])}),i}function e(){var e=APPLICATION.cells;return _.isEmpty(d)||(e=t(d)),"all"!==a&&(e=_.filter(e,function(t){return t.type==a})),e}function i(){var t="";return $.each(e(),function(e,i){t+=c(i)}),t}function l(){$("#availableContentCellTable").html(i()).off("dragstop",".availableCell",onDrop).on("dragstop",".availableCell",onDrop).find(".availableCell").draggable({opacity:.7,helper:createDraggableCellHelper,cursorAt:{left:5,top:5},revert:!1})}var s=$("select#cellType"),n=$("input#searchTerm"),r={},o={},a="all",d="",c=_.template('<div id="availableContentCell_<%= id %>" class="row-fluid contentCell availableCell"><div class="contentCellPosterImage span1"><img src="<%= poster_image.url %>"></div><div class="span10"><h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> <span class="contentCellID">[ID:&nbsp;<%= id %>]</span><p class="contentCellDescription"><%= description %></p></div><a class="btn" href="/<%= APPLICATION["score_id"] %>/cells/<%= id %>/edit"><i class="icon-edit"></i> Edit</a></div>');n.on("keyup change",_.debounce(function(t){d=t.target.value,l()},150)),s.on("change",function(){a=s.find("option:selected").val(),l()}),$.each(APPLICATION.cells,function(t,e){r[e.id]=e,o[e.id]=JSON.stringify(e)}),l()}function EditDialog(t,e,i,l){this.title=t,this.type=e,this.description=i,this.posterImage=l,this.init()}function setScrollbarHeight(){$(".cellTable").height($(window).height()-$("#boundsForGrid").height()-360)}function populateTheGrid(t){$.each(t,function(t,e){createGridCell(e)})}function onDrop(t){var e=$(t.target),i=e.attr("id"),l=(e.find(".contentCellTitle").html(),e.find(".contentCellDescription").html(),e.find(".contentCellPosterImage img").attr("src"),theGrid.container),s=l.offset();if(s.left<currentMousePos.x&&currentMousePos.x<s.left+l.width()&&s.top<currentMousePos.y&&currentMousePos.y<s.top+l.height()){i=i.split("_")[1],$.each(theGrid.cells,function(t,e){i==e.id&&(i+="-2")});var n=APPLICATION.score_id,r=APPLICATION.resource_id,o=theGrid.mapPixelsToGrid(currentMousePos.x-s.left,currentMousePos.y-s.top),a={cell_id:i,x:o.x,y:o.y};$.post(Routes.cell_set_grid_cells_path(n,r),{grid_cell:a},createGridCell)}}function createGridCell(t){if(t.grid_cell.canonical_cell){var e=new GridCell(t);theGrid.addCell(e);var i=e.title||e.canonicalCell.title,l=e.description||e.canonicalCell.description;createUsedContentRow(e.id,e.src,i,l,e.canonicalCell.type)}}function editCellInformation(t){var e=getIdOfHoveredCell(t);theGrid.setCurrentCell(e),editBox.openDialog(currentCellToEdit)}function onMouseIn(t){var e=getIdOfHoveredCell(t);$("#usedContentCell_"+e).addClass("activeCell"),$("#gridCell_"+e).addClass("activeCell")}function onMouseOut(t){var e=getIdOfHoveredCell(t);$("#usedContentCell_"+e).removeClass("activeCell"),$("#gridCell_"+e).removeClass("activeCell")}function removeSelectedCell(){var t=APPLICATION.score_id,e=APPLICATION.resource_id,i=currentCellToEdit.id;$.post(Routes.cell_set_grid_cell_path(t,e,i),{_method:"delete"},function(){theGrid.removeCell(currentCellToEdit)})}function getIdOfHoveredCell(t){var e;return e=$(t.currentTarget).attr("id")?$(t.currentTarget).attr("id"):$(t.currentTarget).parent().attr("id"),e=e.split("_")[1]}(function(){var t,e,i,l,s={}.hasOwnProperty;e=function(t){this.message=t},e.prototype=new Error,l={prefix:"",default_url_options:{}},t={GROUP:1,CAT:2,SYMBOL:3,OR:4,STAR:5,LITERAL:6,SLASH:7,DOT:8},i={serialize:function(t,e){var i,l,n,r,o,a,d,c;if(null==e&&(e=null),!t)return"";if(!e&&"object"!==this.get_object_type(t))throw new Error("Url parameters should be a javascript hash");if(window.jQuery)return o=window.jQuery.param(t),o?o:"";switch(a=[],this.get_object_type(t)){case"array":for(l=d=0,c=t.length;c>d;l=++d)i=t[l],a.push(this.serialize(i,e+"[]"));break;case"object":for(n in t)s.call(t,n)&&(r=t[n],null!=r&&(null!=e&&(n=""+e+"["+n+"]"),a.push(this.serialize(r,n))));break;default:t&&a.push(""+encodeURIComponent(e.toString())+"="+encodeURIComponent(t.toString()))}return a.length?a.join("&"):""},clean_path:function(t){var e;return t=t.split("://"),e=t.length-1,t[e]=t[e].replace(/\/+/g,"/").replace(/.\/$/m,""),t.join("://")},set_default_url_options:function(t,e){var i,s,n,r,o;for(o=[],i=n=0,r=t.length;r>n;i=++n)s=t[i],!e.hasOwnProperty(s)&&l.default_url_options.hasOwnProperty(s)?o.push(e[s]=l.default_url_options[s]):o.push(void 0);return o},extract_anchor:function(t){var e;return e="",t.hasOwnProperty("anchor")&&(e="#"+t.anchor,delete t.anchor),e},extract_options:function(t,e){var i;return i={},e.length>t&&(i=e.pop()),i},path_identifier:function(t){var e;return 0===t?"0":t?(e=t,"object"===this.get_object_type(t)&&(e=t.to_param||t.id||t,"function"===this.get_object_type(e)&&(e=e.call(t))),e.toString()):""},clone:function(t){var e,i,l;if(null==t||"object"!==this.get_object_type(t))return t;i=t.constructor();for(l in t)s.call(t,l)&&(e=t[l],i[l]=e);return i},prepare_parameters:function(t,e,i){var l,s,n,r,o;for(s=this.clone(i)||{},l=r=0,o=t.length;o>r;l=++r)n=t[l],s[n]=e[l];return s},build_path:function(t,e,l,s){var n,r,o,a,d,c;if(s=Array.prototype.slice.call(s),r=this.extract_options(t.length,s),s.length>t.length)throw new Error("Too many parameters provided for path");return o=this.prepare_parameters(t,s,r),this.set_default_url_options(e,o),n=this.extract_anchor(o),a=""+this.get_prefix()+this.visit(l,o),d=i.clean_path(""+a),(c=this.serialize(o)).length&&(d+="?"+c),d+=n},visit:function(i,l,s){var n,r,o,a,d,c;switch(null==s&&(s=!1),d=i[0],n=i[1],o=i[2],d){case t.GROUP:return this.visit(n,l,!0);case t.STAR:return this.visit_globbing(n,l,!0);case t.LITERAL:case t.SLASH:case t.DOT:return n;case t.CAT:return r=this.visit(n,l,s),a=this.visit(o,l,s),!s||r&&a?""+r+a:"";case t.SYMBOL:if(c=l[n],null!=c)return delete l[n],this.path_identifier(c);if(s)return"";throw new e("Route parameter missing: "+n);default:throw new Error("Unknown Rails node type")}},visit_globbing:function(t,e,i){var l,s,n,r;return n=t[0],l=t[1],s=t[2],l.replace(/^\*/i,"")!==l&&(t[1]=l=l.replace(/^\*/i,"")),r=e[l],null==r?this.visit(t,e,i):(e[l]=function(){switch(this.get_object_type(r)){case"array":return r.join("/");default:return r}}.call(this),this.visit(t,e,i))},get_prefix:function(){var t;return t=l.prefix,""!==t&&(t=t.match("/$")?t:""+t+"/"),t},_classToTypeCache:null,_classToType:function(){var t,e,i,l;if(null!=this._classToTypeCache)return this._classToTypeCache;for(this._classToTypeCache={},l="Boolean Number String Function Array Date RegExp Undefined Null".split(" "),e=0,i=l.length;i>e;e++)t=l[e],this._classToTypeCache["[object "+t+"]"]=t.toLowerCase();return this._classToTypeCache},get_object_type:function(t){var e;return window.jQuery&&null!=window.jQuery.type?window.jQuery.type(t):(e=Object.prototype.toString.call(t),this._classToType()[e]||"object")},namespace:function(t,e){var l,s;return s=e?e.split("."):[],s.length?(l=s.shift(),t[l]=t[l]||{},i.namespace(t[l],s.join("."))):void 0}},i.namespace(window,"Routes"),window.Routes={admins_root_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[7,"/",!1],[3,"score_id",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cancel_user_registration_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"cancel",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cell_path:function(){return i.build_path(["score_id","id"],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cells",!1]],[7,"/",!1]],[3,"id",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cell_api_path:function(){return i.build_path(["score_id","id"],["format"],[2,[2,[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"api",!1]],[7,"/",!1]],[6,"cells",!1]],[7,"/",!1]],[3,"id",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cell_set_path:function(){return i.build_path(["score_id","id"],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cell_sets",!1]],[7,"/",!1]],[3,"id",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cell_set_grid_cell_path:function(){return i.build_path(["score_id","cell_set_id","id"],["format"],[2,[2,[2,[2,[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cell_sets",!1]],[7,"/",!1]],[3,"cell_set_id",!1]],[7,"/",!1]],[6,"grid_cells",!1]],[7,"/",!1]],[3,"id",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cell_set_grid_cells_path:function(){return i.build_path(["score_id","cell_set_id"],["format"],[2,[2,[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cell_sets",!1]],[7,"/",!1]],[3,"cell_set_id",!1]],[7,"/",!1]],[6,"grid_cells",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cell_sets_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cell_sets",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cells_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cells",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},cells_api_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"api",!1]],[7,"/",!1]],[6,"cells",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},destroy_user_session_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"sign_out",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},edit_cell_path:function(){return i.build_path(["score_id","id"],["format"],[2,[2,[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cells",!1]],[7,"/",!1]],[3,"id",!1]],[7,"/",!1]],[6,"edit",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},edit_cell_set_path:function(){return i.build_path(["score_id","id"],["format"],[2,[2,[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cell_sets",!1]],[7,"/",!1]],[3,"id",!1]],[7,"/",!1]],[6,"edit",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},edit_cell_set_grid_cell_path:function(){return i.build_path(["score_id","cell_set_id","id"],["format"],[2,[2,[2,[2,[2,[2,[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cell_sets",!1]],[7,"/",!1]],[3,"cell_set_id",!1]],[7,"/",!1]],[6,"grid_cells",!1]],[7,"/",!1]],[3,"id",!1]],[7,"/",!1]],[6,"edit",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},edit_user_password_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"password",!1]],[7,"/",!1]],[6,"edit",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},edit_user_registration_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"edit",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},new_cell_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cells",!1]],[7,"/",!1]],[6,"new",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},new_cell_set_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"cell_sets",!1]],[7,"/",!1]],[6,"new",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},new_user_password_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"password",!1]],[7,"/",!1]],[6,"new",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},new_user_registration_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"sign_up",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},new_user_session_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"sign_in",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},root_path:function(){return i.build_path([],[],[7,"/",!1],arguments)},score_root_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[7,"/",!1],[3,"score_id",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},set_api_path:function(){return i.build_path(["score_id","id"],["format"],[2,[2,[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"api",!1]],[7,"/",!1]],[6,"sets",!1]],[7,"/",!1]],[3,"id",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},sets_api_path:function(){return i.build_path(["score_id"],["format"],[2,[2,[2,[2,[2,[2,[7,"/",!1],[3,"score_id",!1]],[7,"/",!1]],[6,"api",!1]],[7,"/",!1]],[6,"sets",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},user_password_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"password",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},user_registration_path:function(){return i.build_path([],["format"],[2,[2,[7,"/",!1],[6,"users",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)},user_session_path:function(){return i.build_path([],["format"],[2,[2,[2,[2,[7,"/",!1],[6,"users",!1]],[7,"/",!1]],[6,"sign_in",!1]],[1,[2,[8,".",!1],[3,"format",!1]],!1]],arguments)}},window.Routes.options=l}).call(this),GridCell.prototype={defaultImageRegex:/default[-a-z0-9A-z]*.png$/i,init:function(){this.render(),this.addEvents(),this.setPositions()},addEvents:function(){var t=$("#gridCell_"+this.id);t.resizable({grid:[this.gridSize.width,this.gridSize.height],containment:"#grid",stop:function(t,e){this.width=e.size.width,this.height=e.size.height}}),t.draggable({grid:[this.gridSize.width,this.gridSize.height],containment:"#grid"}),$("#gridCell_"+this.id).css({width:this.width,height:this.height}),t.on("dragstop resizestop",$.proxy(this.onChangedRectangle,this)),t.on("dblclick",$.proxy(this.onDblClick,this)),t.on("click",$.proxy(this.onClickCell,this)),$(document).on("keydown",$.proxy(this.onKeyPress,this)),t.hover(onMouseIn,onMouseOut),t.children().hover(function(){},function(){})},render:function(){this.html="<div id='gridCell_"+this.id+"' class='"+this.class+"'><span id='gridCell_"+this.id+"_content'><span class='cell-image'></span><span class='cell-title'></span><span class='cell-content'></span></span></div>",$("#grid").append(this.html),this.setContent(this.title,this.description,this.src,this.additional_fields),this.gridSize=theGrid.getCellSizeAsPixels(),this.width=this.width*this.gridSize.width,this.height=this.height*this.gridSize.height},updateData:function(t){this.id=t.grid_cell.id,this.canonicalCell=t.grid_cell.canonical_cell,this.type=this.canonicalCell.type,this.additional_fields=t.grid_cell.additional_fields;var e=theGrid.getCellSizeAsPixels();this.x=t.grid_cell.x*e.width,this.y=t.grid_cell.y*e.height,this.width=t.grid_cell.width,this.height=t.grid_cell.height,this.title=t.grid_cell.title||"",this.description=t.grid_cell.description||"",this.updatePosterImageFromData(t)},updatePosterImageFromData:function(t){if(this.src=this.defaultImageRegex.test(t.grid_cell.poster_image.small.url)?this.canonicalCell.poster_image.small.url:t.grid_cell.poster_image.small.url,"css-z-index"in t.grid_cell.canonical_cell.additional_fields){var e=t.grid_cell.canonical_cell.additional_fields["css-z-index"];this.z=e}else this.z=3},onChangedRectangle:function(){this.getAndSaveNewPositionAndSize();var t=APPLICATION.score_id,e=APPLICATION.resource_id,i=theGrid.mapPixelsToGrid(this.x,this.y),l={x:i.x,y:i.y,width:Math.round(this.width/this.gridSize.width),height:Math.round(this.height/this.gridSize.height)};$.post(Routes.cell_set_grid_cell_path(t,e,this.id),{grid_cell:l,_method:"patch"})},getAndSaveNewPositionAndSize:function(){var t=$("#gridCell_"+this.id).position();this.position=t,this.x=this.position.left,this.y=this.position.top,this.width=$("#gridCell_"+this.id).width(),this.height=$("#gridCell_"+this.id).height(),$("#gridCell_"+this.id+"_content img").css({width:this.width,height:this.height})},checkCollisions:function(){},setPositions:function(){var t=($("#grid"),theGrid.mapPixelsToGrid(this.x,this.y));this.x=t.x*this.gridSize.width,this.y=t.y*this.gridSize.height,$("#gridCell_"+this.id).css({left:this.x,top:this.y,"z-index":this.z}),this.getAndSaveNewPositionAndSize()},setSrc:function(t){this.src=t},onDblClick:function(){this.openEditDialog()},onClickCell:function(){var t=this.id;$("div#gridCell_"+t).hasClass("selectedCell")?(theGrid.cellSelected=!1,$(".cell").removeClass("selectedCell")):($(".cell").removeClass("selectedCell"),$("div#gridCell_"+t).addClass("selectedCell"),theGrid.cellSelected=!0,currentCellToEdit=this)},onKeyPress:function(t){var e=t.keyCode||t.which;if(theGrid.cellSelected){if(8===e)return editBox.openConfirmDialog(currentCellToEdit.title),!1;if(27===e)return editBox.closeConfirmDialog(),!1}},openEditDialog:function(){editBox.openDialog(this),currentCellToEdit=this},setContent:function(t,e,i,l){this.title=t,this.description=e,this.src=i,this.additional_fields=l,this.updateGridCell(),this.updateContentCell()},whichDataToUse:function(t,e){var i="";return i=t.length<=0?e:t},updateGridCell:function(){var t=$("#gridCell_"+this.id+"_content"),e=this.whichDataToUse(this.title,this.canonicalCell.title),i=this.whichDataToUse(this.description,this.canonicalCell.description);if(this.src){var l=this.whichDataToUse(this.src,this.canonicalCell.poster_image.url),s=$(t).find(".cell-image");s.find("img").length>0?s.find("img").attr("src",l):s.html("<img src='"+l+"'></img>"),$(t).find(".cell-title").html(""),$(t).find(".cell-content").html("")}else $(t).find(".cell-image").html(""),$(t).find(".cell-title").html(e),$(t).find(".cell-content").html(i)},updateContentCell:function(){var t=$("#usedContentCell_"+this.id),e=this.whichDataToUse(this.title,this.canonicalCell.title),i=this.whichDataToUse(this.description,this.canonicalCell.description);if(this.src){var l=this.whichDataToUse(this.src,this.canonicalCell.poster_image.url);$(t).find(".contentCellPosterImage").html("<img src='"+l+"'></img>")}$(t).find(".contentCellTitle").html(e),$(t).find(".contentCellDescription").html(i),$(t).find(".badge").html(this.type)}},Grid.prototype={init:function(){this.container.css({width:this.width,height:this.height}),$(".cell").css({width:this.widthStep,height:this.heightStep}),this.saveCellSizeAsPixels(),this.container.prepend(this.drawGridMesh());var t='<div id="addRow">+</div><div id="removeRow">-</div>',e='<div id="removeColumn"><span>-</span></div><div id="addColumn"><span>+</span></div>';$("#rowButtons").append(t),$("#addRow").click($.proxy(this.addRow,this)),$("#removeRow").click($.proxy(this.removeRow,this)),$("#columnButtons").append(e),$("#addColumn").click($.proxy(this.addColumn,this)),$("#removeColumn").click($.proxy(this.removeColumn,this)),this.setGridHeight()},saveCellSizeAsPixels:function(){var t=parseInt(this.widthStep,10),e=parseInt(this.heightStep,10);this.cellSize={width:t,height:e}},getCellSizeAsPixels:function(){return this.cellSize},mapPixelsToGrid:function(t,e){var i=this.getCellSizeAsPixels(),l=Math.floor(t/i.width),s=Math.floor(e/i.height);return{x:l,y:s}},setGridHeight:function(){$("#grid").css({width:this.width,height:this.height}),$("#boundsForGrid, #columnButtons").css({height:this.height+2*this.cellSize.height})},persistSetSize:function(){var t=APPLICATION.score_id,e=APPLICATION.resource_id,i=this.width/parseInt(this.widthStep),l=this.height/parseInt(this.heightStep);$.post(Routes.cell_set_path(t,e),{cell_set:{columns:i,rows:l},_method:"patch"})},addColumn:function(){this.width<this.boundsWidth?(this.width+=this.cellSize.width,this.setGridHeight(),this.persistSetSize()):alert("Maximum Columns reached! Maximum is: "+this.boundsWidth/parseInt(this.widthStep)),console.log("added column")},removeColumn:function(){var t=0,e=this.width;$.each(this.cells,function(i,l){l.x+l.width>=e&&t++}),0==t?(this.width-=this.cellSize.width,this.setGridHeight(),this.persistSetSize()):alert("There is a cell in the column you want to remove!\nPlease delete or move this cell.")},addRow:function(){this.height<this.boundsHeight?(this.height+=this.cellSize.height,this.setGridHeight(),this.persistSetSize()):alert("Maximum Rows reached! Maximum is: "+this.boundsHeight/parseInt(this.heightStep)),$(".cellTable").height($(".cellTable").height()-this.cellSize.height),console.log("added row")},removeRow:function(){var t=0,e=this.height;$.each(this.cells,function(i,l){l.y+l.height>=e&&t++}),0==t?(this.height-=this.cellSize.height,this.setGridHeight(),this.persistSetSize()):alert("There is a cell in the row you want to remove!\nPlease delete or move this cell."),$(".cellTable").height($(".cellTable").height()+this.cellSize.height)},removeCell:function(t){$("#gridCell_"+t.id).remove(),$("#usedContentCell_"+t.id).remove(),$("#dialog-modal").dialog("close"),this.cells=$.grep(this.cells,function(e){return e.id==t.id?!1:!0}),this.cellSelected=!1},addCell:function(t){this.cells.push(t)},setCurrentCell:function(t){$.each(this.cells,function(e,i){return i.id==t?(currentCellToEdit=i,!1):void 0})},onWindowResize:function(){console.log($(window).width()),$("boundsForGrid").css({width:$("boundsForGrid").parent().width(),height:this.boundsHeight}),this.container.css({width:this.width,height:this.height}),this.saveCellSizeAsPixels(),this.container.prepend(this.drawGridMesh()),$(".cell").css({width:this.widthStep,height:this.heightStep})},drawGridMesh:function(){this.container.find("svg").remove();var t=this.getCellSizeAsPixels(),e=t.width,i=t.height,l="M "+e+" 0 L 0 0 0 "+i,s='<path d="'+l+'" fill="none" stroke="#fff" stroke-width="1"/>',n='<pattern id="gridPattern" width="'+e+'" height="'+i+'" patternUnits="userSpaceOnUse">'+s+"</pattern>",r='<rect width="100%" height="100%" fill="url(#gridPattern)" />',o='<svg width="100%" height="100%"><defs>'+n+"</defs>"+r+"</svg>";return o}},EditDialog.prototype={init:function(){this.initDialog(),this.initModal(),this.initForm()},initDialog:function(){$("#dialog-modal").dialog({width:800,autoOpen:!1,modal:!0})},initModal:function(){$("#dialog-confirm").dialog({modal:!0,autoOpen:!1,buttons:{Ok:function(){removeSelectedCell(),$(this).dialog("close")}}})},initForm:function(){this.editForm=$("#dialog-modal"),this.addAdditionalAttributesTemplate=JST["templates/additional_field"]},submitForm:function(t){var e=$("#dialog-modal").find("form"),i=new FormData(e[0]),l=function(t){var i=e.find("#editTitle").val(),l=e.find("#editDescription").val();currentCellToEdit.updatePosterImageFromData(t);var s=currentCellToEdit.src,n=t.grid_cell.additional_fields;currentCellToEdit.setContent(i,l,s,n),editBox.closeDialog()};$.ajax({url:e.attr("action"),type:"POST",data:i,success:l,cache:!1,contentType:!1,processData:!1}),t.preventDefault()},deleteImage:function(t){$("#editImageSrc").val(""),$("#usedPosterImage").hide().attr("src",""),$("#removeImageSrc").val("1"),this.showDisplayDeleteBtn(),t.preventDefault()},uploadNewImage:function(){$("#editImageSrc").val($("#cell_poster_image").val()),$("#usedPosterImage").attr("src",$("#cell_poster_image").val()).show(),this.showDisplayDeleteBtn()},addAdditionalAttributes:function(){$("#specialAttributes").append(this.addAdditionalAttributesTemplate)},addEvents:function(){$("#removeCell").on("click",removeSelectedCell),$("#deleteImage").on("click",$.proxy(this.deleteImage,this)),$(".form_submit").on("click",this.submitForm),$("#addSpecialAttribute").on("click",$.proxy(this.addAdditionalAttributes,this)),$("#cell_poster_image").on("change",$.proxy(this.uploadNewImage,this)),this.showDisplayDeleteBtn()},showDisplayDeleteBtn:function(){""==$("#usedPosterImage").attr("src")?$("#deleteImage").hide():$("#deleteImage").show()},closeDialog:function(){theGrid.cellSelected=!0,$("#dialog-modal").dialog("close")},openDialog:function(t){theGrid.cellSelected=!1,this.model=t,this.editForm.empty(),this.model.canonicalCell.poster_image.medium.url===this.model.src&&(this.model.src=null);var e=this.model.additional_fields,i=APPLICATION.score_id,l=APPLICATION.resource_id;this.formTemplate=JST["templates/edit_cell"]({data:this.model,formTargetUrl:Routes.cell_set_grid_cell_path(i,l,this.model.id),usedCellAdditionalFields:e}),this.editForm.append(this.formTemplate),this.addEvents(),$("#dialog-modal").dialog("open")},openConfirmDialog:function(t){t&&$("#dialog-confirm").find("#cell-title-todelete").html("<li>"+t+"</li>"),$("#dialog-confirm").dialog("open")},closeConfirmDialog:function(){$("#dialog-confirm").dialog("close")}};var currentMousePos={x:-1,y:-1},currentCellToEdit,theGrid;$(document).ready(function(){function t(){$(document).mousemove(function(t){currentMousePos.x=t.pageX,currentMousePos.y=t.pageY})}function e(){initTabs(),initTableEvents();var t=APPLICATION.columns||3,e=APPLICATION.rows||3;theGrid=new Grid(t,e,200,25,"50px","25px"),editBox=new EditDialog("Default Title","text","Default Description","");var i=APPLICATION.score_id;$.get(Routes.cell_set_grid_cells_path(i,APPLICATION.resource_id),populateTheGrid),initFilter(),setScrollbarHeight(),$(window).on("resize",setScrollbarHeight)}t(),e()});