const validadorConfesion = (confesion) => {
  const validadorLargo = (confesion) => confesion && confesion.length < 300;
  const validadorMalasPalabras = (confesion) => {
    const palabras = ["huevito rey", "sus", "mysterion"];
    for (p of palabras) {
      if (confesion.includes(p)) {
        return false;
      }
    }
    return true;
  };

  let isValid = validadorLargo(confesion) && validadorMalasPalabras(confesion);

  // revisar que no contenga palabras prohibidas

  return { confText: confesion, isValid: isValid };
};

let confTextArea = document.getElementById("conf-text-area");
const agregarConfesion = () => {
  let { confText, isValid } = validadorConfesion(confTextArea.value);
  if (!isValid) {
    return;
  }
  let confessionForm = document.getElementById("conf-form");
  confessionForm.submit();
};
let submitConfBtn = document.getElementById("submit-conf-btn");
submitConfBtn.addEventListener("click", agregarConfesion);

// --- map logic ---
let map = L.map("map").setView([-33.457925, -70.664511], 18);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let confLatField = document.getElementById("conf-lat");
let confLngField = document.getElementById("conf-long");

let marker = L.marker();

const onMapClick = (e) => {
  let { lat, lng } = e.latlng;
  confLatField.value = lat;
  confLngField.value = lng;
  marker.setLatLng(e.latlng).addTo(map);
  console.log(e.latlng);
};

map.on("click", onMapClick);
