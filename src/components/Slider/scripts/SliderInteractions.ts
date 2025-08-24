// Removed unused SLIDER constants import

/**
 * SliderInteractions - Handles all user interactions for the slider
 *
 * This class manages:
 * - Touch and mouse drag interactions
 * - Keyboard navigation
 * - Mouse wheel scrolling
 * - Click and tap events
 * - Gesture recognition
 */
export class SliderInteractions {
  private slider: any; // AtomixSlider instance
  private touchState = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    startTranslate: 0,
    isDragging: false,
    startTime: 0,
    velocity: 0,
  };

  // Event listeners for cleanup
  private eventListeners: Array<{
    element: Element | Document | Window;
    event: string;
    handler: EventListener;
    options?: AddEventListenerOptions;
  }> = [];

  constructor(slider: any) {
    this.slider = slider;
  }

  /**
   * Setup touch and mouse drag events
   */
  public setupTouchEvents(): void {
    const element = this.slider.element;

    // Touch events
    this.addEventListener(
      element,
      'touchstart',
      this.handleTouchStart.bind(this) as EventListener,
      {
        passive: false,
      }
    );
    this.addEventListener(document, 'touchmove', this.handleTouchMove.bind(this) as EventListener, {
      passive: false,
    });
    this.addEventListener(document, 'touchend', this.handleTouchEnd.bind(this) as EventListener);

    // Mouse events
    this.addEventListener(element, 'mousedown', this.handleMouseDown.bind(this) as EventListener);
    this.addEventListener(document, 'mousemove', this.handleMouseMove.bind(this) as EventListener);
    this.addEventListener(document, 'mouseup', this.handleMouseUp.bind(this) as EventListener);

    // Prevent context menu on long press
    this.addEventListener(
      element,
      'contextmenu',
      this.handleContextMenu.bind(this) as EventListener
    );

    // Prevent drag on images
    this.addEventListener(element, 'dragstart', this.handleDragStart.bind(this) as EventListener);
  }

  /**
   * Setup keyboard events
   */
  public setupKeyboardEvents(): void {
    // Make slider focusable
    this.slider.element.setAttribute('tabindex', '0');
    this.addEventListener(
      this.slider.element,
      'keydown',
      this.handleKeyDown.bind(this) as EventListener
    );
  }

  /**
   * Setup mouse wheel events
   */
  public setupMousewheelEvents(): void {
    this.addEventListener(
      this.slider.element,
      'wheel',
      this.handleWheel.bind(this) as EventListener,
      {
        passive: false,
      }
    );
  }

  /**
   * Handle touch start
   */
  private handleTouchStart(e: TouchEvent): void {
    if (!this.slider.config.allowTouchMove) return;

    const touch = e.touches[0];
    if (touch) {
      this.startTouch(touch.clientX, touch.clientY, e);
    }
  }

  /**
   * Handle mouse down
   */
  private handleMouseDown(e: MouseEvent): void {
    if (!this.slider.config.allowTouchMove) return;
    if (e.button !== 0) return; // Only left mouse button

    this.startTouch(e.clientX, e.clientY, e);
  }

  /**
   * Start touch/drag interaction
   */
  private startTouch(clientX: number, clientY: number, originalEvent: Event): void {
    // Stop autoplay if configured
    const autoplayConfig = this.slider.config.autoplay;
    if (autoplayConfig && typeof autoplayConfig === 'object' && autoplayConfig.stopOnInteraction) {
      this.slider.stopAutoplay();
    }

    this.touchState = {
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      startTranslate: this.slider.state.translate,
      isDragging: true,
      startTime: Date.now(),
      velocity: 0,
    };

    // Update slider state
    this.slider.state.touching = true;
    this.slider.updateClasses();

    // Add grabbing cursor
    if (this.slider.config.grabCursor) {
      this.slider.element.classList.add('c-slider--grabbing');
    }

    // Call callback
    this.slider.config.onTouchStart?.(originalEvent);
    this.slider.emit('touchStart');
  }

  /**
   * Handle touch move
   */
  private handleTouchMove(e: TouchEvent): void {
    if (!this.touchState.isDragging) return;

    const touch = e.touches[0];
    if (touch) {
      this.moveTouch(touch.clientX, touch.clientY, e);
    }
  }

  /**
   * Handle mouse move
   */
  private handleMouseMove(e: MouseEvent): void {
    if (!this.touchState.isDragging) return;

    this.moveTouch(e.clientX, e.clientY, e);
  }

  /**
   * Handle touch/drag move
   */
  private moveTouch(clientX: number, clientY: number, originalEvent: Event): void {
    this.touchState.currentX = clientX;
    this.touchState.currentY = clientY;

    const deltaX = clientX - this.touchState.startX;
    const deltaY = clientY - this.touchState.startY;
    const delta = this.slider.config.direction === 'horizontal' ? deltaX : deltaY;

    // Skip drag for fade effect
    if (this.slider.config.effect?.type === 'fade') {
      return;
    }

    // Check if movement exceeds threshold
    if (Math.abs(delta) > (this.slider.config.threshold || 5)) {
      // Prevent default to avoid scrolling
      originalEvent.preventDefault();

      // Calculate velocity
      const currentTime = Date.now();
      const timeDelta = currentTime - this.touchState.startTime;
      this.touchState.velocity = Math.abs(delta) / timeDelta;

      let newTranslate = this.touchState.startTranslate + delta;

      // Apply resistance at edges if not in loop mode
      if (!this.slider.config.loop) {
        const maxTranslate = 0;
        const minTranslate = -(
          (this.slider.state.slidesCount - (this.slider.config.slidesToShow || 1)) *
          (this.slider.getSlideSize() + (this.slider.config.spaceBetween || 0))
        );

        const resistanceRatio = this.slider.config.resistanceRatio || 0.85;

        if (newTranslate > maxTranslate) {
          newTranslate = maxTranslate + (newTranslate - maxTranslate) * resistanceRatio;
        }
        if (newTranslate < minTranslate) {
          newTranslate = minTranslate + (newTranslate - minTranslate) * resistanceRatio;
        }
      }

      // Apply transform
      if (this.slider.wrapper) {
        const transform =
          this.slider.config.direction === 'horizontal'
            ? `translateX(${newTranslate}px)`
            : `translateY(${newTranslate}px)`;

        this.slider.wrapper.style.transform = transform;
        this.slider.wrapper.style.transitionDuration = '0ms';
      }

      // Update state
      this.slider.state.translate = newTranslate;

      // Call callback
      this.slider.config.onTouchMove?.(originalEvent as TouchEvent);
      this.slider.emit('touchMove');
    }
  }

  /**
   * Handle touch end
   */
  private handleTouchEnd(e: TouchEvent): void {
    if (!this.touchState.isDragging) return;

    this.endTouch(e);
  }

  /**
   * Handle mouse up
   */
  private handleMouseUp(e: MouseEvent): void {
    if (!this.touchState.isDragging) return;

    this.endTouch(e);
  }

  /**
   * End touch/drag interaction
   */
  private endTouch(originalEvent: Event): void {
    const deltaX = this.touchState.currentX - this.touchState.startX;
    const deltaY = this.touchState.currentY - this.touchState.startY;
    const delta = this.slider.config.direction === 'horizontal' ? deltaX : deltaY;
    const duration = Date.now() - this.touchState.startTime;

    // Reset touch state
    this.touchState.isDragging = false;
    this.slider.state.touching = false;

    // Remove grabbing cursor
    this.slider.element.classList.remove('c-slider--grabbing');
    this.slider.updateClasses();

    // Determine if we should change slides
    const slideSize = this.slider.getSlideSize();
    const threshold = this.slider.config.threshold || 5;
    const shouldChangeSlide = Math.abs(delta) > slideSize * 0.5 || this.touchState.velocity > 0.5;

    if (shouldChangeSlide && Math.abs(delta) > threshold) {
      // Determine direction
      const direction = delta > 0 ? -1 : 1;
      const slidesToScroll = this.slider.config.slidesToScroll || 1;
      const targetIndex = this.slider.state.activeIndex + direction * slidesToScroll;

      // Go to target slide
      this.slider.goToSlide(targetIndex);
    } else {
      // Snap back to current slide
      this.slider.goToSlide(this.slider.state.activeIndex);
    }

    // Call callback
    this.slider.config.onTouchEnd?.(originalEvent);
    this.slider.emit('touchEnd');
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown(e: KeyboardEvent): void {
    // Only handle if slider element or its children have focus
    if (!this.slider.element.contains(document.activeElement)) return;

    const { direction } = this.slider.config;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (direction === 'horizontal') {
          this.slider.slidePrev();
        }
        break;

      case 'ArrowRight':
        e.preventDefault();
        if (direction === 'horizontal') {
          this.slider.slideNext();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (direction === 'vertical') {
          this.slider.slidePrev();
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (direction === 'vertical') {
          this.slider.slideNext();
        }
        break;

      case 'Home':
        e.preventDefault();
        this.slider.goToSlide(0);
        break;

      case 'End':
        e.preventDefault();
        this.slider.goToSlide(this.slider.state.slidesCount - 1);
        break;

      case ' ': // Spacebar
        e.preventDefault();
        if (this.slider.state.autoplayRunning) {
          this.slider.stopAutoplay();
        } else if (this.slider.config.autoplay) {
          this.slider.startAutoplay();
        }
        break;
    }
  }

  /**
   * Handle mouse wheel
   */
  private handleWheel(e: WheelEvent): void {
    e.preventDefault();

    const { direction } = this.slider.config;
    const delta = direction === 'horizontal' ? e.deltaX || e.deltaY : e.deltaY;

    // Debounce wheel events
    if (this.slider.state.transitioning) return;

    if (delta > 0) {
      this.slider.slideNext();
    } else if (delta < 0) {
      this.slider.slidePrev();
    }
  }

  /**
   * Handle context menu (prevent on touch devices)
   */
  private handleContextMenu(e: Event): void {
    if (this.touchState.isDragging) {
      e.preventDefault();
    }
  }

  /**
   * Handle drag start (prevent image dragging)
   */
  private handleDragStart(e: DragEvent): void {
    e.preventDefault();
  }

  /**
   * Add event listener and track for cleanup
   */
  private addEventListener(
    element: Element | Document | Window,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): void {
    element.addEventListener(event, handler, options);
    this.eventListeners.push({ element, event, handler, options });
  }

  /**
   * Remove all event listeners
   */
  public destroy(): void {
    this.eventListeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    this.eventListeners = [];
  }
}
