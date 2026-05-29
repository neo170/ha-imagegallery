import { LitElement, css, html, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface HomeAssistant {
  locale: { language: string };
}

interface ImageGalleryCardConfig {
  type: string;
  title?: string;
  folder?: string;
  images?: string[];
  refresh_interval?: number;
}

type PointerMap = Map<number, { x: number; y: number }>;

@customElement("ha-imagegallery-card")
export class HaImageGalleryCard extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config?: ImageGalleryCardConfig;

  @state()
  private _images: string[] = [];

  @state()
  private _index = 0;

  @state()
  private _loading = false;

  @state()
  private _error = "";

  @state()
  private _dialogOpen = false;

  @state()
  private _scale = 1;

  @state()
  private _offsetX = 0;

  @state()
  private _offsetY = 0;

  private _refreshTimer?: number;
  private _touchStartX = 0;
  private _touchStartY = 0;
  private _touchStartTime = 0;

  private _activePointers: PointerMap = new Map();
  private _pinchStartDistance = 0;
  private _pinchStartScale = 1;
  private _pinchStartOffsetX = 0;
  private _pinchStartOffsetY = 0;
  private _pinchStartMidX = 0;
  private _pinchStartMidY = 0;
  private _dragging = false;
  private _dragStartPointerX = 0;
  private _dragStartPointerY = 0;
  private _dragStartOffsetX = 0;
  private _dragStartOffsetY = 0;

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 16px;
      background: linear-gradient(160deg, #10253d, #0e1f2f 45%, #123a3a);
      color: #f3f7fb;
      position: relative;
    }

    .title {
      font-size: 1.05rem;
      font-weight: 650;
      letter-spacing: 0.02em;
      padding: 14px 16px 0;
    }

    .viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      margin-top: 8px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.04);
      touch-action: pan-y;
      cursor: pointer;
      user-select: none;
    }

    .viewport img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      background: rgba(0, 0, 0, 0.14);
    }

    .caption {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px 12px;
      font-size: 0.88rem;
      color: #d5e3f0;
      gap: 8px;
    }

    .controls {
      display: flex;
      gap: 8px;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.25);
      background: rgba(255, 255, 255, 0.1);
      color: inherit;
      border-radius: 999px;
      width: 34px;
      height: 34px;
      cursor: pointer;
      font-size: 0.95rem;
    }

    button:focus-visible {
      outline: 2px solid #7fdae8;
      outline-offset: 2px;
    }

    .center {
      display: grid;
      place-items: center;
      height: 100%;
      text-align: center;
      color: #d6e8f7;
      padding: 16px;
      font-size: 0.95rem;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(5, 11, 18, 0.95);
      z-index: 12000;
      display: grid;
      grid-template-rows: auto 1fr auto;
      touch-action: none;
    }

    .overlay-top,
    .overlay-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      color: #ebf1f8;
      gap: 10px;
    }

    .overlay-stage {
      position: relative;
      overflow: hidden;
      display: grid;
      place-items: center;
      touch-action: none;
    }

    .overlay-stage img {
      max-width: 100%;
      max-height: 100%;
      transform: translate(var(--x), var(--y)) scale(var(--s));
      transform-origin: center center;
      will-change: transform;
      user-select: none;
      pointer-events: none;
    }

    .overlay .nav {
      width: 40px;
      height: 40px;
      font-size: 1.1rem;
    }

    .close {
      width: auto;
      border-radius: 10px;
      padding: 0 12px;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.03em;
    }

    @media (max-width: 650px) {
      .viewport {
        aspect-ratio: 4 / 3;
      }

      .caption {
        font-size: 0.82rem;
      }
    }
  `;

  public setConfig(config: ImageGalleryCardConfig): void {
    if (!config) {
      throw new Error("Missing config");
    }
    if (config.type !== "custom:ha-imagegallery-card") {
      throw new Error("Invalid card type. Use custom:ha-imagegallery-card");
    }

    this._config = {
      folder: "/local/snapshots",
      ...config
    };

    this._index = 0;
    void this._loadImages();
    this._restartRefreshTimer();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (this._config) {
      this._restartRefreshTimer();
    }
    window.addEventListener("keydown", this._onKeyDown);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearRefreshTimer();
    window.removeEventListener("keydown", this._onKeyDown);
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has("_dialogOpen") && !this._dialogOpen) {
      this._resetZoom();
    }
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card><div class="center">Ungultige Kartenkonfiguration</div></ha-card>`;
    }

    const title = this._config.title ?? "Image Gallery";

    return html`
      <ha-card>
        <div class="title">${title}</div>

        <div
          class="viewport"
          @touchstart=${this._onSwipeStart}
          @touchend=${this._onSwipeEnd}
          @click=${this._openDialog}
          role="button"
          tabindex="0"
          @keydown=${this._onViewportKeydown}
        >
          ${this._renderMainContent()}
        </div>

        <div class="caption">
          <div>${this._images.length ? this._getFileName(this._images[this._index]) : "-"}</div>
          <div class="controls">
            <button @click=${this._showPrevious} title="Vorheriges Bild" aria-label="Vorheriges Bild">&#8592;</button>
            <button @click=${this._showNext} title="Nächstes Bild" aria-label="Nächstes Bild">&#8594;</button>
          </div>
        </div>
      </ha-card>

      ${this._dialogOpen ? this._renderDialog() : ""}
    `;
  }

  private _renderMainContent(): TemplateResult {
    if (this._loading) {
      return html`<div class="center">Bilder werden geladen...</div>`;
    }

    if (this._error) {
      return html`<div class="center">${this._error}</div>`;
    }

    if (!this._images.length) {
      return html`<div class="center">Keine Bilder gefunden</div>`;
    }

    return html`<img src=${this._images[this._index]} alt="Gallery image" loading="lazy" />`;
  }

  private _renderDialog(): TemplateResult {
    const currentImage = this._images[this._index];
    const style = `--s:${this._scale};--x:${this._offsetX}px;--y:${this._offsetY}px;`;

    return html`
      <div class="overlay" @wheel=${this._onWheelZoom}>
        <div class="overlay-top">
          <button class="close" @click=${this._closeDialog} aria-label="Schliessen">SCHLIESSEN</button>
          <div>${this._getFileName(currentImage)}</div>
        </div>

        <div
          class="overlay-stage"
          @pointerdown=${this._onOverlayPointerDown}
          @pointermove=${this._onOverlayPointerMove}
          @pointerup=${this._onOverlayPointerUp}
          @pointercancel=${this._onOverlayPointerUp}
          @dblclick=${this._resetZoom}
        >
          <img src=${currentImage} alt="Fullscreen image" style=${style} draggable="false" />
        </div>

        <div class="overlay-bottom">
          <button class="nav" @click=${this._showPrevious} aria-label="Vorheriges Bild">&#8592;</button>
          <div>${this._index + 1} / ${this._images.length}</div>
          <button class="nav" @click=${this._showNext} aria-label="Nächstes Bild">&#8594;</button>
        </div>
      </div>
    `;
  }

  private async _loadImages(): Promise<void> {
    if (!this._config) {
      return;
    }

    this._loading = true;
    this._error = "";

    try {
      const configured = (this._config.images ?? []).filter((entry) => entry && entry.trim().length > 0);

      let images: string[] = [];
      if (configured.length > 0) {
        images = configured.map((entry) => this._normalizeImageUrl(entry));
      } else {
        images = await this._discoverImagesFromFolder(this._config.folder ?? "/local/snapshots");
      }

      this._images = images;
      if (this._index >= this._images.length) {
        this._index = Math.max(0, this._images.length - 1);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
      this._error = `Bilder konnten nicht geladen werden: ${msg}`;
      this._images = [];
    } finally {
      this._loading = false;
    }
  }

  private async _discoverImagesFromFolder(folder: string): Promise<string[]> {
    const normalizedFolder = this._normalizeFolder(folder);

    const fromIndexJson = await this._fetchIndexJson(normalizedFolder);
    if (fromIndexJson.length > 0) {
      return fromIndexJson;
    }

    const fromDirectoryListing = await this._fetchDirectoryListing(normalizedFolder);
    if (fromDirectoryListing.length > 0) {
      return fromDirectoryListing;
    }

    return [];
  }

  private async _fetchIndexJson(folder: string): Promise<string[]> {
    const url = `${folder}/index.json`;
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        return [];
      }

      const payload = (await response.json()) as unknown;
      const entries = Array.isArray(payload)
        ? payload
        : typeof payload === "object" && payload && Array.isArray((payload as { images?: unknown }).images)
          ? (payload as { images: unknown[] }).images
          : [];

      const names = entries
        .filter((item): item is string => typeof item === "string")
        .filter((item) => this._isImagePath(item));

      return names.map((name) => this._resolveFolderEntry(folder, name));
    } catch {
      return [];
    }
  }

  private async _fetchDirectoryListing(folder: string): Promise<string[]> {
    try {
      const response = await fetch(`${folder}/`, { cache: "no-store" });
      if (!response.ok) {
        return [];
      }
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      const hrefs = Array.from(doc.querySelectorAll("a"))
        .map((node) => node.getAttribute("href") ?? "")
        .filter((href) => href.length > 0 && !href.startsWith("../"));

      const imageHrefs = hrefs.filter((href) => this._isImagePath(href));
      return imageHrefs.map((href) => this._resolveFolderEntry(folder, href));
    } catch {
      return [];
    }
  }

  private _isImagePath(pathValue: string): boolean {
    const p = pathValue.toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"].some((ext) => p.endsWith(ext));
  }

  private _normalizeFolder(folder: string): string {
    const cleaned = folder.trim();
    const withPrefix = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    return withPrefix.endsWith("/") ? withPrefix.slice(0, -1) : withPrefix;
  }

  private _resolveFolderEntry(folder: string, entry: string): string {
    const cleaned = entry.trim();
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://") || cleaned.startsWith("/")) {
      return this._normalizeImageUrl(cleaned);
    }

    return this._normalizeImageUrl(`${folder}/${cleaned.replace(/^\.\//, "")}`);
  }

  private _normalizeImageUrl(url: string): string {
    return url.replace(/\\/g, "/").replace(/\s/g, "%20");
  }

  private _showPrevious = (): void => {
    if (!this._images.length) {
      return;
    }
    this._index = (this._index - 1 + this._images.length) % this._images.length;
    this._resetZoom();
  };

  private _showNext = (): void => {
    if (!this._images.length) {
      return;
    }
    this._index = (this._index + 1) % this._images.length;
    this._resetZoom();
  };

  private _openDialog = (): void => {
    if (!this._images.length || this._loading || this._error) {
      return;
    }
    this._dialogOpen = true;
  };

  private _closeDialog = (): void => {
    this._dialogOpen = false;
    this._activePointers.clear();
    this._dragging = false;
  };

  private _onViewportKeydown = (ev: KeyboardEvent): void => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this._openDialog();
    }
    if (ev.key === "ArrowLeft") {
      this._showPrevious();
    }
    if (ev.key === "ArrowRight") {
      this._showNext();
    }
  };

  private _onSwipeStart = (ev: TouchEvent): void => {
    const touch = ev.changedTouches[0];
    if (!touch) {
      return;
    }
    this._touchStartX = touch.clientX;
    this._touchStartY = touch.clientY;
    this._touchStartTime = Date.now();
  };

  private _onSwipeEnd = (ev: TouchEvent): void => {
    const touch = ev.changedTouches[0];
    if (!touch) {
      return;
    }

    const dx = touch.clientX - this._touchStartX;
    const dy = touch.clientY - this._touchStartY;
    const dt = Date.now() - this._touchStartTime;

    if (Math.abs(dx) > 45 && Math.abs(dy) < 60 && dt < 600) {
      if (dx < 0) {
        this._showNext();
      } else {
        this._showPrevious();
      }
    }
  };

  private _onOverlayPointerDown = (ev: PointerEvent): void => {
    const stage = ev.currentTarget as HTMLElement;
    stage.setPointerCapture(ev.pointerId);

    this._activePointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

    if (this._activePointers.size === 2) {
      const [a, b] = Array.from(this._activePointers.values());
      this._pinchStartDistance = this._distance(a, b);
      this._pinchStartScale = this._scale;
      this._pinchStartOffsetX = this._offsetX;
      this._pinchStartOffsetY = this._offsetY;
      this._pinchStartMidX = (a.x + b.x) / 2;
      this._pinchStartMidY = (a.y + b.y) / 2;
      this._dragging = false;
      return;
    }

    if (this._activePointers.size === 1 && this._scale > 1) {
      this._dragging = true;
      this._dragStartPointerX = ev.clientX;
      this._dragStartPointerY = ev.clientY;
      this._dragStartOffsetX = this._offsetX;
      this._dragStartOffsetY = this._offsetY;
    }
  };

  private _onOverlayPointerMove = (ev: PointerEvent): void => {
    if (!this._activePointers.has(ev.pointerId)) {
      return;
    }

    this._activePointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

    if (this._activePointers.size === 2) {
      const [a, b] = Array.from(this._activePointers.values());
      const distance = this._distance(a, b);
      const midpointX = (a.x + b.x) / 2;
      const midpointY = (a.y + b.y) / 2;

      const newScale = this._clamp(this._pinchStartScale * (distance / this._pinchStartDistance), 1, 5);
      this._scale = newScale;

      const shiftX = midpointX - this._pinchStartMidX;
      const shiftY = midpointY - this._pinchStartMidY;
      this._offsetX = this._pinchStartOffsetX + shiftX;
      this._offsetY = this._pinchStartOffsetY + shiftY;
      return;
    }

    if (this._dragging && this._activePointers.size === 1 && this._scale > 1) {
      this._offsetX = this._dragStartOffsetX + (ev.clientX - this._dragStartPointerX);
      this._offsetY = this._dragStartOffsetY + (ev.clientY - this._dragStartPointerY);
    }
  };

  private _onOverlayPointerUp = (ev: PointerEvent): void => {
    this._activePointers.delete(ev.pointerId);

    if (this._activePointers.size < 2) {
      this._pinchStartDistance = 0;
    }

    if (this._activePointers.size === 0) {
      this._dragging = false;
    }

    if (this._scale <= 1) {
      this._offsetX = 0;
      this._offsetY = 0;
    }
  };

  private _onWheelZoom = (ev: WheelEvent): void => {
    if (!this._dialogOpen) {
      return;
    }

    ev.preventDefault();
    const delta = -ev.deltaY;
    const factor = delta > 0 ? 1.08 : 0.92;
    this._scale = this._clamp(this._scale * factor, 1, 5);

    if (this._scale <= 1.01) {
      this._scale = 1;
      this._offsetX = 0;
      this._offsetY = 0;
    }
  };

  private _onKeyDown = (ev: KeyboardEvent): void => {
    if (!this._dialogOpen) {
      return;
    }

    if (ev.key === "Escape") {
      this._closeDialog();
      return;
    }

    if (ev.key === "ArrowLeft") {
      this._showPrevious();
      return;
    }

    if (ev.key === "ArrowRight") {
      this._showNext();
    }
  };

  private _distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private _clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private _resetZoom = (): void => {
    this._scale = 1;
    this._offsetX = 0;
    this._offsetY = 0;
    this._activePointers.clear();
    this._dragging = false;
  };

  private _getFileName(pathValue: string): string {
    const source = pathValue.split("?")[0] ?? pathValue;
    const chunks = source.split("/");
    return decodeURIComponent(chunks[chunks.length - 1] ?? pathValue);
  }

  private _restartRefreshTimer(): void {
    this._clearRefreshTimer();

    const intervalSeconds = this._config?.refresh_interval;
    if (!intervalSeconds || intervalSeconds < 5) {
      return;
    }

    this._refreshTimer = window.setInterval(() => {
      void this._loadImages();
    }, intervalSeconds * 1000);
  }

  private _clearRefreshTimer(): void {
    if (this._refreshTimer) {
      window.clearInterval(this._refreshTimer);
      this._refreshTimer = undefined;
    }
  }

  public getCardSize(): number {
    return 4;
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-imagegallery-card",
  name: "HA Image Gallery",
  description: "Swipe through images and open fullscreen with pinch-to-zoom preview"
});
