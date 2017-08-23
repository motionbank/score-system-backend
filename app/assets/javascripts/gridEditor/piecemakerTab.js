//= require piecemaker-api-client/releases/piecemaker-api-client-current

let initPiecemakerTab = (function(){
    let PM2 = new PieceMakerApi({
        host: 'https://piecemaker2-api-public.herokuapp.com',
        api_key: '0310XPC6JEeF0oCy'
    });
    return function () {
        const $tab = $('#pm2ContentCells')
        const $tableHeader = $('.table-header-form',$tab)
        const $tableContent = $('.cellTable',$tab)
        const $eventFilters = $('.event-filters',$tab)
        const $videoContainer = $('.video-container',$tab)

        const groupTemplate = _.template(`
            <div id="pm2GroupCell_<%= id %>" class="row-fluid contentCell pm2GroupCell">
                <a href="">
                    <div class="contentCellPosterImage span1"><img src="/dev-assets/fallback/default.png"></div>
                    <div class="span10">
                        <h5 class="contentCellTitle">
                            <span class="badge">group</span> <%= title %></h5>
                        <span class="contentCellID">[Group-ID:&nbsp;<%= id %>]</span>
                        <p class="contentCellDescription"><%= description %></p>
                    </div>
                </a>
            </div>
        `);

        const loadingTemplate = _.template(`
            <div class="loading"><h4>Loading <%= message %></h4></div>
        `)

        const videoTemplate = _.template(`
            <div id="pm2VideoCell_<%= id %>" data-pm2-group-id="<%= groupId %>" data-pm2-event-id="<%= id %>" data-pm2-event-type="<%= type %>" class="row-fluid contentCell pm2VideoCell ui-draggable">
                <a href="">
                    <div class="contentCellPosterImage span1"><img src="/dev-assets/fallback/default.png"></div>
                    <div class="span10">
                        <h5 class="contentCellTitle">
                            <span class="badge"><%= type %></span> <%= fields.title %></h5>
                        <span class="contentCellID">[Video-ID:&nbsp;<%= id %>]</span>
                        <p class="contentCellDescription"><%= fields.description %></p>
                    </div>
                </a>
            </div>
        `)

        const eventTemplate = _.template(`
            <div id="pm2VideoCell_<%= id %>" data-pm2-group-id="<%= groupId %>" data-pm2-event-id="<%= id %>" data-pm2-event-type="<%= type %>" class="row-fluid contentCell pm2EventCell ui-draggable">
                <a href="">
                    <div class="contentCellPosterImage span1"><img src="/dev-assets/fallback/default.png"></div>
                    <div class="span10">
                        <h5 class="contentCellTitle">
                            <span class="badge"><%= type %></span> <%= fields.title %></h5>
                        <span class="contentCellID">[Event-ID:&nbsp;<%= id %>]</span>
                        <p class="contentCellDescription"><%= fields.description %></p>
                    </div>
                </a>
            </div>
        `)

        const headerTemplate = _.template(`
            <a href=""><%= value %></a>
        `)

        let hideVideo = () => {
            $eventFilters.hide();
            $videoContainer.empty().hide();
        }

        let setUpHeader = function (breadcrumbs) {
            let groupId = breadcrumbs.Group
            let crumbKeys = Object.keys(breadcrumbs)
            let crumbs = _.map(breadcrumbs, (v,k) => {
                let $crumb = $(headerTemplate({value:k}))
                $crumb.click((evt) => {
                    evt.preventDefault()
                    if (k === 'Groups' && crumbKeys.length > 1) {
                        showGroups()
                    } else if (k === 'Group' && crumbKeys.length > 2) {
                        showGroup({id: v})
                    } else if (k === 'Video') {
                        // showVideo({id: groupId}, {id: v})
                    } else {
                        console.log(k, v)
                    }
                })
                return $crumb
            })
            $tableHeader.empty().append(crumbs);
        }

        let showGroups = () => {
            PM2.listGroups(function(groups){
                let groupsList = [];
                _.each(groups,(g,i) => {
                    let $g = $(groupTemplate(g))
                    $g.click((evt) => {
                        evt.preventDefault()
                        showGroup(g)
                    })
                    groupsList.push($g)
                })
                $tableContent.empty().append(groupsList)
            });
            hideVideo()
            $tableContent.empty().append(loadingTemplate({message:'Groups'}))
            setUpHeader({Groups: 'Groups'})
        }

        let showGroup = (group) => {
            PM2.listEventsOfType(group.id,'video',(videos) => {
                let videoList = []
                _.each(videos,(v,i) => {
                    v.groupId = group.id
                    let $v = $(videoTemplate(v))
                    $v.click((evt) => {
                        evt.preventDefault()
                        showVideo(group,v)
                    })
                    $v.draggable({
                        opacity: 0.7,
                        helper: createDraggableCellHelper,
                        cursorAt: {
                            left: 5,
                            top: 5
                        },
                        revert: false
                    })
                    videoList.push($v)
                })
                $tableContent
                    .empty()
                    .append(videoList)
                    .off("dragstop", ".pm2VideoCell", onDropVideoPM2)
                    .on("dragstop", ".pm2VideoCell", onDropVideoPM2)
            })
            hideVideo()
            $tableContent.empty().append(loadingTemplate({message:'Videos for Group'}))
            setUpHeader({Groups: 'Groups', Group: group.id})
        }

        let showVideo = (group, video) => {
            PM2.listEventsForTimespan(group.id, video.utc_timestamp, (video.utc_timestamp.getTime() + (video.duration * 1000.0)), 'intersect', (events) => {
                let eventList = []
                _.each(events,(e,i) => {
                    e.groupId = group.id
                    let $e = $(eventTemplate(e))
                    eventList.push($e)
                })
                $eventFilters.show()
                $videoContainer.empty().append(`
                    <video width="480" controls poster="https://archive.org/download/WebmVp8Vorbis/webmvp8.gif">
                      <source src="https://archive.org/download/WebmVp8Vorbis/webmvp8.webm" type="video/webm">
                      <source src="https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4" type="video/mp4">
                      <source src="https://archive.org/download/WebmVp8Vorbis/webmvp8.ogv" type="video/ogg">
                      Your browser doesn't support HTML5 video tag.
                    </video>
                `).show()
                $tableContent.empty().append(eventList)
            })
            $tableContent.empty().append(loadingTemplate({message:'Video and Annotations …'}))
            setUpHeader({Groups: 'Groups', Group: group.id, Video: video.id})
        }

        let onDropVideoPM2 = (event) => {
            let droppedCell = $(event.target);
            let title = droppedCell.find(".contentCellTitle").html();
            let description = droppedCell.find(".contentCellDescription").html();
            let imageLink = droppedCell.find(".contentCellPosterImage img").attr("src");
            let eventType = droppedCell.data("pm2-event-type");
            let groupId = droppedCell.data("pm2-group-id");
            let eventId = droppedCell.data("pm2-event-id");

            let id = undefined;

            let grid = theGrid.container;
            let gridOffset = grid.offset();

            let createNewCell = (next) => {
                $.ajax({
                    type: "POST",
                    url: Routes.cell_new_path(APPLICATION.score_id),
                    headers: {
                    	'Content-Type': 'application/json',
                    	'user_token': 'zBy5gjdPJWHUyKYpEtrG'
                    },
                    dataType: 'json',
                    data: JSON.stringify({
                        cell: {
                            type: "video",
                            title: title,
                            description: description,
                            css_class_name: "pm2_" + parseInt(Math.random(100000)*100000,10),
                            // poster_image : "",
                            // image_name : "",
                            additional_fields: {
                                "pm2-group-id" : groupId,
                                "pm2-event-id" : eventId,
                                "pm2-event-type" : eventType,
                                "video-src" : 'blih-blah-bloh'
                            }
                        }
                    }),
                    success: function(cell, status) {
                        id = cell._id.$oid;
                        next();
                    }
                });
            }

            createNewCell(() => {
                if (gridOffset.left < currentMousePos.x && currentMousePos.x < gridOffset.left + grid.width()) {
                    if (gridOffset.top < currentMousePos.y && currentMousePos.y < gridOffset.top + grid.height()) {

                        $.each(theGrid.cells, function(index, value) {
                            if (id === value.id) {
                                id = id + "-2";
                            }
                        });

                        let scoreId = APPLICATION.score_id;
                        let setId = APPLICATION.resource_id;
                        let gridPosition = theGrid.mapPixelsToGrid(currentMousePos.x - gridOffset.left,
                            currentMousePos.y - gridOffset.top);
                        let cellAttributes = {
                            cell_id: id, //this will make sure a reference to the canonical cell is kept
                            x: gridPosition.x,
                            y: gridPosition.y
                        };
                        $.post(
                            Routes.cell_set_grid_cells_path(scoreId, setId), {
                                grid_cell: cellAttributes
                            },
                            createGridCell
                        );
                    }
                }
            });
        }

        showGroups();
    }
})();

$(initPiecemakerTab)