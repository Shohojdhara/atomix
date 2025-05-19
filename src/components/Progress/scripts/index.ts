import { PROGRESS } from '../../../lib/constants/components';

interface ProgressOptions {
  /**
   * Progress value from 0 to 100
   */
  value?: number;
  
  /**
   * Optional color variant
   */
  variant?: string;
  
  /**
   * Optional size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Optional aria-label for accessibility
   */
  ariaLabel?: string;
}

/**
 * Progress component class for vanilla JS implementation
 */
export class Progress {
  private $element: HTMLElement;
  private options: ProgressOptions;
  
  /**
   * Create a new Progress instance
   * @param element - Element selector or DOM element
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: ProgressOptions = {}) {
    this.$element = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element;
      
    if (!this.$element) {
      throw new Error('Progress: Element not found');
    }
    
    this.options = {
      value: 0,
      variant: 'primary',
      size: 'md',
      ariaLabel: PROGRESS.DEFAULTS.ARIA_LABEL,
      ...options
    };
    
    this._initialize();
  }
  
  /**
   * Initialize the progress component
   */
  private _initialize(): void {
    // Set initial value
    this.setValue(this.options.value || 0);
    
    // Set variant and size
    if (this.options.variant) {
      this._setVariant(this.options.variant);
    }
    
    if (this.options.size) {
      this._setSize(this.options.size);
    }
    
    // Set ARIA attributes
    this.$element.setAttribute('role', 'progressbar');
    this.$element.setAttribute(PROGRESS.ATTRIBUTES.ARIA_VALUEMIN, '0');
    this.$element.setAttribute(PROGRESS.ATTRIBUTES.ARIA_VALUEMAX, '100');
    this.$element.setAttribute(PROGRESS.ATTRIBUTES.ARIA_LABEL, this.options.ariaLabel || PROGRESS.DEFAULTS.ARIA_LABEL);
    
    // Ensure the bar element exists
    if (!this.$element.querySelector(PROGRESS.SELECTORS.BAR)) {
      const bar = document.createElement('div');
      bar.className = PROGRESS.CLASSES.BAR;
      this.$element.appendChild(bar);
    }
  }
  
  /**
   * Set the progress value
   * @param value - Progress value (0-100)
   */
  public setValue(value: number): void {
    // Clamp value between 0 and 100
    const progressValue = Math.min(Math.max(value, 0), 100);
    
    // Update the CSS variable
    this.$element.style.setProperty(PROGRESS.CSS_VARS.PERCENTAGE, `${progressValue}%`);
    
    // Update ARIA attribute
    this.$element.setAttribute(PROGRESS.ATTRIBUTES.ARIA_VALUENOW, progressValue.toString());
  }
  
  /**
   * Set the progress variant
   * @param variant - Color variant
   */
  private _setVariant(variant: string): void {
    // Remove existing variant classes
    const classList = this.$element.classList;
    Array.from(classList)
      .filter(className => className.startsWith(`${PROGRESS.CLASSES.BASE}--`) && 
                          !className.includes('--sm') && 
                          !className.includes('--md') && 
                          !className.includes('--lg'))
      .forEach(className => classList.remove(className));
    
    // Add new variant class
    classList.add(`${PROGRESS.CLASSES.BASE}--${variant}`);
  }
  
  /**
   * Set the progress size
   * @param size - Size variant
   */
  private _setSize(size: string): void {
    // Remove existing size classes
    const classList = this.$element.classList;
    [PROGRESS.CLASSES.SM, PROGRESS.CLASSES.MD, PROGRESS.CLASSES.LG]
      .forEach(className => classList.remove(className));
    
    // Add new size class
    classList.add(`${PROGRESS.CLASSES.BASE}--${size}`);
  }
  
  /**
   * Update progress options
   * @param options - New options
   */
  public update(options: Partial<ProgressOptions>): void {
    this.options = { ...this.options, ...options };
    
    if (options.value !== undefined) {
      this.setValue(options.value);
    }
    
    if (options.variant) {
      this._setVariant(options.variant);
    }
    
    if (options.size) {
      this._setSize(options.size);
    }
    
    if (options.ariaLabel) {
      this.$element.setAttribute(PROGRESS.ATTRIBUTES.ARIA_LABEL, options.ariaLabel);
    }
  }
  
  /**
   * Destroy the progress instance
   */
  public destroy(): void {
    // No event listeners to remove for this component
  }
  
  /**
   * Initialize all progress elements on the page
   */
  public static initializeAll(): Progress[] {
    const elements = document.querySelectorAll(PROGRESS.SELECTORS.PROGRESS);
    return Array.from(elements).map(element => {
      const value = Number(element.getAttribute('data-value') || 0);
      const variant = element.getAttribute('data-variant') || 'primary';
      const size = element.getAttribute('data-size') as 'sm' | 'md' | 'lg' || 'md';
      
      return new Progress(element as HTMLElement, { value, variant, size });
    });
  }
}
