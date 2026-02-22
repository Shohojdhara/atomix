import type { MousePosition } from '../types/components';

/**
 * Global mouse tracker singleton
 * Tracks mouse position at document level and distributes to subscribers
 * Reduces event processing overhead when multiple AtomixGlass instances are present
 */
class GlobalMouseTracker {
  private listeners = new Set<(pos: MousePosition) => void>();
  private position: MousePosition = { x: 0, y: 0 };
  private rafId: number | null = null;
  private lastEvent: MouseEvent | null = null;
  private isTracking = false;

  /**
   * Subscribe to mouse position updates
   * @param callback Function to call when mouse position changes
   * @returns Unsubscribe function
   */
  subscribe(callback: (pos: MousePosition) => void): () => void {
    this.listeners.add(callback);

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
    this.listeners.delete(callback);

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
          this.listeners.forEach(callback => {
            try {
              callback(this.position);
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
