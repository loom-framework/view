function initMap() {
  // Retro map style
  const retroStyle = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }
  ];

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.727946223940904, lng: 17.71066259801293 },
    zoom: 4,
    styles: retroStyle,
    gestureHandling: "greedy",
    disableDefaultUI: true,
    streetViewControl: true
  });

  // Live My Maps KML
  const kmlUrl = "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q";

  // Custom icon
  const customIcon = "./icon.png"; // PNG in same folder

  // KML Layer
  const kmlLayer = new google.maps.KmlLayer({
    url: kmlUrl,
    map: map,
    preserveViewport: true,
    suppressInfoWindows: true, // we create our own popups
  });

  const infoWindow = new google.maps.InfoWindow();

  // Click on KML placemarks
  kmlLayer.addListener("click", (event) => {
    const content = `
      <div style="max-width:250px; font-family:Roboto,Arial,sans-serif;">
        <h3 style="margin:0 0 5px; color:#523735;">${event.featureData.name}</h3>
        <div style="margin-bottom:5px;">${event.featureData.description || ""}</div>
        <button style="
          background:#523735; color:white; border:none;
          padding:6px 10px; border-radius:4px; cursor:pointer;"
          onclick="window.open('https://3d.neovintagehome.com','_blank')">
          Visit Site
        </button>
      </div>
    `;
    infoWindow.setContent(content);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  // Optional: debug KML status
  kmlLayer.addListener("status_changed", () => {
    console.log("KML Status:", kmlLayer.getStatus());
  });

  console.log("✅ Retro map with live KML and custom popups initialized.");
}

window.initMap = initMap;
