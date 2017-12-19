
L.mapbox.accessToken = 'pk.eyJ1Ijoid3RnZW9ncmFwaGVyIiwiYSI6ImNpdGFicWJqYjAwdzUydHM2M2g0MmhsYXAifQ.oO-MYNUC2tVeXa1xYbCIyw';
    
var southWest = L.latLng(35.017, -101.882),
    northEast = L.latLng(35.062, -101.801),
    bounds = L.latLngBounds(southWest, northEast);
    
var map = L.mapbox.map('map');
map.options.maxBounds = bounds;
map.options.maxZoom = 19;
map.options.minZoom = 10;
    
var myLayer = L.mapbox.featureLayer().addTo(map);

var roadsLayer = L.mapbox.featureLayer()
    .loadURL('/js/neighborhoods.geojson')
    .addTo(map);
    
roadsLayer.on('ready', function() {
        roadsLayer.setStyle({
            weight: 2,
            opacity: 1,
            color: 'red',
            dashArray: '4',
            Opacity: .5        
        }); 
});

var bordersLayer  = L.mapbox.featureLayer()
    .loadURL('/js/borders.geojson')
    .addTo(map);
bordersLayer.on('ready', function() {
        bordersLayer.setStyle({
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '5',
            Opacity: .5        
        }); 
});  
L.control.layers({
    'Topo': L.mapbox.tileLayer('mapbox.outdoors').addTo(map),
    'Satellite': L.mapbox.tileLayer('mapbox.satellite')
}, {
    'Camp Rd - 1.5 mi': roadsLayer,
    'POIs': myLayer
}).addTo(map);
    
//////////////////////////////////////////////////////////////////////////////////////////
// Add custom popup html to each marker.
myLayer.on('layeradd', function(e) {
    var marker = e.layer;
    var feature = marker.feature;
    var images = feature.properties.images
    var slideshowContent = '';

    // Create custom popup content
    var popupContent =  '<div id="' + feature.properties.id + '" class="popup">' +
                            '<h2>' + feature.properties.title + '</h2>' +
                            '<div class="slideshow">' +
                                slideshowContent +
                            '</div>' +
                            '<div class="cycle">' +
                                '<a href="#" class="prev">&laquo; Previous</a>' +
                                '<a href="#" class="next">Next &raquo;</a>' +
                            '</div>'
                        '</div>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 320
    });
});

// Add features to the map
myLayer.setGeoJSON(markers);

map.setView([35.04010, -101.83987], 16);