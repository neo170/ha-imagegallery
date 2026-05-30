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
- Rubber-band effect at zoom limits
- Delete button in fullscreen overlay (two-tap confirmation, calls a configurable `shell_command`)
- Safe-area / Dynamic Island aware (home indicator padding on iPhone)
- Keyboard navigation (← → Esc)
- Auto-refresh at configurable interval

## Installation (HACS)

1. Add this repository in HACS as Custom Repository with type `Dashboard`.
2. Install `HA Image Gallery`.
3. Ensure resource is loaded (if needed): `/hacsfiles/ha-imagegallery/ha-imagegallery-card.js`.

## Required Backend

Install the separate integration repository `ha-lastsnapshot` (HACS type: Integration).
It exposes image URLs in `camera.latest_snapshot` attributes:

- `images`
- `latest_image`
- `count`

## Lovelace Config

You can configure the card directly in the Lovelace UI editor (visual editor).

### Recommended (with backend integration)

```yaml
type: custom:ha-imagegallery-card
entity: camera.latest_snapshot
title: Kamera Snapshots
sort: newest_first
```

### With delete support

```yaml
type: custom:ha-imagegallery-card
entity: camera.latest_snapshot
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

### Static image list (without backend)

```yaml
type: custom:ha-imagegallery-card
images:
  - /local/snapshots/frontdoor.jpg
  - /local/snapshots/garage.jpg
```

### Folder fallback (legacy)

```yaml
type: custom:ha-imagegallery-card
folder: /local/snapshots
refresh_interval: 60
```

## Options

| Option | Default | Description |
|---|---|---|
| `entity` | `camera.latest_snapshot` | Camera entity with `images` attribute |
| `images` | — | Explicit image URL list |
| `folder` | `/local/snapshots` | Fallback folder source |
| `refresh_interval` | `15` | Refresh interval in seconds (folder mode) |
| `sort` | `newest_first` | `newest_first`, `oldest_first`, `none` |
| `title` | `Image Gallery` | Card title |
| `delete_path` | `/config/www/snapshots` | Filesystem path passed to the delete shell command |
| `delete_service` | `delete_snapshot` | Name of the `shell_command` service to call on delete |

## License

MIT
