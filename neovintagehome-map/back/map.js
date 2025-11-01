let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    mapTypeId: "roadmap",
  });

  // Base KML Layer (visual reference only)
  const kmlUrl =
    "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q";

  new google.maps.KmlLayer({
    url: kmlUrl,
    map: map,
    preserveViewport: true,
    suppressInfoWindows: true,
  });

  // Custom markers from JSON
  fetch("markers.json")
    .then((res) => res.json())
    .then((markers) => {
      markers.forEach((m) => {
        const marker = new google.maps.Marker({
          position: { lat: m.lat, lng: m.lng },
          map: map,
          title: m.name,
          icon: "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
        });

        const info = new google.maps.InfoWindow({
          content: `<div style="max-width:250px">${m.description}</div>`,
        });

        marker.addListener("click", () => {
          info.open(map, marker);
        });
      });
    })
    .catch((err) => console.error("❌ Error loading markers.json:", err));
}

window.initMap = initMap;
