L.mapbox.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';
var map = L.mapbox.map('map', 'mapbox.outdoors');
var markerList = document.getElementById('marker-list');

L.control.layers({
    'Topo': L.mapbox.tileLayer('mapbox.outdoors').addTo(map),
    'Satellite': L.mapbox.tileLayer('mapbox.satellite')
}).addTo(map);


var defaultStyle = {
    color: "#ff9600",
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.5,
    fillColor: "#ff9600"
};

var kenStyle = {
    color: "#0067c5",
    weight: 2,
    opacity: 0.6,
    fillOpacity: 0.5,
    fillColor: "#0067c5"
};

var onEachFeature = function(feature, layer) {
    if(feature.properties.NAME === 'Kenneth Kearney'){
        layer.setStyle(kenStyle);
    } else {
        layer.setStyle(defaultStyle);
      }
    layer.bindPopup(
        "<b>Tax-Id: </b>" +
        feature.properties.PROP_ID +
        "</br>" +
        "<b>Owner: </b>" +
        feature.properties.Owner +
        "</br>" +
        "<b>Value: </b>" +
        feature.properties.ASSD_VALUE +
        "</br>" +
        "<b>Acres: </b>" +
        feature.properties.ACREAGE
    )
    };

var featureLayer = L.geoJson(parcels, {
    onEachFeature: onEachFeature
});

map.addLayer(featureLayer);
map.fitBounds(featureLayer.getBounds());

// Testing linked table
// L.mapbox.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';
// var map = L.mapbox.map('map', 'wtgeographer.44du2uz4');
// var markerList = document.getElementById('marker-list');

// map.featureLayer.on('ready', function(e) {
//     map.featureLayer.eachLayer(function(layer) {
//         var item = markerList.appendChild(document.createElement('li'));
//         item.innerHTML = layer.toGeoJSON().properties.NAME;
//         item.onclick = function() {
//            map.setView(layer.getLatLng(), 14);
//            layer.openPopup();
//         };
//     });
// });