from __future__ import annotations

import os
from datetime import datetime, timezone
from threading import Lock

import voluptuous as vol
from watchdog.events import FileSystemEvent, FileSystemEventHandler
from watchdog.observers import Observer

from homeassistant.const import EVENT_HOMEASSISTANT_STOP
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType
from homeassistant.components.http import HomeAssistantView

from .const import DEFAULT_REFRESH_HINT_SECONDS, DEFAULT_SNAPSHOT_DIR, DOMAIN, IMAGE_EXTENSIONS

CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Optional("snapshot_dir", default=DEFAULT_SNAPSHOT_DIR): cv.string,
                vol.Optional("url_prefix", default="/local/snapshots"): cv.string,
            }
        )
    },
    extra=vol.ALLOW_EXTRA,
)


class SnapshotIndexManager:
    def __init__(self, hass: HomeAssistant, snapshot_dir: str, url_prefix: str) -> None:
        self.hass = hass
        self.snapshot_dir = snapshot_dir
        self.url_prefix = url_prefix.rstrip("/")
        self._observer: Observer | None = None
        self._lock = Lock()
        self._images: list[str] = []
        self._last_updated_iso: str | None = None

    async def async_start(self) -> None:
        await self.hass.async_add_executor_job(self._rebuild_index)

        handler = _SnapshotFolderHandler(self)
        observer = Observer()
        observer.schedule(handler, self.snapshot_dir, recursive=False)
        observer.start()
        self._observer = observer

    async def async_stop(self) -> None:
        observer = self._observer
        self._observer = None
        if observer is None:
            return
        await self.hass.async_add_executor_job(observer.stop)
        await self.hass.async_add_executor_job(observer.join, 2)

    async def async_refresh(self) -> None:
        await self.hass.async_add_executor_job(self._rebuild_index)

    @callback
    def async_request_refresh(self) -> None:
        self.hass.async_create_task(self.async_refresh())

    def get_payload(self) -> dict:
        with self._lock:
            return {
                "images": list(self._images),
                "count": len(self._images),
                "snapshot_dir": self.snapshot_dir,
                "last_updated": self._last_updated_iso,
                "refresh_hint_seconds": DEFAULT_REFRESH_HINT_SECONDS,
            }

    def _to_local_url(self, absolute_path: str) -> str:
        file_name = os.path.basename(absolute_path).replace("\\", "/")
        return f"{self.url_prefix}/{file_name}".replace(" ", "%20")

    def _rebuild_index(self) -> None:
        if not os.path.isdir(self.snapshot_dir):
            with self._lock:
                self._images = []
                self._last_updated_iso = datetime.now(timezone.utc).isoformat()
            return

        files: list[tuple[str, float]] = []
        for entry in os.scandir(self.snapshot_dir):
            if not entry.is_file():
                continue
            lower = entry.name.lower()
            if not lower.endswith(IMAGE_EXTENSIONS):
                continue
            try:
                files.append((entry.path, entry.stat().st_mtime))
            except OSError:
                continue

        files.sort(key=lambda item: item[1], reverse=True)
        urls = [self._to_local_url(path) for path, _ in files]

        with self._lock:
            self._images = urls
            self._last_updated_iso = datetime.now(timezone.utc).isoformat()


class _SnapshotFolderHandler(FileSystemEventHandler):
    def __init__(self, manager: SnapshotIndexManager) -> None:
        self._manager = manager

    def on_any_event(self, event: FileSystemEvent) -> None:
        if event.is_directory:
            return

        src = getattr(event, "src_path", "") or ""
        dest = getattr(event, "dest_path", "") or ""
        relevant = src.lower().endswith(IMAGE_EXTENSIONS) or dest.lower().endswith(IMAGE_EXTENSIONS)
        if relevant:
            self._manager.hass.add_job(self._manager.async_request_refresh)


class ImageListView(HomeAssistantView):
    url = "/api/ha_imagegallery/images"
    name = "api:ha_imagegallery:images"
    requires_auth = True

    def __init__(self, manager: SnapshotIndexManager) -> None:
        self._manager = manager

    async def get(self, request):
        return self.json(self._manager.get_payload())


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    conf = config.get(DOMAIN)
    if conf is None:
        return True

    snapshot_dir_config = conf.get("snapshot_dir", DEFAULT_SNAPSHOT_DIR).replace("\\", "/")
    snapshot_dir = snapshot_dir_config if os.path.isabs(snapshot_dir_config) else hass.config.path(snapshot_dir_config)
    url_prefix = conf.get("url_prefix", "/local/snapshots")

    manager = SnapshotIndexManager(hass, snapshot_dir=snapshot_dir, url_prefix=url_prefix)
    await manager.async_start()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN]["manager"] = manager
    hass.http.register_view(ImageListView(manager))

    async def _async_stop(_event) -> None:
        await manager.async_stop()

    hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, _async_stop)
    return True
