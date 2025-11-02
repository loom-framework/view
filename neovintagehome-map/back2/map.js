function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapId: "801093b20e8759f26d8f23d9" // your Map ID
  });

  const iconUrl = "https://3d.neovintagehome.com/neovintagehome-map/icon.png"; // custom marker icon

  fetch("markers.json")
    .then((response) => response.json())
    .then((markers) => {
      markers.forEach((m) => {
        // Create custom icon as Advanced Marker content
        const iconImg = document.createElement("img");
        iconImg.src = iconUrl;
        iconImg.alt = m.name;
        iconImg.style.width = "32px";
        iconImg.style.height = "32px";

        // Create marker
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: m.lat, lng: m.lng },
          title: m.name,
          content: iconImg
        });

        // Popup (info window)
        const content = `
          <div class="marker-popup">
            <h3>${m.name}</h3>
            ${m.image ? `<img src="${m.image}" alt="${m.name}" style="width:100%;max-width:200px;border-radius:8px;"/>` : ""}
            ${m.description ? `<p>${m.description}</p>` : ""}
            ${m.link ? `<a href="${m.link}" target="_blank">View Property</a>` : ""}
          </div>
        `;

        const infoWindow = new google.maps.InfoWindow({ content });

        // Show popup on click
        marker.addListener("click", () =>
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: false
          })
        );
      });
    })
    .catch((err) => console.error("Error loading markers.json:", err));
}

// Make initMap global for Google callback
window.initMap = initMap;
