function initTabs(){$(function(){$("#tabs").tabs({active:0})})}function createDraggableCellHelper(t){var e=$(t.currentTarget),i=e.find(".contentCellTitle").html(),l=e.find(".contentCellDescription").html(),n="<div class='dragHelper'>";return e.find(".contentCellPosterImage img").attr("src").length>0?n+=e.find(".contentCellPosterImage").html():n+="<span id='class='cell-title'>"+i+"</span>\t\t\t\t\t\t<br><span class='cell-content'>"+l+"</span></div>",n+="</div>"}function createUsedContentRow(t,e,i,l,n){var o="<div id='usedContentCell_"+t+"' class='row-fluid contentCell usedCell'>\t\t\t\t\t\t\t\t\t<div class='span1 contentCellPosterImage'></div>\t\t\t\t\t\t\t\t\t<div class='span9'>\t\t\t\t\t\t\t\t\t\t<span class='badge'></span>\t\t\t\t\t\t\t\t\t\t<h5 class='contentCellTitle'></h5>\t\t\t\t\t\t\t\t\t\t<span class='contentCellID'></span>\t\t\t\t\t\t\t\t\t\t<p class='contentCellDescription'></p>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class='span2 contentCellEditButton'><span class='btn'><i class='icon-edit'></i> Edit/Info</btn></div>\t\t\t\t\t\t\t\t</div>";$("#usedContentCellTable").prepend(o);var s=$("#usedContentCell_"+t);s.find(".contentCellPosterImage").append("<img src='"+e+"' />"),s.find(".contentCellTitle").append(i),s.find(".contentCellDescription").append(l),s.find(".contentCellID").append(" [ID:&nbsp;"+t+"]"),s.find(".badge").html(n),$("#usedContentCellTable div").hover(onMouseIn,onMouseOut)}function initTableEvents(){$("#usedContentCellTable").on("click",".contentCellEditButton",editCellInformation)}function GridCell(t){this["class"]="cell ui-widget-content",this.updateData(t),this.init()}function Grid(t,e,i,l,n,o){this.width=t*parseInt(n),this.height=e*parseInt(o),this.boundsWidth=i*parseInt(n),this.boundsHeight=l*parseInt(o),this.widthStep=n,this.heightStep=o,this.cells=[],this.container=$("#grid"),this.parentContainer=$("#boundsForGrid"),this.cellSelected=!1,this.acceptKeyPress=!1,this.init()}function initFilter(){function t(t){var e=new RegExp(t,"i"),i=[];return _.each(r,function(t,l){t.match(e)&&i.push(s[l])}),i}function e(){var e=APPLICATION.cells;return _.isEmpty(c)||(e=t(c)),"all"!==a&&(e=_.filter(e,function(t){return t.type==a})),e}function i(){var t="";return $.each(e(),function(e,i){t+=d(i)}),t}function l(){$("#availableContentCellTable").html(i()).off("dragstop",".availableCell",onDrop).on("dragstop",".availableCell",onDrop).find(".availableCell").draggable({opacity:.7,helper:createDraggableCellHelper,cursorAt:{left:5,top:5},revert:!1})}var n=$("select#cellType"),o=$("input#searchTerm"),s={},r={},a="all",c="",d=_.template('<div id="availableContentCell_<%= id %>" class="row-fluid contentCell availableCell"><div class="contentCellPosterImage span1"><img src="<%= poster_image.url %>"></div><div class="span10"><h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> <span class="contentCellID">[ID:&nbsp;<%= id %>]</span><p class="contentCellDescription"><%= description %></p></div><a class="btn" href="/<%= APPLICATION["score_id"] %>/cells/<%= id %>/edit"><i class="icon-edit"></i> Edit</a></div>');o.on("keyup change",_.debounce(function(t){c=t.target.value,l()},150)),n.on("change",function(){a=n.find("option:selected").val(),l()}),$.each(APPLICATION.cells,function(t,e){s[e.id]=e,r[e.id]=JSON.stringify(e)}),l()}function EditDialog(t,e,i,l){this.title=t,this.type=e,this.description=i,this.posterImage=l,this.init()}function setScrollbarHeight(){$(".cellTable").height($(window).height()-$("#boundsForGrid").height()-360)}function populateTheGrid(t){$.each(t,function(t,e){createGridCell(e)})}function onDrop(t){var e=$(t.target),i=e.attr("id"),l=e.find(".contentCellTitle").html(),n=e.find(".contentCellDescription").html(),o=(e.find(".contentCellPosterImage img").attr("src"),{}),s=theGrid.container,r=s.offset();if(r.left<currentMousePos.x&&currentMousePos.x<r.left+s.width()&&r.top<currentMousePos.y&&currentMousePos.y<r.top+s.height()){i=i.split("_")[1],$.each(theGrid.cells,function(t,e){i==e.id&&(i+="-2")});var a=APPLICATION.score_id,c=APPLICATION.resource_id,d=theGrid.mapPixelsToGrid(currentMousePos.x-r.left,currentMousePos.y-r.top),h={cell_id:i,type:"text",title:l,description:n,x:d.x,y:d.y,css_class_name:"",additional_fields:o};$.post(Routes.cell_set_grid_cells_path(a,c),{grid_cell:h},createGridCell)}}function onDropJson(t,e){function i(t){$.ajax({type:"POST",url:Routes.cell_new_path(APPLICATION.score_id),headers:{"Content-Type":"application/json"},dataType:"json",data:JSON.stringify({cell:{type:s,title:n,description:o,css_class_name:s+"_"+parseInt(1e5*Math.random((new Date).getTime()),10),additional_fields:r}}),success:function(e){l=e._id.$oid,console.log("Cell created:",l),t()}})}console.log("dropped");var l=e.id||undefined,n=e.title,o=e.description,s=(e.imageSrc,e.type||"text"),r=e.additional_fields||{},a=theGrid.container,c=a.offset(),d=APPLICATION.score_id,h=APPLICATION.resource_id;i(function(){var e=t.originalEvent.pageX,i=t.originalEvent.pageY,n=theGrid.mapPixelsToGrid(e-c.left,i-c.top);if(c.left<e&&e<c.left+a.width()&&c.top<i&&i<c.top+a.height()){$.each(theGrid.cells,function(t,e){l==e.id&&(l+="-2")});var o={cell_id:l,x:n.x,y:n.y};$.post(Routes.cell_set_grid_cells_path(d,h),{grid_cell:o},createGridCell)}else console.log("Dropped outside?",c,{x2:c.left+a.width(),y2:c.top+a.height()},currentMousePos,n,t)})}function createGridCell(t){if(t.grid_cell.canonical_cell){var e=new GridCell(t);theGrid.addCell(e);var i=e.title||e.canonicalCell.title,l=e.description||e.canonicalCell.description;createUsedContentRow(e.id,e.src,i,l,e.canonicalCell.type)}}function editCellInformation(t){var e=getIdOfHoveredCell(t);theGrid.setCurrentCell(e),editBox.openDialog(currentCellToEdit)}function onMouseIn(t){var e=getIdOfHoveredCell(t);$("#usedContentCell_"+e).addClass("activeCell"),$("#gridCell_"+e).addClass("activeCell")}function onMouseOut(t){var e=getIdOfHoveredCell(t);$("#usedContentCell_"+e).removeClass("activeCell"),$("#gridCell_"+e).removeClass("activeCell")}function removeSelectedCell(){var t=APPLICATION.score_id,e=APPLICATION.resource_id,i=currentCellToEdit.id;$.post(Routes.cell_set_grid_cell_path(t,e,i),{_method:"delete"},function(){theGrid.removeCell(currentCellToEdit),setCurrentCellToEdit(null)})}function getIdOfHoveredCell(t){var e;return e=$(t.currentTarget).attr("id")?$(t.currentTarget).attr("id"):$(t.currentTarget).parent().attr("id"),e=e.split("_")[1]}(function(){var t,e,i,l,n,o,s={}.hasOwnProperty,r=[].slice;o="undefined"!=typeof exports&&null!==exports?exports:this,i=function(t){this.message=t},i.prototype=new Error,e={GROUP:1,CAT:2,SYMBOL:3,OR:4,STAR:5,LITERAL:6,SLASH:7,DOT:8},t=!1,l=["anchor","trailing_slash","host","port","protocol"],n={configuration:{prefix:"",default_url_options:{},special_options_key:"_options",serializer:null},default_serializer:function(t,e){var i,l,n,o,r,a,c;if(null==e&&(e=null),null==t)return"";if(!e&&"object"!==this.get_object_type(t))throw new Error("Url parameters should be a javascript hash");switch(c=[],this.get_object_type(t)){case"array":for(l=n=0,r=t.length;n<r;l=++n)i=t[l],c.push(this.default_serializer(i,e+"[]"));break;case"object":for(o in t)s.call(t,o)&&(a=t[o],null==a&&null!=e&&(a=""),null!=a&&(null!=e&&(o=e+"["+o+"]"),c.push(this.default_serializer(a,o))));break;default:null!=t&&c.push(encodeURIComponent(e.toString())+"="+encodeURIComponent(t.toString()))}return c.length?c.join("&"):""},serialize:function(t){var e;return e=this.configuration.serializer,null!=e&&"function"===this.get_object_type(e)?e(t):this.default_serializer(t)},clean_path:function(t){var e;return t=t.split("://"),e=t.length-1,t[e]=t[e].replace(/\/+/g,"/"),t.join("://")},extract_options:function(t,e){var i,l;return i=e[e.length-1],e.length>t&&void 0===i||null!=i&&"object"===this.get_object_type(i)&&!this.looks_like_serialized_model(i)?(l=e.pop()||{},delete l[this.configuration.special_options_key],l):{}},looks_like_serialized_model:function(t){return!t[this.configuration.special_options_key]&&("id"in t||"to_param"in t)},path_identifier:function(t){var e;if(0===t)return"0";if(!t)return"";if(e=t,"object"===this.get_object_type(t)){if("to_param"in t){if(null==t.to_param)throw new i("Route parameter missing: to_param");e=t.to_param}else if("id"in t){if(null==t.id)throw new i("Route parameter missing: id");e=t.id}else e=t;"function"===this.get_object_type(e)&&(e=e.call(t))}return e.toString()},clone:function(t){var e,i,l;if(null==t||"object"!==this.get_object_type(t))return t;i=t.constructor();for(l in t)s.call(t,l)&&(e=t[l],i[l]=e);return i},merge:function(){var t,e;if(e=1<=arguments.length?r.call(arguments,0):[],t=function(t,e){return e(t),t},(null!=e?e.length:void 0)>0)return t({},function(t){var i,l,n,o,s,r;for(o=[],i=0,n=e.length;i<n;i++)r=e[i],o.push(function(){var e;e=[];for(l in r)s=r[l],e.push(t[l]=s);return e}());return o})},normalize_options:function(e,i,n,o){var r,a,c,d,h,u,p,f,g,_,m,C;if(h=this.extract_options(e.length,o),o.length>e.length)throw new Error("Too many parameters provided for path");m=t||o.length>i.length,p={};for(c in h)s.call(h,c)&&(m=!0,this.indexOf(e,c)>=0&&(p[c]=C));h=this.merge(this.configuration.default_url_options,n,h),f={},_={},f.url_parameters=_;for(c in h)s.call(h,c)&&(C=h[c],this.indexOf(l,c)>=0?f[c]=C:_[c]=C);for(g=m?e:i,r=0,a=0,d=g.length;a<d;a++)u=g[a],r<o.length&&(p.hasOwnProperty(u)||(_[u]=o[r],++r));return f},build_route:function(t,e,i,l,o,s){var r,a,c,d,h;return s=Array.prototype.slice.call(s),r=this.normalize_options(t,e,i,s),a=r.url_parameters,c=""+this.get_prefix()+this.visit(l,a),d=n.clean_path(c),!0===r.trailing_slash&&(d=d.replace(/(.*?)[\/]?$/,"$1/")),(h=this.serialize(a)).length&&(d+="?"+h),d+=r.anchor?"#"+r.anchor:"",o&&(d=this.route_url(r)+d),d},visit:function(t,l,n){var o,s,r,a,c,d;switch(null==n&&(n=!1),c=t[0],o=t[1],r=t[2],c){case e.GROUP:return this.visit(o,l,!0);case e.STAR:return this.visit_globbing(o,l,!0);case e.LITERAL:case e.SLASH:case e.DOT:return o;case e.CAT:return s=this.visit(o,l,n),a=this.visit(r,l,n),n&&(this.is_optional_node(o[0])&&!s||this.is_optional_node(r[0])&&!a)?"":""+s+a;case e.SYMBOL:if(null!=(d=l[o]))return delete l[o],this.path_identifier(d);if(n)return"";throw new i("Route parameter missing: "+o);default:throw new Error("Unknown Rails node type")}},is_optional_node:function(t){return this.indexOf([e.STAR,e.SYMBOL,e.CAT],t)>=0},build_path_spec:function(t,i){var l,n,o;switch(null==i&&(i=!1),o=t[0],l=t[1],n=t[2],o){case e.GROUP:return"("+this.build_path_spec(l)+")";case e.CAT:return""+this.build_path_spec(l)+this.build_path_spec(n);case e.STAR:return this.build_path_spec(l,!0);case e.SYMBOL:return!0===i?("*"===l[0]?"":"*")+l:":"+l;case e.SLASH:case e.DOT:case e.LITERAL:return l;default:throw new Error("Unknown Rails node type")}},visit_globbing:function(t,e,i){var l,n;return t[0],l=t[1],t[2],l.replace(/^\*/i,"")!==l&&(t[1]=l=l.replace(/^\*/i,"")),null==(n=e[l])?this.visit(t,e,i):(e[l]=function(){switch(this.get_object_type(n)){case"array":return n.join("/");default:return n}}.call(this),this.visit(t,e,i))},get_prefix:function(){var t;return t=this.configuration.prefix,""!==t&&(t=t.match("/$")?t:t+"/"),t},route:function(t,e,i,l){var o,s,r,a,c,d,h,u;for(u=[],a=[],o=0,s=t.length;o<s;o++)d=t[o],r=d[0],h=d[1],a.push(r),h&&u.push(r);return c=function(){return n.build_route(a,u,e,i,l,arguments)},c.required_params=u,c.toString=function(){return n.build_path_spec(i)},c},route_url:function(t){var e,i,l;return"string"==typeof t?t:(e=t.host||n.current_host())?(l=t.protocol||n.current_protocol(),i=t.port||(t.host?void 0:n.current_port()),i=i?":"+i:"",l+"://"+e+i):""},has_location:function(){return null!=("undefined"!=typeof window&&null!==window?window.location:void 0)},current_host:function(){return this.has_location()?window.location.hostname:null},current_protocol:function(){return this.has_location()&&""!==window.location.protocol?window.location.protocol.replace(/:$/,""):"http"},current_port:function(){return this.has_location()&&""!==window.location.port?window.location.port:""},_classToTypeCache:null,_classToType:function(){var t,e,i,l;if(null!=this._classToTypeCache)return this._classToTypeCache;for(this._classToTypeCache={},l="Boolean Number String Function Array Date RegExp Object Error".split(" "),t=0,e=l.length;t<e;t++)i=l[t],this._classToTypeCache["[object "+i+"]"]=i.toLowerCase();return this._classToTypeCache},get_object_type:function(t){return o.jQuery&&null!=o.jQuery.type?o.jQuery.type(t):null==t?""+t:"object"==typeof t||"function"==typeof t?this._classToType()[Object.prototype.toString.call(t)]||"object":typeof t},indexOf:function(t,e){return Array.prototype.indexOf?t.indexOf(e):this.indexOfImplementation(t,e)},indexOfImplementation:function(t,e){var i,l,n,o;for(o=-1,i=l=0,n=t.length;l<n;i=++l)t[i]===e&&(o=i);return o},namespace:function(t,e,i){var l,n,o,s,r;if(r=e.split("."),0===r.length)return i;for(l=n=0,o=r.length;n<o;l=++n){if(s=r[l],!(l<r.length-1))return t[s]=i;t=t[s]||(t[s]={})}},configure:function(t){return this.configuration=this.merge(this.configuration,t)},config:function(){return this.clone(this.configuration)},make:function(){var t;return t={admins_root_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]),cancel_user_registration_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"cancel",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),cell_path:n.route([["score_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cells",!1],[2,[7,"/",!1],[2,[3,"id",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),cell_api_path:n.route([["score_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"api",!1],[2,[7,"/",!1],[2,[6,"cells",!1],[2,[7,"/",!1],[2,[3,"id",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]),cell_new_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"api",!1],[2,[7,"/",!1],[2,[6,"cell",!1],[2,[7,"/",!1],[2,[6,"new",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]),cell_set_path:n.route([["score_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cell_sets",!1],[2,[7,"/",!1],[2,[3,"id",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),cell_set_grid_cell_path:n.route([["score_id",!0],["cell_set_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cell_sets",!1],[2,[7,"/",!1],[2,[3,"cell_set_id",!1],[2,[7,"/",!1],[2,[6,"grid_cells",!1],[2,[7,"/",!1],[2,[3,"id",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]]]),cell_set_grid_cells_path:n.route([["score_id",!0],["cell_set_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cell_sets",!1],[2,[7,"/",!1],[2,[3,"cell_set_id",!1],[2,[7,"/",!1],[2,[6,"grid_cells",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]),cell_sets_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cell_sets",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),cells_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cells",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),cells_api_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"api",!1],[2,[7,"/",!1],[2,[6,"cells",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),destroy_user_session_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"sign_out",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),edit_cell_path:n.route([["score_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cells",!1],[2,[7,"/",!1],[2,[3,"id",!1],[2,[7,"/",!1],[2,[6,"edit",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]),edit_cell_set_path:n.route([["score_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cell_sets",!1],[2,[7,"/",!1],[2,[3,"id",!1],[2,[7,"/",!1],[2,[6,"edit",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]),edit_cell_set_grid_cell_path:n.route([["score_id",!0],["cell_set_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cell_sets",!1],[2,[7,"/",!1],[2,[3,"cell_set_id",!1],[2,[7,"/",!1],[2,[6,"grid_cells",!1],[2,[7,"/",!1],[2,[3,"id",!1],[2,[7,"/",!1],[2,[6,"edit",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]]]]]),edit_user_password_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"password",!1],[2,[7,"/",!1],[2,[6,"edit",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),edit_user_registration_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"edit",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),new_cell_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cells",!1],[2,[7,"/",!1],[2,[6,"new",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),new_cell_set_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"cell_sets",!1],[2,[7,"/",!1],[2,[6,"new",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),new_user_password_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"password",!1],[2,[7,"/",!1],[2,[6,"new",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),new_user_registration_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"sign_up",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),new_user_session_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"sign_in",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),root_path:n.route([],{},[7,"/",!1]),score_root_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]),set_api_path:n.route([["score_id",!0],["id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"api",!1],[2,[7,"/",!1],[2,[6,"sets",!1],[2,[7,"/",!1],[2,[3,"id",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]),set_new_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"api",!1],[2,[7,"/",!1],[2,[6,"set",!1],[2,[7,"/",!1],[2,[6,"new",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]]]),sets_api_path:n.route([["score_id",!0],["format",!1]],{},[2,[7,"/",!1],[2,[3,"score_id",!1],[2,[7,"/",!1],[2,[6,"api",!1],[2,[7,"/",!1],[2,[6,"sets",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]]]),user_password_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"password",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]]),user_registration_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]),user_session_path:n.route([["format",!1]],{},[2,[7,"/",!1],[2,[6,"users",!1],[2,[7,"/",!1],[2,[6,"sign_in",!1],[1,[2,[8,".",!1],[3,"format",!1]],!1]]]]])},t.configure=function(t){return n.configure(t)},t.config=function(){return n.config()},Object.defineProperty(t,"defaults",{get:function(){throw new Error("Routes.defaults is removed. Use Routes.configure() instead.")},set:function(){}}),t.default_serializer=function(t,e){return n.default_serializer(t,e)},n.namespace(o,"Routes",t)}},"function"==typeof define&&define.amd?define([],function(){return n.make()}):n.make()}).call(this);var domready=function(t){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?t():document.addEventListener("DOMContentLoaded",t)};GridCell.prototype={defaultImageRegex:/default[-a-z0-9A-z]*.png$/i,init:function(){this.render(),this.addEvents(),this.setPositions()},addEvents:function(){var t=$("#gridCell_"+this.id);t.resizable({grid:[this.gridSize.width,this.gridSize.height],containment:"#grid",stop:function(t,e){this.width=e.size.width,this.height=e.size.height}}),t.draggable({grid:[this.gridSize.width,this.gridSize.height],containment:"#grid"}),$("#gridCell_"+this.id).css({width:this.width,height:this.height}),t.on("dragstop resizestop",$.proxy(this.onChangedRectangle,this)),t.on("dblclick",$.proxy(this.onDblClick,this)),t.on("click",$.proxy(this.onClickCell,this)),$(document).on("keydown",$.proxy(this.onKeyPress,this)),t.hover(onMouseIn,onMouseOut),t.children().hover(function(){},function(){})},render:function(){this.html="<div id='gridCell_"+this.id+"' class='"+this["class"]+"'><span id='gridCell_"+this.id+"_content'><span class='cell-image'></span><span class='cell-title'></span><span class='cell-content'></span></span></div>",$("#grid").append(this.html),this.setContent(this.title,this.description,this.src,this.additional_fields),this.gridSize=theGrid.getCellSizeAsPixels(),this.width=this.width*this.gridSize.width,this.height=this.height*this.gridSize.height},updateData:function(t){this.id=t.grid_cell.id,this.canonicalCell=t.grid_cell.canonical_cell,this.type=this.canonicalCell.type,this.additional_fields=t.grid_cell.additional_fields;var e=theGrid.getCellSizeAsPixels();this.x=t.grid_cell.x*e.width,this.y=t.grid_cell.y*e.height,this.width=t.grid_cell.width,this.height=t.grid_cell.height,this.title=t.grid_cell.title||"",this.description=t.grid_cell.description||"",this.updatePosterImageFromData(t)},updatePosterImageFromData:function(t){if(this.defaultImageRegex.test(t.grid_cell.poster_image.small.url)?t.grid_cell.canonicalCell&&t.grid_cell.canonicalCell.poster_image?this.src=t.grid_cell.canonicalCell.poster_image.small.url:this.canonicalCell&&this.canonicalCell.poster_image&&(this.src=this.canonicalCell.poster_image.small.url):this.src=t.grid_cell.poster_image.small.url,"css-z-index"in t.grid_cell.canonical_cell.additional_fields){var e=t.grid_cell.canonical_cell.additional_fields["css-z-index"];this.z=e}else this.z=3},onChangedRectangle:function(){this.getAndSaveNewPositionAndSize();var t=APPLICATION.score_id,e=APPLICATION.resource_id,i=theGrid.mapPixelsToGrid(this.x,this.y),l={x:i.x,y:i.y,width:Math.round(this.width/this.gridSize.width),height:Math.round(this.height/this.gridSize.height)};$.post(Routes.cell_set_grid_cell_path(t,e,this.id),{grid_cell:l,_method:"patch"})},getAndSaveNewPositionAndSize:function(){var t=$("#gridCell_"+this.id).position();this.position=t,this.x=this.position.left,this.y=this.position.top,this.width=$("#gridCell_"+this.id).width(),this.height=$("#gridCell_"+this.id).height(),$("#gridCell_"+this.id+"_content img").css({width:this.width,height:this.height})},checkCollisions:function(){},setPositions:function(){var t=($("#grid"),theGrid.mapPixelsToGrid(this.x,this.y));this.x=t.x*this.gridSize.width,this.y=t.y*this.gridSize.height,$("#gridCell_"+this.id).css({left:this.x,top:this.y,"z-index":this.z}),this.getAndSaveNewPositionAndSize()},setSrc:function(t){this.src=t},onDblClick:function(){this.openEditDialog()},onClickCell:function(){var t=this.id;$("div#gridCell_"+t).hasClass("selectedCell")?(theGrid.cellSelected=!1,setCurrentCellToEdit(null),$(".cell").removeClass("selectedCell")):($(".cell").removeClass("selectedCell"),$("div#gridCell_"+t).addClass("selectedCell"),theGrid.cellSelected=!0,setCurrentCellToEdit(this))},onKeyPress:function(t){var e=t.keyCode||t.which;if(theGrid.cellSelected&&theGrid.acceptKeyPress){if(8===e)return editBox.openConfirmDialog(currentCellToEdit.title),!1;if(27===e)return editBox.closeConfirmDialog(),!1}},openEditDialog:function(){editBox.openDialog(this),setCurrentCellToEdit(this)},setContent:function(t,e,i,l){this.title=t,this.description=e,this.src=i,this.additional_fields=l,this.updateGridCell(),this.updateContentCell()},whichDataToUse:function(t,e){return t.length<=0?e:t},updateGridCell:function(){var t=$("#gridCell_"+this.id+"_content"),e=this.whichDataToUse(this.title,this.canonicalCell.title),i=this.whichDataToUse(this.description,this.canonicalCell.description);if(this.src){var l=this.whichDataToUse(this.src,this.canonicalCell.poster_image.url),n=$(t).find(".cell-image");n.find("img").length>0?n.find("img").attr("src",l):n.html("<img src='"+l+"'></img>"),$(t).find(".cell-title").html(""),$(t).find(".cell-content").html("")}else $(t).find(".cell-image").html(""),$(t).find(".cell-title").html(e),$(t).find(".cell-content").html(i)},updateContentCell:function(){var t=$("#usedContentCell_"+this.id),e=this.whichDataToUse(this.title,this.canonicalCell.title),i=this.whichDataToUse(this.description,this.canonicalCell.description);if(this.src){var l=this.whichDataToUse(this.src,this.canonicalCell.poster_image.url);$(t).find(".contentCellPosterImage").html("<img src='"+l+"'></img>")}$(t).find(".contentCellTitle").html(e),$(t).find(".contentCellDescription").html(i),$(t).find(".badge").html(this.type)}},Grid.prototype={init:function(){this.container.css({width:this.width,height:this.height}),$(".cell").css({width:this.widthStep,height:this.heightStep}),console.log(this.container),this.saveCellSizeAsPixels(),this.container.prepend(this.drawGridMesh());var t="application/json",e=function(e){var i=e.originalEvent;i.dataTransfer.types.includes(t)&&i.preventDefault()};this.container.on("dragenter",e),this.container.on("dragover",e),this.container.on("drop",function(e){var i=e.originalEvent,l=i.dataTransfer.getData(t);onDropJson(e,JSON.parse(l))}),this.container.on("mouseenter",function(){theGrid.acceptKeyPress=!0}).on("mouseleave",function(){theGrid.acceptKeyPress=!1}),$("#rowButtons").append('<div id="addRow">+</div><div id="removeRow">-</div>'),$("#addRow").click($.proxy(this.addRow,this)),$("#removeRow").click($.proxy(this.removeRow,this)),$("#columnButtons").append('<div id="removeColumn"><span>-</span></div><div id="addColumn"><span>+</span></div>'),$("#addColumn").click($.proxy(this.addColumn,this)),$("#removeColumn").click($.proxy(this.removeColumn,this)),this.setGridHeight()},saveCellSizeAsPixels:function(){var t=parseInt(this.widthStep,10),e=parseInt(this.heightStep,10);this.cellSize={width:t,height:e}},getCellSizeAsPixels:function(){return this.cellSize},mapPixelsToGrid:function(t,e){var i=this.getCellSizeAsPixels();return{x:Math.floor(t/i.width),y:Math.floor(e/i.height)}},setGridHeight:function(){$("#grid").css({width:this.width,height:this.height}),$("#boundsForGrid, #columnButtons").css({height:this.height+2*this.cellSize.height})},persistSetSize:function(){var t=APPLICATION.score_id,e=APPLICATION.resource_id,i=this.width/parseInt(this.widthStep),l=this.height/parseInt(this.heightStep);$.post(Routes.cell_set_path(t,e),{cell_set:{columns:i,rows:l},_method:"patch"})},addColumn:function(){this.width<this.boundsWidth?(this.width+=this.cellSize.width,this.setGridHeight(),this.persistSetSize()):alert("Maximum Columns reached! Maximum is: "+this.boundsWidth/parseInt(this.widthStep)),console.log("added column")},removeColumn:function(){var t=0,e=this.width;$.each(this.cells,function(i,l){l.x+l.width>=e&&t++}),0==t?(this.width-=this.cellSize.width,this.setGridHeight(),this.persistSetSize()):alert("There is a cell in the column you want to remove!\nPlease delete or move this cell.")},addRow:function(){this.height<this.boundsHeight?(this.height+=this.cellSize.height,this.setGridHeight(),this.persistSetSize()):alert("Maximum Rows reached! Maximum is: "+this.boundsHeight/parseInt(this.heightStep)),$(".cellTable").height($(".cellTable").height()-this.cellSize.height),console.log("added row")},removeRow:function(){var t=0,e=this.height;$.each(this.cells,function(i,l){l.y+l.height>=e&&t++}),0==t?(this.height-=this.cellSize.height,this.setGridHeight(),this.persistSetSize()):alert("There is a cell in the row you want to remove!\nPlease delete or move this cell."),$(".cellTable").height($(".cellTable").height()+this.cellSize.height)},removeCell:function(t){$("#gridCell_"+t.id).remove(),$("#usedContentCell_"+t.id).remove(),$("#dialog-modal").dialog("close"),this.cells=$.grep(this.cells,function(e){return e.id!=t.id}),this.cellSelected=!1},addCell:function(t){this.cells.push(t)},setCurrentCell:function(t){var e=this.getCellById(t);e&&setCurrentCellToEdit(e)},getCellById:function(t){return this.cells.filter(function(e){return e.id==t&&e}).shift()},onWindowResize:function(){console.log($(window).width()),$("boundsForGrid").css({width:$("boundsForGrid").parent().width(),height:this.boundsHeight}),this.container.css({width:this.width,height:this.height}),this.saveCellSizeAsPixels(),this.container.prepend(this.drawGridMesh()),$(".cell").css({width:this.widthStep,height:this.heightStep})},drawGridMesh:function(){this.container.find("svg").remove();var t=this.getCellSizeAsPixels(),e=t.width,i=t.height;return'<svg width="100%" height="100%"><defs><pattern id="gridPattern" width="'+e+'" height="'+i+'" patternUnits="userSpaceOnUse"><path d="M '+e+" 0 L 0 0 0 "+i+'" fill="none" stroke="#fff" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#gridPattern)" /></svg>'}},EditDialog.prototype={init:function(){this.initDialog(),this.initModal(),this.initForm()},initDialog:function(){$("#dialog-modal").dialog({width:800,autoOpen:!1,modal:!0})},initModal:function(){$("#dialog-confirm").dialog({modal:!0,autoOpen:!1,buttons:{Ok:function(){removeSelectedCell(),$(this).dialog("close")}}})},initForm:function(){this.editForm=$("#dialog-modal"),this.addAdditionalAttributesTemplate=JST["templates/additional_field"]},submitForm:function(t){var e=$("#dialog-modal").find("form"),i=new FormData(e[0]),l=function(t){var i=e.find("#editTitle").val(),l=e.find("#editDescription").val();currentCellToEdit.updatePosterImageFromData(t);var n=currentCellToEdit.src,o=t.grid_cell.additional_fields;currentCellToEdit.setContent(i,l,n,o),editBox.closeDialog()};$.ajax({url:e.attr("action"),type:"POST",data:i,success:l,cache:!1,contentType:!1,processData:!1}),t.preventDefault()},deleteImage:function(t){$("#editImageSrc").val(""),$("#usedPosterImage").hide().attr("src",""),$("#removeImageSrc").val("1"),this.showDisplayDeleteBtn(),t.preventDefault()},uploadNewImage:function(){$("#editImageSrc").val($("#cell_poster_image").val()),$("#usedPosterImage").attr("src",$("#cell_poster_image").val()).show(),this.showDisplayDeleteBtn()},addAdditionalAttributes:function(){$("#specialAttributes").append(this.addAdditionalAttributesTemplate)},addEvents:function(){$("#removeCell").on("click",removeSelectedCell),$("#deleteImage").on("click",$.proxy(this.deleteImage,this)),$(".form_submit").on("click",this.submitForm),$("#addSpecialAttribute").on("click",$.proxy(this.addAdditionalAttributes,this)),$("#cell_poster_image").on("change",$.proxy(this.uploadNewImage,this)),this.showDisplayDeleteBtn()},showDisplayDeleteBtn:function(){""==$("#usedPosterImage").attr("src")?$("#deleteImage").hide():$("#deleteImage").show()},closeDialog:function(){theGrid.cellSelected=!0,$("#dialog-modal").dialog("close")},openDialog:function(t){theGrid.cellSelected=!1,this.model=t,this.editForm.empty(),this.model.canonicalCell.poster_image.medium.url===this.model.src&&(this.model.src=null);var e=this.model.additional_fields,i=APPLICATION.score_id,l=APPLICATION.resource_id;this.formTemplate=JST["templates/edit_cell"]({data:this.model,formTargetUrl:Routes.cell_set_grid_cell_path(i,l,this.model.id),usedCellAdditionalFields:e}),this.editForm.append(this.formTemplate),this.addEvents(),$("#dialog-modal").dialog("open")},openConfirmDialog:function(t){t&&$("#dialog-confirm").find("#cell-title-todelete").html("<li>"+t+"</li>"),$("#dialog-confirm").dialog("open")},closeConfirmDialog:function(){$("#dialog-confirm").dialog("close")}};var currentMousePos={x:-1,y:-1},currentCellToEdit,setCurrentCellToEdit=function(t){currentCellToEdit=t;var e=new CustomEvent("currentCellChanged",{detail:{cell:currentCellToEdit},bubbles:!0,cancelable:!0});theGrid.container.get(0).dispatchEvent(e)},theGrid;$(document).ready(function(){function t(){$(document).mousemove(function(t){currentMousePos.x=t.pageX,currentMousePos.y=t.pageY})}function e(){initTabs(),initTableEvents();var t=APPLICATION.columns||3,e=APPLICATION.rows||3;theGrid=new Grid(t,e,200,25,"50px","25px"),editBox=new EditDialog("Default Title","text","Default Description","");var i=APPLICATION.score_id;$.get(Routes.cell_set_grid_cells_path(i,APPLICATION.resource_id),populateTheGrid),initFilter(),setScrollbarHeight(),$(window).on("resize",setScrollbarHeight)}t(),e()});