// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([34.03, -82.20], 5);

// Add base layer
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

fetch('https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson?$where=latitude is not null')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Create the Leaflet layer for the data 
    var complaintData = L.geoJson(data, {
      
      // We make the points circles instead of markers so we can style them
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng);
      },
      
      // Then we can style them as we would other features
      style: function (geoJsonFeature) {
        return {
          fillColor: '#11a381',
          radius: 6,
          fillOpacity: 0.1,
          stroke: false
        };
      }
    });
  
    // Add data to the map
    complaintData.addTo(map);
  
    // Move the map view so that the complaintData is visible
    map.fitBounds(complaintData.getBounds());
  });