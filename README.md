# HA Image Gallery Card

Custom Lovelace card for Home Assistant with backend folder monitoring. The integration watches `/config/www/snapshots`, builds an internal image list, and the card reads that list via API.

## Features

- Shows images from a folder in Home Assistant
- Swipe left/right to navigate
- Tap/click image to open fullscreen viewer
- Pinch-to-zoom on touch devices
- Mouse wheel zoom on desktop
- Drag to pan while zoomed
- Backend folder watcher (watchdog) for new files
- Internal image index sorted by file mtime (newest first)

## Installation (HACS)

1. Push this repository to GitHub.
2. In HACS, add the repository as a Custom Repository:
   - Type: Dashboard
   - Repository: `your-user/ha-imagegallery`
3. Install **HA Image Gallery** through HACS.
4. Restart Home Assistant.
5. Add the card in Lovelace.

## Backend Integration Setup (required for folder watch)

Copy folder `custom_components/ha_imagegallery` into your Home Assistant config directory and add this to `configuration.yaml`:

```yaml
ha_imagegallery:
  snapshot_dir: www/snapshots
  url_prefix: /local/snapshots
```

Then restart Home Assistant.

The integration exposes API endpoint:

```text
/api/ha_imagegallery/images
```

The card reads this endpoint first. If backend integration is not installed, it falls back to index.json/directory listing.

Resource URL after HACS install (if not auto-added):

```text
/hacsfiles/ha-imagegallery/ha-imagegallery-card.js
```

## Build

```bash
npm install
npm run build
```

For development:

```bash
npm run watch
```

## Lovelace Configuration

### Basic

```yaml
type: custom:ha-imagegallery-card
folder: /local/snapshots
```

Important: use frontend path `/local/...` in card config, not `/config/www/...`.

### With options

```yaml
type: custom:ha-imagegallery-card
title: Kamera Snapshots
folder: /local/snapshots
refresh_interval: 60
sort: newest_first
```

### Explicit image list (optional)

```yaml
type: custom:ha-imagegallery-card
images:
  - /local/snapshots/frontdoor.jpg
  - /local/snapshots/garage.jpg
```

## How image discovery works

The card tries the following, in order:

1. Uses `images` from card config when provided.
2. Tries `index.json` in the folder (for example `/local/snapshots/index.json`).
3. Tries to parse a directory listing when the server exposes one.

Recommended for reliability: create `/www/snapshots/index.json` with either:

```json
["img1.jpg", "img2.jpg"]
```

or

```json
{ "images": ["img1.jpg", "img2.jpg"] }
```

## Notes

- Place images under `config/www/snapshots` in Home Assistant.
- Files in `/www` are available under `/local` in the frontend.
- Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.bmp`.
- Default behavior: backend integration updates internal list on filesystem events; card refreshes view and jumps to the newest image when list changes.

## Sorting

- `sort: newest_first` (default) shows newest image first.
- `sort: oldest_first` shows chronological order from oldest to newest.
- `sort: none` keeps source order.

Timestamp detection for sorting uses common filename patterns, for example:

- `snapshot_2026-05-29_16-45-30.jpg`
- `cam_20260529_164530.jpg`
- `image_1748537130.jpg` (unix timestamp)

## Troubleshooting: "Keine Bilder gefunden"

1. Verify the card uses `folder: /local/snapshots`.
2. Open `/local/snapshots/` in the browser. If directory listing is blocked (typical), create `/config/www/snapshots/index.json`.
3. Example `index.json`:

```json
{
  "images": ["bild1.jpg", "bild2.jpg", "bild3.jpg"]
}
```

4. Alternative: set images directly in Lovelace via `images:`.

## Release Checklist

1. Run `npm install` and `npm run ci`.
2. Commit source and generated file `dist/ha-imagegallery-card.js`.
3. Create a GitHub tag like `v0.1.0` and publish a release.

## License

MIT
