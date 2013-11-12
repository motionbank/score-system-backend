
//GridCell constructor
function GridCell(data) {
    this.class = "cell ui-widget-content";
    this.updateData(data);
    this.init();
}

GridCell.prototype = {

	defaultImageRegex: /default[-a-z0-9A-z]*.png$/i,

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


	updateData: function(data) {
		this.id = data.grid_cell.id;
		this.canonicalCell = data.grid_cell.canonical_cell;
		this.type = this.canonicalCell.type;

		// multiply the abstract grid coordinates with the actual cell size in pixels
		var absCellSize = theGrid.getCellSizeAsPixels();
		this.x = data.grid_cell.x * absCellSize.width;
		this.y = data.grid_cell.y * absCellSize.height;

		this.width = data.grid_cell.width;
		this.height = data.grid_cell.height;

		// If the grid cell does not have a value of its own it is taken from the canonical cell
		this.title = data.grid_cell.title || '';
		this.description = data.grid_cell.description || '';
		this.updatePosterImageFromData(data);
	},


	updatePosterImageFromData: function(data) {
		if (!this.defaultImageRegex.test(data.grid_cell.poster_image.small.url)) {
			this.src = data.grid_cell.poster_image.small.url;
		}else{
			this.src = this.canonicalCell.poster_image.small.url;
		}

        //check if css-z-index is there as an additional field and set it as this.z, if not set it to 3
        if("css-z-index" in data.grid_cell.canonical_cell.additional_fields){
            //console.log("z-index exists in database");
            var zIndex = data.grid_cell.canonical_cell.additional_fields.css-z-index;
            this.z = zIndex;
        }
        else{
            //console.log("z-index exists not in database");
            this.z = 3;
        }
	},


    onChangedRectangle: function(){
        this.getAndSaveNewPositionAndSize();

		// send update request
		var scoreId = APPLICATION.score_id;
		var setId = APPLICATION.resource_id;
		var gridPosition = theGrid.mapPixelsToGrid(this.x, this.y);
		var cellAttributes = {
			x: gridPosition.x,
			y: gridPosition.y,
			width: Math.round(this.width / this.gridSize.width),
			height: Math.round(this.height / this.gridSize.height)
		};
		$.post(
			Routes.cell_set_grid_cell_path(scoreId, setId, this.id),
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
        $("#gridCell_"+this.id).css({left: this.x, top:this.y, 'z-index':this.z});

        this.getAndSaveNewPositionAndSize();
    },

    //later using for poster image
    setSrc: function(src){
        this.src = src;
    },

    onDblClick: function(){
      this.openEditDialog();
    },


	// toggle the selectedCell class of the cell
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
        if(keyPressed === 8) {//backspace -> remove cell from set
          editBox.openConfirmDialog(currentCellToEdit.title);
          return false;
        }
        if(keyPressed === 27) {//escape -> close modal dialog
          editBox.closeConfirmDialog();
          return false;
        }
      }
    },


    openEditDialog: function(){
      editBox.openDialog(this);
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

    whichDataToUse: function(modelData, canonicalField) {
        var data = '';
        if(modelData.length <= 0){
            data = canonicalField;
        } else{
            data = modelData;
        }

        return data
    },

    updateGridCell: function(){
        var gridCell = $("#gridCell_" + this.id + "_content");
        var title = this.whichDataToUse(this.title, this.canonicalCell.title);
        var description = this.whichDataToUse(this.description, this.canonicalCell.description);

        if(this.src) {
            var imageURL = this.whichDataToUse(this.src, this.canonicalCell.poster_image.url);
            var imageContainer = $(gridCell).find(".cell-image");
			if(imageContainer.find('img').length > 0) {
				imageContainer.find("img").attr("src", imageURL);
			} else {
				imageContainer.html("<img src='" + imageURL + "'></img>");
			}
            $(gridCell).find(".cell-title").html("");
            $(gridCell).find(".cell-content").html("");
        } else {
            $(gridCell).find(".cell-image").html("");
            $(gridCell).find(".cell-title").html(title);
            $(gridCell).find(".cell-content").html(description);
        }

    },

    updateContentCell: function(){
        var contentCell = $("#usedContentCell_" + this.id);
        var title = this.whichDataToUse(this.title, this.canonicalCell.title);
        var description = this.whichDataToUse(this.description, this.canonicalCell.description);

        if(this.src) {
            var image = this.whichDataToUse(this.src, this.canonicalCell.poster_image.url);
            $(contentCell).find(".contentCellPosterImage").html("<img src='" + image + "'></img>");
        }

        $(contentCell).find(".contentCellTitle").html(title);
        $(contentCell).find(".contentCellDescription").html(description);
        $(contentCell).find(".badge").html(this.type);
    }

};
