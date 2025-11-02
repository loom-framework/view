async function initMap() {
  const retroStyle = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }
  ];

  // 🗺️ Initialize map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.7279, lng: 17.7106 },
    zoom: 4,
    mapId: "801093b20e8759f26d8f23d9", // 👈 Replace with your actual Map ID
    styles: retroStyle,
    gestureHandling: "greedy",
    disableDefaultUI: true,
    streetViewControl: true
  });

  // 🧩 Load live KML layer (base map)
  const kmlUrl = "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q";
  const kmlLayer = new google.maps.KmlLayer({
    url: kmlUrl,
    map: map,
    preserveViewport: true,
    suppressInfoWindows: true
  });

  // 🖼️ Load custom JSON markers
  try {
    const response = await fetch("markers.json");
    const markers = await response.json();

    const infoWindow = new google.maps.InfoWindow();

    markers.forEach((markerData) => {
      const position = { lat: markerData.lat, lng: markerData.lng };

      // Custom icon (your PNG)
      const iconElement = document.createElement("img");
      iconElement.src = "marker-icon.png"; // 👈 Put your PNG in same folder
      iconElement.style.width = "32px";
      iconElement.style.height = "32px";

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position,
        title: markerData.title,
        content: iconElement,
      });

      marker.addListener("click", () => {
        const html = `
          <div class="info-window">
            <h3>${markerData.title || "Untitled"}</h3>
            <p>${markerData.description || "No description available."}</p>
            ${markerData.image ? `<img src="${markerData.image}" style="width:100%; border-radius:6px; margin-top:6px;">` : ""}
          </div>
        `;
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      });
    });

  } catch (err) {
    console.error("Error loading markers.json:", err);
  }
}

window.initMap = initMap;
