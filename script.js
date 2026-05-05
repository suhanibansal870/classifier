/* ============================================
   OUTDOOR ODYSSEY - SCRIPT
   Organized, clean, no duplicate functions
   ============================================ */

/* ---- STATE ---- */
let xp = Number(localStorage.getItem("xp")) || 0;
const MAX_XP = 360;
let discoveries = JSON.parse(localStorage.getItem("discoveries")) || [];
let currentFilter = "all";
let pendingDeleteIndex = null;

/* ---- CONSTANTS ---- */
const REGIONS = ["beach", "mountains", "residential", "redwood", "forest"];

const REGION_LABELS = {
  beach: "Beach",
  mountains: "Mountains",
  residential: "Residential",
  redwood: "Redwood",
  forest: "Forest"
};

const LEVELS = [
  { min: 0,   label: "Beginner" },
  { min: 60,  label: "Explorer" },
  { min: 150, label: "Naturalist" },
  { min: 280, label: "Master Ecologist" }
];

/* ---- DATA ---- */
const wikiLinks = {
  Barnacles: "https://en.wikipedia.org/wiki/Barnacle",
  Flowers: "https://en.wikipedia.org/wiki/Flower",
  Grass: "https://en.wikipedia.org/wiki/Poaceae",
  Kelp: "https://en.wikipedia.org/wiki/Kelp",
  Mussels: "https://en.wikipedia.org/wiki/Mussel",
  Primrose: "https://en.wikipedia.org/wiki/Primula",
  "Sage Bush": "https://en.wikipedia.org/wiki/Salvia",
  Seagulls: "https://en.wikipedia.org/wiki/Gull",
  Seashells: "https://en.wikipedia.org/wiki/Shell",
  Birds: "https://en.wikipedia.org/wiki/Bird",
  Lizards: "https://en.wikipedia.org/wiki/Lizard",
  "Pine Trees": "https://en.wikipedia.org/wiki/Pine",
  Squirrels: "https://en.wikipedia.org/wiki/Squirrel",
  Wildflowers: "https://en.wikipedia.org/wiki/Wildflower",
  Bees: "https://en.wikipedia.org/wiki/Bee",
  Daisies: "https://en.wikipedia.org/wiki/Asteraceae",
  Ivy: "https://en.wikipedia.org/wiki/Hedera",
  Ladybug: "https://en.wikipedia.org/wiki/Coccinellidae",
  Roses: "https://en.wikipedia.org/wiki/Rose",
  Spiders: "https://en.wikipedia.org/wiki/Spider",
  "Banana Slugs": "https://en.wikipedia.org/wiki/Banana_slug",
  Butterflies: "https://en.wikipedia.org/wiki/Butterfly",
  Ferns: "https://en.wikipedia.org/wiki/Fern",
  Moss: "https://en.wikipedia.org/wiki/Moss",
  Ants: "https://en.wikipedia.org/wiki/Ant",
  Fern: "https://en.wikipedia.org/wiki/Fern",
  "Poison Oak": "https://en.wikipedia.org/wiki/Toxicodendron_diversilobum",
  Snail: "https://en.wikipedia.org/wiki/Snail",
  Squirrel: "https://en.wikipedia.org/wiki/Squirrel",
  Trees: "https://en.wikipedia.org/wiki/Tree"
};

const images = {
  Barnacles: "https://images.pexels.com/photos/15700626/pexels-photo-15700626.jpeg",
  Flowers: "https://images.pexels.com/photos/51548/pexels-photo-51548.jpeg",
  Grass: "https://images.pexels.com/photos/10111303/pexels-photo-10111303.jpeg",
  Kelp: "https://images.pexels.com/photos/12829684/pexels-photo-12829684.jpeg",
  Mussels: "https://images.pexels.com/photos/8568534/pexels-photo-8568534.jpeg",
  Primrose: "https://images.pexels.com/photos/21880010/pexels-photo-21880010.jpeg",
  "Sage Bush": "https://images.pexels.com/photos/29477616/pexels-photo-29477616.jpeg",
  Seagulls: "https://images.pexels.com/photos/35603852/pexels-photo-35603852.jpeg",
  Seashells: "https://images.pexels.com/photos/17190563/pexels-photo-17190563.jpeg",
  Birds: "https://images.pexels.com/photos/4083151/pexels-photo-4083151.jpeg",
  Lizards: "https://images.pexels.com/photos/19096284/pexels-photo-19096284.jpeg",
  "Pine Trees": "https://images.pexels.com/photos/28811877/pexels-photo-28811877.jpeg",
  Squirrels: "https://images.pexels.com/photos/4738212/pexels-photo-4738212.jpeg",
  Wildflowers: "https://images.pexels.com/photos/18131358/pexels-photo-18131358.jpeg",
  Bees: "https://images.pexels.com/photos/612337/pexels-photo-612337.jpeg",
  Daisies: "https://images.pexels.com/photos/12721113/pexels-photo-12721113.jpeg",
  Ivy: "https://images.pexels.com/photos/15869285/pexels-photo-15869285.jpeg",
  Ladybug: "https://th.bing.com/th/id/OIP.6GnO5M3P2R6KjYD0c7EKxQHaE8?w=278&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  Roses: "https://images.pexels.com/photos/1122639/pexels-photo-1122639.jpeg",
  Spiders: "https://th.bing.com/th/id/OIP.5WNGYPxSjsqNSZ485YJrwwHaEF?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "Banana Slugs": "https://images.pexels.com/photos/32058035/pexels-photo-32058035.jpeg",
  Butterflies: "https://images.pexels.com/photos/32879709/pexels-photo-32879709.jpeg",
  Ferns: "https://images.pexels.com/photos/13644281/pexels-photo-13644281.jpeg",
  Moss: "https://images.pexels.com/photos/11490758/pexels-photo-11490758.jpeg",
  Ants: "https://images.pexels.com/photos/1104975/pexels-photo-1104975.jpeg",
  Fern: "https://images.pexels.com/photos/13644281/pexels-photo-13644281.jpeg",
  "Poison Oak": "https://images.pexels.com/photos/15869285/pexels-photo-15869285.jpeg",
  Snail: "https://images.pexels.com/photos/4705695/pexels-photo-4705695.jpeg",
  Squirrel: "https://images.pexels.com/photos/4738212/pexels-photo-4738212.jpeg",
  Trees: "https://images.pexels.com/photos/28811877/pexels-photo-28811877.jpeg"
};

const definitions = {
  Barnacles: "Small marine crustaceans that attach permanently to hard surfaces.",
  Flowers: "The reproductive structure of flowering plants.",
  Grass: "A group of plants with narrow leaves that grow in many environments.",
  Kelp: "Large brown seaweed that forms underwater forests.",
  Mussels: "Bivalve mollusks that attach to surfaces in clusters.",
  Primrose: "A flowering plant often found in coastal and woodland habitats.",
  "Sage Bush": "A hardy shrub adapted to dry environments.",
  Seagulls: "Coastal birds known for scavenging behavior.",
  Seashells: "Hard protective coverings of marine mollusks.",
  Birds: "Warm-blooded vertebrates with feathers and wings.",
  Lizards: "Cold-blooded reptiles with scaly skin.",
  "Pine Trees": "Evergreen trees that produce cones and needles.",
  Squirrels: "Small rodents known for storing food.",
  Wildflowers: "Flowers that grow naturally without cultivation.",
  Bees: "Flying insects essential for pollination.",
  Daisies: "Common flowering plants with white petals.",
  Ivy: "A climbing plant that spreads across surfaces.",
  Ladybug: "Small beetles that feed on pests like aphids.",
  Roses: "Flowering shrubs often associated with beauty.",
  Spiders: "Arachnids that build webs to catch prey.",
  "Banana Slugs": "Large yellow slugs found in damp forests.",
  Butterflies: "Insects with metamorphic life cycles.",
  Ferns: "Ancient plants that reproduce via spores.",
  Moss: "Small non-vascular plants that grow in moist areas.",
  Ants: "Social insects living in structured colonies.",
  Fern: "Spore-producing plant common in shaded areas.",
  "Poison Oak": "Plant that causes skin irritation on contact.",
  Snail: "Mollusk with a spiral shell.",
  Squirrel: "Rodent that stores food and climbs trees.",
  Trees: "Large perennial plants forming forest canopies."
};

const facts = {
  Barnacles: "Barnacles glue themselves permanently to hard surfaces and can survive out of water.",
  Flowers: "Some coastal flowers have evolved to survive saltwater spray.",
  Grass: "Beach grass plays a vital role in stabilizing sand dunes.",
  Kelp: "Kelp can grow up to 2 feet per day in ideal conditions.",
  Mussels: "Mussels anchor themselves using strong protein threads called byssus.",
  Primrose: "Evening primrose blooms at dusk to attract night-flying moths.",
  "Sage Bush": "Sage is highly drought-resistant and releases a distinctive fragrance after rain.",
  Seagulls: "Seagulls can drink both fresh and saltwater, desalinating via nasal glands.",
  Seashells: "A shell grows along with its mollusk, adding new layers over time.",
  Birds: "Many bird species migrate thousands of miles guided by Earth's magnetic field.",
  Lizards: "Lizards regulate body temperature by moving between sun and shade.",
  "Pine Trees": "Pine trees stay green year-round and their roots prevent soil erosion.",
  Squirrels: "Squirrels often forget where they buried their nuts, accidentally planting trees.",
  Wildflowers: "Wildflowers can bloom within days of a wildfire clearing the landscape.",
  Bees: "A single bee visits up to 5,000 flowers per day to collect pollen.",
  Daisies: "Daisies close their petals at night to protect their pollen from dew.",
  Ivy: "Ivy can live for hundreds of years and covers historical ruins worldwide.",
  Ladybug: "A ladybug can eat up to 5,000 aphids in its lifetime.",
  Roses: "Roses have been cultivated for over 5,000 years.",
  Spiders: "Spiders help control insect populations; most are harmless to humans.",
  "Banana Slugs": "Banana slugs are important decomposers, breaking down leaf litter on the forest floor.",
  Butterflies: "Butterflies taste with their feet before deciding whether to eat.",
  Ferns: "Ferns are among the oldest plant groups, older than dinosaurs.",
  Moss: "A single clump of moss can absorb up to 20 times its weight in water.",
  Ants: "Ants can carry objects 10 to 50 times their own body weight.",
  Fern: "Ferns reproduce via spores, not seeds or flowers.",
  "Poison Oak": "Remember: 'Leaves of three, let it be!'",
  Snail: "Snails can sleep for up to 3 years during drought conditions.",
  Squirrel: "Tree squirrels are responsible for millions of new trees each year.",
  Trees: "Trees communicate with each other through underground fungal networks."
};

/* ---- PERSISTENCE ---- */
function saveDiscoveries() {
  localStorage.setItem("discoveries", JSON.stringify(discoveries));
  localStorage.setItem("xp", xp);
}

/* ---- TOAST SYSTEM ---- */
function showToast(message, icon = "*") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-out");
    toast.addEventListener("animationend", () => toast.remove(), { once: true });
  }, 2800);
}

/* ---- LEVEL SYSTEM ---- */
function getLevel(xpVal) {
  let level = LEVELS[0].label;
  for (const l of LEVELS) {
    if (xpVal >= l.min) level = l.label;
  }
  return level;
}

/* ---- SPECIES TOGGLE ---- */
function toggleSpecies(el, name) {
  const sectionId = el.closest("section").id;
  const existing = discoveries.find(d => d.name === name && d.area === sectionId);

  if (existing) {
    discoveries = discoveries.filter(d => !(d.name === name && d.area === sectionId));
    el.classList.remove("found");
    el.setAttribute("aria-checked", "false");
    xp = Math.max(0, xp - 10);
    showToast(`${name} removed from journal`, "");
  } else {
    discoveries.push({
      name,
      area: sectionId,
      fact: facts[name] || "No fact available.",
      definition: definitions[name] || "No definition available.",
      wiki: wikiLinks[name] || null
    });
    el.classList.add("found");
    el.setAttribute("aria-checked", "true");
    xp += 10;

    // pop animation
    el.classList.remove("just-found");
    void el.offsetWidth; // reflow
    el.classList.add("just-found");
    el.addEventListener("animationend", () => el.classList.remove("just-found"), { once: true });

    showToast(`+10 XP - ${name} discovered!`, "");
  }

  saveDiscoveries();
  updateUI();
}

/* ---- DELETE SYSTEM ---- */
function deleteEntry(index) {
  pendingDeleteIndex = index;
  const modal = document.getElementById("delete-modal");
  modal.hidden = false;
}

function confirmDelete() {
  if (pendingDeleteIndex === null) return;
  const item = discoveries[pendingDeleteIndex];
  discoveries.splice(pendingDeleteIndex, 1);
  pendingDeleteIndex = null;
  closeDeleteModal();
  showToast(`${item?.name || "Entry"} removed`, "");
  saveDiscoveries();
  updateUI();
}

function closeDeleteModal() {
  document.getElementById("delete-modal").hidden = true;
  pendingDeleteIndex = null;
}

/* ---- JOURNAL RENDERING ---- */
function buildCard(item, realIndex) {
  const imgSrc = images[item.name] || "";
  const regionLabel = REGION_LABELS[item.area] || item.area;

  const card = document.createElement("div");
  card.className = "entry";
  card.dataset.region = item.area;
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${item.name} - ${regionLabel}`);

  card.onclick = () => openPopup(realIndex);
  card.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") openPopup(realIndex); };

  card.innerHTML = `
    <button class="delete-x" aria-label="Remove ${item.name}" onclick="event.stopPropagation(); deleteEntry(${realIndex})">X</button>
    ${imgSrc
      ? `<img class="card-image" src="${imgSrc}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'">`
      : `<div class="card-image"></div>`}
    <div class="card-info">
      <div class="entry-title">${item.name}</div>
      <span class="region-badge ${item.area}">${regionLabel}</span>
      <div class="entry-hint">Tap for details</div>
    </div>
  `;

  return card;
}

function buildCarousel(region, items) {
  const wrapper = document.createElement("div");
  wrapper.className = "region-carousel";
  wrapper.dataset.region = region;

  const header = document.createElement("div");
  header.className = "region-carousel-header";
  header.innerHTML = `
    <h3 class="region-carousel-title ${region}">${REGION_LABELS[region]}</h3>
    <span class="region-carousel-count">${items.length} specimen${items.length === 1 ? "" : "s"}</span>
  `;
  wrapper.appendChild(header);

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "region-empty";
    empty.innerHTML = `<div class="region-empty-text">Nothing here yet. Explore the ${REGION_LABELS[region]} section to start collecting!</div>`;
    wrapper.appendChild(empty);
    return wrapper;
  }

  const viewport = document.createElement("div");
  viewport.className = "carousel-viewport";

  const leftBtn = document.createElement("button");
  leftBtn.className = "carousel-arrow left";
  leftBtn.setAttribute("aria-label", "Scroll left");
  leftBtn.innerHTML = "&#8249;";

  const rightBtn = document.createElement("button");
  rightBtn.className = "carousel-arrow right";
  rightBtn.setAttribute("aria-label", "Scroll right");
  rightBtn.innerHTML = "&#8250;";

  const track = document.createElement("div");
  track.className = "carousel-track";

  items.forEach(({ item, realIndex }) => track.appendChild(buildCard(item, realIndex)));

  // Arrow scroll
  const getStep = () => {
    const card = track.querySelector(".entry");
    return card ? card.offsetWidth + 14 : 204;
  };

  leftBtn.onclick  = () => track.scrollBy({ left: -getStep() * 2, behavior: "smooth" });
  rightBtn.onclick = () => track.scrollBy({ left:  getStep() * 2, behavior: "smooth" });

  // Update arrow visibility
  let arrowFrame = null;
  const updateArrows = () => {
    if (arrowFrame) return;
    arrowFrame = requestAnimationFrame(() => {
      const max = track.scrollWidth - track.clientWidth - 2;
      leftBtn.classList.toggle("hidden", track.scrollLeft <= 2);
      rightBtn.classList.toggle("hidden", track.scrollLeft >= max);
      arrowFrame = null;
    });
  };

  track.addEventListener("scroll", updateArrows, { passive: true });
  requestAnimationFrame(updateArrows);

  enableDragScroll(track);

  viewport.appendChild(leftBtn);
  viewport.appendChild(track);
  viewport.appendChild(rightBtn);
  wrapper.appendChild(viewport);

  return wrapper;
}

function enableDragScroll(track) {
  let isDown = false, startX = 0, scrollStart = 0, dragDistance = 0;

  track.addEventListener("mousedown", (e) => {
    if (e.button !== 0 || e.target.closest(".delete-x")) return;
    isDown = true;
    dragDistance = 0;
    startX = e.pageX;
    scrollStart = track.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const walk = e.pageX - startX;
    dragDistance = Math.abs(walk);
    if (dragDistance > 6) {
      track.classList.add("dragging");
      track.scrollLeft = scrollStart - walk;
    }
  });

  track.addEventListener("click", (e) => {
    if (dragDistance > 6) { e.stopPropagation(); e.preventDefault(); }
    dragDistance = 0;
  }, true);
}

function renderJournal() {
  const container = document.getElementById("journal");
  container.innerHTML = "";

  const grouped = {};
  REGIONS.forEach(r => (grouped[r] = []));
  discoveries.forEach((item, idx) => {
    if (grouped[item.area]) grouped[item.area].push({ item, realIndex: idx });
  });

  const regionsToShow = currentFilter === "all" ? REGIONS : [currentFilter];
  regionsToShow.forEach(region => container.appendChild(buildCarousel(region, grouped[region] || [])));
}

function setFilter(type, btn) {
  currentFilter = type;
  document.querySelectorAll(".journal-filter").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderJournal();
}

/* ---- ADD CUSTOM SPECIMEN ---- */
function toggleAddPanel() {
  const panel = document.getElementById("add-panel");
  const isHidden = panel.hidden;
  panel.hidden = !isHidden;
  if (isHidden) document.getElementById("custom-name").focus();
}

function addCustom() {
  const name = document.getElementById("custom-name").value.trim();
  const area = document.getElementById("custom-region").value;
  const fact = document.getElementById("custom-fact").value.trim();

  if (!name) {
    showToast("Please enter a specimen name.", "!");
    return;
  }

  discoveries.push({
    name,
    area,
    fact: fact || "No fact available.",
    definition: definitions[name] || "User-added specimen.",
    wiki: wikiLinks[name] || null
  });

  xp += 10;
  saveDiscoveries();
  updateUI();
  showToast(`+10 XP - ${name} added!`, "");

  document.getElementById("custom-name").value = "";
  document.getElementById("custom-fact").value = "";
  toggleAddPanel();
}

/* ---- MAIN UI UPDATE ---- */
function updateUI() {
  // XP bar & text
  const percent = Math.min((xp / MAX_XP) * 100, 100);
  document.getElementById("xp-fill").style.width = percent + "%";
  document.getElementById("xp-text").textContent = `${xp} / ${MAX_XP} XP`;
  document.getElementById("level").textContent = getLevel(xp);

  // Species found states
  document.querySelectorAll(".species").forEach(el => {
    const name = el.dataset.name;
    const sectionId = el.closest("section").id;
    const found = discoveries.some(d => d.name === name && d.area === sectionId);
    el.classList.toggle("found", found);
    el.setAttribute("aria-checked", found ? "true" : "false");
  });

  // Progress per region
  REGIONS.forEach(region => {
    const total = document.querySelectorAll(`#${region} .species`).length;
    const found = discoveries.filter(d => d.area === region).length;
    const pct = total > 0 ? (found / total) * 100 : 0;

    const fillEl = document.getElementById(`${region}-fill`);
    if (fillEl) fillEl.style.width = pct + "%";

    const progEl = document.getElementById(`${region}-progress`);
    if (progEl) progEl.textContent = `${found} / ${total} discovered`;
  });

  renderJournal();
}

/* ---- POPUP (Species Detail) ---- */
function openPopup(i) {
  const item = discoveries[i];
  if (!item) return;

  const imgEl = document.getElementById("popup-img");
  const imgSrc = images[item.name];
  imgEl.src = imgSrc || "";
  imgEl.style.display = imgSrc ? "block" : "none";

  document.getElementById("popup-title").textContent = item.name;
  document.getElementById("popup-section").textContent = `${REGION_LABELS[item.area] || item.area}`;

  const def = item.definition || definitions[item.name] || "No definition available.";
  const fact = item.fact || "No fact available.";
  document.getElementById("popup-fact").innerHTML = `
    <strong>About:</strong><br>${def}<br><br>
    <strong>Fun Fact:</strong><br>${fact}
  `;

  const linkEl = document.getElementById("popup-link");
  const wiki = item.wiki || wikiLinks[item.name];
  if (wiki) {
    linkEl.href = wiki;
    linkEl.style.display = "inline-flex";
  } else {
    linkEl.style.display = "none";
  }

  const popup = document.getElementById("popup");
  popup.hidden = false;
  popup.querySelector(".popup-close").focus();
}

function closePopup() {
  document.getElementById("popup").hidden = true;
}

/* ---- INSTRUCTIONS MODAL ---- */
function openInstructions() {
  const popup = document.getElementById("instructions-popup");
  popup.hidden = false;
  popup.querySelector(".popup-close").focus();
}

function closeInstructions() {
  document.getElementById("instructions-popup").hidden = true;
}

/* ---- NAVIGATION ---- */
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const overlay = document.getElementById("navOverlay");
  const toggle = document.querySelector(".menu-toggle");
  const isOpen = navLinks.classList.toggle("show");
  overlay.classList.toggle("show", isOpen);
  toggle.setAttribute("aria-expanded", isOpen);
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

/* Close mobile nav on link click */
document.addEventListener("click", (e) => {
  if (e.target.closest(".nav-links a")) {
    const nav = document.getElementById("navLinks");
    if (nav.classList.contains("show")) toggleMenu();
  }
});

/* Keyboard: close modals on Escape */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup();
    closeInstructions();
    closeDeleteModal();
    const nav = document.getElementById("navLinks");
    if (nav.classList.contains("show")) toggleMenu();
  }
});

/* ---- INIT ---- */
document.addEventListener("DOMContentLoaded", () => {
  // Attach species click + keyboard handlers
  document.querySelectorAll(".species").forEach(el => {
    el.addEventListener("click", function () {
      toggleSpecies(this, this.dataset.name);
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleSpecies(this, this.dataset.name);
      }
    });
  });

  updateUI();
});