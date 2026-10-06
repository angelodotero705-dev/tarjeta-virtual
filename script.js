/* =========================================================
   CONFIGURACIÓN — CAMBIA SOLO ESTA PARTE PARA CADA INVITACIÓN
   ========================================================= */
const DATA = {
  names: "Eder & Mayra",
  dateISO: "2026-11-07T20:30:00",
  dateText: "07 · 11 · 2026",
  place: "San Agustín de Cajas · Huancayo · Perú",
  quote: "“Nos uniremos en matrimonio y será una gran alegría compartir este momento tan especial con ustedes.”",

  groomParents: "Esequiel Canteño Justiniano<br>Luisa Adriana Yupanqui viuda de Canteño",
  brideParents: "Serapio Lucio Nuñez Solano<br>Ada Frida Cuyutupac Chipana",
  godparents: "Edwin Francisco Onofre Aquino<br>&amp; Hada Solano Cáceres",

  church: {
    name: "Parroquia San Agustín de Hipona",
    date: "07 de noviembre · 08:30 p.m.",
    address: "San Agustín de Cajas — Huancayo, Perú",
    maps: "https://maps.app.goo.gl/Y44B5Lf8Lq6FWtEj8"
  },

  reception: {
    name: "Local “El Paraíso”",
    date: "Después de la ceremonia",
    address: "San Agustín de Cajas — Huancayo, Perú",
    maps: "https://maps.app.goo.gl/mhw82bftn1zx5eaX8"
  },

  /* La primera foto es la portada. Las demás aparecen en la galería. */
  hero: "assets/fotos/hero.jpg.jpg",
  photos: [
    "assets/fotos/foto1.jpg.jpg",
    "assets/fotos/foto2.jpg.jpg",
    "assets/fotos/foto3.jpg.jpg",
    "assets/fotos/foto4.jpg.jpg",
    "assets/fotos/foto5.jpg.jpg",
    "assets/fotos/foto6.jpg.jpg",
    "assets/fotos/foto7.jpg.jpg",
    "assets/fotos/foto8.jpg.jpg",
    "assets/fotos/foto9.jpg.jpg"
  ],

  /* Formato internacional. Perú: 519XXXXXXXX */
  whatsapp: "51964297932"
};
/* ========================================================= */

const $ = (id) => document.getElementById(id);
const setHTML = (id, value) => {
  const element = $(id);
  if (element) element.innerHTML = value ?? "";
};
const setText = (id, value) => {
  const element = $(id);
  if (element) element.textContent = value ?? "";
};

/* Datos generales */
["openNames", "names", "storyNames", "footerNames"].forEach((id) => setHTML(id, DATA.names));
["openDate", "date", "storyDate"].forEach((id) => setText(id, DATA.dateText));
setText("place", DATA.place);
setText("storyPlace", DATA.place);
setHTML("quote", DATA.quote);
setHTML("groomParents", DATA.groomParents);
setHTML("brideParents", DATA.brideParents);
setHTML("godparents", DATA.godparents);
setText("churchName", DATA.church.name);
setText("churchDate", DATA.church.date);
setText("churchAddress", DATA.church.address);
setText("receptionName", DATA.reception.name);
setText("receptionDate", DATA.reception.date);
setText("receptionAddress", DATA.reception.address);
setText("footerDate", `${DATA.dateText} — ${DATA.place}`);

/* Título del navegador y fondo de portada */
document.title = `Nos casamos · ${DATA.names}`;
const hero = document.querySelector(".hero");
if (hero && DATA.hero) hero.style.setProperty("--hero-image", `url("${DATA.hero}")`);

/* Enlaces de mapas */
function setMapLink(id, url) {
  const link = $(id);
  if (!link) return;
  link.href = url || "#";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.hidden = !url;
}
setMapLink("churchMap", DATA.church.maps);
setMapLink("receptionMap", DATA.reception.maps);

/* Galería */
const gallery = $("gallery");
let currentPhoto = 0;

function renderGallery() {
  if (!gallery) return;
  gallery.innerHTML = "";
  DATA.photos.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${DATA.names} — Foto ${index + 1}`;
    img.loading = "lazy";
    img.addEventListener("click", () => openPhoto(index));
    gallery.appendChild(img);
  });
}

const lightbox = $("lightbox");
const lightboxImg = $("lightboxImg");
const photoCounter = $("photoCounter");

function updateLightbox() {
  if (!DATA.photos.length) return;
  lightboxImg.src = DATA.photos[currentPhoto];
  lightboxImg.alt = `${DATA.names} — Foto ${currentPhoto + 1}`;
  photoCounter.textContent = `${currentPhoto + 1} / ${DATA.photos.length}`;
}

function openPhoto(index) {
  if (!DATA.photos.length) return;
  currentPhoto = index;
  updateLightbox();
  lightbox.classList.add("open");
  document.body.classList.add("lightbox-open");
}

function movePhoto(step) {
  if (!DATA.photos.length) return;
  currentPhoto = (currentPhoto + step + DATA.photos.length) % DATA.photos.length;
  updateLightbox();
}

$("closeLightbox").addEventListener("click", closeLightbox);
$("prevPhoto").addEventListener("click", () => movePhoto(-1));
$("nextPhoto").addEventListener("click", () => movePhoto(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.classList.remove("lightbox-open");
}

renderGallery();

/* Teclado */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (lightbox.classList.contains("open")) {
    if (event.key === "ArrowLeft") movePhoto(-1);
    if (event.key === "ArrowRight") movePhoto(1);
  }
});

/* Música */
const bgMusic = $("bgMusic");
const musicToggle = $("musicToggle");

function updateMusicButton() {
  const playing = !bgMusic.paused;
  musicToggle.textContent = playing ? "♫" : "♪";
  musicToggle.classList.toggle("playing", playing);
  musicToggle.setAttribute("aria-label", playing ? "Pausar música" : "Reproducir música");
  musicToggle.title = playing ? "Pausar música" : "Reproducir música";
}

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  } else {
    bgMusic.pause();
  }
});
bgMusic.addEventListener("play", updateMusicButton);
bgMusic.addEventListener("pause", updateMusicButton);

/* Apertura */
const preloader = $("preloader");
const site = $("site");

$("openBtn").addEventListener("click", () => {
  preloader.classList.add("hide");
  site.classList.remove("site-hidden");
  document.body.classList.remove("locked");
  musicToggle.classList.add("show");

  /* Los navegadores permiten iniciar audio aquí porque hubo una interacción. */
  bgMusic.play().catch(() => {});
  updateMusicButton();
  window.scrollTo(0, 0);
});

document.body.classList.add("locked");

/* Cuenta regresiva */
const targetTime = new Date(DATA.dateISO).getTime();

function countdown() {
  const remaining = Math.max(0, targetTime - Date.now());
  $("days").textContent = String(Math.floor(remaining / 86400000)).padStart(2, "0");
  $("hours").textContent = String(Math.floor(remaining / 3600000) % 24).padStart(2, "0");
  $("minutes").textContent = String(Math.floor(remaining / 60000) % 60).padStart(2, "0");
  $("seconds").textContent = String(Math.floor(remaining / 1000) % 60).padStart(2, "0");
}
countdown();
setInterval(countdown, 1000);

/* Animaciones al entrar en pantalla */
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

/* Confirmación por WhatsApp */
$("rsvp").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = $("guest").value.trim();
  const attendance = $("attendance").value;
  const people = $("people").value;

  if (!name || !attendance || !people) return;

  const message = [
    `Hola, somos invitados a la boda de ${DATA.names}.`,
    "",
    `Nombre: ${name}`,
    `Asistencia: ${attendance}`,
    `Personas: ${people}`
  ].join("\n");

  const url = `https://wa.me/${DATA.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
