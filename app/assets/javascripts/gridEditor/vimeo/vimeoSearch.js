$(function(){

    const VIMEO_ACCESS_TOKEN = "8dbc7f72ddb834a4665dbb6989014699";

    const apiBase = 'https://api.vimeo.com'
    const apiSearchVideos = '/videos'

    const $el = $('#vimeoContentCells')
    const $input = $('#vimeoSearchTerm', $el)
    const $button = $('button', $el)
    const $table = $('.cellTable', $el)

    $button.click(function (evt) {
        evt.preventDefault()
        $.get(
            apiBase + apiSearchVideos,
            {
                query: $input.val(),
                access_token: VIMEO_ACCESS_TOKEN
            },
            function success (data) {
                if (data) populateTable(data.data)
            });
    })

    function populateTable ( items ) {

        if (items.length === 0) {
            $table.empty();
            $table.html('<div>No results</div>')
            return;
        }

        var template = _.template(
            '<div id="vimeoCell_<%= vimeo_id %>" data-vimeo-id="<%= vimeo_id %>" class="row-fluid contentCell availableCell vimeo-cell">'+
            '<div class="contentCellPosterImage span1" draggable><img src="<%= poster_image.url %>"></div>'+
            '<div class="span10">'+
            '<h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> '+
            '<span class="contentCellID">[Vimeo-ID:&nbsp;<a href="<%= link %>" target="_blank"><%= vimeo_id %>]</a></span>'+
            '<p class="contentCellDescription"><%= description %></p></div>'+
            '<a class="btn" href="/<%= APPLICATION["score_id"] %>/cells/<%= id %>/edit"><i class="icon-edit"></i> Edit</a>'+
            '<script class="cell-data" type="text/json-string"><%= cell_data %></script>'+
            '</div>');

        let html = '';

        items.forEach(function(e,i){
            let vimeo_id = e.uri.split('/').pop();
            let iframe_src = $(e.embed.html).attr('src');
            let cellData = {
                type: 'iframe',
                title: e.name,
                description: e.description,
                additional_fields: {
                    'vimeo-id': vimeo_id,
                    'attr-allowfullscreen': true,
                    'iframe-src': iframe_src
                }
            };
            html += template({
                id:'-1',
                type: 'vimeo-video',
                title: e.name,
                link: e.link,
                description: e.description ? e.description.substr(0,300) : '',
                poster_image: {
                    url: e.pictures && e.pictures.length > 0 ? e.pictures.pop().link : ''
                },
                vimeo_id: vimeo_id,
                cell_data: JSON.stringify(cellData)
            });
        });

        $table
            .html(html)
            .find(".vimeo-cell")
            .each(function(i,e){
                e.addEventListener('dragstart',(function(cell){
                    return function (event) {
                        let cellData = $('.cell-data', cell).html()
                        event.dataTransfer.setData('application/json', cellData)
                    }
                })(e))
            })
    }
});