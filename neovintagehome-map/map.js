// Attach initMap to window so Google Maps callback finds it
window.initMap = function() {

  // Retro map style
  const retroStyle = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }
  ];

  // Create the map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    styles: retroStyle,
    gestureHandling: "greedy",
    disableDefaultUI: true,
    streetViewControl: true
  });

  // Add live KML layer as background
  const kmlUrl = "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q";
  const kmlLayer = new google.maps.KmlLayer({
    url: kmlUrl,
    map: map,
    preserveViewport: true,
    suppressInfoWindows: true, // suppress default popups
  });

  // Custom marker icon
  const markerIcon = "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg";

  // Load custom JSON markers
  fetch('markers.json')
    .then(res => res.json())
    .then(markers => {
      markers.forEach(m => {
        const marker = new google.maps.Marker({
          position: { lat: m.lat, lng: m.lng },
          map: map,
          icon: markerIcon,
          title: m.title
        });

        const infoWindow = new google.maps.InfoWindow({
          content: m.html
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    })
    .catch(err => console.error("Failed to load markers:", err));
};
