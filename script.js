// Initialize the map to Dhaka
var map = L.map('map').setView([23.8103, 90.4125], 13);

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Function to add markers with custom info
function addMarker(lat, lng, info) {
  var marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(info);
}

function addMarkersFromSheet(data) {
  data.values.forEach(row => {
    var lat = parseFloat(row[0]);
    var lng = parseFloat(row[1]);
    var place = row[2];
    addMarker(lat, lng, place)
  });
}

// Add a marker with dynamic time
function addMarkerWithTime(lat, lng, place) {
  var now = new Date();
  var hours = String(now.getHours()).padStart(2, '0');
  var minutes = String(now.getMinutes()).padStart(2, '0');
  var seconds = String(now.getSeconds()).padStart(2, '0');
  var timeString = `${hours}:${minutes}:${seconds}`;

  var info = `${place} - \n Time: ${timeString}`;
  addMarker(lat, lng, info);
}

fetch('https://sheets.googleapis.com/v4/spreadsheets/1UbiKTLssW4S67Kh03ZZVPxEl2DYWVgnP7C1uanjUg3k/values/Sheet1?key=AIzaSyDYpH5oeeaVfVTiUKADejqB3sPpA8LW_mY')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data fetched:', data); // Log the fetched data
    addMarkersFromSheet(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to update the current time in the header
function updateTime() {
  var now = new Date();
  var hours = String(now.getHours()).padStart(2, '0');
  var minutes = String(now.getMinutes()).padStart(2, '0');
  var seconds = String(now.getSeconds()).padStart(2, '0');
  var timeString = `${hours}:${minutes}:${seconds}`;

  document.getElementById('current-time').textContent = timeString;
}

// Call updateTime every second to keep the time updated
setInterval(updateTime, 1000);
