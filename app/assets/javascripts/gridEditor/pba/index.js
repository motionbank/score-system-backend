// xxx = require babel-polyfill/browser-polyfill
//= require sparql-hollandaise

$(function initPinaBauschArchive () {

    var SPH_ENDPOINT = 'https://pbproxy.herokuapp.com/repositories/PBAe';
    var SPH_ENDPOINT_AUTH = { basic: { username: 'moba', password: 'qXf-P78-8s7-3Qd' }};
    var SPH_ENDPOINT_METHOD = 'GET';
    var SPH_DEFAULT_PREFIXES = ['schema:<http://schema.org/>','owl:<http://www.w3.org/2002/07/owl#>',
        'pext:<http://proton.semanticweb.org/protonext#>','xsd:<http://www.w3.org/2001/XMLSchema#>',
        'psys:<http://proton.semanticweb.org/protonsys#>','skos:<http://www.w3.org/2004/02/skos/core#>',
        'rdfs:<http://www.w3.org/2000/01/rdf-schema#>','media:<http://purl.org/media#>',
        'frbr:<http://purl.org/vocab/frbr/core#>','pba:<http://www.pinabausch.org/resource/>',
        'geo:<http://www.w3.org/2003/01/geo/wgs84_pos#>','places:<http://purl.org/ontology/places#>',
        'pbao:<http://www.pinabausch.org/pbao#>','dct:<http://purl.org/dc/terms/>',
        'rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>','xml:<http://www.w3.org/XML/1998/namespace>',
        'tl:<http://purl.org/NET/c4dm/timeline.owl#>','gnd:<http://d-nb.info/standards/elementset/gnd#>',
        'event:<http://purl.org/NET/c4dm/event.owl#>','foaf:<http://xmlns.com/foaf/0.1/>',
        'dc:<http://purl.org/dc/elements/1.1/>'];

	var $tabContainer = $('#pbaTabContentContainer');
	var $tableHeader = $('.table-header-form',$tabContainer);
	var $table = $('.cellTable',$tabContainer);

	function createQuery () {
        return new SPH.Query(SPH_ENDPOINT, SPH_ENDPOINT_AUTH, SPH_ENDPOINT_METHOD).prefix(SPH_DEFAULT_PREFIXES);
    }

	$tableHeader.find('a').each(function(i,e){
		var $e = $(e),
			id = $e.attr('id');
		$e.click(function(evt){
			evt.preventDefault();
			if ( id == 'pieces' ) {
				populatePieces();
			} else if ( id == 'people' ) {
				populatePeople();
			} else if ( id == 'locations' ) {
				populateLocations();
			}
			return false;
		});
	});

	function populatePieces () {

		var pattern = new SPH.GraphPattern([
            '?piece a pbao:Piece',
            '?piece rdfs:label ?piece_label',
            '?piece dct:created ?date'
        ]);
        pattern.addElement(new SPH.Filter('langMatches( lang(?piece_label), "de" )'));
        var group = new SPH.GroupGraphPattern(pattern);
        var query = createQuery()
            .select('*')
            .where(group)
            .order('?date')

        query.exec().then(function (results) {

            var template = _.template(
                '<div id="pbaContentCell_<%= id %>" data-pba-uri="<%= uri %>" data-type="piece" class="row-fluid contentCell pbaCell">'+
                '<div class="contentCellPosterImage span1"><img src="/dev-assets/fallback/small_default.png"></div>'+
                '<div class="span10">'+
                '<h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> '+
                '<span class="contentCellID">[URI:&nbsp;<%= uri %>]</span>'+
                '<p class="contentCellDescription"><%= description %></p>'+
                '</div>'+
                '<script class="cell-data" type="text/json-string"><%= cell_data %></script>'+
                '</div>');
            var pieces = results.bindings;
            var html = '';
            if ( pieces && pieces.length > 0 ) {
                pieces.forEach(function(r,n){
                    var uri = r.piece.value;
                    let title = r.piece_label.value
					let description = ''
                    let type = 'piece'
					let iframe_src = 'http://lab.motionbank.org/pba/generic/?uri=' + uri.replace(/.+\/([a-z0-9]+)#(.+)$/ig,'$1:$2') + '&type=' + type + '&style=video'
                    let cellData = {
                        type: 'iframe',
                        title: title,
                        description: description,
                        additional_fields: {
                            'attr-allowfullscreen': true,
                            'iframe-src': iframe_src,
                            "pba-uri" : uri,
                            "pba-type" : type
                        }
                    };
                    html += template({
                        id : '-1',
                        type : type,
                        uri : uri,
                        title : title,
                        description : description,
						cell_data: JSON.stringify(cellData)
                    });
                });
            }

            $table
                .html(html)
                .find(".pbaCell")
                .each(function(i,e){
                    e.addEventListener('dragstart',(function(cell){
                        return function (event) {
                            let cellData = $('.cell-data', cell).html()
                            event.dataTransfer.setData('application/json', cellData)
                        }
                    })(e))
                })

        }).catch((err) => {
            console.log(err)
        })
    }
	
	var peopleFirstLetter = 'p';

	function populatePeople () {

		/*
		SELECT DISTINCT ?file
WHERE {
  ?file frbr:exemplarOf ?image .
  ?image a pbao:Photograph .
  FILTER regex( str(?file), "500$" )
  ?image pbao:depicts pbao:pina_bausch .
  OPTIONAL { ?image pbao:subseries pbao:subs47 }
}
ORDER BY ?file
LIMIT 10
*/

        var pattern = new SPH.GraphPattern([
            '?person a pbao:Person',
            '?person rdfs:label ?person_label',
            '?piece dct:created ?date'
        ]);
        pattern.addElement(new SPH.Filter('regex( str(?person), "resource/'+peopleFirstLetter+'" )'));
        var group = new SPH.GroupGraphPattern(pattern);
        var query = createQuery()
            .select('DISTINCT ?person ?person_label')
            .where(group)
            .order('?person_label')

		console.log(query.toString())
        query.exec().then(function (results) {
			var template = _.template(
			  '<div id="pbaContentCell_<%= id %>" data-pba-uri="<%= uri %>" data-type="person" class="row-fluid contentCell pbaCell">'+
				'<div class="contentCellPosterImage span1"><img src="/dev-assets/fallback/small_default.png"></div>'+
				'<div class="span10">'+
					'<h5 class="contentCellTitle"><span class="badge"><%= type %></span> <%= title %></h5> '+
					'<span class="contentCellID">[URI:&nbsp;<%= uri %>]</span>'+
					'<p class="contentCellDescription"><%= description %></p>'+
				'</div>'+
                '<script class="cell-data" type="text/json-string"><%= cell_data %></script>'+
			  '</div>');
			var persons = results.bindings;
			var html = '';
			if ( persons && persons.length > 0 ) {
				persons.forEach(function(r,n){
					var uri = r.person.value;
					var title = r.person_label.value;
                    let description = ''
                    let type = 'person'
                    let iframe_src = 'http://lab.motionbank.org/pba/generic/?uri=' + uri.replace(/.+\/([a-z0-9]+)#(.+)$/ig,'$1:$2') + '&type=' + type
                    let cellData = {
                        type: 'iframe',
                        title: title,
                        description: description,
                        additional_fields: {
                            'attr-allowfullscreen': true,
                            'iframe-src': iframe_src,
                            "pba-uri" : uri,
                            "pba-type" : type
                        }
                    };
					html += template({
						id : '-1',
						type : type,
						uri : uri,
						title : title,
						description : description,
						cell_data: JSON.stringify(cellData)
					});
				});
			}

            $table
                .html(html)
                .find(".pbaCell")
                .each(function(i,e){
                    e.addEventListener('dragstart',(function(cell){
                        return function (event) {
                            let cellData = $('.cell-data', cell).html()
                            event.dataTransfer.setData('application/json', cellData)
                        }
                    })(e))
                })
		});
	}
})