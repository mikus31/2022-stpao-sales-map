// Create the Leaflet map
var map = L.map('map').setView([30.3782, -89.9340], 10);
// Add the aerial imagery basemap
var aerialImagery = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
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
        layer.bindPopup("Sale Price: $" + feature.properties.SalePrice);
    }
}).addTo(map);
// Load the sales parcels GeoJSON data
fetch("data/2022-sales-parcels-wgs84.geojson").then(response => response.json()).then(data => {
    // Print the GeoJSON data to the console
    console.log(data);
    // Add the GeoJSON data to the sales parcels layer
    salesParcels.addData(data);
});