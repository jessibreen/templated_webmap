# Webmap Template

This folder is a reusable Leaflet webmap template.

## What this template is for

- Load a GeoJSON file placed in `webmap-template/data/`
- Change map title/subtitle
- Change map center/zoom
- Control popup field order and section placement in one JavaScript file
- Auto-generate a list of available GeoJSON fields so users can see valid popup keys

## Files

- `index.html`: app shell
- `styles.css`: visual styling
- `app.js`: configuration + logic (heavily commented)

## Main setup steps

1. Open `app.js`.
2. In `MAP_CONFIG`, set:
   - `dataFile` (for example `./data/my-project.geojson`)
   - `title`
   - `subtitle`
   - `center` and `zoom`
3. In `popupSections`, reorder/add/remove fields to control popup layout.

## Workflow

1. In your GitHub repo, upload your GeoJSON into `webmap-template/data/`.
2. Edit `app.js` in the GitHub website editor.
3. Set `MAP_CONFIG.dataFile` to your filename.
4. Commit changes.
5. Open your published GitHub Pages map (set up in the section below).
6. Look at the **Available Fields** panel in the sidebar:
   - It lists every property found in the GeoJSON.
   - It shows inferred data type and how many rows contain a value.
   - Click **Copy popup line** to copy a ready-to-paste line for `popupSections`.
7. Paste copied lines into `popupSections` and reorder them as needed.
8. Commit changes and refresh the GitHub Pages site.

## GeoJSON notes

- Feature names in the sidebar come from `MAP_CONFIG.listNameField`.
- Popup title comes from `MAP_CONFIG.popupTitleField`.
- If those fields are missing, the template uses fallback labels.
- The template works with many different datasets and geographies, not just Hawaii.

## Publish on GitHub Pages (recommended for this course)

Each student can do this themselves in their own repository.

1. Make your own repository from this template and push your changes.
2. In your repo, open **Settings** > **Pages**.
3. Under **Build and deployment**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/ (root)`
4. Click **Save**.
5. Wait for the "Your site is live" message and open the URL shown there.
6. After each commit, refresh the site to see updates.

### Important note about folders

GitHub Pages branch deployment supports only `/ (root)` or `/docs`.
If your site files are currently inside `webmap-template/`, do one of these:

- Move the contents of `webmap-template/` to the repository root.
- Or move the contents of `webmap-template/` into a `docs/` folder and publish from `/docs`.

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
