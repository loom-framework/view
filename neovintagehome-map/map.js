// map.js — uses AdvancedMarkerElement and InfoWindow
// Make sure markers.json is in same folder and contains objects with: name, lat, lng, description

window.initMap = function() {
  const retroStyle = [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }
  ];

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    styles: retroStyle,
    gestureHandling: "greedy",
    disableDefaultUI: true,
    streetViewControl: true
  });

  // Add KML base (visual only)
 /* const kmlUrl = "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q";
  new google.maps.KmlLayer({
    url: kmlUrl,
    map: map,
    preserveViewport: true,
    suppressInfoWindows: true
  });*/

  // InfoWindow reused (single instance)
  const infoWindow = new google.maps.InfoWindow();

  // Marker icon (change to your PNG URL). Recommend sized ~40x40
  const ICON_URL = "./icon.png"; // or remote url

  // safe function to produce popup HTML (sanitized by using only HTML from your JSON)
  function makePopupHtml(m) {
    // prefer description if present, otherwise show name
    const desc = (m.description && m.description.trim()) ? m.description : (`<strong>${escapeHtml(m.name)}</strong>`);
    return `<div class="custom-popup">${desc}</div>`;
  }

  // small helper to escape plain text (for fallback)
  function escapeHtml(s = "") {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Load markers.json
  fetch("markers.json")
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(list => {
      list.forEach(item => {
        // create DOM content for AdvancedMarkerElement
        const markerDiv = document.createElement("div");
        markerDiv.className = "my-marker";

        const img = document.createElement("img");
        img.src = ICON_URL;
        img.alt = item.name || "marker";
        markerDiv.appendChild(img);

        // Advance marker (new API)
        const advMarker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: Number(item.lat), lng: Number(item.lng) },
          map: map,
          content: markerDiv,
        });

        // Setup InfoWindow on click
        const contentHtml = makePopupHtml(item);
        advMarker.addListener("click", () => {
          infoWindow.setContent(contentHtml);
          // place it at marker position
          infoWindow.open({
            anchor: advMarker,
            map,
          });
        });
      });
    })
    .catch(err => {
      console.error("❌ Error loading markers.json:", err);
      // helpful fallback: show a small overlay or console hint
    });
};
