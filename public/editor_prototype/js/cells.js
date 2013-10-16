// TODO: Check deleting of Poster Images, not working currently!



//standard gridCell
function GridCell(id, type, title, description, mouseX, mouseY) {
    this.id = id;
    this.type;
    this.class = "cell ui-widget-content";
    this.title = title;
    this.description = description;
    this.html; 
    this.x = mouseX;
    this.y = mouseY;
    this.width;
    this.height;
    this.init();
}

//gridCell with iframe/poster image
function GridCell(id, type, title, description, mouseX, mouseY, src) {
    this.id =  id;
    this.class = "cell ui-widget-content";
    this.type = type;
    this.title = title;
    this.description = description;
    this.html; 
    this.x = mouseX;
    this.y = mouseY;
    this.width;
    this.height;
    if(src) this.src = src;
    else this.src = "";
    this.init();
}

GridCell.prototype = {
    init: function ()
    {
        this.render();
        this.addEvents();
        this.setPositions();
        //use this later for poster images
        if(this.src){
            this.setSrc();
        } 
    },

    //add Handlers
    addEvents: function ()
    {   
        var currentCell = $("#gridCell_"+this.id);
        //makes cells resizable in grid
        currentCell.resizable({
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#grid",
        });

        //makes cells draggable in grid
        currentCell.draggable({ 
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#grid",
        });

        //update cell content with X and Y position
        currentCell.on("dragstop resizestop", $.proxy(this.onMouseUp, this));

        //register event for opening edit dialog
        currentCell.on("dblclick", $.proxy(this.onDblClick, this));

        //register hover
        currentCell.hover(onMouseIn, onMouseOut);
    },

    //build the html of the object
    render: function(){
        this.html = "<div id='gridCell_" + this.id + "' class='" + this.class + "'><span id='gridCell_" +
                             this.id + "_content'><span class='cell-title'></span><br>\
                                <span class='cell-content'></span></span></div>";
        $("#grid").append(this.html);
        this.setContent(this.title, this.description);
        //get the gridsize and set the size of the cell
        this.gridSize = $("#gridCell_" + this.id).css(["width", "height"]);
        this.gridSize.width = parseInt(this.gridSize.width);
        this.gridSize.height = parseInt(this.gridSize.height);
        
    },

    //update the html inside the div
    update: function(){
        var position = $("#gridCell_"+this.id).position();
        this.position = position;
        this.save();
        $("#gridCell_"+this.id+"_content img").css({"width": this.width*this.gridSize.width, "height":this.height*this.gridSize.height });
       
        //this.checkCollisions();
        
    },
    onMouseUp: function(){
        this.update();
    },
    save: function(){
        this.x = this.position.left;
        this.y = this.position.top;
        this.width = $("#gridCell_"+this.id).width()/this.gridSize.width;
        this.height = $("#gridCell_"+this.id).height()/this.gridSize.height;

        //for testing inserting data into cell, normally writing to database
        /*var titleHTML = "Position X: " + this.x/this.gridSize.width + "<br>Position Y: " + this.y/this.gridSize.height;
        var descriptionHTML = "Width: " + this.width + "<br>Height: " + this.height;
        $("#" + this.id + "_content").html(titleHTML + "<br>" + descriptionHTML + "</div>");*/
    },

    checkCollisions: function(){
        checkCollisionsWithOthers();
    },

    //set position of cell when inserting into grid
    setPositions: function(){
        var grid = $("#grid");
        var gridPosition = grid.offset();

        //calculate position in grid
        this.x = Math.floor(this.x / this.gridSize.width) * this.gridSize.width;
        this.y = Math.floor(this.y / this.gridSize.height) * this.gridSize.height;
        $("#gridCell_"+this.id).css({left: this.x, top:this.y});
        this.update();
    },

    //later using for poster image
    setSrc: function(){
        $("#gridCell_"+this.id+"_content").html("<img src='" + this.src + "'></img>");
        $("#usedContentCell_"+this.id+" .contentCellPosterImage").html("<img src='" + this.src + "'></img>");
        this.update();
    },

    onDblClick: function(){
        this.openEditDialog();
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
        if(imageSrc){
            this.src = imageSrc;
            this.setSrc();
        }
        /*else {
            this.src = "";
            this.setSrc();
        }*/
        this.updateGridCell();
        this.updateContentCell();
    },

    updateGridCell: function(){
        $("#gridCell_" + this.id + "_content .cell-title").html(this.title);
        $("#gridCell_" + this.id + "_content .cell-content").html(this.description);
    },

    updateContentCell: function(){
        $("#usedContentCell_" + this.id + " .contentCellTitle").html(this.title);
        $("#usedContentCell_" + this.id + " .contentCellDescription").html(this.description);
    },
}












