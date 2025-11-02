function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapId: "801093b20e8759f26d8f23d9" // optional, needed for AdvancedMarkerElement styling
  });

  fetch("markers.json")
    .then((response) => response.json())
    .then((markers) => {
      markers.forEach((m) => {
        // Create a custom icon element if m.icon exists
        const markerContent = m.icon
          ? `<img src="${m.icon}" alt="${m.name}" style="width:32px;height:32px;">`
          : `<div class="default-marker"></div>`;

        // Create an AdvancedMarkerElement with custom icon
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: m.lat, lng: m.lng },
          title: m.name,
          content: markerContent
        });

        // Popup content
        const content = `
          <div class="marker-popup">
            <h3>${m.name}</h3>
            ${m.image ? `<img src="${m.image}" alt="${m.name}" style="max-width:200px;">` : ""}
            ${m.description ? `<p>${m.description}</p>` : ""}
            ${m.link ? `<a href="${m.link}" target="_blank">View Property</a>` : ""}
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({ content });

        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false
          });
        });
      });
    })
    .catch((err) => console.error("Error loading markers.json:", err));
}

// Make initMap global
window.initMap = initMap;
