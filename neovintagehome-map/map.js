async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 20, lng: 0 },
    mapId: "801093b20e8759f26d8f23d9", // replace if you have your own Map ID
  });

  // Load markers from your JSON
  fetch("markers.json")
    .then(response => response.json())
    .then(markers => {
      markers.forEach(m => {
        // Create custom HTML marker
        const markerDiv = document.createElement("div");
        markerDiv.classList.add("custom-marker");
        markerDiv.innerHTML = `
          <img src="icon.png" alt="Marker" />
          <div class="custom-marker-label">${m.name}</div>
        `;

        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: m.lat, lng: m.lng },
          content: markerDiv,
          title: m.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="max-width:200px;">
              <h3>${m.name}</h3>
              ${m.image ? `<img src="${m.image}" style="width:100%;border-radius:8px;margin:5px 0;" />` : ""}
              ${m.description ? `<p>${m.description}</p>` : ""}
              ${m.link ? `<a href="${m.link}" target="_blank">View more</a>` : ""}
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map,
          });
        });
      });
    })
    .catch(err => console.error("Error loading markers:", err));
}

window.initMap = initMap;
