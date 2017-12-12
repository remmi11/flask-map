var center = new L.LatLng(35.174930849, -101.83296203);
var map = new L.Map('map', {
    center: center,
    zoom: 12,
    maxZoom: 18,
    //maxNativeZoom:21,
    zoomControl: false,
    detectRetina: true
});

// $.getJSON("/static/js/cupcakes.json", function(data) {
//     var geojson = L.geoJson(data, {
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup(feature.properties.name);
//         }
//     });
//     var map = L.map('map').fitBounds(geojson.getBounds());
//     cupcakeTiles.addTo(map);
//     geojson.addTo(map);
// });

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(map);

//$.getJSON("/static/js/tracts.json", function(data) { addDataToMap(data, map); });

$.getJSON("/static/js/neighborhoods.json", function(data) {
    var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {            
                        content = (
                            "<strong>Address: </strong>" + feature.properties.NAME + "<br>"
                            + "<strong>Description: </strong>" + feature.properties.COMMPLAN + "<br>"
                            + "<strong>Surveyor: </strong>" + feature.properties.SHARED + "<br>"
                            + "<strong>Certify To: </strong>" + feature.properties.COALIT + "<br>"
                        );
            
                        var popup = L.popup().setContent(content);
                        layer.bindPopup(content);
                        // layer.on({
                        //     mouseover: highlightFeature,
                        //     mouseout: resetHighlight
                        // });
                    }}).addTo(map);
    map.fitBounds(geojson.getBounds());
});