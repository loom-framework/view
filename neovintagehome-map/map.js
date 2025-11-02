// map.js
export function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapId: "801093b20e8759f26d8f23d9", // Replace with your Map ID
    gestureHandling: "greedy",
    disableDefaultUI: false,
  });

  // Load markers from JSON
  fetch("markers.json")
    .then((response) => response.json())
    .then((markers) => {
      markers.forEach((m) => {
        // Create AdvancedMarkerElement
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: m.lat, lng: m.lng },
          title: m.name,
        });

        // Popup content
        const content = `
          <div class="marker-popup">
            <h3>${m.name}</h3>
            ${m.image ? `<img src="${m.image}" alt="${m.name}"/>` : ""}
            ${m.description ? `<p>${m.description}</p>` : ""}
            ${m.link ? `<a href="${m.link}" target="_blank">View Property</a>` : ""}
          </div>
        `;

        // InfoWindow for popup
        const infoWindow = new google.maps.InfoWindow({
          content,
        });

        // Show popup on click
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    })
    .catch((err) => {
      console.error("Error loading markers.json:", err);
    });
}

// Expose initMap globally for callback
window.initMap = initMap;
