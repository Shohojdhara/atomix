/**
 * PhotoViewer - Vanilla JavaScript implementation
 * A comprehensive photo viewer component with zoom, pan, navigation, and touch gestures
 */

interface PhotoViewerOptions {
  startIndex?: number;
  enableKeyboardNavigation?: boolean;
  enableGestures?: boolean;
  enableFullscreen?: boolean;
  thumbnailPosition?: 'bottom' | 'top' | 'left' | 'right' | 'none';
  onImageChange?: (index: number) => void;
  onClose?: () => void;
  images?: Array<string | {
    src: string;
    alt?: string;
    thumbnail?: string;
    title?: string;
    description?: string;
    date?: string;
    author?: string;
    tags?: string[];
  }>;
}

interface ImageType {
  src: string;
  alt?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
}

interface ImageState {
  zoomLevel: number;
  position: { x: number; y: number };
  rotation: number;
  bounds: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

class PhotoViewer {
  private element: HTMLElement;
  private options: PhotoViewerOptions;
  private currentIndex: number = 0;
  private images: ImageType[] = [];
  private imageStates: Record<number, ImageState> = {};
  private isDragging = false;
  private isFullscreen = false;
  private showInfo = false;
  private isTransitioning = false;
  private startDragPosition = { x: 0, y: 0 };
  private touchPoints: { x: number; y: number }[] = [];
  private lastDistance: number | null = null;
  private lastMidpoint: { x: number; y: number } | null = null;

  // DOM references
  private backdrop?: HTMLElement;
  private container?: HTMLElement;
  private header?: HTMLElement;
  private content?: HTMLElement;
  private imageContainer?: HTMLElement;
  private imageElement?: HTMLImageElement;
  private thumbnails?: HTMLElement;
  private infoPanel?: HTMLElement;
  private navPrev?: HTMLElement;
  private navNext?: HTMLElement;

  static DEFAULTS: PhotoViewerOptions = {
    startIndex: 0,
    enableKeyboardNavigation: true,
    enableGestures: true,
    enableFullscreen: true,
    thumbnailPosition: 'bottom',
    images: []
  };

  constructor(element: string | HTMLElement, options: PhotoViewerOptions = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
    this.options = { ...PhotoViewer.DEFAULTS, ...options };
    
    if (!this.element) {
      throw new Error('PhotoViewer: Element not found');
    }

    this.currentIndex = this.options.startIndex || 0;
    this.images = this.processImages(this.options.images || []);
    this.initializeImageStates();
    
    this.init();
  }

  private init(): void {
    this.createStructure();
    this.bindEvents();
    this.render();
  }

  private initializeImageStates(): void {
    this.imageStates = {};
    for (let i = 0; i < this.images.length; i++) {
      this.imageStates[i] = this.getDefaultImageState();
    }
  }

  private getDefaultImageState(): ImageState {
    return {
      zoomLevel: 1,
      position: { x: 0, y: 0 },
      rotation: 0,
      bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    };
  }

  private getCurrentImageState(): ImageState {
    return this.imageStates[this.currentIndex] || this.getDefaultImageState();
  }

  private updateCurrentImageState(updates: Partial<ImageState>): void {
    this.imageStates[this.currentIndex] = {
      ...this.getCurrentImageState(),
      ...updates
    };
    this.updateImageTransform();
  }

  private processImages(images: Array<string | ImageType>): ImageType[] {
    return images.map(img => (typeof img === 'string' ? { src: img } : img));
  }

  private calculateBounds(zoomLevel: number, rotation: number): ImageState['bounds'] {
    if (!this.imageElement || !this.imageContainer) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const image = this.imageElement;
    const container = this.imageContainer;
    
    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;
    
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    const rotationRad = (rotation * Math.PI) / 180;
    const cos = Math.abs(Math.cos(rotationRad));
    const sin = Math.abs(Math.sin(rotationRad));
    
    const aspectRatio = imageWidth / imageHeight;
    let displayWidth, displayHeight;
    
    if (containerWidth / containerHeight > aspectRatio) {
      displayHeight = Math.min(containerHeight * 0.9, imageHeight);
      displayWidth = displayHeight * aspectRatio;
    } else {
      displayWidth = Math.min(containerWidth * 0.9, imageWidth);
      displayHeight = displayWidth / aspectRatio;
    }
    
    const rotatedWidth = displayWidth * cos + displayHeight * sin;
    const rotatedHeight = displayWidth * sin + displayHeight * cos;
    
    const scaledWidth = rotatedWidth * zoomLevel;
    const scaledHeight = rotatedHeight * zoomLevel;
    
    const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
    const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);
    
    return {
      minX: -maxX,
      maxX: maxX,
      minY: -maxY,
      maxY: maxY
    };
  }

  private constrainPosition(position: { x: number; y: number }, bounds: ImageState['bounds']): { x: number; y: number } {
    return {
      x: Math.max(bounds.minX, Math.min(bounds.maxX, position.x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, position.y))
    };
  }

  private updateBounds(): void {
    const currentState = this.getCurrentImageState();
    const newBounds = this.calculateBounds(currentState.zoomLevel, currentState.rotation);
    const constrainedPosition = this.constrainPosition(currentState.position, newBounds);
    
    this.updateCurrentImageState({
      bounds: newBounds,
      position: constrainedPosition
    });
  }

  private createStructure(): void {
    this.element.className = 'c-photo-viewer';
    this.element.setAttribute('role', 'dialog');
    this.element.setAttribute('aria-modal', 'true');
    this.element.setAttribute('aria-label', 'Photo viewer');

    this.element.innerHTML = `
      <div class="c-photo-viewer__backdrop"></div>
      <div class="c-photo-viewer__container">
        <div class="c-photo-viewer__header">
          <div class="c-photo-viewer__counter-badge"></div>
          <div class="c-photo-viewer__actions">
            <button class="c-photo-viewer__action-button" data-action="zoom-out" aria-label="Zoom out">
              <svg width="20" height="20"><path d="M3 10h14" stroke="currentColor" stroke-width="2"/></svg>
            </button>
            <button class="c-photo-viewer__action-button" data-action="reset-zoom" aria-label="Reset zoom">
              <svg width="20" height="20"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
            <button class="c-photo-viewer__action-button" data-action="zoom-in" aria-label="Zoom in">
              <svg width="20" height="20"><path d="M10 3v14M3 10h14" stroke="currentColor" stroke-width="2"/></svg>
            </button>
            <button class="c-photo-viewer__action-button" data-action="rotate" aria-label="Rotate image">
              <svg width="20" height="20"><path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="2" fill="none"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
            <button class="c-photo-viewer__action-button" data-action="download" aria-label="Download image">
              <svg width="20" height="20"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
            <button class="c-photo-viewer__action-button" data-action="info" aria-label="Toggle info">
              <svg width="20" height="20"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" stroke-width="2"/></svg>
            </button>
            <button class="c-photo-viewer__action-button" data-action="fullscreen" aria-label="Toggle fullscreen">
              <svg width="20" height="20"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            </button>
            <button class="c-photo-viewer__action-button c-photo-viewer__close" data-action="close" aria-label="Close">
              <svg width="20" height="20"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/></svg>
            </button>
          </div>
        </div>
        <div class="c-photo-viewer__content">
          <button class="c-photo-viewer__nav-button c-photo-viewer__nav-button--prev" data-action="prev" aria-label="Previous image">
            <svg width="24" height="24"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
          </button>
          <div class="c-photo-viewer__image-container">
            <img class="c-photo-viewer__image" alt="" draggable="false">
          </div>
          <button class="c-photo-viewer__nav-button c-photo-viewer__nav-button--next" data-action="next" aria-label="Next image">
            <svg width="24" height="24"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
          </button>
        </div>
        <div class="c-photo-viewer__thumbnails"></div>
        <div class="c-photo-viewer__info-panel">
          <button class="c-photo-viewer__info-close" data-action="close-info" aria-label="Close info">
            <svg width="20" height="20"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/></svg>
          </button>
          <div class="c-photo-viewer__info-content"></div>
        </div>
      </div>
    `;

    // Store DOM references
    this.backdrop = this.element.querySelector('.c-photo-viewer__backdrop') as HTMLElement;
    this.container = this.element.querySelector('.c-photo-viewer__container') as HTMLElement;
    this.header = this.element.querySelector('.c-photo-viewer__header') as HTMLElement;
    this.content = this.element.querySelector('.c-photo-viewer__content') as HTMLElement;
    this.imageContainer = this.element.querySelector('.c-photo-viewer__image-container') as HTMLElement;
    this.imageElement = this.element.querySelector('.c-photo-viewer__image') as HTMLImageElement;
    this.thumbnails = this.element.querySelector('.c-photo-viewer__thumbnails') as HTMLElement;
    this.infoPanel = this.element.querySelector('.c-photo-viewer__info-panel') as HTMLElement;
    this.navPrev = this.element.querySelector('[data-action="prev"]') as HTMLElement;
    this.navNext = this.element.querySelector('[data-action="next"]') as HTMLElement;
  }

  private bindEvents(): void {
    // Action buttons
    this.element.addEventListener('click', this.handleActionClick.bind(this));
    
    // Backdrop click to close
    this.backdrop?.addEventListener('click', () => this.close());
    
    // Image interactions
    if (this.imageContainer) {
      this.imageContainer.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.imageContainer.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.imageContainer.addEventListener('mouseup', this.handleMouseUp.bind(this));
      this.imageContainer.addEventListener('mouseleave', this.handleMouseUp.bind(this));
      this.imageContainer.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
      this.imageContainer.addEventListener('dblclick', this.handleDoubleClick.bind(this));
      
      // Touch events
      this.imageContainer.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
      this.imageContainer.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
      this.imageContainer.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    }
    
    // Keyboard events
    if (this.options.enableKeyboardNavigation) {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    // Fullscreen change
    document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    
    // Window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleActionClick(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('[data-action]') as HTMLElement;
    if (!button) return;
    
    const action = button.getAttribute('data-action');
    
    switch (action) {
      case 'zoom-out':
        this.zoomOut();
        break;
      case 'zoom-in':
        this.zoomIn();
        break;
      case 'reset-zoom':
        this.resetZoom();
        break;
      case 'rotate':
        this.rotate();
        break;
      case 'download':
        this.download();
        break;
      case 'info':
        this.toggleInfo();
        break;
      case 'fullscreen':
        this.toggleFullscreen();
        break;
      case 'close':
        this.close();
        break;
      case 'prev':
        this.goToPrevious();
        break;
      case 'next':
        this.goToNext();
        break;
      case 'close-info':
        this.showInfo = false;
        this.updateInfoPanel();
        break;
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.goToPrevious();
        break;
      case 'ArrowRight':
        this.goToNext();
        break;
      case 'Escape':
        this.close();
        break;
    }
  }

  private handleMouseDown(event: MouseEvent): void {
    const currentState = this.getCurrentImageState();
    if (currentState.zoomLevel > 1) {
      event.preventDefault();
      this.isDragging = true;
      this.startDragPosition = {
        x: event.clientX - currentState.position.x,
        y: event.clientY - currentState.position.y
      };
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    const currentState = this.getCurrentImageState();
    const newPosition = {
      x: event.clientX - this.startDragPosition.x,
      y: event.clientY - this.startDragPosition.y
    };
    const constrainedPosition = this.constrainPosition(newPosition, currentState.bounds);
    this.updateCurrentImageState({ position: constrainedPosition });
  }

  private handleMouseUp(): void {
    this.isDragging = false;
  }

  private handleWheel(event: WheelEvent): void {
    const currentState = this.getCurrentImageState();
    
    // Detect platform and gesture type for proper handling
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const isTrackpadPinch = event.ctrlKey && isMac;
    const isTrackpadScroll = !event.ctrlKey && Math.abs(event.deltaX) > 0;
    
    // Handle different zoom gesture types
    let zoomAmount: number;
    
    if (isTrackpadPinch) {
      // MacBook trackpad pinch zoom - high sensitivity, smooth scaling
      zoomAmount = event.deltaY * -0.02;
      event.preventDefault();
      event.stopPropagation();
    } else if (isTrackpadScroll) {
      // MacBook trackpad scroll - ignore horizontal, handle vertical carefully
      if (currentState.zoomLevel > 1) {
        // Only prevent scroll when zoomed in
        event.preventDefault();
        zoomAmount = event.deltaY * -0.002;
      } else {
        // Allow natural scroll when not zoomed
        return;
      }
    } else {
      // Regular mouse wheel - medium sensitivity, always zoom when PhotoViewer is active
      zoomAmount = event.deltaY * -0.005;
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (!this.imageContainer) return;
    
    let rect;
    try {
      rect = this.imageContainer.getBoundingClientRect();
    } catch (error) {
      console.warn('PhotoViewer: Error getting bounding rect', error);
      return;
    }
    
    if (!rect || rect.width === 0 || rect.height === 0) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const cursorX = event.clientX - rect.left - centerX;
    const cursorY = event.clientY - rect.top - centerY;
    
    this.zoom(currentState.zoomLevel + zoomAmount, cursorX, cursorY);
  }

  private handleDoubleClick(event: MouseEvent): void {
    const currentState = this.getCurrentImageState();
    const rect = this.imageContainer!.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const cursorX = event.clientX - rect.left - centerX;
    const cursorY = event.clientY - rect.top - centerY;
    
    let newZoom: number;
    let newPosition = { x: 0, y: 0 };
    
    if (currentState.zoomLevel < 1.5) {
      newZoom = 2;
      newPosition = { x: -cursorX * 0.5, y: -cursorY * 0.5 };
    } else if (currentState.zoomLevel < 3) {
      newZoom = 4;
      newPosition = { x: -cursorX * 0.75, y: -cursorY * 0.75 };
    } else {
      newZoom = 1;
      newPosition = { x: 0, y: 0 };
    }
    
    this.zoom(newZoom, 0, 0, newPosition);
  }

  private handleTouchStart(event: TouchEvent): void {
    if (!this.options.enableGestures) return;
    
    const touches = event.touches;
    
    // Always prevent default for multi-touch to stop page zoom
    if (touches.length > 1) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.touchPoints = Array.from(touches).map(touch => ({
      x: touch.clientX,
      y: touch.clientY
    }));
    
    const currentState = this.getCurrentImageState();
    
    if (touches.length === 1 && currentState.zoomLevel > 1) {
      this.isDragging = true;
      this.startDragPosition = {
        x: touches[0].clientX - currentState.position.x,
        y: touches[0].clientY - currentState.position.y
      };
    } else if (touches.length === 2) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      this.lastDistance = Math.sqrt(dx * dx + dy * dy);
      
      this.lastMidpoint = {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2
      };
    }
  }

  private handleTouchMove(event: TouchEvent): void {
    if (!this.options.enableGestures) return;
    
    const touches = event.touches;
    const currentState = this.getCurrentImageState();
    
    // Always prevent default for multi-touch gestures to stop page zoom
    if (touches.length > 1) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Prevent default for single touch when zoomed in to avoid conflicts
    if (currentState.zoomLevel > 1 && touches.length === 1) {
      event.preventDefault();
    }
    
    if (touches.length === 1 && this.isDragging && currentState.zoomLevel > 1) {
      const newPosition = {
        x: touches[0].clientX - this.startDragPosition.x,
        y: touches[0].clientY - this.startDragPosition.y
      };
      const constrainedPosition = this.constrainPosition(newPosition, currentState.bounds);
      this.updateCurrentImageState({ position: constrainedPosition });
    } else if (touches.length === 2 && this.lastDistance !== null) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const zoomDelta = (distance - this.lastDistance) * 0.005;
      this.lastDistance = distance;
      
      const currentMidpoint = {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2
      };
      
      if (this.lastMidpoint && this.imageContainer) {
        let rect;
        try {
          rect = this.imageContainer.getBoundingClientRect();
        } catch (error) {
          console.warn('PhotoViewer: Error getting bounding rect in touch move', error);
          return;
        }
        
        if (!rect || rect.width === 0 || rect.height === 0) return;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const midpointX = currentMidpoint.x - rect.left - centerX;
        const midpointY = currentMidpoint.y - rect.top - centerY;
        
        this.zoom(currentState.zoomLevel + zoomDelta, midpointX, midpointY);
      }
      
      this.lastMidpoint = currentMidpoint;
    }
  }

  private handleTouchEnd(): void {
    this.isDragging = false;
    this.lastDistance = null;
    this.lastMidpoint = null;
  }

  private handleFullscreenChange(): void {
    this.isFullscreen = !!document.fullscreenElement;
    this.updateClasses();
    setTimeout(() => this.updateBounds(), 100);
  }

  private handleResize(): void {
    this.updateBounds();
  }

  private zoom(newZoomLevel: number, centerX: number = 0, centerY: number = 0, forcePosition?: { x: number; y: number }): void {
    const currentState = this.getCurrentImageState();
    const oldZoom = currentState.zoomLevel;
    const clampedZoom = Math.max(0.1, Math.min(5, newZoomLevel));
    
    if (clampedZoom !== oldZoom) {
      const newBounds = this.calculateBounds(clampedZoom, currentState.rotation);
      let newPosition: { x: number; y: number };
      
      if (forcePosition) {
        newPosition = forcePosition;
      } else {
        const zoomFactor = clampedZoom / oldZoom;
        newPosition = {
          x: currentState.position.x + centerX * (1 - zoomFactor) * 0.5,
          y: currentState.position.y + centerY * (1 - zoomFactor) * 0.5
        };
      }
      
      const constrainedPosition = this.constrainPosition(newPosition, newBounds);
      
      this.updateCurrentImageState({
        zoomLevel: clampedZoom,
        bounds: newBounds,
        position: constrainedPosition
      });
      
      this.updateControls();
    }
  }

  private updateImageTransform(): void {
    if (!this.imageElement) return;
    
    const currentState = this.getCurrentImageState();
    const cursor = this.isDragging ? 'grabbing' : currentState.zoomLevel > 1 ? 'grab' : 'default';
    
    if (this.imageContainer) {
      this.imageContainer.style.cursor = cursor;
      this.imageContainer.style.opacity = this.isTransitioning ? '0.7' : '1';
      if (this.isTransitioning) {
        this.imageContainer.classList.add('is-transitioning');
      } else {
        this.imageContainer.classList.remove('is-transitioning');
      }
    }
    
    this.imageElement.style.transform = `scale(${currentState.zoomLevel}) translate(${currentState.position.x}px, ${currentState.position.y}px) rotate(${currentState.rotation}deg)`;
    this.imageElement.style.transition = this.isDragging 
      ? 'none' 
      : this.isTransitioning 
        ? 'opacity 0.15s ease-out' 
        : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    this.imageElement.style.transformOrigin = 'center center';
    this.imageElement.style.willChange = this.isDragging ? 'transform' : 'auto';
  }

  private updateClasses(): void {
    this.element.className = [
      'c-photo-viewer',
      `c-photo-viewer--thumbnails-${this.options.thumbnailPosition}`,
      this.isDragging ? 'c-photo-viewer--dragging' : '',
      this.isFullscreen ? 'c-photo-viewer--fullscreen' : '',
      this.showInfo ? 'c-photo-viewer--info-open' : '',
      this.isTransitioning ? 'is-transitioning' : ''
    ].filter(Boolean).join(' ');
  }

  private render(): void {
    this.updateCounter();
    this.updateImage();
    this.updateThumbnails();
    this.updateControls();
    this.updateInfoPanel();
    this.updateClasses();
  }

  private updateCounter(): void {
    const counter = this.element.querySelector('.c-photo-viewer__counter-badge');
    if (counter) {
      counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
  }

  private updateImage(): void {
    const currentImage = this.images[this.currentIndex];
    if (!currentImage || !this.imageElement) return;
    
    this.imageElement.src = currentImage.src;
    this.imageElement.alt = currentImage.alt || `Image ${this.currentIndex + 1}`;
    
    // Update bounds when image loads
    if (this.imageElement.complete) {
      this.updateBounds();
    } else {
      this.imageElement.onload = () => this.updateBounds();
    }
  }

  private updateThumbnails(): void {
    if (!this.thumbnails || this.options.thumbnailPosition === 'none') return;
    
    if (this.images.length <= 1) {
      this.thumbnails.style.display = 'none';
      return;
    }
    
    this.thumbnails.style.display = 'flex';
    this.thumbnails.innerHTML = this.images.map((image, index) => `
      <button class="c-photo-viewer__thumbnail ${index === this.currentIndex ? 'is-active' : ''}" 
              data-index="${index}" 
              aria-label="View image ${index + 1}"
              ${index === this.currentIndex ? 'aria-current="true"' : ''}>
        <img src="${image.thumbnail || image.src}" 
             alt="${image.alt || `Thumbnail ${index + 1}`}" 
             class="c-photo-viewer__thumbnail-img" 
             loading="lazy">
      </button>
    `).join('');
    
    // Bind thumbnail clicks
    this.thumbnails.addEventListener('click', (event) => {
      const button = (event.target as HTMLElement).closest('[data-index]') as HTMLElement;
      if (button) {
        const index = parseInt(button.getAttribute('data-index') || '0');
        this.goToImage(index);
      }
    });
  }

  private updateControls(): void {
    const currentState = this.getCurrentImageState();
    const zoomOutBtn = this.element.querySelector('[data-action="zoom-out"]') as HTMLButtonElement;
    const zoomInBtn = this.element.querySelector('[data-action="zoom-in"]') as HTMLButtonElement;
    const resetZoomBtn = this.element.querySelector('[data-action="reset-zoom"]') as HTMLButtonElement;
    
    if (zoomOutBtn) zoomOutBtn.disabled = currentState.zoomLevel <= 0.1;
    if (zoomInBtn) zoomInBtn.disabled = currentState.zoomLevel >= 5;
    if (resetZoomBtn) resetZoomBtn.disabled = currentState.zoomLevel === 1 && currentState.position.x === 0 && currentState.position.y === 0 && currentState.rotation === 0;
    
    if (this.navPrev) this.navPrev.style.display = this.images.length > 1 ? 'flex' : 'none';
    if (this.navNext) this.navNext.style.display = this.images.length > 1 ? 'flex' : 'none';
    
    const prevBtn = this.navPrev as HTMLButtonElement;
    const nextBtn = this.navNext as HTMLButtonElement;
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.images.length - 1;
  }

  private updateInfoPanel(): void {
    if (!this.infoPanel) return;
    
    this.infoPanel.style.display = this.showInfo ? 'block' : 'none';
    
    if (!this.showInfo) return;
    
    const currentImage = this.images[this.currentIndex];
    const content = this.infoPanel.querySelector('.c-photo-viewer__info-content');
    
    if (!content || !currentImage) return;
    
    content.innerHTML = [
      currentImage.title ? `<h3 class="c-photo-viewer__info-title">${currentImage.title}</h3>` : '',
      currentImage.description ? `<p class="c-photo-viewer__info-description">${currentImage.description}</p>` : '',
      currentImage.date ? `<p class="c-photo-viewer__info-meta">Date: ${currentImage.date}</p>` : '',
      currentImage.author ? `<p class="c-photo-viewer__info-meta">By: ${currentImage.author}</p>` : '',
      currentImage.tags && currentImage.tags.length > 0 ? 
        `<div class="c-photo-viewer__info-tags">
          ${currentImage.tags.map(tag => `<span class="c-photo-viewer__info-tag">${tag}</span>`).join('')}
         </div>` : ''
    ].filter(Boolean).join('');
  }

  // Public API methods
  public open(index: number = 0): void {
    this.currentIndex = Math.max(0, Math.min(index, this.images.length - 1));
    this.element.style.display = 'flex';
    this.render();
    document.body.style.overflow = 'hidden';
    document.body.classList.add('is-open-photoviewer');
  }

  public close(): void {
    this.element.style.display = 'none';
    document.body.style.overflow = '';
    document.body.classList.remove('is-open-photoviewer');
    if (this.options.onClose) {
      this.options.onClose();
    }
  }

  public goToImage(index: number): void {
    if (index >= 0 && index < this.images.length && index !== this.currentIndex) {
      this.isTransitioning = true;
      this.updateImageTransform();
      
      setTimeout(() => {
        this.currentIndex = index;
        this.isTransitioning = false;
        this.render();
        if (this.options.onImageChange) {
          this.options.onImageChange(index);
        }
        // Update bounds for new image without affecting body class
        setTimeout(() => this.updateBounds(), 100);
      }, 150);
    }
  }

  public goToPrevious(): void {
    if (this.currentIndex > 0) {
      this.goToImage(this.currentIndex - 1);
    }
  }

  public goToNext(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.goToImage(this.currentIndex + 1);
    }
  }

  public zoomIn(): void {
    const currentState = this.getCurrentImageState();
    this.zoom(currentState.zoomLevel + 0.25);
  }

  public zoomOut(): void {
    const currentState = this.getCurrentImageState();
    this.zoom(currentState.zoomLevel - 0.25);
  }

  public resetZoom(): void {
    this.updateCurrentImageState(this.getDefaultImageState());
    this.updateControls();
  }

  public rotate(): void {
    const currentState = this.getCurrentImageState();
    const newRotation = (currentState.rotation + 90) % 360;
    const newBounds = this.calculateBounds(currentState.zoomLevel, newRotation);
    const constrainedPosition = this.constrainPosition(currentState.position, newBounds);
    
    this.updateCurrentImageState({
      rotation: newRotation,
      bounds: newBounds,
      position: constrainedPosition
    });
  }

  public download(): void {
    const currentImage = this.images[this.currentIndex];
    if (!currentImage?.src) return;
    
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = currentImage.title || `image-${this.currentIndex + 1}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  public toggleInfo(): void {
    this.showInfo = !this.showInfo;
    this.updateInfoPanel();
    this.updateClasses();
  }

  public toggleFullscreen(): void {
    if (!this.options.enableFullscreen) return;
    
    if (!this.isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  public setImages(images: Array<string | ImageType>): void {
    this.images = this.processImages(images);
    this.currentIndex = 0;
    this.initializeImageStates();
    this.render();
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getImages(): ImageType[] {
    return [...this.images];
  }

  public destroy(): void {
    // Remove event listeners
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    window.removeEventListener('resize', this.handleResize.bind(this));
    
    // Restore body overflow and remove class
    document.body.style.overflow = '';
    document.body.classList.remove('is-open-photoviewer');
    
    // Clear element
    this.element.innerHTML = '';
    this.element.className = '';
  }

  private resetImageState(): void {
    this.updateCurrentImageState(this.getDefaultImageState());
    this.isDragging = false;
  }
}

export default PhotoViewer;