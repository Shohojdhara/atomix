import type { MousePosition } from '../types/components';

interface MouseTrackerListener {
  callback: (pos: MousePosition) => void;
  element?: HTMLElement; // Optional element for distance-based attenuation
  maxDistance?: number; // Maximum distance for full effect
}

/**
 * Global mouse tracker singleton
 * Tracks mouse position at document level and distributes to subscribers
 * Reduces event processing overhead when multiple AtomixGlass instances are present
 */
class GlobalMouseTracker {
  private listeners = new Set<MouseTrackerListener>();
  private position: MousePosition = { x: 0, y: 0 };
  private rafId: number | null = null;
  private lastEvent: MouseEvent | null = null;
  private isTracking = false;

  /**
   * Subscribe to mouse position updates
   * @param callback Function to call when mouse position changes
   * @param element Optional element for distance-based attenuation
   * @param maxDistance Optional maximum distance for full effect
   * @returns Unsubscribe function
   */
  subscribe(
    callback: (pos: MousePosition) => void,
    element?: HTMLElement,
    maxDistance?: number
  ): () => void {
    const listener: MouseTrackerListener = { callback, element, maxDistance };
    this.listeners.add(listener);

    // Start tracking if this is the first subscriber
    if (this.listeners.size === 1) {
      this.startTracking();
    }

    // Immediately notify with current position
    callback(this.position);

    // Return unsubscribe function
    return () => {
      this.unsubscribe(callback);
    };
  }

  /**
   * Unsubscribe from mouse position updates
   */
  private unsubscribe(callback: (pos: MousePosition) => void): void {
    // Find and remove the listener with the given callback
    for (const listener of this.listeners) {
      if (listener.callback === callback) {
        this.listeners.delete(listener);
        break;
      }
    }

    // Stop tracking if no more subscribers
    if (this.listeners.size === 0) {
      this.stopTracking();
    }
  }

  /**
   * Start tracking mouse movement
   */
  private startTracking(): void {
    if (this.isTracking) {
      return;
    }

    this.isTracking = true;

    // Use document-level listener for global tracking
    document.addEventListener('mousemove', this.handleMouseMove, { passive: true });
  }

  /**
   * Stop tracking mouse movement
   */
  private stopTracking(): void {
    if (!this.isTracking) {
      return;
    }

    this.isTracking = false;
    document.removeEventListener('mousemove', this.handleMouseMove);

    // Cancel any pending RAF
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    this.lastEvent = null;
  }

  /**
   * Calculate distance between two points
   */
  private calculateDistance(point1: MousePosition, point2: MousePosition): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Handle mouse move event
   */
  private handleMouseMove = (e: MouseEvent): void => {
    this.lastEvent = e;

    // Use requestAnimationFrame to throttle updates
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        if (this.lastEvent) {
          this.position = {
            x: this.lastEvent.clientX,
            y: this.lastEvent.clientY,
          };

          // Notify all subscribers
          this.listeners.forEach(listener => {
            try {
              // If the listener has an element, calculate distance-based attenuation
              if (listener.element) {
                const elementRect = listener.element.getBoundingClientRect();
                const elementCenter = {
                  x: elementRect.left + elementRect.width / 2,
                  y: elementRect.top + elementRect.height / 2,
                };
                
                const distance = this.calculateDistance(this.position, elementCenter);
                const maxDistance = listener.maxDistance || 300; // Default to 300px
                
                // Calculate attenuation factor (0 to 1)
                const attenuation = Math.max(0, 1 - (distance / maxDistance));
                
                // Calculate relative mouse position for this specific element
                const relativeX = (this.position.x - elementCenter.x) / elementRect.width * 100;
                const relativeY = (this.position.y - elementCenter.y) / elementRect.height * 100;
                
                // Apply attenuation to the relative position
                const attenuatedRelativePosition = {
                  x: relativeX * attenuation,
                  y: relativeY * attenuation,
                };
                
                listener.callback(attenuatedRelativePosition);
              } else {
                // Send original position for listeners without distance-based attenuation
                listener.callback(this.position);
              }
            } catch (error) {
              console.error('GlobalMouseTracker: Error in subscriber callback', error);
            }
          });
        }

        this.rafId = null;
      });
    }
  };

  /**
   * Get current mouse position (synchronous)
   */
  getPosition(): MousePosition {
    return { ...this.position };
  }

  /**
   * Get number of active subscribers (for debugging)
   */
  getSubscriberCount(): number {
    return this.listeners.size;
  }
}

// Singleton instance
const globalMouseTracker = new GlobalMouseTracker();

export { globalMouseTracker };
export type { GlobalMouseTracker };
