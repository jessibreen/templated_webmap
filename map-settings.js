/*
  ============================================================
  USER INPUTS: 1) CENTER THE MAP
  ============================================================
  Use this section to set where the map opens.
  During setup:
  - Leave showCenterPanel: true
  - Use the live map to find the center and zoom you want
  - Copy those values back into this section
  - Set showCenterPanel: false when finished
*/

const MAP_CENTER_INPUTS = {
  // Starting map center. Format: [latitude, longitude]
  center: [21.478, -157.9408],

  // Starting zoom level.
  zoom: 11,

  // Show the setup helper while you choose the right center?
  showCenterPanel: true,

  // If true, the helper will zoom to your uploaded data on first load.
  autoFitToDataOnLoad: true,

  // Number of decimal places copied by the center helper.
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
  Use this section to choose your GeoJSON file and decide what appears
  in the popup.
*/

const POPUP_DATA_INPUTS = {
  // GeoJSON file to show on the map.
  dataFile: "./data/your-data.geojson",

  // Folder reminder:
  // GeoJSON -> /data
  // Images -> /images
  // Audio -> /audio
  // Video -> /video

  // Property used for the feature name in the sidebar list.
  listNameField: "SanctuaryName",

  // Property used as the popup title.
  popupTitleField: "SanctuaryName",

  // Show the helper panel while you build the popup?
  showFieldPanel: true,

  // Popup layout. Fields appear in the order listed here.
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
  Use this section if you want users to turn groups of features on and off.
  Leave toggleFieldKey as "" if you want one toggle per feature.
*/

const LAYER_TOGGLE_INPUTS = {
  // Property used to group toggle items. Example: "category"
  toggleFieldKey: "",

  // Show the helper panel while you choose the grouping field?
  showLayerTogglePanel: true
};

/*
  ============================================================
  USER INPUTS: 5) CHOROPLETH
  ============================================================
  Optional polygon shading layer.
  Use this when you want a choropleth under your main point or line data.
*/

const CHOROPLETH_INPUTS = {
  // Turn the choropleth layer on or off.
  enabled: false,

  // Polygon GeoJSON file used for the choropleth.
  dataFile: "./data/your-choropleth.geojson",

  // Numeric property used to choose the choropleth color.
  valueField: "value",

  // Color classes: [minimumValue, hexColor, legendLabel]
  breaks: [
    [0,   "#f7fbff", "0 – 24"  ],
    [25,  "#c6dbef", "25 – 49" ],
    [50,  "#6baed6", "50 – 74" ],
    [75,  "#2171b5", "75 – 99" ],
    [100, "#08306b", "≥ 100"   ]
  ],

  // Color and label for missing or non-numeric values.
  nullColor: "#d0d0d0",
  nullLabel: "No data",

  // Polygon fill opacity.
  fillOpacity: 0.7,

  // Polygon outline style.
  strokeColor:   "#ffffff",
  strokeWeight:  0.5,
  strokeOpacity: 0.6,

  // Default legend title used by LEGEND_INPUTS in choropleth mode.
  legendTitle: "Legend",

  // Legacy setting kept for compatibility.
  showLegend: true
};

/*
  ============================================================
  USER INPUTS: 6) LEGEND
  ============================================================
  Final map legend settings.
  Use choropleth mode for value ranges, or manual mode for your own list.
*/

const LEGEND_INPUTS = {
  // Show a legend on the map?
  enabled: false,

  // Position on the map: "topright", "topleft", "bottomright", or "bottomleft"
  position: "bottomright",

  // "choropleth" uses CHOROPLETH_INPUTS.breaks. "manual" uses items below.
  mode: "choropleth",

  // Leave blank to reuse CHOROPLETH_INPUTS.legendTitle in choropleth mode.
  title: "",

  // Include a "No data" row in choropleth mode?
  showNoDataItem: true,

  // Manual legend items. shape can be "square", "circle", or "line".
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
  Final map color settings.
*/

const COLOR_INPUTS = {
  // Basemap tiles.
  tileUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  tileAttribution: "&copy; OpenStreetMap contributors &copy; CARTO",

  // Built-in options: "teal", "warm", "slate", "forest", "berry", or "custom".
  colorScheme: "teal",

  // ------------------------------------------------------------------
  // YOUR CUSTOM COLORS
  // Only used when colorScheme is "custom".
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

  // Show the helper panel while choosing colors?
  showColorPanel: true
};

/*
  ============================================================
  CONFIG ONLY
  ============================================================
  This file is intentionally limited to user-editable settings.
  The app logic lives in app.js and reads the configuration above.
*/
