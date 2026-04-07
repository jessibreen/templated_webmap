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
  title: "My GeoJSON Webmap",

  // Optional subtitle text under the title.
  subtitle: "Edit map-settings.js to change this text, popup fields, and data source."
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

  // Which GeoJSON property should be used as the feature display name.
  // If missing, the template falls back to "Feature N" labels.
  listNameField: "OrgName",

  // Property used as the popup title.
  popupTitleField: "OrgName",

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
      { key: "OrgEmail", label: "Email", type: "email" },
      { key: "OrgPhone", label: "Phone" },
      { key: "OrgWebSite", label: "Website", type: "url" }
    ]
  },
  {
    heading: "About",
    showWhenEmpty: false,
    fields: [
      { key: "Mission", label: "Mission" },
      { key: "group_type", label: "Group Type" },
      { key: "District", label: "District" }
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
  USER INPUTS: 5) COLORS
  ============================================================
*/

const COLOR_INPUTS = {
  // Basemap tiles.
  tileUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  tileAttribution: "&copy; OpenStreetMap contributors &copy; CARTO",

  // Styling for polygons/lines.
  featureStyle: {
    color: "#1f6f78",
    weight: 2,
    opacity: 0.85,
    fillColor: "#2f8b77",
    fillOpacity: 0.3
  },

  // Point symbols for Point/MultiPoint geometries.
  pointStyle: {
    radius: 6,
    color: "#ffffff",
    weight: 1,
    fillColor: "#1f6f78",
    fillOpacity: 0.95
  },

  // Show the "Color Settings" helper panel in the sidebar?
  // STEP 1: Set true while adjusting colors (map updates live).
  // STEP 2: Click "Copy color settings", paste into featureStyle/pointStyle above.
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

const map = L.map("map").setView(MAP_CENTER_INPUTS.center, MAP_CENTER_INPUTS.zoom);

L.tileLayer(COLOR_INPUTS.tileUrl, {
  attribution: COLOR_INPUTS.tileAttribution,
  maxZoom: 20
}).addTo(map);

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
  if (/^https?:\/\//i.test(url)) return url;
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

function styleFeature() {
  return COLOR_INPUTS.featureStyle;
}

function pointToLayer(_feature, latlng) {
  return L.circleMarker(latlng, COLOR_INPUTS.pointStyle);
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

loadGeoJson();

if (COLOR_INPUTS.showColorPanel) {
  const workingFeatureStyle = Object.assign({}, COLOR_INPUTS.featureStyle);
  const workingPointStyle = Object.assign({}, COLOR_INPUTS.pointStyle);

  function applyFeatureStyle() {
    featureLayers.forEach((layer) => {
      if (!(layer instanceof L.CircleMarker)) {
        layer.setStyle(workingFeatureStyle);
      }
    });
  }

  function applyPointStyle() {
    featureLayers.forEach((layer) => {
      if (layer instanceof L.CircleMarker) {
        layer.setStyle(workingPointStyle);
      }
    });
  }

  function bindColorInput(id, styleObj, key, applyFn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = styleObj[key];
    el.addEventListener("input", () => {
      styleObj[key] = el.value;
      applyFn();
    });
  }

  function bindRangeInput(id, valId, styleObj, key, applyFn) {
    const el = document.getElementById(id);
    const valEl = document.getElementById(valId);
    if (!el) return;
    el.value = styleObj[key];
    if (valEl) valEl.textContent = styleObj[key];
    el.addEventListener("input", () => {
      styleObj[key] = parseFloat(el.value);
      if (valEl) valEl.textContent = el.value;
      applyFn();
    });
  }

  bindColorInput("feat-stroke-color", workingFeatureStyle, "color", applyFeatureStyle);
  bindColorInput("feat-fill-color", workingFeatureStyle, "fillColor", applyFeatureStyle);
  bindRangeInput("feat-fill-opacity", "feat-fill-opacity-val", workingFeatureStyle, "fillOpacity", applyFeatureStyle);
  bindRangeInput("feat-opacity", "feat-opacity-val", workingFeatureStyle, "opacity", applyFeatureStyle);
  bindRangeInput("feat-weight", "feat-weight-val", workingFeatureStyle, "weight", applyFeatureStyle);

  bindColorInput("pt-fill-color", workingPointStyle, "fillColor", applyPointStyle);
  bindColorInput("pt-stroke-color", workingPointStyle, "color", applyPointStyle);
  bindRangeInput("pt-fill-opacity", "pt-fill-opacity-val", workingPointStyle, "fillOpacity", applyPointStyle);
  bindRangeInput("pt-weight", "pt-weight-val", workingPointStyle, "weight", applyPointStyle);
  bindRangeInput("pt-radius", "pt-radius-val", workingPointStyle, "radius", applyPointStyle);

  const copyColorBtnEl = document.getElementById("copy-color-btn");
  if (copyColorBtnEl) {
    copyColorBtnEl.addEventListener("click", async () => {
      const n = (v) => String(parseFloat(v.toFixed(4)));
      const text = [
        `  featureStyle: {`,
        `    color: "${workingFeatureStyle.color}",`,
        `    weight: ${n(workingFeatureStyle.weight)},`,
        `    opacity: ${n(workingFeatureStyle.opacity)},`,
        `    fillColor: "${workingFeatureStyle.fillColor}",`,
        `    fillOpacity: ${n(workingFeatureStyle.fillOpacity)}`,
        `  },`,
        `  pointStyle: {`,
        `    radius: ${n(workingPointStyle.radius)},`,
        `    color: "${workingPointStyle.color}",`,
        `    weight: ${n(workingPointStyle.weight)},`,
        `    fillColor: "${workingPointStyle.fillColor}",`,
        `    fillOpacity: ${n(workingPointStyle.fillOpacity)}`,
        `  }`
      ].join("\n");
      await copyText(text);
      copyColorBtnEl.textContent = "Copied!";
      setTimeout(() => {
        copyColorBtnEl.textContent = "Copy color settings";
      }, 1200);
    });
  }
}
