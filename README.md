# Webmap Template

This folder is a reusable Leaflet webmap template.

## What this template is for

- Load a GeoJSON file placed in `webmap-template/data/`
- Keep images, audio, and video in dedicated top-level folders
- Change map title/subtitle
- Change map center/zoom
- Control popup field order and section placement in one JavaScript file
- Auto-generate a list of available GeoJSON fields so users can see valid popup keys

## Files

- `index.html`: app shell
- `styles.css`: visual styling
- `map-settings.js`: configuration + logic (heavily commented)
- `data/`: GeoJSON files only
- `images/`: local image files for popups
- `audio/`: local audio files for popups
- `video/`: local video files for popups

## After copying this template: publish first

Set up GitHub Pages before doing map customization so you can test changes live.

1. Click **Use this template** on GitHub and create your own repository.
2. In your new repo, open **Settings** > **Pages**.
3. Under **Build and deployment**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)`
4. Click **Save**.
5. Wait for the "Your site is live" message, then open the Pages URL.
6. Keep that published map page open while you edit `map-settings.js` in another tab.

This template is designed for that two-tab workflow (published map + `map-settings.js`).

## Main setup steps

1. Open `map-settings.js`.
2. In `POPUP_DATA_INPUTS`, set:
   - `dataFile` (for example `./data/my-project.geojson`)
3. In `TITLE_INPUTS`, set:
   - `title`
   - `subtitle`
4. In `MAP_CENTER_INPUTS`, set:
   - `center` and `zoom` (use the **Set Map Center** panel to find these values — see Workflow below)
5. In `POPUP_DATA_INPUTS.popupSections`, reorder/add/remove fields to control popup layout.
6. In `COLOR_INPUTS`, adjust map colors/symbol styling.

## Workflow

1. In your GitHub repo, upload your GeoJSON into `data/`.
2. Upload popup images into `images/`, audio into `audio/`, and video into `video/`.
3. Open two tabs and keep both open while you configure the map:
   - `map-settings.js` in the GitHub website editor
   - your published map page
4. Set `POPUP_DATA_INPUTS.dataFile` to your filename.
5. Commit changes.
6. Refresh the published map page.
7. **Setup phase: Set Map Center**
   - Pan and zoom the map until your study area is framed the way you want.
   - Click **Copy center & zoom** — this copies two ready-to-paste lines.
   - Back in `map-settings.js`, replace the `center` and `zoom` values in `MAP_CENTER_INPUTS` with the copied values.
   - Commit in GitHub and refresh the published map page.
   - Final map step: set `MAP_CENTER_INPUTS.showCenterPanel` to `false` when centering is done.
8. **Setup phase: Layer Toggle Field**
   - In the map sidebar, choose a grouping field in **Layer Toggle Field**.
   - Click **Copy toggle field line** and paste it into `LAYER_TOGGLE_INPUTS.toggleFieldKey` in `map-settings.js`.
   - Commit in GitHub and refresh the published map page.
   - Final map step: set `LAYER_TOGGLE_INPUTS.showLayerTogglePanel` to `false` when this helper is no longer needed.
9. **Setup phase: Available Fields / Popup Data**
   - Use **Available Fields** to review properties and click **Copy popup line** for fields you want.
   - Paste copied lines into `POPUP_DATA_INPUTS.popupSections` and reorder them as needed.
   - Commit in GitHub and refresh the published map page.
   - Final map step: set `POPUP_DATA_INPUTS.showFieldPanel` to `false` when popup setup is complete.
10. Final checks:
   - Confirm your map opens with the right center/zoom.
   - Confirm toggles and popups behave as expected.
   - Keep helper panels off for the final published view.

## GeoJSON notes

- Feature names in the sidebar come from `POPUP_DATA_INPUTS.listNameField`.
- Popup title comes from `POPUP_DATA_INPUTS.popupTitleField`.
- Popup field types supported by the template are `email`, `url`, `image`, `audio`, and `video`.
- Keep GeoJSON in `data/` and use relative media paths like `./images/photo.jpg`, `./audio/sound.mp3`, or `./video/clip.mp4` in popup fields.
- If those fields are missing, the template uses fallback labels.
- The template works with many different datasets and geographies, not just Hawaii.

## Publish on GitHub Pages

If you skipped the publish-first section above, complete those steps before map setup.

After Pages is enabled, refresh the site after each commit to see updates.

### Important note about folders

GitHub Pages branch deployment supports only `/ (root)` or `/docs`.
If your site files are inside a subfolder, do one of these:

- Move site files to the repository root.
- Or move site files into a `docs/` folder and publish from `/docs`.

### If Pages is blocked or not visible

- Confirm the repository is not empty and has `index.html` in the published folder.
- Confirm you committed changes to the same branch selected in Pages settings.
- If your org/account restricts Pages, ask your admin to allow GitHub Pages for your repo.

## Running locally (optional)

Because browsers often block `fetch()` from `file://` pages, run a local server:

```bash
# From the folder that contains index.html
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

If `python3` is not available, you can use Node instead:

```bash
npx serve .
```
