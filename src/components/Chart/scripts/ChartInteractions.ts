/**
 * Chart interactions helper class
 * Handles tooltips, hover states, and other interactive features
 */
export default class ChartInteractions {
  private element: HTMLElement;
  private tooltipElement: HTMLElement | null = null;
  private options: ChartInteractionsOptions;

  /**
   * Create a new ChartInteractions instance
   * @param element - Chart container element
   * @param options - Interaction options
   */
  constructor(element: HTMLElement, options: ChartInteractionsOptions = {}) {
    this.element = element;
    this.options = {
      showTooltips: true,
      tooltipFollowCursor: true,
      tooltipShowDelay: 200,
      tooltipHideDelay: 300,
      ...options,
    };

    if (this.options.showTooltips) {
      this.initTooltips();
    }
  }

  /**
   * Initialize tooltips
   */
  private initTooltips(): void {
    // Create tooltip element
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'c-chart__tooltip';
    this.tooltipElement.style.position = 'absolute';
    this.tooltipElement.style.display = 'none';
    this.tooltipElement.setAttribute('role', 'tooltip');
    document.body.appendChild(this.tooltipElement);

    // Find all elements with data-tooltip attribute
    const tooltipTriggers = this.element.querySelectorAll('[data-tooltip]');

    // Add event listeners
    tooltipTriggers.forEach(trigger => {
      let showTimeout: number;
      let hideTimeout: number;

      trigger.addEventListener('mouseenter', e => {
        clearTimeout(hideTimeout);

        showTimeout = window.setTimeout(() => {
          if (this.tooltipElement) {
            const tooltip = (trigger as HTMLElement).getAttribute('data-tooltip') || '';
            this.tooltipElement.textContent = tooltip;
            this.tooltipElement.style.display = 'block';

            // Position tooltip
            this.positionTooltip(e as MouseEvent);
          }
        }, this.options.tooltipShowDelay);
      });

      trigger.addEventListener('mousemove', e => {
        if (this.options.tooltipFollowCursor && this.tooltipElement?.style.display === 'block') {
          this.positionTooltip(e as MouseEvent);
        }
      });

      trigger.addEventListener('mouseleave', () => {
        clearTimeout(showTimeout);

        hideTimeout = window.setTimeout(() => {
          if (this.tooltipElement) {
            this.tooltipElement.style.display = 'none';
          }
        }, this.options.tooltipHideDelay);
      });
    });
  }

  /**
   * Position tooltip near cursor
   */
  private positionTooltip(event: MouseEvent): void {
    if (!this.tooltipElement) return;

    const offset = 10;
    const tooltipWidth = this.tooltipElement.offsetWidth;
    const tooltipHeight = this.tooltipElement.offsetHeight;

    // Calculate position
    let left = event.pageX + offset;
    let top = event.pageY + offset;

    // Adjust if tooltip would go off screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left + tooltipWidth > viewportWidth) {
      left = event.pageX - tooltipWidth - offset;
    }

    if (top + tooltipHeight > viewportHeight) {
      top = event.pageY - tooltipHeight - offset;
    }

    // Set position
    this.tooltipElement.style.left = `${left}px`;
    this.tooltipElement.style.top = `${top}px`;
  }

  /**
   * Clean up event listeners and remove tooltip element
   */
  public destroy(): void {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}

/**
 * Chart interactions options interface
 */
export interface ChartInteractionsOptions {
  /**
   * Whether to show tooltips
   */
  showTooltips?: boolean;

  /**
   * Whether tooltip should follow cursor
   */
  tooltipFollowCursor?: boolean;

  /**
   * Delay before showing tooltip (ms)
   */
  tooltipShowDelay?: number;

  /**
   * Delay before hiding tooltip (ms)
   */
  tooltipHideDelay?: number;
}
