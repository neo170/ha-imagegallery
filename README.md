# HA Image Gallery Card

Custom Lovelace dashboard card for Home Assistant.

This repository contains only the frontend card (HACS type: Dashboard).
Folder watching and in-memory image indexing are provided by the separate integration repository `ha-lastsnapshot`.

## Features

- Swipe left/right image navigation (card and fullscreen)
- Tap/click to open fullscreen viewer
- Pinch-to-zoom and pan in fullscreen (custom touch handling, works on iOS)
- Double-tap to zoom in/out
- Mouse wheel zoom on desktop (zoom towards cursor)
- Delete button in fullscreen overlay (two-tap confirmation, calls a configurable `shell_command`)
- Keyboard navigation (← → Esc)
- Auto-refresh at configurable interval

## Installation (HACS)

1. Add this repository in HACS as Custom Repository with type `Dashboard`.
2. Install `HA Image Gallery`.
3. Ensure resource is loaded (if needed): `/hacsfiles/ha-imagegallery/ha-imagegallery-card.js`.

## Required Backend

Install the separate integration repository `ha-lastsnapshot` (HACS type: Integration).
It exposes image URLs in `camera.last_snapshot` attributes:

- `images`
- `latest_image`
- `count`

## Lovelace Config

You can configure the card directly in the Lovelace UI editor (visual editor).

### Recommended (with backend integration)

```yaml
type: custom:ha-imagegallery-card
entity: camera.last_snapshot
title: Kamera Snapshots
sort: newest_first
```

### With delete support

```yaml
type: custom:ha-imagegallery-card
entity: camera.last_snapshot
title: Kamera Snapshots
sort: newest_first
delete_path: /config/www/snapshots
delete_service: delete_snapshot
```

Add the corresponding `shell_command` to your `configuration.yaml`:

```yaml
shell_command:
  delete_snapshot: "rm -f '{{ path }}'"
```

The card passes two variables to the shell command:
- `{{ path }}` — full filesystem path, e.g. `/config/www/snapshots/photo.jpg`
- `{{ filename }}` — basename only, e.g. `photo.jpg`


### Folder fallback (legacy)

```yaml
type: custom:ha-imagegallery-card
folder: /local/snapshots
refresh_interval: 60
```



