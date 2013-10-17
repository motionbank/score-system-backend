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
                             this.id + "_content'><span class='cell-image'></span><span class='cell-title'></span><br>\
                                <span class='cell-content'></span></span></div>";
        $("#grid").append(this.html);
        this.setContent(this.title, this.description, this.src);

        //get the gridsize and set the size of the cell
        this.gridSize = $("#gridCell_" + this.id).css(["width", "height"]);
        this.gridSize.width = parseInt(this.gridSize.width);
        this.gridSize.height = parseInt(this.gridSize.height);
    },

    //update the html inside the div
    update: function(){
        this.getAndSaveNewPositionAndSize();
        
        //adjust image size
        $("#gridCell_"+this.id+"_content img").css({"width": this.width*this.gridSize.width, "height":this.height*this.gridSize.height });
       
        //this.checkCollisions();
        
    },
    onMouseUp: function(){
        console.log("mouse up" + this.gridSize.width);
        this.update();
    },
    getAndSaveNewPositionAndSize: function(){
        var position = $("#gridCell_"+this.id).position();
        this.position = position;
        this.x = this.position.left;
        this.y = this.position.top;
        this.width = $("#gridCell_"+this.id).width()/this.gridSize.width;
        this.height = $("#gridCell_"+this.id).height()/this.gridSize.height;
    },

    checkCollisions: function(){
        //checkCollisionsWithOthers();
    },

    //set position of cell when inserting into grid
    setPositions: function(){
        var grid = $("#grid");
        var gridPosition = grid.offset();

        //calculate position in grid
        this.x = Math.floor(this.x / this.gridSize.width) * this.gridSize.width;
        this.y = Math.floor(this.y / this.gridSize.height) * this.gridSize.height;
        $("#gridCell_"+this.id).css({left: this.x, top:this.y});
        //this.update();
    },

    //later using for poster image
    setSrc: function(src){
        this.src = src;
        //this.update();
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
    },
}












