async function initMap() {
  const retroStyle = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }
  ];

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.7279, lng: 17.7106 },
    zoom: 3,
    styles: retroStyle,
    gestureHandling: "greedy",
    disableDefaultUI: true,
    streetViewControl: true
  });

  // Optional: add KML for visual base (markers suppressed)
  // const kmlLayer = new google.maps.KmlLayer({
  //   url: "YOUR_KML_URL",
  //   map: map,
  //   preserveViewport: true,
  //   suppressInfoWindows: true
  // });

  // Load JSON markers
  try {
    const response = await fetch('markers.json');
    const markers = await response.json();

    const iconUrl = 'https://cdn-icons-png.flaticon.com/512/684/684908.png';

    markers.forEach(data => {
      const marker = new google.maps.Marker({
        position: { lat: data.lat, lng: data.lng },
        map: map,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      const popupContent = `
        <div class="popup-content">
          <h3>${data.name}</h3>
          <img src="${data.image}" />
          <p><a href="${data.link}" target="_blank">View More</a></p>
        </div>
      `;

      const infowindow = new google.maps.InfoWindow({ content: popupContent });

      marker.addListener("click", () => infowindow.open(map, marker));
    });

  } catch (err) {
    console.error("Failed to load markers:", err);
  }
}
