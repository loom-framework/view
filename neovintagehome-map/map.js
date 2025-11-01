async function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20, lng: 0 },
    zoom: 2,
    disableDefaultUI: true,
    streetViewControl: true,
  });

  try {
    const response = await fetch("markers.json");
    const markers = await response.json();

    markers.forEach(m => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: m.lat, lng: m.lng },
        map,
        title: m.name,
      });

      const info = new google.maps.InfoWindow({
        content: `
          <div style="max-width:250px">
            <h3>${m.name}</h3>
            <p>${m.description}</p>
            ${m.image ? `<img src="${m.image}" width="100%">` : ""}
          </div>
        `
      });

      marker.addListener("click", () => info.open({ anchor: marker, map }));
    });
  } catch (err) {
    console.error("Error loading markers.json:", err);
  }
}

window.initMap = initMap;
