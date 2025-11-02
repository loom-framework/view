async function initMap() {
  // Load required Google Maps libraries
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 37.43238, lng: -122.16795 },
    mapId: "801093b20e8759f26d8f23d9",
  });

  try {
    const response = await fetch("./markers.json");
    const properties = await response.json();

    const bounds = new google.maps.LatLngBounds();

    properties.forEach((property) => {
      const marker = new AdvancedMarkerElement({
        map,
        position: property.position,
        title: property.description,
        content: buildContent(property),
      });

      marker.addListener("click", () => toggleHighlight(marker, property));
      bounds.extend(property.position);
    });

    // Fit map to include all markers
    map.fitBounds(bounds);
  } catch (err) {
    console.error("Error loading markers.json:", err);
  }
}

function toggleHighlight(markerView, property) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    document.querySelectorAll(".property").forEach((el) => el.classList.remove("highlight"));
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function buildContent(property) {
  const content = document.createElement("div");
  content.classList.add("property");

  content.innerHTML = `
    <div class="icon">
      <img src="./icon.png" alt="${property.type}" />
    </div>
    <div class="details">
      <div class="price">${property.price}</div>
      <div class="address">${property.address}</div>
      <div class="features">
        <div>🛏 ${property.bed}</div>
        <div>🛁 ${property.bath}</div>
        <div>📏 ${property.size} ft<sup>2</sup></div>
      </div>
    </div>
  `;
  return content;
}

initMap();
