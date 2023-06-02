// Create the Leaflet map
var map = L.map('map').setView([30.3782, -89.9340], 10);
// Add the custom WMS basemap layer
var wms2023 = L.tileLayer.wms('https://imagery.geoportalmaps.com/lizardtech/iserv/ows', {
    layers: 'StTammany2023'
    , format: 'image/jpeg'
    , transparent: true
    , tileSize: 1024
}).addTo(map);
// Add the sales parcels layer with customized marker style
var salesParcels = L.geoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 5, // Adjust the marker size as needed
            fillColor: 'blue', // Customize the marker fill color
            color: 'white', // Customize the marker border color
            weight: 1, // Customize the marker border weight
            opacity: 1, // Customize the marker opacity
            fillOpacity: 0.8 // Customize the marker fill opacity
        });
    }
    , onEachFeature: function (feature, layer) {
        // Customize the popup content here
        layer.bindPopup("<div class='custom-popup'>" + "<span class='popup-label'>Assessment No. " + feature.properties['REID'] + "</span><br><span class='popup-sub-label'>Property Class:</span> " + feature.properties['Property C'] + "<br><span class='popup-sub-label'>Sale Price:</span> $" + feature.properties['Sale Price'] + "<br><span class='popup-sub-label'>Sale Date:</span> " + feature.properties['Sale Date'] + "<br><span class='popup-sub-label'>Document No.:</span> " + feature.properties['Ownership'] + "<br><span class='popup-sub-label'>Sale Type:</span> " + feature.properties['Sale Type'] + "<br><span class='popup-sub-label'>Disqualification Reason:</span> " + feature.properties['Sale Disqu'] + "</div>");
    }
}).addTo(map);
// Load the sales parcels GeoJSON data
fetch("data/2022-sales-parcels.geojson").then(response => response.json()).then(data => {
    // Print the GeoJSON data to the console
    console.log(data);
    // Add the GeoJSON data to the sales parcels layer
    salesParcels.addData(data);
    // Fit the map to the bounds of the sales parcels layer
    map.fitBounds(salesParcels.getBounds());
});