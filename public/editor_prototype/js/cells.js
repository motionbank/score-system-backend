
//standard cell
function Cell(id, theClass, title, description, mouseX, mouseY) {
    //this.id = id;
    this.id = 1 + Math.floor(Math.random()*200);
    this.class = theClass + " ui-widget-content";
    this.title = title;
    this.description = description;
    this.html; 
    this.x = mouseX;
    this.y = mouseY;
    this.width;
    this.height;
    this.init();
}

//TODO: Creating classes for different cells / create one class which can handle all types of cells
//cell with iframe/poster image
function Cell(id, theClass, title, description, mouseX, mouseY, src) {
    //this.id = id;
    this.id = 1 + Math.floor(Math.random()*200);
    this.class = theClass + " ui-widget-content";
    this.title = title;
    this.description = description;
    this.html; 
    this.x = mouseX;
    this.y = mouseY;
    this.width;
    this.height;
    this.src = src;
    this.init();
}

Cell.prototype = {
    init: function ()
    {
        this.render();
        this.addEvents();
        this.setPositions();
        //use this later for poster images
        //this.setiFrame();
    },

    //add Handlers
    addEvents: function ()
    {   
        //makes cells resizable in grid
        $("#"+this.id).resizable({
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#gridStart",
        });

        //makes cells draggable in grid
        $("#"+this.id).draggable({ 
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#gridStart",
        });

        //update cell content with X and Y position
        $("#"+this.id).on("dragstop resizestop", $.proxy(this.onMouseUp, this));

        //register event for opening edit dialog
        $("#"+this.id).on("dblclick", $.proxy(this.onDblClick, this));
    },

    //build the html of the object
    render: function(){
        this.html = "<div id='" + this.id + "' class='" + this.class + "'><span id='" + this.id + "_content'></span></div>";
        $("#" + this.id).html(this.html);
        $("#" + this.id + "_content").html("<h3>" + this.title + "</h3><br>" + this.description + "<br>");
        $("#gridStart").append(this.html);

        //get the gridsize and set the size of the cell
        this.gridSize = $("#" + this.id).css(["width", "height"]);
        this.gridSize.width = parseInt(this.gridSize.width);
        this.gridSize.height = parseInt(this.gridSize.height);
        
    },

    //update the html inside the div
    update: function(){
        var position = $("#"+this.id).position();
        this.position = position;
        this.save();
        this.checkCollisions();
        
    },
    onMouseUp: function(){
        this.update();
    },
    save: function(){
        this.x = this.position.left;
        this.y = this.position.top;
        this.width = $("#"+this.id).width()/this.gridSize.width;
        this.height = $("#"+this.id).height()/this.gridSize.height;

        //for testing inserting data into cell, normally writing to database
        var titleHTML = "Position X: " + this.x/this.gridSize.width + "<br>Position Y: " + this.y/this.gridSize.height;
        var descriptionHTML = "Width: " + this.width + "<br>Height: " + this.height;
        $("#" + this.id + "_content").html(titleHTML + "<br>" + descriptionHTML + "</div>");
    },

    checkCollisions: function(){
        checkCollisionsWithOthers();
    },

    //set position of cell when inserting into grid
    setPositions: function(){
        var grid = $("#gridStart");
        var gridPosition = grid.offset();

        //calculate position in grid
        this.x = Math.floor(this.x / this.gridSize.width) * this.gridSize.width;
        this.y = Math.floor(this.y / this.gridSize.height) * this.gridSize.height;
        $("#"+this.id).css({left: this.x, top:this.y});
        this.update();
    },

    /*later using for poster image
    setiFrame: function(){
        $("#"+this.id).html(this.src);
        $("#loadedVideo").css({"width":this.width*this.gridSize.width, "height": this.height* this.gridSize.height });
        //makes cells draggable in grid
        $("#"+this.id).draggable({ 
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#gridStart",
        });
    },*/

    onDblClick: function(){
        this.openEditDialog();
    },
    openEditDialog: function(){
        $("#effect").toggle("bind");
        currentCellToEdit = this;
    },

    //TODO Create Templates for Cells for different types
    setContent: function(titleHTML, descriptionHTML){
        $("#"+this.id+"_content").html("<h2>" + titleHTML + "</h2><h3>" + descriptionHTML + "</h3></div>");
    }
     
}












