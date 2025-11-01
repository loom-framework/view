async function initMap() {
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

  const KML_URL =
    "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q";

  // ✅ Temporary icon (you can replace this later)
  const customIcon = {
    url: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png", // default red pin
    scaledSize: new google.maps.Size(32, 32),
    anchor: new google.maps.Point(16, 32)
  };

  try {
    const response = await fetch(KML_URL);
    const kmlText = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(kmlText, "text/xml");
    const placemarks = xml.getElementsByTagName("Placemark");

    const infoWindow = new google.maps.InfoWindow();

    for (let i = 0; i < placemarks.length; i++) {
      const name = placemarks[i].getElementsByTagName("name")[0]?.textContent || "Untitled";
      const description = placemarks[i].getElementsByTagName("description")[0]?.textContent || "";
      const coords = placemarks[i].getElementsByTagName("coordinates")[0]?.textContent.trim().split(",");
      if (!coords || coords.length < 2) continue;

      const lng = parseFloat(coords[0]);
      const lat = parseFloat(coords[1]);

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        icon: customIcon,
        title: name
      });

      const popupContent = `
        <div style="max-width:250px;font-family:Roboto,Arial,sans-serif;">
          <h3 style="margin:0;color:#523735;">${name}</h3>
          <p style="margin:4px 0;">${description}</p>
          <button style="background:#523735;color:#fff;padding:6px 10px;border:none;border-radius:4px;cursor:pointer;"
            onclick="window.open('https://3d.neovintagehome.com','_blank')">
            Visit Site
          </button>
        </div>`;

      marker.addListener("click", () => {
        infoWindow.setContent(popupContent);
        infoWindow.open(map, marker);
      });
    }
  } catch (err) {
    console.error("❌ Failed to load KML:", err);
  }
}

window.initMap = initMap;
