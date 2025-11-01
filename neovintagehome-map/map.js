function initMap() {
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

  const kmlUrl =
    "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q";

  const kmlLayer = new google.maps.KmlLayer({
    url: kmlUrl,
    map: map,
    preserveViewport: true,
    suppressInfoWindows: false,
  });

  const customIcon = "https://3d.neovintagehome.com/neovintagehome-map/neovintage_home.png"; // your custom marker PNG

  // KML doesn't expose markers directly, so we listen for click events and create our own info windows
  const infoWindow = new google.maps.InfoWindow();

  kmlLayer.addListener("click", function(event) {
    const content = `
      <div style="min-width:200px;">
        <h3 style="margin:0;">${event.featureData.name}</h3>
        <div>${event.featureData.description || ""}</div>
        <a href="${event.featureData.link || "#"}" target="_blank">Open location</a>
      </div>`;
    infoWindow.setContent(content);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  kmlLayer.addListener("status_changed", () => {
    console.log("KML status:", kmlLayer.getStatus());
  });

  console.log("✅ Map initialized with retro style and live KML.");
}
