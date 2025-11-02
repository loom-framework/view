// map.js

async function initMap() {
  // Import Google Maps libraries (async modern way)
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // Initialize the map
  const map = new Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapId: "801093b20e8759f26d8f23d9", // optional custom Map ID
  });

  // Custom PNG icon
  const iconUrl = "https://3d.neovintagehome.com/neovintagehome-map/icon.png";

  // Load markers from your markers.json
  try {
    const response = await fetch("markers.json");
    const markers = await response.json();

    markers.forEach((m) => {
      // Create custom image element for the icon
      const iconImg = document.createElement("img");
      iconImg.src = iconUrl;
      iconImg.alt = m.name || "Marker";
      iconImg.style.width = "32px";
      iconImg.style.height = "32px";

      // Create marker
      const marker = new AdvancedMarkerElement({
        map,
        position: { lat: m.lat, lng: m.lng },
        title: m.name || "",
        content: iconImg,
      });

      // Info window content
      const popupContent = `
        <div class="marker-popup">
          <h3>${m.name || "Unnamed"}</h3>
          ${m.image ? `<img src="${m.image}" alt="${m.name}" />` : ""}
          ${m.description ? `<p>${m.description}</p>` : ""}
          ${m.link ? `<a href="${m.link}" target="_blank">View Details</a>` : ""}
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({ content: popupContent });

      marker.addListener("click", () =>
        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        })
      );
    });
  } catch (err) {
    console.error("Error loading markers.json:", err);
  }
}

// Initialize map
initMap();
