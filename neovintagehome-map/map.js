async function initMap() {
  // Load required Google Maps libraries
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Map style (retro)
  const retroStyle = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }
  ];
    
    
  const map = new Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 37.43238, lng: -122.16795 },
    mapId: "801093b20e8759f26d8f23d9",
      
      styles: retroStyle,
        gestureHandling: "greedy",

        // Disable UI
        disableDefaultUI: true,
        streetViewControl: false
      
      
      
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
     <div class="image">
    <img src="${property.image}" alt="building">
  </div>
      <div class="price">${property.price}</div>
      <div class="address">${property.address}</div>
      <div class="features">
        <div>🛏 ${property.bed}</div>
        <div>🛁 ${property.bath}</div>
        <div>📏 ${property.size}</div>
      </div>
      
       <div class="listing">
        <a href="${property.url}" target="_blank" rel="noopener noreferrer">
  <div class="buy">Open Property Page</div>
</a>
      </div>
      
      
    </div></div>
  `;
  return content;
}

initMap();


