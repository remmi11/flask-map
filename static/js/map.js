
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';


var streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: mbAttr,
    id: 'mapbox.streets'
});

var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: mbAttr,
    id: 'mapbox.satellite'
});

var map = new L.Map('map', {
    maxZoom: 18,
    zoomControl: false,
    detectRetina: true,
    layers: [streets, satellite]
});


$.getJSON("/static/js/neighborhoods.json", function(data) {
    var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {            
                        content = (
                            "<strong>Name: </strong>" + feature.properties.NAME + "<br>"
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

var baseMaps = {
    "Satellite": satellite,
    "Streets": streets

};

L.control.layers(baseMaps).addTo(map);
var measureControl = new L.Control.Measure({
    position: 'topright',
    primaryLengthUnit: 'feet',
    secondaryLengthUnit: 'miles',
    activeColor: '#ffff00',
    completedColor: '#f08a16'
});
measureControl.addTo(map);