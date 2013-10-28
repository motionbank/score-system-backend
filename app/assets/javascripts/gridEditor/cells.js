//  BUG: When hovering gridCell hover event fires one time on outer div, second time on image
//          this causes an error, because the code accesses the parent event of the hovered element (in setEditor.js -> onMouseIn, onMouseOut)
//          and tries to get the id of the parent element. works fine for outer div, error on image.

//  TODO: implemented updating of this.x, .y, .width and .height as an event directly bound to resize
//          by this the functions "this.update" and "this.getAndSaveNewPositionAndSize" could be removed
//          and the binding of event "resizestop dragstop" could also be removed
//          but when doing is, the resizing of the image does not work anymore properly



//GridCell constructor
function GridCell(id, type, title, description, x, y, width, height, src) {
    this.id =  id;
    this.class = "cell ui-widget-content";
    this.type = type;
    this.title = title;
    this.description = description;
    this.html;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if(src){
        this.src = src;
    }
    else {
        this.src = "";
    }
    this.init();
}

GridCell.prototype = {
    init: function ()
    {
        this.render();
        this.addEvents();
        this.setPositions();
    },

    //add Handlers
    addEvents: function ()
    {
        var currentCell = $("#gridCell_"+this.id);
        //makes cells resizable in grid
        currentCell.resizable({
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#grid",
            stop: function(event, ui){
                this.width = ui.size.width;
                this.height = ui.size.height;
            }
        });

        //makes cells draggable in grid
        currentCell.draggable({
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#grid"
        });

        $("#gridCell_"+this.id).css({"width":this.width, "height":this.height});

        //update cell content with X and Y position
        currentCell.on("dragstop resizestop", $.proxy(this.onChangedRectangle, this));

        //register event for opening edit dialog
        currentCell.on("dblclick", $.proxy(this.onDblClick, this));
        currentCell.on("click", $.proxy(this.onClickCell, this));

        $(document).on("keydown", $.proxy(this.onKeyPress, this));

        //register hover
        currentCell.hover(onMouseIn, onMouseOut);
        currentCell.children().hover( function(){},function(){});
    },

    //build the html of the object
    render: function(){
        this.html = "<div id='gridCell_" + this.id + "' class='" + this.class + "'><span id='gridCell_" +
                    this.id + "_content'><span class='cell-image'></span><span class='cell-title'></span>" +
                    "<span class='cell-content'></span></span></div>";
        $("#grid").append(this.html);
        this.setContent(this.title, this.description, this.src);


        //get the gridsize and set the size of the cell
        this.gridSize = theGrid.getCellSizeAsPixels();
        this.width = this.width * this.gridSize.width;
        this.height = this.height * this.gridSize.height;
    },

    onChangedRectangle: function(){
        this.getAndSaveNewPositionAndSize();

		// send update request
		var setId = APPLICATION.resource_id;
		var gridPosition = theGrid.mapPixelsToGrid(this.x, this.y);
		var cellAttributes = {
			x: gridPosition.x,
			y: gridPosition.y,
			width: Math.round(this.width / this.gridSize.width),
			height: Math.round(this.height / this.gridSize.height)
		};
		$.post(
			Routes.cell_set_grid_cell_path(setId, this.id),
			{
				grid_cell: cellAttributes,
				_method: "patch" // to get rails to handle this a update request
			}
		);
    },

    getAndSaveNewPositionAndSize: function(){
        var position = $("#gridCell_"+this.id).position();
        this.position = position;
        this.x = this.position.left;
        this.y = this.position.top;
        this.width = $("#gridCell_"+this.id).width();
        this.height = $("#gridCell_"+this.id).height();

        $("#gridCell_"+this.id+"_content img").css({"width": this.width, "height":this.height});
    },

    checkCollisions: function(){
        //checkCollisionsWithOthers();
    },

    //set position of cell when inserting into grid
    setPositions: function(){
        var grid = $("#grid");

        //calculate position in grid
		var gridPosition = theGrid.mapPixelsToGrid(this.x, this.y);
        this.x = gridPosition.x * this.gridSize.width;
		this.y = gridPosition.y * this.gridSize.height;
        $("#gridCell_"+this.id).css({left: this.x, top:this.y});

        this.getAndSaveNewPositionAndSize();
    },

    //later using for poster image
    setSrc: function(src){
        this.src = src;
    },

    onDblClick: function(){
        this.openEditDialog();
    },


    onClickCell: function() {
      var currentId = this.id;
      if($('div#gridCell_' + currentId).hasClass('selectedCell')){
        theGrid.cellSelected = false;
        $('.cell').removeClass('selectedCell');
      } else {
        $('.cell').removeClass('selectedCell');
        $('div#gridCell_' + currentId).addClass('selectedCell');
        theGrid.cellSelected = true;
        currentCellToEdit = this;
      }
    },


    onKeyPress: function (e) {
      var keyPressed = e.keyCode || e.which;
      if(theGrid.cellSelected) {
        if(keyPressed === 8) {
          editBox.openConfirmDialog(currentCellToEdit.title);
          return false;
        }
        if(keyPressed === 27) {
          editBox.closeConfirmDialog();
          return false;
        }
      }
    },


    openEditDialog: function(){
        editBox.setValues(this.title, this.type, this.description, this.src);
        editBox.openDialog();
        currentCellToEdit = this;
    },

    //TODO Create Templates for Cells for different types
    setContent: function(title, description, imageSrc){
        this.title = title;
        this.description = description;
        this.src = imageSrc;

        this.updateGridCell();
        this.updateContentCell();
    },

    updateGridCell: function(){
        var gridCell = $("#gridCell_" + this.id + "_content");

        if(this.src){
            $(gridCell).find(".cell-image").html("<img src='" + this.src + "'></img>");
            $(gridCell).find(".cell-title").html("");
            $(gridCell).find(".cell-content").html("");
        }
        else{
            $(gridCell).find(".cell-image").html("");
            $(gridCell).find(".cell-title").html(this.title);
            $(gridCell).find(".cell-content").html(this.description);
        }

    },

    updateContentCell: function(){
        var contentCell = $("#usedContentCell_" + this.id);
        $(contentCell).find(".contentCellPosterImage").html("<img src='" + this.src + "'></img>");
        $(contentCell).find(".contentCellTitle").html(this.title);
        $(contentCell).find(".contentCellDescription").html(this.description);
    }

}