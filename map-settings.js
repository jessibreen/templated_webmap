/*
  ============================================================
  USER INPUTS: 1) CENTER THE MAP
  ============================================================
  SETUP PHASE VS FINAL MAP (READ THIS FIRST)

  During setup, keep these two things open at the same time:
  1) Your published map page (so you can pan/zoom and copy values)
  2) map-settings.js in GitHub editor (so you can paste and commit)

  Why the map starts where it does on first load:
  - The map first uses MAP_CENTER_INPUTS.center and MAP_CENTER_INPUTS.zoom.
  - If showCenterPanel and autoFitToDataOnLoad are both true, the map then
    zooms to your uploaded data extent to help you find your project quickly.

  Recommended setup workflow:
  1) Leave showCenterPanel: true.
  2) Open the published map and move/zoom to the view you want.
  3) Click "Copy center & zoom" in the Set Map Center panel.
  4) Paste those lines into center and zoom below.
  5) Commit in GitHub and refresh the published map.
  6) When the map is finalized, set showCenterPanel: false.
*/

const MAP_CENTER_INPUTS = {
  // Initial map location and zoom.
  // Format: [latitude, longitude]
  center: [21.478, -157.9408],
  zoom: 11,

  // Show the "Set Map Center" helper panel in the sidebar?
  // STEP 1: Set true, then pan/zoom and copy values.
  // STEP 2: Replace center/zoom above.
  // STEP 3: Set false for the final map.
  showCenterPanel: true,

  // Auto-zoom to data when center setup mode is on.
  // This is why the map may move away from center/zoom during setup.
  // Turn this off if you want center/zoom to stay fixed while testing.
  autoFitToDataOnLoad: true,

  // Decimal places shown and copied by the center helper.
  coordinatePrecision: 4
};

/*
  ============================================================
  USER INPUTS: 2) TITLES
  ============================================================
*/

const TITLE_INPUTS = {
  // Map title shown in the sidebar header and browser tab.
  title: "Hedgehog Sanctuary Sample Map",

  // Optional subtitle text under the title.
  subtitle: "Fictional sample data for testing popups, media links, and setup tools."
};

/*
  ============================================================
  USER INPUTS: 3) POPUP DATA
  ============================================================

  Setup phase:
  - Keep this file and the published map open at the same time.
  - Use the map's Available Fields panel to copy popup lines, then paste
    them into popupSections below.

  Final map:
  - When popup fields are complete, set showFieldPanel: false.
*/

const POPUP_DATA_INPUTS = {
  // Relative path to a GeoJSON file in /data.
  dataFile: "./data/your-data.geojson",

  // Keep GeoJSON files in /data.
  // Keep image files in /images, audio files in /audio,
  // and video files in /video.

  // Which GeoJSON property should be used as the feature display name.
  // If missing, the template falls back to "Feature N" labels.
  listNameField: "SanctuaryName",

  // Property used as the popup title.
  popupTitleField: "SanctuaryName",

  // Show the "Available Fields" helper panel in the sidebar?
  // STEP 1: Set true while building popup sections.
  // STEP 2: Set false for the final map.
  showFieldPanel: true,

  // Popup section layout.
  // - Each section becomes a heading in the popup.
  // - Fields render in listed order.
  // - If showWhenEmpty is false, blank values are hidden.
  popupSections: [
  {
    heading: "Contact",
    showWhenEmpty: false,
    fields: [
      { key: "ContactEmail", label: "Email", type: "email" },
      { key: "Phone", label: "Phone" },
      { key: "Website", label: "Website", type: "url" },
      { key: "VisitingHours", label: "Visiting Hours" }
    ]
  },
  {
    heading: "About",
    showWhenEmpty: false,
    fields: [
      { key: "Region", label: "Region" },
      { key: "SanctuaryType", label: "Sanctuary Type" },
      { key: "Description", label: "Description" }
    ]
  },
  {
    heading: "Media",
    showWhenEmpty: false,
    fields: [
      { key: "PhotoFile", label: "Photo", type: "image" },
      { key: "SoundFile", label: "Sound", type: "audio" },
      { key: "VideoFile", label: "Video", type: "video" }
    ]
  }
  ]
};

/*
  ============================================================
  USER INPUTS: 4) LAYER TOGGLES
  ============================================================

  Setup phase:
  - In the map's Layer Toggle Field panel, choose a grouping field
    (example: category, district, type).
  - Copy the suggested line and paste it into toggleFieldKey below.

  Final map:
  - Keep toggleFieldKey set to the field you want for grouped toggles.
  - Or use "" to keep one toggle per feature.
  - Set showLayerTogglePanel: false when you do not need this helper panel.
*/

const LAYER_TOGGLE_INPUTS = {
  // Optional property name used to group layer toggles.
  // Use "" to show one toggle per feature.
  // Example: "category"
  toggleFieldKey: "",

  // Show the layer toggle setup panel.
  showLayerTogglePanel: true
};

/*
  ============================================================
  USER INPUTS: 5) CHOROPLETH
  ============================================================
  A choropleth shades a polygon layer by data value. It renders
  below your point and line data, above the basemap.

  Workflow:
  1) Set enabled: true.
  2) Point dataFile at your choropleth polygon GeoJSON.
  3) Set valueField to the numeric property to classify by.
  4) Define breaks — each entry is [minimumValue, hexColor, legendLabel].
     A feature gets the color of the highest threshold whose
     minimumValue is <= the feature's value. Keep entries sorted
     low-to-high; that order is also easiest to read.
  5) Adjust nullColor/nullLabel for missing or non-numeric values.
  6) Set legendTitle if you want to reuse it in LEGEND_INPUTS.
*/

const CHOROPLETH_INPUTS = {
  // Set to true to load and display the choropleth layer.
  enabled: false,

  // Relative path to the choropleth polygon GeoJSON file.
  dataFile: "./data/your-choropleth.geojson",

  // Property in the GeoJSON used to determine the color class.
  valueField: "value",

  // Class breaks: [minimumValue, hexFillColor, legendLabel].
  // Edit these rows to match your data range and preferred palette.
  breaks: [
    [0,   "#f7fbff", "0 – 24"  ],
    [25,  "#c6dbef", "25 – 49" ],
    [50,  "#6baed6", "50 – 74" ],
    [75,  "#2171b5", "75 – 99" ],
    [100, "#08306b", "≥ 100"   ]
  ],

  // Color and label for features where valueField is missing or null.
  nullColor: "#d0d0d0",
  nullLabel: "No data",

  // Fill opacity for choropleth polygons (0–1).
  fillOpacity: 0.7,

  // Polygon border style within the choropleth layer.
  strokeColor:   "#ffffff",
  strokeWeight:  0.5,
  strokeOpacity: 0.6,

  // Default title reused by LEGEND_INPUTS when mode is "choropleth"
  // and LEGEND_INPUTS.title is left blank.
  legendTitle: "Legend",

  // Legacy field retained for compatibility.
  // Use LEGEND_INPUTS.enabled to show or hide the map legend.
  showLegend: true
};

/*
  ============================================================
  USER INPUTS: 6) LEGEND
  ============================================================
  The legend is best controlled in code, not in the setup panel.
  Why:
  - Legend content depends on the type of data being mapped.
  - Most users only need to decide whether they want a legend, where
    it should appear, and whether it is driven by choropleth breaks or
    by a simple manual list.
  - A map legend is part of the final published map, not a temporary
    setup helper like the center or popup tools.

  Modes:
  - "choropleth": builds legend items from CHOROPLETH_INPUTS.breaks.
  - "manual": use your own items for point, line, polygon, or category maps.
*/

const LEGEND_INPUTS = {
  // Show a legend on top of the map?
  enabled: false,

  // Where the legend sits on the map.
  // Leaflet options: "topright", "topleft", "bottomright", "bottomleft"
  position: "bottomright",

  // "choropleth" uses CHOROPLETH_INPUTS.breaks.
  // "manual" uses the items array below.
  mode: "choropleth",

  // Leave blank to reuse CHOROPLETH_INPUTS.legendTitle in choropleth mode.
  title: "",

  // Include the no-data row in choropleth mode?
  showNoDataItem: true,

  // Manual legend items. Only used when mode is "manual".
  // shape: "square" | "circle" | "line"
  items: [
    { label: "Area features", color: "#2f8b77", shape: "square" },
    { label: "Routes", color: "#1f6f78", shape: "line" },
    { label: "Locations", color: "#1f6f78", shape: "circle" }
  ]
};

/*
  ============================================================
  USER INPUTS: 7) COLORS
  ============================================================
*/

const COLOR_INPUTS = {
  // Basemap tiles.
  tileUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  tileAttribution: "&copy; OpenStreetMap contributors &copy; CARTO",

  // Which color scheme to apply on load.
  // Built-in options: "teal" | "warm" | "slate" | "forest" | "berry"
  // Use "custom" to apply the hex values you define in customScheme below.
  colorScheme: "teal",

  // ------------------------------------------------------------------
  // YOUR CUSTOM COLORS
  // Only used when colorScheme is "custom" above.
  // Replace these hex values with your own choices.
  // ------------------------------------------------------------------
  customScheme: {
    // Polygons and lines.
    featureStyle: {
      color:       "#1f6f78",  // stroke color
      weight:      2,          // stroke width in pixels
      opacity:     0.85,       // stroke opacity (0–1)
      fillColor:   "#2f8b77",  // fill color
      fillOpacity: 0.3         // fill opacity (0–1)
    },
    // Point features (circle markers).
    pointStyle: {
      radius:      6,          // circle radius in pixels
      color:       "#ffffff",  // stroke color
      weight:      1,          // stroke width in pixels
      fillColor:   "#1f6f78",  // fill color
      fillOpacity: 0.95        // fill opacity (0–1)
    }
  },

  // Show the "Color Settings" helper panel in the sidebar?
  // STEP 1: Set true, pick a scheme (map updates live).
  // STEP 2: Note the scheme name (or set colorScheme to "custom" and edit customScheme).
  // STEP 3: Set false for the final map.
  showColorPanel: true
};

/*
  ============================================================
  APP CODE
  ============================================================
  Most users do not need to change code below this line.
*/

const mapElTitle = document.getElementById("map-title");
const mapElSubtitle = document.getElementById("map-subtitle");
const featureListEl = document.getElementById("feature-list");
const featureCountEl = document.getElementById("feature-count");
const fieldListEl = document.getElementById("field-list");
const fieldCountEl = document.getElementById("field-count");
const searchEl = document.getElementById("feature-search");
const toggleFieldSelectEl = document.getElementById("toggle-field-select");
const copyToggleFieldBtnEl = document.getElementById("copy-toggle-field-btn");

mapElTitle.textContent = TITLE_INPUTS.title;
mapElSubtitle.textContent = TITLE_INPUTS.subtitle;
document.title = TITLE_INPUTS.title;

if (!MAP_CENTER_INPUTS.showCenterPanel) {
  const centerPanel = document.querySelector(".center-panel");
  if (centerPanel) centerPanel.style.display = "none";
}

if (!POPUP_DATA_INPUTS.showFieldPanel) {
  const fieldPanel = document.querySelector(".field-panel");
  if (fieldPanel) fieldPanel.style.display = "none";
}

if (!LAYER_TOGGLE_INPUTS.showLayerTogglePanel) {
  const layerTogglePanel = document.querySelector(".layer-toggle-panel");
  if (layerTogglePanel) layerTogglePanel.style.display = "none";
}

if (!COLOR_INPUTS.showColorPanel) {
  const colorToolPanel = document.querySelector(".color-tool-panel");
  if (colorToolPanel) colorToolPanel.style.display = "none";
}

// Populate setup status list with active panels.
const setupStatusListEl = document.getElementById("setup-status-list");
const setupPanels = [];
if (MAP_CENTER_INPUTS.showCenterPanel) setupPanels.push("Set Map Center");
if (LAYER_TOGGLE_INPUTS.showLayerTogglePanel) setupPanels.push("Layer Toggles");
if (POPUP_DATA_INPUTS.showFieldPanel) setupPanels.push("Popup Fields");
if (COLOR_INPUTS.showColorPanel) setupPanels.push("Color Settings");

if (setupStatusListEl) {
  if (setupPanels.length === 0) {
    setupStatusListEl.innerHTML = "<li class=\"setup-complete\">✓ All setup complete! Your map is ready.</li>";
  } else {
    setupPanels.forEach((panel) => {
      const item = document.createElement("li");
      item.textContent = panel;
      setupStatusListEl.appendChild(item);
    });
  }
}

const map = L.map("map").setView(MAP_CENTER_INPUTS.center, MAP_CENTER_INPUTS.zoom);

L.tileLayer(COLOR_INPUTS.tileUrl, {
  attribution: COLOR_INPUTS.tileAttribution,
  maxZoom: 20
}).addTo(map);

// Choropleth renders below the data overlay pane (z-index 400) but
// above the tile pane (z-index 200), so it never obscures points or lines.
map.createPane("choroplethPane").style.zIndex = 300;

const featureLayers = [];
const toggleItems = [];
let activeToggleFieldKey = LAYER_TOGGLE_INPUTS.toggleFieldKey;

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asDisplayValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value).trim();
}

function ensureHttp(url) {
  if (!url) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url;
  if (/^(\/|\.\/|\.\.\/|#)/.test(url)) return url;
  return `https://${url}`;
}

function formatFieldValue(rawValue, field) {
  const clean = asDisplayValue(rawValue);
  if (!clean) return "";

  if (field.type === "email") {
    const safe = escapeHtml(clean);
    return `<a href="mailto:${safe}">${safe}</a>`;
  }

  if (field.type === "url") {
    const safeUrl = ensureHttp(clean);
    const safeLabel = escapeHtml(clean);
    return `<a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener">${safeLabel}</a>`;
  }

  if (field.type === "image") {
    const safeUrl = ensureHttp(clean);
    const safeAlt = escapeHtml(field.label || "Image");
    return `<a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener"><img class="popup-image" src="${escapeHtml(safeUrl)}" alt="${safeAlt}"></a>`;
  }

  if (field.type === "audio") {
    const safeUrl = ensureHttp(clean);
    const safeLabel = escapeHtml(clean.split("/").pop() || clean);
    return `<audio class="popup-audio" controls preload="none" src="${escapeHtml(safeUrl)}"></audio><div><a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener">${safeLabel}</a></div>`;
  }

  if (field.type === "video") {
    const safeUrl = ensureHttp(clean);
    const safeLabel = escapeHtml(clean.split("/").pop() || clean);
    return `<video class="popup-video" controls preload="metadata" src="${escapeHtml(safeUrl)}"></video><div><a href="${escapeHtml(safeUrl)}" target="_blank" rel="noopener">${safeLabel}</a></div>`;
  }

  return escapeHtml(clean);
}

function buildPopupHtml(properties) {
  const popupTitle = asDisplayValue(properties[POPUP_DATA_INPUTS.popupTitleField]) || "Feature";

  let html = `<h3 class="popup-title">${escapeHtml(popupTitle)}</h3>`;

  POPUP_DATA_INPUTS.popupSections.forEach((section) => {
    const rows = section.fields
      .map((field) => {
        const rendered = formatFieldValue(properties[field.key], field);
        if (!rendered) return "";
        return `
          <div class="popup-row">
            <span class="popup-label">${escapeHtml(field.label)}:</span>
            <span class="popup-value">${rendered}</span>
          </div>
        `;
      })
      .filter(Boolean)
      .join("");

    if (rows || section.showWhenEmpty) {
      html += `<h4 class="popup-label">${escapeHtml(section.heading)}</h4>${rows}`;
    }
  });

  return html;
}

function getFeatureLabel(feature, index) {
  const val = feature.properties?.[POPUP_DATA_INPUTS.listNameField];
  const clean = asDisplayValue(val);
  return clean || `Feature ${index + 1}`;
}

function filterFeatureList(query) {
  const q = query.trim().toLowerCase();
  let visible = 0;

  document.querySelectorAll(".feature-item").forEach((item) => {
    const name = item.dataset.name || "";
    const show = !q || name.includes(q);
    item.style.display = show ? "" : "none";
    if (show) visible += 1;
  });

  featureCountEl.textContent = `${visible} listed`;
}

function addFeatureToList(featureLayer, label) {
  toggleItems.push({
    layer: featureLayer,
    label,
    properties: featureLayer.feature?.properties || {}
  });
}

function toggleLayerVisibility(layer, visible) {
  if (visible) {
    layer.addTo(map);
  } else {
    map.removeLayer(layer);
  }
}

function renderFeatureToggleList(fieldKey = "") {
  featureListEl.innerHTML = "";

  const normalizedFieldKey = String(fieldKey || "").trim();

  if (!normalizedFieldKey) {
    toggleItems.forEach((entry) => {
      const item = document.createElement("label");
      item.className = "feature-item";
      item.dataset.name = entry.label.toLowerCase();

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = map.hasLayer(entry.layer);

      const text = document.createElement("span");
      text.textContent = entry.label;

      checkbox.addEventListener("change", () => {
        toggleLayerVisibility(entry.layer, checkbox.checked);
      });

      item.appendChild(checkbox);
      item.appendChild(text);
      featureListEl.appendChild(item);
    });

    filterFeatureList(searchEl.value || "");
    return;
  }

  const groups = new Map();
  toggleItems.forEach((entry) => {
    const value = asDisplayValue(entry.properties[normalizedFieldKey]) || "(blank)";
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(entry.layer);
  });

  [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([value, layers]) => {
      const item = document.createElement("label");
      item.className = "feature-item";
      item.dataset.name = value.toLowerCase();

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = layers.some((layer) => map.hasLayer(layer));

      const text = document.createElement("span");
      const suffix = layers.length === 1 ? "feature" : "features";
      text.textContent = `${value} (${layers.length} ${suffix})`;

      checkbox.addEventListener("change", () => {
        layers.forEach((layer) => toggleLayerVisibility(layer, checkbox.checked));
      });

      item.appendChild(checkbox);
      item.appendChild(text);
      featureListEl.appendChild(item);
    });

  filterFeatureList(searchEl.value || "");
}

function renderToggleFieldOptions(fieldSummary) {
  if (!toggleFieldSelectEl) return;

  toggleFieldSelectEl.innerHTML = "";

  const noneOption = document.createElement("option");
  noneOption.value = "";
  noneOption.textContent = "None (toggle each feature)";
  toggleFieldSelectEl.appendChild(noneOption);

  fieldSummary.forEach((entry) => {
    const option = document.createElement("option");
    option.value = entry.key;
    option.textContent = entry.key;
    toggleFieldSelectEl.appendChild(option);
  });

  const hasConfiguredOption = fieldSummary.some((entry) => entry.key === activeToggleFieldKey);
  if (!hasConfiguredOption) {
    activeToggleFieldKey = "";
  }

  toggleFieldSelectEl.value = activeToggleFieldKey;
}

const COLOR_PRESETS = {
  teal:   {
    label: "Teal",
    featureStyle: { color: "#1f6f78", weight: 2, opacity: 0.85, fillColor: "#2f8b77", fillOpacity: 0.3  },
    pointStyle:   { radius: 6, color: "#ffffff", weight: 1,     fillColor: "#1f6f78", fillOpacity: 0.95 }
  },
  warm:   {
    label: "Warm",
    featureStyle: { color: "#b84a1e", weight: 2, opacity: 0.85, fillColor: "#e07840", fillOpacity: 0.3  },
    pointStyle:   { radius: 6, color: "#ffffff", weight: 1,     fillColor: "#c95c22", fillOpacity: 0.95 }
  },
  slate:  {
    label: "Slate",
    featureStyle: { color: "#3d5a70", weight: 2, opacity: 0.85, fillColor: "#6b8fa8", fillOpacity: 0.3  },
    pointStyle:   { radius: 6, color: "#ffffff", weight: 1,     fillColor: "#3d5a70", fillOpacity: 0.95 }
  },
  forest: {
    label: "Forest",
    featureStyle: { color: "#2d5a27", weight: 2, opacity: 0.85, fillColor: "#4a8c3f", fillOpacity: 0.3  },
    pointStyle:   { radius: 6, color: "#ffffff", weight: 1,     fillColor: "#2d5a27", fillOpacity: 0.95 }
  },
  berry:  {
    label: "Berry",
    featureStyle: { color: "#6b2d6b", weight: 2, opacity: 0.85, fillColor: "#9b5c9b", fillOpacity: 0.3  },
    pointStyle:   { radius: 6, color: "#ffffff", weight: 1,     fillColor: "#6b2d6b", fillOpacity: 0.95 }
  },
  custom: {
    label: "Custom"
    // featureStyle and pointStyle are read from COLOR_INPUTS.customScheme.
  }
};

let activeColorScheme = COLOR_INPUTS.colorScheme in COLOR_PRESETS
  ? COLOR_INPUTS.colorScheme
  : "teal";

function getActiveScheme() {
  if (activeColorScheme === "custom") return COLOR_INPUTS.customScheme;
  return COLOR_PRESETS[activeColorScheme];
}

function styleFeature() {
  return getActiveScheme().featureStyle;
}

function pointToLayer(_feature, latlng) {
  return L.circleMarker(latlng, getActiveScheme().pointStyle);
}

function normalizeFeatures(geojson) {
  if (!geojson) return [];
  if (geojson.type === "FeatureCollection" && Array.isArray(geojson.features)) {
    return geojson.features;
  }
  if (geojson.type === "Feature") {
    return [geojson];
  }
  return [];
}

function inferType(value) {
  if (value === null || value === undefined || value === "") return "empty";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function inferPopupType(key, sampleValue) {
  const keyLower = String(key).toLowerCase();
  const sample = String(sampleValue || "");

  if (
    keyLower.includes("image") ||
    keyLower.includes("photo") ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(sample)
  ) {
    return "image";
  }

  if (
    keyLower.includes("audio") ||
    keyLower.includes("sound") ||
    /\.(mp3|wav|ogg|m4a)$/i.test(sample)
  ) {
    return "audio";
  }

  if (
    keyLower.includes("video") ||
    /\.(mp4|webm|mov|m4v)$/i.test(sample)
  ) {
    return "video";
  }

  if (keyLower.includes("email") || sample.includes("@")) {
    return "email";
  }

  if (
    keyLower.includes("url") ||
    keyLower.includes("website") ||
    keyLower.includes("web") ||
    keyLower.includes("link") ||
    /^https?:\/\//i.test(sample)
  ) {
    return "url";
  }

  return "";
}

function copyText(value) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(value);
  }

  const helper = document.createElement("textarea");
  helper.value = value;
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  document.body.removeChild(helper);
  return Promise.resolve();
}

function summarizeFields(features) {
  const fieldMap = new Map();

  features.forEach((feature) => {
    const props = feature?.properties;
    if (!props || typeof props !== "object") return;

    Object.entries(props).forEach(([key, value]) => {
      if (!fieldMap.has(key)) {
        fieldMap.set(key, {
          key,
          types: new Set(),
          nonEmpty: 0,
          sample: ""
        });
      }

      const entry = fieldMap.get(key);
      const type = inferType(value);
      if (type !== "empty") {
        entry.types.add(type);
        entry.nonEmpty += 1;
        if (!entry.sample) {
          entry.sample = String(value);
        }
      }
    });
  });

  return [...fieldMap.values()].sort((a, b) => a.key.localeCompare(b.key));
}

function renderFieldList(fieldSummary) {
  fieldListEl.innerHTML = "";

  if (!fieldSummary.length) {
    fieldListEl.innerHTML = '<p class="muted">No properties found in GeoJSON features.</p>';
    fieldCountEl.textContent = "0 fields";
    return;
  }

  fieldSummary.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "field-item";

    const key = document.createElement("div");
    key.className = "field-key";
    key.textContent = entry.key;

    const types = entry.types.size ? [...entry.types].join(" | ") : "unknown";
    const meta = document.createElement("div");
    meta.className = "field-meta";
    meta.textContent = `type: ${types} | non-empty rows: ${entry.nonEmpty}`;

    const popupType = inferPopupType(entry.key, entry.sample);
    const snippet = popupType
      ? `{ key: "${entry.key}", label: "${entry.key}", type: "${popupType}" },`
      : `{ key: "${entry.key}", label: "${entry.key}" },`;

    const copyButton = document.createElement("button");
    copyButton.className = "field-copy";
    copyButton.type = "button";
    copyButton.textContent = "Copy popup line";
    copyButton.addEventListener("click", async () => {
      await copyText(snippet);
      copyButton.textContent = "Copied";
      setTimeout(() => {
        copyButton.textContent = "Copy popup line";
      }, 1200);
    });

    item.appendChild(key);
    item.appendChild(meta);
    item.appendChild(copyButton);
    fieldListEl.appendChild(item);
  });

  fieldCountEl.textContent = `${fieldSummary.length} fields`;
}

async function loadGeoJson() {
  try {
    const response = await fetch(POPUP_DATA_INPUTS.dataFile);
    if (!response.ok) {
      throw new Error(`Could not load ${POPUP_DATA_INPUTS.dataFile} (${response.status})`);
    }

    const geojson = await response.json();
    const features = normalizeFeatures(geojson);

    const layerGroup = L.geoJSON(geojson, {
      style: styleFeature,
      pointToLayer,
      onEachFeature: (feature, layer) => {
        const label = getFeatureLabel(feature, featureLayers.length);
        const popup = buildPopupHtml(feature.properties || {});
        layer.bindPopup(popup, { maxWidth: 320 });

        addFeatureToList(layer, label);
        featureLayers.push(layer);
      }
    });

    layerGroup.eachLayer((layer) => layer.addTo(map));

    if (
      MAP_CENTER_INPUTS.showCenterPanel &&
      MAP_CENTER_INPUTS.autoFitToDataOnLoad &&
      layerGroup.getLayers().length
    ) {
      map.fitBounds(layerGroup.getBounds(), { padding: [20, 20] });
    }

    featureCountEl.textContent = `${featureLayers.length} listed`;
    const fieldSummary = summarizeFields(features);
    renderFieldList(fieldSummary);
    renderToggleFieldOptions(fieldSummary);
    renderFeatureToggleList(activeToggleFieldKey);
  } catch (error) {
    featureListEl.innerHTML = `<p class="muted">${escapeHtml(error.message)}</p>`;
    featureCountEl.textContent = "0 listed";
    fieldListEl.innerHTML = '<p class="muted">Load failed, so fields could not be generated.</p>';
    fieldCountEl.textContent = "0 fields";
  }
}

searchEl.addEventListener("input", (event) => {
  filterFeatureList(event.target.value);
});

if (toggleFieldSelectEl) {
  toggleFieldSelectEl.addEventListener("change", (event) => {
    activeToggleFieldKey = event.target.value;
    renderFeatureToggleList(activeToggleFieldKey);
  });
}

if (copyToggleFieldBtnEl) {
  copyToggleFieldBtnEl.addEventListener("click", async () => {
    const line = `toggleFieldKey: "${activeToggleFieldKey}",`;
    await copyText(line);
    copyToggleFieldBtnEl.textContent = "Copied";
    setTimeout(() => {
      copyToggleFieldBtnEl.textContent = "Copy toggle field line";
    }, 1200);
  });
}

if (MAP_CENTER_INPUTS.showCenterPanel) {
  const coordsEl = document.getElementById("center-coords");
  const zoomEl = document.getElementById("center-zoom");
  const copyBtn = document.getElementById("copy-center-btn");

  function updateCenterReadout() {
    const c = map.getCenter();
    const z = map.getZoom();
    const p = MAP_CENTER_INPUTS.coordinatePrecision;
    coordsEl.textContent = `[${c.lat.toFixed(p)}, ${c.lng.toFixed(p)}]`;
    zoomEl.textContent = z;
  }

  map.on("moveend", updateCenterReadout);
  updateCenterReadout();

  copyBtn.addEventListener("click", async () => {
    const c = map.getCenter();
    const z = map.getZoom();
    const p = MAP_CENTER_INPUTS.coordinatePrecision;
    const text = `center: [${c.lat.toFixed(p)}, ${c.lng.toFixed(p)}],\n  zoom: ${z},`;
    await copyText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy center & zoom";
    }, 1200);
  });
}

function getChoroplethColor(value) {
  if (value === null || value === undefined || value === "") {
    return CHOROPLETH_INPUTS.nullColor;
  }
  const num = parseFloat(value);
  if (isNaN(num)) return CHOROPLETH_INPUTS.nullColor;

  let color = CHOROPLETH_INPUTS.nullColor;
  for (const [threshold, fillColor] of CHOROPLETH_INPUTS.breaks) {
    if (num >= threshold) color = fillColor;
  }
  return color;
}

async function loadChoropleth() {
  if (!CHOROPLETH_INPUTS.enabled) return;
  try {
    const response = await fetch(CHOROPLETH_INPUTS.dataFile);
    if (!response.ok) {
      throw new Error(`Could not load ${CHOROPLETH_INPUTS.dataFile} (${response.status})`);
    }
    const geojson = await response.json();
    L.geoJSON(geojson, {
      pane: "choroplethPane",
      style: (feature) => {
        const val = feature.properties?.[CHOROPLETH_INPUTS.valueField];
        return {
          fillColor:   getChoroplethColor(val),
          fillOpacity: CHOROPLETH_INPUTS.fillOpacity,
          color:       CHOROPLETH_INPUTS.strokeColor,
          weight:      CHOROPLETH_INPUTS.strokeWeight,
          opacity:     CHOROPLETH_INPUTS.strokeOpacity
        };
      }
    }).addTo(map);
  } catch (error) {
    console.warn("Choropleth layer failed to load:", error.message);
  }
}

function renderMapLegend() {
  if (!LEGEND_INPUTS.enabled) return;
  if (LEGEND_INPUTS.mode === "choropleth" && !CHOROPLETH_INPUTS.enabled) return;

  const items = LEGEND_INPUTS.mode === "choropleth"
    ? [...CHOROPLETH_INPUTS.breaks]
        .sort((a, b) => b[0] - a[0])
        .map(([, color, label]) => ({ color, label, shape: "square" }))
    : LEGEND_INPUTS.items;

  if (!items.length) return;

  if (LEGEND_INPUTS.mode === "choropleth" && LEGEND_INPUTS.showNoDataItem) {
    items.push({
      color: CHOROPLETH_INPUTS.nullColor,
      label: CHOROPLETH_INPUTS.nullLabel,
      shape: "square"
    });
  }

  const legendControl = L.control({ position: LEGEND_INPUTS.position });

  legendControl.onAdd = () => {
    const container = document.createElement("div");
    container.className = "map-legend";
    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    const title = document.createElement("div");
    title.className = "map-legend-title";
    title.textContent = LEGEND_INPUTS.title
      || (LEGEND_INPUTS.mode === "choropleth" ? CHOROPLETH_INPUTS.legendTitle : "Legend");
    container.appendChild(title);

    const list = document.createElement("div");
    list.className = "map-legend-list";

    items.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "map-legend-item";

      const swatch = document.createElement("span");
      const shape = entry.shape || "square";
      swatch.className = `map-legend-swatch${shape === "circle" ? " is-circle" : ""}${shape === "line" ? " is-line" : ""}`;
      swatch.style.background = shape === "line" ? "transparent" : entry.color;
      if (shape === "line") {
        swatch.style.borderTopColor = entry.color;
      }

      const text = document.createElement("span");
      text.textContent = entry.label;

      item.appendChild(swatch);
      item.appendChild(text);
      list.appendChild(item);
    });

    container.appendChild(list);
    return container;
  };

  legendControl.addTo(map);
}

loadChoropleth();
loadGeoJson();
renderMapLegend();

if (COLOR_INPUTS.showColorPanel) {
  const schemeListEl = document.getElementById("color-scheme-list");

  function applyActiveScheme() {
    const scheme = getActiveScheme();
    featureLayers.forEach((layer) => {
      if (layer instanceof L.CircleMarker) {
        layer.setStyle(scheme.pointStyle);
        layer.setRadius(scheme.pointStyle.radius);
      } else {
        layer.setStyle(scheme.featureStyle);
      }
    });
  }

  Object.entries(COLOR_PRESETS).forEach(([key, preset]) => {
    const label = document.createElement("label");
    label.className = "scheme-item";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "color-scheme";
    radio.value = key;
    radio.checked = activeColorScheme === key;
    radio.addEventListener("change", () => {
      activeColorScheme = key;
      applyActiveScheme();
    });

    const swatch = document.createElement("span");
    swatch.className = "scheme-swatch";
    swatch.style.background = key === "custom"
      ? COLOR_INPUTS.customScheme.pointStyle.fillColor
      : preset.pointStyle.fillColor;

    const text = document.createElement("span");
    text.textContent = preset.label;
    if (key === "custom") {
      text.textContent += " (from map-settings.js)";
    }

    label.appendChild(radio);
    label.appendChild(swatch);
    label.appendChild(text);
    schemeListEl.appendChild(label);
  });
}
