
// DONE: rename to gridCell, stays as it is
// when dropping a .contentCell element, create new gridCell object with title, desc, etc of HTML content




//standard gridCell
function GridCell(id, title, description, mouseX, mouseY) {
    id = id.split('_');
    this.id = "gridCell_"+id[1];
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
function GridCell(id, title, description, mouseX, mouseY, src) {
    id = id.split('_');
    this.id = "gridCell_"+id[1];
    this.class = "cell ui-widget-content";
    this.title = title;
    this.description = description;
    this.html; 
    this.x = mouseX;
    this.y = mouseY;
    this.width;
    this.height;
    if(src != "") this.src = src;
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
        if(this.src != "") this.setSrc();
    },

    //add Handlers
    addEvents: function ()
    {   
        //makes cells resizable in grid
        $("#"+this.id).resizable({
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#grid",
        });

        //makes cells draggable in grid
        $("#"+this.id).draggable({ 
            grid: [ this.gridSize.width, this.gridSize.height ],
            containment: "#grid",
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
        $("#grid").append(this.html);
        this.setContent(this.title, this.description);
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
         $("#"+this.id+"_content img").css({"width": this.width*this.gridSize.width, "height":this.height*this.gridSize.height });
        //this.checkCollisions();
        
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
        $("#"+this.id).css({left: this.x, top:this.y});
        this.update();
    },

    //later using for poster image
    setSrc: function(){
        $("#"+this.id+"_content").html("<img src='" + this.src + "'></img>");  
    },

    onDblClick: function(){
        this.openEditDialog();
    },
    openEditDialog: function(){
        $("#dialog-modal #editTitle").val(this.title);
        $("#dialog-modal #editType").val("");
        $("#dialog-modal #editDescription").val(this.description);
        $("#dialog-modal").dialog("open");
        currentCellToEdit = this;
    },

    //TODO Create Templates for Cells for different types
    setContent: function(title, description, imageSrc){
        $("#"+this.id+"_content").html("<div><p class='cell-content cell-title'>" + title + "</p><p class='cell-content'>" + description + "</p></div>");
        this.title = title;
        this.description = description;
        if(imageSrc != ""){
            this.src = imageSrc;
            this.setSrc();
        }
    }
     
}












