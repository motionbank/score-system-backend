let initPiecemakerTab = (function(){
    let PM2 = new PieceMakerApi({
        host: 'https://piecemaker2-api-public.herokuapp.com',
        api_key: '0310XPC6JEeF0oCy'
    });
    return function () {
        const $tab = $('#pm2ContentCells')
        const $tableHeader = $('.table-header-form',$tab)
        const $tableContent = $('.cellTable',$tab)

        const groupTemplate = _.template(`
            <div id="pm2GroupCell_<%= id %>" class="row-fluid contentCell pm2GroupCell">
                <a href="#">
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
            <div>Loading <%= message %></div>
        `)

        const videoTemplate = _.template(`
            <div id="pm2VideoCell_<%= id %>" class="row-fluid contentCell pm2VideoCell ui-draggable">
                <div class="contentCellPosterImage span1"><img src="/irgendwo/im/nirgendwo/video-<%= id %>.png"></div>
                <div class="span10">
                    <h5 class="contentCellTitle">
                        <span class="badge">video</span> <%= fields.title %></h5>
                    <span class="contentCellID">[Video-ID:&nbsp;<%= id %>]</span>
                    <p class="contentCellDescription"><%= fields.description %></p>
                </div>
            </div>
        `)

        let setUpHeader = function () {
            $tableHeader.append(``);
        }

        let showGroups = () => {
            PM2.listGroups(function(groups){
                let groupsList = [];
                _.each(groups,(g,i) => {
                    let $g = $(groupTemplate(g))
                    $g.click(() => {
                        showGroup(g)
                    })
                    groupsList.push($g)
                })
                $tableContent.empty().append(groupsList)
            });
            $tableContent.empty().append(loadingTemplate({message:'Groups'}))
        }

        let showGroup = (group) => {
            PM2.listEventsOfType(group.id,'video',(videos) => {
                let videoList = []
                _.each(videos,(v,i) => {
                    let $v = videoTemplate(v)
                    videoList.push($v)
                })
                $tableContent.empty().append(videoList)
            })
            $tableContent.empty().append(loadingTemplate({message:'Videos for Group'}))
        }

        showGroups();
    }
})();