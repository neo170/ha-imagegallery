# HA Image Gallery Card

Custom Lovelace dashboard card for Home Assistant.

This repository contains only the frontend card (HACS type: Dashboard).
Folder watching and in-memory image indexing are provided by the separate integration repository `ha-lastsnapshot`.

## Features

- Swipe left/right image navigation
- Tap/click to open fullscreen viewer
- Pinch-to-zoom and pan in fullscreen
- Works with image list from `camera.lastsnapshot` attribute `images`

## Installation (HACS)

1. Add this repository in HACS as Custom Repository with type `Dashboard`.
2. Install `HA Image Gallery`.
3. Ensure resource is loaded (if needed): `/hacsfiles/ha-imagegallery/ha-imagegallery-card.js`.

## Required Backend

Install the separate integration repository `ha-lastsnapshot` (HACS type: Integration).
It exposes image URLs in `camera.lastsnapshot` attributes:

- `images`
- `latest_image`
- `count`

## Lovelace Config

### Recommended (with backend integration)

```yaml
type: custom:ha-imagegallery-card
entity: camera.lastsnapshot
title: Kamera Snapshots
sort: newest_first
```

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

- `entity`: camera entity that provides attribute `images` (string list)
- `images`: explicit image URL list
- `folder`: fallback folder source
- `refresh_interval`: refresh interval for folder fallback
- `sort`: `newest_first` (default), `oldest_first`, `none`

## License

MIT
