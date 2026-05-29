import { LitElement, css, html, PropertyValues, TemplateResult, CSSResult, render } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { register } from "swiper/element/bundle";

register();

interface HomeAssistant {
  locale: { language: string };
  states?: Record<string, { attributes?: Record<string, unknown> }>;
}

interface ImageGalleryCardConfig {
  type: string;
  title?: string;
  folder?: string;
  images?: string[];
  entity?: string;
  refresh_interval?: number;
  sort?: "newest_first" | "oldest_first" | "none";
}

interface ConfigChangedEvent extends Event {
  detail: { config: ImageGalleryCardConfig };
}

interface DiscoveryResult {
  images: string[];
  reason?: string;
}

type PointerMap = Map<number, { x: number; y: number }>;

type SwiperLike = {
  activeIndex: number;
  realIndex: number;
  slideNext: (speed?: number) => void;
  slidePrev: (speed?: number) => void;
  slideToLoop?: (index: number, speed?: number, runCallbacks?: boolean) => void;
  slideTo?: (index: number, speed?: number, runCallbacks?: boolean) => void;
  zoom?: { in: (ratio?: number) => void; out: () => void; scale?: number };
};

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

  @state()
  private _dialogZoomAnimate = false;

  private _zoomAnimationTimer?: number;
  private _portalEl?: HTMLElement;
  private _refreshTimer?: number;
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
  private _isAnimating = false;
  private _swipeDirection: 'left' | 'right' | null = null;
  private _cardSwipeStartX = 0;
  private _cardSwipeStartY = 0;
  private _cardSwipeStartTime = 0;
  private _cardSwipeDeltaX = 0;
  private _cardIsSwiping = false;
  private _cardSwipeAnimating = false;
  private _cardSuppressOpenUntil = 0;
  private _overlaySwipeStartX = 0;
  private _overlaySwipeDeltaX = 0;
  private _overlayIsSwiping = false;
  private _overlaySwipeAnimating = false;
  private _lastTapTime = 0;
  private _lastTapX = 0;
  private _lastTapY = 0;
  private _tapStartX = 0;
  private _tapStartY = 0;
  private _tapCandidate = false;
  private _lastTouchTapTime = 0;
  private _lastTouchTapX = 0;
  private _lastTouchTapY = 0;
  private _isPinching = false;
  private _lastCardSlideChangeAt = 0;
  private _syncingSwiperIndex = false;
  private _globalTouchStartX = 0;
  private _globalTouchStartY = 0;
  private _globalEdgeGuardActive = false;

  private _isIOSLikeDevice(): boolean {
    if (typeof navigator === "undefined") {
      return false;
    }

    const ua = navigator.userAgent ?? "";
    const isAppleMobile = /iP(hone|ad|od)/i.test(ua);
    const iPadDesktopMode = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return isAppleMobile || iPadDesktopMode;
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      overflow: hidden;
      border-radius: 16px;
      background: white;
      color: #333333;
      position: relative;
      padding: 0;
    }

    .title {
      display: none;
    }

    .viewport {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.14);
      touch-action: pan-y;
      overscroll-behavior-x: contain;
      cursor: pointer;
      user-select: none;
    }

    .card-swiper,
    .dialog-swiper {
      width: 100%;
      height: 100%;
      min-height: 0;
      display: block;
    }

    .card-slide,
    .dialog-slide {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      overflow: visible;
      background: rgba(0, 0, 0, 0.14);
    }

    .card-slide img,
    .dialog-slide img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      user-select: none;
    }

    .dialog-slide img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transform-origin: center center;
      will-change: transform;
    }

    .overlay-stage.zoom-locked {
      touch-action: none;
    }

    .overlay-stage.zoom-animating .dialog-slide img {
      transition: transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .viewport-track {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      transition: transform 0.22s ease-out;
      will-change: transform;
      pointer-events: none;
    }

    .viewport-track.no-transition {
      transition: none;
    }

    .viewport-slide {
      width: 100%;
      height: 100%;
      flex: 0 0 100%;
      overflow: hidden;
    }

    .viewport-slide img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      background: rgba(0, 0, 0, 0.14);
    }

    .caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 12px 8px;
      font-size: 1.11rem;
      font-weight: 500;
      color: white;
      gap: 8px;
      background: rgba(0, 0, 0, 0.28);
      z-index: 10;
    }

    .controls {
      display: flex;
      gap: 8px;
    }

    button {
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.08);
      color: inherit;
      border-radius: 999px;
      width: 29px;
      height: 29px;
      cursor: pointer;
      font-size: 0.77rem;
      line-height: 1;
      padding: 0;
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
      touch-action: pan-x;
      overscroll-behavior: contain;
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

    .overlay-bottom {
      padding-bottom: max(10px, env(safe-area-inset-bottom));
    }

    .overlay-stage {
      position: relative;
      overflow: hidden;
      display: block;
      min-height: 0;
      padding: 0 10px;
      box-sizing: border-box;
      touch-action: pan-x;
    }

    .overlay-track {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
      transition: transform 0.22s ease-out;
      will-change: transform;
      pointer-events: none;
    }

    .overlay-track.no-transition {
      transition: none;
    }

    .overlay-slide {
      position: relative;
      width: 100%;
      height: 100%;
      flex: 0 0 100%;
      display: grid;
      place-items: center;
      overflow: hidden;
    }

    .overlay-slide img {
      max-width: 100%;
      max-height: 100%;
      transform: translate(var(--x), var(--y)) scale(var(--s));
      transform-origin: center center;
      transition: transform 0.3s ease-out;
      will-change: transform;
      user-select: none;
      pointer-events: auto;
    }

    .overlay-slide img.no-transition {
      transition: none;
    }

    .overlay .nav {
      width: 40px;
      height: 40px;
      font-size: 1.1rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
      padding: 0;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    .close {
      width: 52px;
      height: 52px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      padding: 0;
      font-size: 2.1rem;
      color: white;
      cursor: pointer;
      line-height: 1;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    @media (max-width: 650px) {
      .viewport {
        aspect-ratio: 16 / 9;
      }

      .caption {
        font-size: 1.04rem;
      }
    }
  `;

  public static getStubConfig(): ImageGalleryCardConfig {
    return {
      type: "custom:ha-imagegallery-card",
      entity: "camera.latest_snapshot",
      title: "Kamera Snapshots",
      sort: "newest_first"
    };
  }

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement("ha-imagegallery-card-editor");
  }

  public setConfig(config: ImageGalleryCardConfig): void {
    if (!config) {
      throw new Error("Missing config");
    }
    if (config.type !== "custom:ha-imagegallery-card") {
      throw new Error("Invalid card type. Use custom:ha-imagegallery-card");
    }

    this._config = {
      entity: "camera.latest_snapshot",
      folder: "/local/snapshots",
      refresh_interval: 15,
      sort: "newest_first",
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
    window.addEventListener("touchstart", this._onGlobalTouchStart, { capture: true, passive: false });
    window.addEventListener("touchmove", this._onGlobalTouchMove, { capture: true, passive: false });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearRefreshTimer();
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("touchstart", this._onGlobalTouchStart, true);
    window.removeEventListener("touchmove", this._onGlobalTouchMove, true);
    if (this._zoomAnimationTimer) {
      window.clearTimeout(this._zoomAnimationTimer);
      this._zoomAnimationTimer = undefined;
    }
    if (this._portalEl) {
      this._portalEl.remove();
      this._portalEl = undefined;
    }
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has("_dialogOpen") && !this._dialogOpen) {
      this._resetZoom();
    }
  }

  protected firstUpdated(): void {
    this._syncSwipersToIndex();
  }

  protected updated(changedProps: PropertyValues): void {
    // Keep the out-of-tree portal in sync on every update
    this._syncPortal();

    if (changedProps.has("hass") && this._getEntityId()) {
      this._loadImagesFromEntity();
    }

    if (changedProps.has("_dialogOpen") || changedProps.has("_images")) {
      // Don't reposition the dialog swiper when images refresh while it's already open;
      // the user may be mid-navigation and an instant slideTo(0) would abort their swipe.
      const syncDialog = changedProps.has("_dialogOpen") || !this._dialogOpen;
      this._syncSwipersToIndex(syncDialog);
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
          @click=${this._onViewportClick}
          role="button"
          tabindex="0"
          @keydown=${this._onViewportKeydown}
        >
          ${this._renderMainContent()}

          <div class="caption" @click=${this._stopEvent}>
            <div>${this._images.length ? this._getFileName(this._images[this._index]) : "-"}</div>
            <div class="controls" @click=${this._stopEvent}>
              <button @click=${this._showPreviousFromButton} title="Vorheriges Bild" aria-label="Vorheriges Bild">&#9664;</button>
              <button @click=${this._showNextFromButton} title="Nächstes Bild" aria-label="Nächstes Bild">&#9654;</button>
            </div>
          </div>
        </div>
      </ha-card>
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

    const useCssMode = this._isIOSLikeDevice() ? "true" : "false";

    return html`
      <swiper-container
        class="card-swiper"
        slides-per-view="1"
        css-mode=${useCssMode}
        speed="260"
        rewind="true"
        resistance-ratio="0.15"
        threshold="3"
        long-swipes-ratio="0.18"
        long-swipes-ms="180"
        preload-images="true"
        watch-slides-progress="true"
        update-on-images-ready="true"
        @swiperslidechange=${this._onCardSlideChange}
      >
        ${this._images.map(
          (src) => html`
            <swiper-slide class="card-slide">
              <img src=${src} alt="Gallery image" loading="eager" draggable="false" />
            </swiper-slide>
          `
        )}
      </swiper-container>
    `;
  }

  private _renderDialog(): TemplateResult {
    const currentImage = this._images[this._index];

    return html`
      <div class="overlay" @wheel=${this._onDialogWheelZoom}>
        <div class="overlay-top">
          <button class="close" @click=${this._closeDialog} @touchend=${this._closeDialogFromTouch} aria-label="Schliessen">✕</button>
          <div>${this._getFileName(currentImage)}</div>
        </div>

        <div class="overlay-stage ${(this._scale > 1 || this._dialogZoomAnimate) ? 'zoom-locked' : ''} ${this._dialogZoomAnimate ? 'zoom-animating' : ''}"
          @touchstart=${this._onDialogZoomTouchStart}
          @touchmove=${this._onDialogZoomTouchMove}
          @touchend=${this._onDialogZoomTouchEnd}
          @dblclick=${this._onImageDoubleTap}
        >
          <swiper-container
            class="dialog-swiper"
            slides-per-view="1"
            css-mode=${this._isIOSLikeDevice() ? "true" : "false"}
            speed="260"
            loop="false"
            rewind="false"
            allow-touch-move="true"
            simulate-touch="true"
            resistance="false"
            threshold="5"
            touch-angle="45"
            follow-finger="true"
            preload-images="true"
            touch-release-on-edges="false"
            long-swipes-ratio="0.18"
            long-swipes-ms="180"
            @swiperslidechange=${this._onDialogSlideGesture}
            @swipertransitionend=${this._onDialogSlideTransitionEnd}
          >
            ${this._images.map(
              (src) => html`
                <swiper-slide class="dialog-slide">
                  <img src=${src} alt="Fullscreen image" loading="eager" draggable="false"
                    style=${src === currentImage
                      ? `transform: translate(${this._offsetX}px, ${this._offsetY}px) scale(${this._scale})`
                      : ''}
                  />
                </swiper-slide>
              `
            )}
          </swiper-container>
        </div>

        <div class="overlay-bottom">
          <button class="nav" @click=${this._showPrevious} @touchend=${this._showPreviousFromTouch} aria-label="Vorheriges Bild">&#9664;</button>
          <div>${this._index + 1} / ${this._images.length}</div>
          <button class="nav" @click=${this._showNext} @touchend=${this._showNextFromTouch} aria-label="Nächstes Bild">&#9654;</button>
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
      if (this._getEntityId()) {
        this._loadImagesFromEntity();
        return;
      }

      const configured = (this._config.images ?? []).filter((entry) => entry && entry.trim().length > 0);

      let images: string[] = [];
      if (configured.length > 0) {
        images = configured.map((entry) => this._normalizeImageUrl(entry));
      } else {
        const result = await this._discoverImagesFromFolder(this._config.folder ?? "/local/snapshots");
        images = result.images;
        if (!images.length && result.reason) {
          this._error = result.reason;
        }
      }

      const sortedImages = this._sortImages(images);
      const previousImages = this._images;
      const previousCurrent = previousImages[this._index];
      const previousFirst = previousImages[0];

      this._images = sortedImages;

      if (!this._images.length) {
        this._index = 0;
      } else {
        const newestChanged = previousFirst !== this._images[0];
        if (newestChanged) {
          this._index = 0;
        } else if (previousCurrent) {
          const sameImageIndex = this._images.indexOf(previousCurrent);
          this._index = sameImageIndex >= 0 ? sameImageIndex : 0;
        } else if (this._index >= this._images.length) {
          this._index = Math.max(0, this._images.length - 1);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unbekannter Fehler";
      this._error = `Bilder konnten nicht geladen werden: ${msg}`;
      this._images = [];
    } finally {
      this._loading = false;
    }
  }

  private _loadImagesFromEntity(): void {
    const entityId = this._getEntityId();
    if (!entityId) {
      return;
    }

    const state = this.hass?.states?.[entityId];
    if (!state) {
      this._images = [];
      this._index = 0;
      this._error = `Entity nicht gefunden: ${entityId}`;
      this._loading = false;
      return;
    }

    const attrs = state.attributes ?? {};
    const imagesAttr = attrs.images;
    if (!Array.isArray(imagesAttr)) {
      this._images = [];
      this._index = 0;
      this._error = `Entity ${entityId} liefert kein Attribut images`;
      this._loading = false;
      return;
    }

    const normalized = imagesAttr
      .filter((entry): entry is string => typeof entry === "string")
      .map((entry) => this._normalizeImageUrl(entry))
      .filter((entry) => this._isImagePath(entry));

    const sortedImages = this._sortImages(normalized);
    const previousImages = this._images;
    const previousCurrent = previousImages[this._index];
    const previousFirst = previousImages[0];

    this._images = sortedImages;
    this._error = this._images.length ? "" : `Entity ${entityId} liefert keine Bilder`;

    if (!this._images.length) {
      this._index = 0;
    } else {
      const newestChanged = previousFirst !== this._images[0];
      if (newestChanged) {
        this._index = 0;
      } else if (previousCurrent) {
        const sameImageIndex = this._images.indexOf(previousCurrent);
        this._index = sameImageIndex >= 0 ? sameImageIndex : 0;
      } else if (this._index >= this._images.length) {
        this._index = Math.max(0, this._images.length - 1);
      }
    }

    this._loading = false;
  }

  private async _discoverImagesFromFolder(folder: string): Promise<DiscoveryResult> {
    const normalizedFolder = this._normalizeFolder(folder);

    const fromIndexJson = await this._fetchIndexJson(normalizedFolder);
    if (fromIndexJson.length > 0) {
      return { images: fromIndexJson };
    }

    const fromDirectoryListing = await this._fetchDirectoryListing(normalizedFolder);
    if (fromDirectoryListing.length > 0) {
      return { images: fromDirectoryListing };
    }

    return {
      images: [],
      reason:
        `Keine Bilder gefunden unter ${normalizedFolder}. ` +
        `Pruefe ${normalizedFolder}/index.json (HTTP 200) oder setze images: [] direkt in der Karten-Konfiguration.`
    };
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
    const cleaned = folder.trim().replace(/\\/g, "/").replace(/^\/+/, "");
    const asLocal = cleaned
      .replace(/^config\/www\//, "local/")
      .replace(/^www\//, "local/")
      .replace(/^local\//, "local/");

    const withPrefix = `/${asLocal}`;
    return withPrefix.endsWith("/") ? withPrefix.slice(0, -1) : withPrefix;
  }

  private _normalizeImageUrl(url: string): string {
    const cleaned = url.trim().replace(/\\/g, "/");
    const withoutLeadingSlash = cleaned.replace(/^\/+/, "");

    let mapped = cleaned;
    if (/^config\/www\//.test(withoutLeadingSlash)) {
      mapped = `/${withoutLeadingSlash.replace(/^config\/www\//, "local/")}`;
    } else if (/^www\//.test(withoutLeadingSlash)) {
      mapped = `/${withoutLeadingSlash.replace(/^www\//, "local/")}`;
    } else if (/^local\//.test(withoutLeadingSlash)) {
      mapped = `/${withoutLeadingSlash}`;
    }

    return mapped.replace(/\s/g, "%20");
  }

  private _sortImages(images: string[]): string[] {
    const uniqueImages = Array.from(new Set(images));
    const sortMode = this._config?.sort ?? "newest_first";
    if (sortMode === "none") {
      return uniqueImages;
    }

    const direction = sortMode === "oldest_first" ? 1 : -1;

    return [...uniqueImages].sort((left, right) => {
      const leftTime = this._extractTimestampFromPath(left);
      const rightTime = this._extractTimestampFromPath(right);

      if (leftTime !== undefined && rightTime !== undefined && leftTime !== rightTime) {
        return (leftTime - rightTime) * direction;
      }

      const byName = left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
      return byName * direction;
    });
  }

  private _extractTimestampFromPath(pathValue: string): number | undefined {
    const source = decodeURIComponent((pathValue.split("?")[0] ?? pathValue).toLowerCase());
    const fileName = source.split("/").pop() ?? source;

    const unixMatch = fileName.match(/(^|\D)(\d{10,13})(\D|$)/);
    if (unixMatch?.[2]) {
      const raw = Number(unixMatch[2]);
      if (Number.isFinite(raw)) {
        return unixMatch[2].length === 13 ? raw : raw * 1000;
      }
    }

    const dtMatch = fileName.match(/(\d{4})[-_]?([01]\d)[-_]?([0-3]\d)[t _-]?([0-2]\d)?[:_-]?([0-5]\d)?[:_-]?([0-5]\d)?/i);
    if (dtMatch) {
      const year = Number(dtMatch[1]);
      const month = Number(dtMatch[2]);
      const day = Number(dtMatch[3]);
      const hour = Number(dtMatch[4] ?? "0");
      const minute = Number(dtMatch[5] ?? "0");
      const second = Number(dtMatch[6] ?? "0");
      const ts = new Date(year, month - 1, day, hour, minute, second).getTime();
      if (!Number.isNaN(ts)) {
        return ts;
      }
    }

    return undefined;
  }

  private _resolveFolderEntry(folder: string, entry: string): string {
    const cleaned = entry.trim();
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://") || cleaned.startsWith("/")) {
      return this._normalizeImageUrl(cleaned);
    }

    return this._normalizeImageUrl(`${folder}/${cleaned.replace(/^\.\//, "")}`);
  }

  private _showPrevious = (): void => {
    const swiper = this._getActiveSwiper();
    if (swiper) {
      swiper.slidePrev(220);
      return;
    }

    if (!this._images.length) {
      return;
    }
    this._index = (this._index - 1 + this._images.length) % this._images.length;
  };

  private _showNext = (): void => {
    const swiper = this._getActiveSwiper();
    if (swiper) {
      swiper.slideNext(220);
      return;
    }

    if (!this._images.length) {
      return;
    }
    this._index = (this._index + 1) % this._images.length;
  };

  private _openDialog = (): void => {
    if (!this._images.length || this._loading || this._error) {
      return;
    }
    this._dialogOpen = true;
  };

  private _onViewportClick = (ev: MouseEvent): void => {
    if (Date.now() - this._lastCardSlideChangeAt < 220) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this._openDialog();
  };

  private _onCardSlideChange = (ev: Event): void => {
    const swiper = this._getSwiperFromEvent(ev);
    if (!swiper || this._syncingSwiperIndex) {
      return;
    }
    this._lastCardSlideChangeAt = Date.now();
    this._index = swiper.realIndex ?? swiper.activeIndex ?? 0;
  };

  private _onDialogSlideGesture = (ev: Event): void => {
    const swiper = this._getSwiperFromEvent(ev) ?? this._getDialogSwiper();
    if (!swiper || this._syncingSwiperIndex) {
      return;
    }
    const newIndex = swiper.realIndex ?? swiper.activeIndex ?? 0;
    if (newIndex !== this._index && this._scale > 1) {
      this._resetZoom();
    }
    this._index = newIndex;
  };

  private _onDialogSlideTransitionEnd = (ev: Event): void => {
    const swiper = this._getSwiperFromEvent(ev) ?? this._getDialogSwiper();
    if (!swiper || this._syncingSwiperIndex) {
      return;
    }
    this._index = swiper.realIndex ?? swiper.activeIndex ?? 0;
  };

  private _getSwiperFromEvent(ev: Event): SwiperLike | undefined {
    const custom = ev as CustomEvent<unknown[]>;
    const candidate = custom.detail?.[0] as SwiperLike | undefined;
    return candidate;
  }

  private _getCardSwiper(): SwiperLike | undefined {
    const el = this.renderRoot?.querySelector(".card-swiper") as { swiper?: SwiperLike } | null;
    return el?.swiper;
  }

  private _getDialogSwiper(): SwiperLike | undefined {
    const el = this._dialogRoot.querySelector(".dialog-swiper") as { swiper?: SwiperLike } | null;
    return el?.swiper;
  }

  /** Returns the shadow root that contains the dialog (portal or own shadow root). */
  private get _dialogRoot(): ShadowRoot | ParentNode {
    return (this._portalEl?.shadowRoot ?? this.renderRoot) as ShadowRoot | ParentNode;
  }

  /** Keeps the dialog portal in sync with component state.
   *  Renders the dialog into a top-level <div> on <html> so that position:fixed
   *  is never trapped by a containing-block ancestor in HA's layout tree. */
  private _syncPortal(): void {
    if (!this._dialogOpen) {
      if (this._portalEl) {
        this._portalEl.remove();
        this._portalEl = undefined;
      }
      return;
    }
    if (!this._portalEl) {
      const el = document.createElement("div");
      el.attachShadow({ mode: "open" });
      document.documentElement.appendChild(el);
      this._portalEl = el;
    }
    const styleText = ((this.constructor as typeof HaImageGalleryCard).styles as CSSResult).cssText;
    render(
      html`<style>${styleText}</style>${this._renderDialog()}`,
      this._portalEl.shadowRoot!
    );
  }

  private _getActiveSwiper(): SwiperLike | undefined {
    return this._dialogOpen ? this._getDialogSwiper() : this._getCardSwiper();
  }

  private _syncSwipersToIndex(includeDialog = true): void {
    const card = this._getCardSwiper();
    const dialog = this._getDialogSwiper();
    this._syncingSwiperIndex = true;

    if (card) {
      if (typeof card.slideToLoop === "function") {
        card.slideToLoop(this._index, 0, false);
      } else if (typeof card.slideTo === "function") {
        card.slideTo(this._index, 0, false);
      }
    }

    if (includeDialog && dialog) {
      if (typeof dialog.slideTo === "function") {
        dialog.slideTo(this._index, 0, false);
      }
    }

    this._syncingSwiperIndex = false;
  }

  private _animateSwipe = (direction: 'left' | 'right'): void => {
    this.requestUpdate();
    setTimeout(() => {
      if (direction === 'left') {
        this._showNext();
      } else {
        this._showPrevious();
      }
      this._isAnimating = false;
      this._swipeDirection = null;
      this.requestUpdate();
    }, 400);
  };

  private _stopEvent = (event: Event): void => {
    event.stopPropagation();
  };

  private _showPreviousFromButton = (event: Event): void => {
    event.stopPropagation();
    this._showPrevious();
  };

  private _showNextFromButton = (event: Event): void => {
    event.stopPropagation();
    this._showNext();
  };

  private _closeDialog = (): void => {
    this._dialogOpen = false;
    this._activePointers.clear();
    this._dragging = false;
    this._overlaySwipeIsIdle();
  };

  private _closeDialogFromTouch = (ev: TouchEvent): void => {
    ev.preventDefault();
    ev.stopPropagation();
    this._closeDialog();
  };

  private _showPreviousFromTouch = (ev: TouchEvent): void => {
    ev.preventDefault();
    ev.stopPropagation();
    this._showPrevious();
  };

  private _showNextFromTouch = (ev: TouchEvent): void => {
    ev.preventDefault();
    ev.stopPropagation();
    this._showNext();
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

  private _onCardSwipeStart = (ev: TouchEvent): void => {
    if (this._cardSwipeAnimating) {
      return;
    }

    const touch = ev.changedTouches[0];
    if (!touch) {
      return;
    }
    this._cardSwipeStartX = touch.clientX;
    this._cardSwipeStartY = touch.clientY;
    this._cardSwipeStartTime = Date.now();
    this._cardSwipeDeltaX = 0;
    this._cardIsSwiping = false;
  };

  private _onCardSwipeMove = (ev: TouchEvent): void => {
    if (this._cardSwipeAnimating) {
      return;
    }

    const touch = ev.changedTouches[0];
    if (!touch) {
      return;
    }

    const dx = touch.clientX - this._cardSwipeStartX;
    const dy = touch.clientY - this._cardSwipeStartY;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      this._cardIsSwiping = true;
      this._cardSwipeDeltaX = dx;
      ev.preventDefault();
    }
  };

  private _onCardSwipeEnd = (ev: TouchEvent): void => {
    const touch = ev.changedTouches[0];
    if (!touch || this._cardSwipeAnimating) {
      return;
    }

    const dx = touch.clientX - this._cardSwipeStartX;
    const dy = touch.clientY - this._cardSwipeStartY;
    const dt = Date.now() - this._cardSwipeStartTime;
    const stage = ev.currentTarget as HTMLElement;
    const travel = stage.clientWidth + 10;
    const triggerByDistance = Math.abs(dx) > Math.max(42, stage.clientWidth * 0.17);
    const triggerByVelocity = dt < 280 && Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy);

    if (this._cardIsSwiping && (triggerByDistance || triggerByVelocity)) {
      const direction: "next" | "prev" = dx < 0 ? "next" : "prev";
      const target = direction === "next" ? -travel : travel;
      this._cardSuppressOpenUntil = Date.now() + 300;
      this._animateCardSwipeTo(target, direction);
      return;
    }

    this._cardIsSwiping = false;
    this._cardSwipeDeltaX = 0;
  };

  private _animateCardSwipeTo = (targetDelta: number, direction: "next" | "prev"): void => {
    this._cardSwipeAnimating = true;
    this._cardIsSwiping = false;
    this._cardSwipeDeltaX = targetDelta;
    this.requestUpdate();

    window.setTimeout(() => {
      if (!this._images.length) {
        this._cardSwipeAnimating = false;
        this._cardSwipeDeltaX = 0;
        return;
      }

      if (direction === "next") {
        this._index = (this._index + 1) % this._images.length;
      } else {
        this._index = (this._index - 1 + this._images.length) % this._images.length;
      }

      this._cardSwipeAnimating = false;
      this._cardSwipeDeltaX = 0;
      this.requestUpdate();
    }, 220);
  };

  private _onOverlayPointerDown = (ev: PointerEvent): void => {
    if (ev.pointerType === "touch") {
      return;
    }

    if (this._overlaySwipeAnimating) {
      return;
    }

    const stage = ev.currentTarget as HTMLElement;
    stage.setPointerCapture(ev.pointerId);

    this._activePointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

    this._tapStartX = ev.clientX;
    this._tapStartY = ev.clientY;
    this._tapCandidate = this._activePointers.size === 1;

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

    if (this._activePointers.size === 1) {
      if (this._scale > 1) {
        this._dragging = true;
        this._dragStartPointerX = ev.clientX;
        this._dragStartPointerY = ev.clientY;
        this._dragStartOffsetX = this._offsetX;
        this._dragStartOffsetY = this._offsetY;
      } else {
        // Track horizontal swipe for image navigation at 1x zoom
        this._overlaySwipeStartX = ev.clientX;
        this._overlaySwipeDeltaX = 0;
        this._overlayIsSwiping = false;
      }
    }
  };

  private _onOverlayPointerMove = (ev: PointerEvent): void => {
    if (ev.pointerType === "touch") {
      return;
    }

    if (this._overlaySwipeAnimating) {
      return;
    }

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
    } else if (this._activePointers.size === 1 && this._scale <= 1) {
      // Horizontal swipe for navigation at 1x zoom
      this._overlaySwipeDeltaX = ev.clientX - this._overlaySwipeStartX;
      if (Math.abs(this._overlaySwipeDeltaX) > 8) {
        this._overlayIsSwiping = true;
      }

      if (Math.abs(ev.clientX - this._tapStartX) > 10 || Math.abs(ev.clientY - this._tapStartY) > 10) {
        this._tapCandidate = false;
      }

      this._offsetX = 0;
      this._offsetY = 0;
    }
  };

  private _onOverlayPointerUp = (ev: PointerEvent): void => {
    if (ev.pointerType === "touch") {
      return;
    }

    this._activePointers.delete(ev.pointerId);

    if (this._activePointers.size < 2) {
      this._pinchStartDistance = 0;
    }

    if (this._activePointers.size === 0) {
      this._dragging = false;
      const wasSwiping = this._overlayIsSwiping;
      this._overlayIsSwiping = false;

      // Handle horizontal swipe for image navigation at 1x zoom
      if (this._scale <= 1 && Math.abs(this._overlaySwipeDeltaX) > 60) {
        const stage = ev.currentTarget as HTMLElement;
        const trackDistance = stage.clientWidth + 16;
        const direction = this._overlaySwipeDeltaX < 0 ? "next" : "prev";
        const targetDelta = direction === "next" ? -trackDistance : trackDistance;
        this._animateOverlaySwipeTo(targetDelta, direction);
        return;
      }

      if (!wasSwiping && this._tapCandidate) {
        this._handlePointerDoubleTap(ev.clientX, ev.clientY, ev);
      }

      this._overlaySwipeDeltaX = 0;
      this._tapCandidate = false;
    }

    if (this._scale <= 1) {
      this._offsetX = 0;
      this._offsetY = 0;
    }
  };

  private _onOverlayTouchStart = (ev: TouchEvent): void => {
    if (this._overlaySwipeAnimating || this._scale > 1 || ev.touches.length !== 1) {
      return;
    }
    const touch = ev.touches[0];
    if (!touch) {
      return;
    }
    this._overlaySwipeStartX = touch.clientX;
    this._overlaySwipeDeltaX = 0;
    this._overlayIsSwiping = false;
  };

  private _onOverlayTouchMove = (ev: TouchEvent): void => {
    if (this._overlaySwipeAnimating || this._scale > 1 || ev.touches.length !== 1) {
      return;
    }
    const touch = ev.touches[0];
    if (!touch) {
      return;
    }

    this._overlaySwipeDeltaX = touch.clientX - this._overlaySwipeStartX;
    if (Math.abs(this._overlaySwipeDeltaX) > 8) {
      this._overlayIsSwiping = true;
      ev.preventDefault();
    }
  };

  private _onOverlayTouchEnd = (ev: TouchEvent): void => {
    const touch = ev.changedTouches[0];
    if (!touch) {
      return;
    }

    if (this._scale <= 1 && Math.abs(this._overlaySwipeDeltaX) > 60) {
      const stage = ev.currentTarget as HTMLElement;
      const trackDistance = stage.clientWidth + 16;
      const direction = this._overlaySwipeDeltaX < 0 ? "next" : "prev";
      const targetDelta = direction === "next" ? -trackDistance : trackDistance;
      this._overlayIsSwiping = false;
      this._animateOverlaySwipeTo(targetDelta, direction);
      return;
    }

    this._overlayIsSwiping = false;
    this._overlaySwipeDeltaX = 0;

    const now = Date.now();
    const dt = now - this._lastTouchTapTime;
    const dx = Math.abs(touch.clientX - this._lastTouchTapX);
    const dy = Math.abs(touch.clientY - this._lastTouchTapY);

    if (dt > 0 && dt < 320 && dx < 24 && dy < 24) {
      ev.preventDefault();
      this._onImageDoubleTap(ev);
      this._lastTouchTapTime = 0;
    } else {
      this._lastTouchTapTime = now;
      this._lastTouchTapX = touch.clientX;
      this._lastTouchTapY = touch.clientY;
    }
  };

  private _animateOverlaySwipeTo = (targetDelta: number, direction: "next" | "prev"): void => {
    if (this._overlaySwipeAnimating) {
      return;
    }

    this._overlaySwipeAnimating = true;
    this._overlayIsSwiping = false;
    this._overlaySwipeDeltaX = targetDelta;
    this.requestUpdate();

    window.setTimeout(() => {
      if (!this._images.length) {
        this._overlaySwipeIsIdle();
        return;
      }

      if (direction === "next") {
        this._index = (this._index + 1) % this._images.length;
      } else {
        this._index = (this._index - 1 + this._images.length) % this._images.length;
      }

      this._overlaySwipeIsIdle();
      this.requestUpdate();
    }, 220);
  };

  private _overlaySwipeIsIdle = (): void => {
    this._overlaySwipeAnimating = false;
    this._overlayIsSwiping = false;
    this._overlaySwipeDeltaX = 0;
  };

  private _handlePointerDoubleTap = (x: number, y: number, ev?: Event): void => {
    const now = Date.now();
    const dt = now - this._lastTapTime;
    const dx = Math.abs(x - this._lastTapX);
    const dy = Math.abs(y - this._lastTapY);

    if (dt > 0 && dt < 320 && dx < 24 && dy < 24) {
      this._onImageDoubleTap(ev);
      this._lastTapTime = 0;
    } else {
      this._lastTapTime = now;
      this._lastTapX = x;
      this._lastTapY = y;
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

  private _onImageDoubleTap = (ev?: Event): void => {
    ev?.stopPropagation();
    if (this._zoomAnimationTimer) {
      window.clearTimeout(this._zoomAnimationTimer);
      this._zoomAnimationTimer = undefined;
    }
    this._dialogZoomAnimate = true;
    if (this._scale > 1) {
      this._scale = 1;
      this._offsetX = 0;
      this._offsetY = 0;
    } else {
      this._scale = 2;
      this._offsetX = 0;
      this._offsetY = 0;
    }
    this._zoomAnimationTimer = window.setTimeout(() => {
      this._dialogZoomAnimate = false;
      this._zoomAnimationTimer = undefined;
    }, 350);
  };

  private _onDialogWheelZoom = (ev: WheelEvent): void => {
    if (!this._dialogOpen || !ev.ctrlKey) {
      return;
    }
    ev.preventDefault();
    // Proportional zoom: smooth on trackpad and mouse wheel (~26% per notch)
    const pixels = ev.deltaMode === 1 ? ev.deltaY * 30 : ev.deltaY;
    const factor = Math.exp(-pixels * 0.003);
    const newScale = this._clamp(this._scale * factor, 1, 6);
    if (newScale <= 1.02) {
      this._resetZoom();
      return;
    }
    // Zoom towards the cursor: keep the image point under the cursor fixed
    const stage = this._dialogRoot.querySelector(".overlay-stage") as HTMLElement | null;
    if (stage) {
      const rect = stage.getBoundingClientRect();
      const cx = ev.clientX - (rect.left + rect.width / 2);
      const cy = ev.clientY - (rect.top + rect.height / 2);
      this._offsetX = cx - (cx - this._offsetX) * newScale / this._scale;
      this._offsetY = cy - (cy - this._offsetY) * newScale / this._scale;
    }
    this._scale = newScale;
  };

  private _onDialogZoomTouchStart = (ev: TouchEvent): void => {
    if (!this._dialogOpen) return;

    if (ev.touches.length === 2) {
      // Cancel any in-progress animation so new pinch starts from the settled position
      if (this._zoomAnimationTimer) {
        window.clearTimeout(this._zoomAnimationTimer);
        this._zoomAnimationTimer = undefined;
        this._dialogZoomAnimate = false;
      }
      ev.preventDefault();
      ev.stopPropagation();
      const t1 = ev.touches[0]!;
      const t2 = ev.touches[1]!;
      this._pinchStartDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      this._pinchStartScale = this._scale;
      this._pinchStartOffsetX = this._offsetX;
      this._pinchStartOffsetY = this._offsetY;
      this._isPinching = true;
      // Lock scroll immediately so Swiper doesn't start scrolling
      const stage = this._dialogRoot.querySelector(".overlay-stage") as HTMLElement | null;
      if (stage) {
        const rect = stage.getBoundingClientRect();
        this._pinchStartMidX = (t1.clientX + t2.clientX) / 2 - (rect.left + rect.width / 2);
        this._pinchStartMidY = (t1.clientY + t2.clientY) / 2 - (rect.top + rect.height / 2);
        stage.classList.add("zoom-locked");
      }
    } else if (ev.touches.length === 1 && this._scale > 1) {
      ev.preventDefault();
      ev.stopPropagation();
      const t = ev.touches[0]!;
      this._dragStartPointerX = t.clientX;
      this._dragStartPointerY = t.clientY;
      this._dragStartOffsetX = this._offsetX;
      this._dragStartOffsetY = this._offsetY;
    }
  };

  private _onDialogZoomTouchMove = (ev: TouchEvent): void => {
    if (!this._dialogOpen) return;

    if (ev.touches.length === 2 && this._pinchStartDistance > 0) {
      ev.preventDefault();
      ev.stopPropagation();
      const t1 = ev.touches[0]!;
      const t2 = ev.touches[1]!;
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const raw = this._pinchStartScale * (dist / this._pinchStartDistance);
      // Rubber-band: allow slight overshoot at limits for tactile feel
      const newScale = this._rubberBandScale(raw);
      // Zoom towards the initial pinch midpoint (same principle as cursor zoom on desktop)
      if (this._pinchStartScale > 0) {
        const cx = this._pinchStartMidX;
        const cy = this._pinchStartMidY;
        this._offsetX = cx - (cx - this._pinchStartOffsetX) * newScale / this._pinchStartScale;
        this._offsetY = cy - (cy - this._pinchStartOffsetY) * newScale / this._pinchStartScale;
      }
      this._scale = newScale;
      const stage = this._dialogRoot.querySelector(".overlay-stage") as HTMLElement | null;
      stage?.classList.toggle("zoom-locked", this._scale > 0.98);
      this.requestUpdate();
    } else if (ev.touches.length === 1 && this._scale > 1 && !this._isPinching) {
      ev.preventDefault();
      ev.stopPropagation();
      const t = ev.touches[0]!;
      this._offsetX = this._dragStartOffsetX + (t.clientX - this._dragStartPointerX);
      this._offsetY = this._dragStartOffsetY + (t.clientY - this._dragStartPointerY);
      this.requestUpdate();
    }
  };

  private _onDialogZoomTouchEnd = (ev: TouchEvent): void => {
    const stage = this._dialogRoot.querySelector(".overlay-stage") as HTMLElement | null;

    // Clear any pending animation timer
    if (this._zoomAnimationTimer) {
      window.clearTimeout(this._zoomAnimationTimer);
      this._zoomAnimationTimer = undefined;
    }

    // All fingers lifted → pinch is over; re-arm single-finger pan
    if (ev.touches.length === 0) {
      this._isPinching = false;
    }

    const ZOOM_MIN = 1, ZOOM_MAX = 6;

    if (this._scale < ZOOM_MIN || this._scale > ZOOM_MAX) {
      // Rubber-band snap-back: animate to the clamped limit
      const target = this._clamp(this._scale, ZOOM_MIN, ZOOM_MAX);
      this._dialogZoomAnimate = true;
      this._scale = target;
      if (target <= 1) {
        this._offsetX = 0;
        this._offsetY = 0;
      }
      this._zoomAnimationTimer = window.setTimeout(() => {
        this._dialogZoomAnimate = false;
        this._zoomAnimationTimer = undefined;
        if (this._scale <= 1) stage?.classList.remove("zoom-locked");
      }, 350);
      return; // no double-tap check after a pinch release
    }

    if (this._scale < ZOOM_MIN + 0.05) {
      // Barely zoomed: instant reset
      this._scale = 1;
      this._offsetX = 0;
      this._offsetY = 0;
      stage?.classList.remove("zoom-locked");
    }

    // Double-tap detection: zoom in when at 1x, zoom out when zoomed
    if (ev.changedTouches.length === 1 && ev.touches.length === 0) {
      const touch = ev.changedTouches[0]!;
      const now = Date.now();
      const dt = now - this._lastTouchTapTime;
      const dx = Math.abs(touch.clientX - this._lastTouchTapX);
      const dy = Math.abs(touch.clientY - this._lastTouchTapY);
      if (dt > 0 && dt < 320 && dx < 30 && dy < 30) {
        this._onImageDoubleTap(ev);
        this._lastTouchTapTime = 0;
      } else {
        this._lastTouchTapTime = now;
        this._lastTouchTapX = touch.clientX;
        this._lastTouchTapY = touch.clientY;
      }
    }
  };

  private _onGlobalTouchStart = (ev: TouchEvent): void => {
    if (!this._dialogOpen || !this._isIOSLikeDevice() || ev.touches.length !== 1) {
      this._globalEdgeGuardActive = false;
      return;
    }

    const touch = ev.touches[0];
    if (!touch) {
      this._globalEdgeGuardActive = false;
      return;
    }

    this._globalTouchStartX = touch.clientX;
    this._globalTouchStartY = touch.clientY;

    // Never intercept touches on interactive elements (buttons, links)
    const target = ev.target as Element | null;
    if (target?.closest('button, a')) {
      this._globalEdgeGuardActive = false;
      return;
    }

    const edge = 50;
    const isEdge = touch.clientX <= edge || touch.clientX >= window.innerWidth - edge;
    this._globalEdgeGuardActive = isEdge;
    if (isEdge) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  private _onGlobalTouchMove = (ev: TouchEvent): void => {
    if (!this._dialogOpen || !this._isIOSLikeDevice() || !this._globalEdgeGuardActive || ev.touches.length !== 1) {
      return;
    }

    const touch = ev.touches[0];
    if (!touch) {
      return;
    }

    const dx = touch.clientX - this._globalTouchStartX;
    const dy = touch.clientY - this._globalTouchStartY;

    if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
      ev.preventDefault();
      ev.stopPropagation();
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

  private _rubberBandScale(raw: number): number {
    const min = 1, max = 6;
    if (raw < min) return min - (min - raw) * 0.35;
    if (raw > max) return max + (raw - max) * 0.35;
    return raw;
  }

  private _resetZoom = (): void => {
    if (this._zoomAnimationTimer) {
      window.clearTimeout(this._zoomAnimationTimer);
      this._zoomAnimationTimer = undefined;
    }
    this._dialogZoomAnimate = false;
    this._isPinching = false;
    this._scale = 1;
    this._offsetX = 0;
    this._offsetY = 0;
    this._activePointers.clear();
    this._dragging = false;
  };

  private _getFileName(pathValue: string): string {
    const source = pathValue.split("?")[0] ?? pathValue;
    const chunks = source.split("/");
    const fileName = decodeURIComponent(chunks[chunks.length - 1] ?? pathValue);
    return this._extractDateTimeFromFileName(fileName);
  }

  private _extractDateTimeFromFileName(fileName: string): string {
    const match = fileName.match(/^(.+?)_(\d{8})_(\d{6})\./);
    if (match) {
      const dateStr = match[2];
      const timeStr = match[3];
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const hour = timeStr.substring(0, 2);
      const min = timeStr.substring(2, 4);
      return `${day}.${month}.${year} ${hour}:${min}`;
    }
    return fileName;
  }

  private _restartRefreshTimer(): void {
    this._clearRefreshTimer();

    if (this._getEntityId()) {
      return;
    }

    const intervalSeconds = this._config?.refresh_interval ?? 15;
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

  private _getEntityId(): string | undefined {
    const configured = this._config?.entity?.trim();
    if (configured) {
      return configured;
    }

    if (this.hass?.states?.["camera.latest_snapshot"]) {
      return "camera.latest_snapshot";
    }

    if (this.hass?.states?.["camera.lastsnapshot"]) {
      return "camera.lastsnapshot";
    }

    return undefined;
  }
}

@customElement("ha-imagegallery-card-editor")
class HaImageGalleryCardEditor extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @state()
  private _config: ImageGalleryCardConfig = {
    type: "custom:ha-imagegallery-card",
    entity: "camera.latest_snapshot",
    sort: "newest_first"
  };

  static styles = css`
    .editor {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }

    .hint {
      font-size: 0.85rem;
      opacity: 0.8;
      line-height: 1.4;
    }

    label {
      font-size: 0.8rem;
      opacity: 0.85;
      margin-bottom: 4px;
      display: block;
    }

    input,
    select {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(120, 120, 120, 0.45);
      background: transparent;
      color: inherit;
      font: inherit;
    }
  `;

  public setConfig(config: ImageGalleryCardConfig): void {
    this._config = {
      entity: "camera.latest_snapshot",
      sort: "newest_first",
      ...config,
      type: "custom:ha-imagegallery-card"
    };
  }

  protected render(): TemplateResult {
    return html`
      <div class="editor">
        <div>
          <label>LastSnapshot Kamera Entity</label>
          <input
            .value=${this._config.entity ?? "camera.latest_snapshot"}
            @input=${(ev: InputEvent) => this._onInput("entity", (ev.target as HTMLInputElement).value)}
            placeholder="camera.latest_snapshot"
          />
        </div>

        <div>
          <label>Titel</label>
          <input
            .value=${this._config.title ?? ""}
            @input=${(ev: InputEvent) => this._onInput("title", (ev.target as HTMLInputElement).value)}
            placeholder="Kamera Snapshots"
          />
        </div>

        <div>
          <label>Sortierung</label>
          <select
            .value=${this._config.sort ?? "newest_first"}
            @change=${(ev: Event) => this._onInput("sort", (ev.target as HTMLSelectElement).value)}
          >
            <option value="newest_first">Neueste zuerst</option>
            <option value="oldest_first">Aelteste zuerst</option>
            <option value="none">Keine Sortierung</option>
          </select>
        </div>

        <div class="hint">Empfohlen: Entity camera.latest_snapshot aus der ha-lastsnapshot Integration verwenden.</div>
      </div>
    `;
  }

  private _onInput(key: keyof ImageGalleryCardConfig, rawValue: string): void {
    const value = rawValue.trim();
    const updated: ImageGalleryCardConfig = {
      ...this._config,
      type: "custom:ha-imagegallery-card"
    };

    if (!value && key !== "sort") {
      delete updated[key];
    } else {
      updated[key] = value as never;
    }

    this._config = updated;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      })
    );
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }

  interface HTMLElementTagNameMap {
    "ha-imagegallery-card-editor": HaImageGalleryCardEditor;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-imagegallery-card",
  name: "HA Image Gallery",
  description: "Swipe through images and open fullscreen with pinch-to-zoom preview"
});
