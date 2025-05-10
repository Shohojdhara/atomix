// Atomix Vanilla TS Countdown Component (Standardized)

import { COUNTDOWN } from '../../../lib/constants/components';

/**
 * CountdownShowPart type for the countdown component
 */
type CountdownShowPart = 'days' | 'hours' | 'minutes' | 'seconds';

/**
 * CountdownOptions interface for the vanilla JS implementation
 */
export interface CountdownOptions {
  target?: Date | string;
  show?: CountdownShowPart[];
  separator?: string;
  focused?: boolean;
  className?: string;
  onComplete?: (() => void) | null;
}

/**
 * CountdownInstance interface
 */
export interface CountdownInstance {
  destroy: () => void;
}

/**
 * Default options for the Countdown component
 */
const DEFAULT_OPTIONS: CountdownOptions = {
  target: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
  show: COUNTDOWN.DEFAULTS.SHOW as CountdownShowPart[],
  separator: COUNTDOWN.DEFAULTS.SEPARATOR,
  focused: false,
  className: '',
  onComplete: null,
};

/**
 * Time parts interface
 */
interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Countdown Class - Vanilla JS implementation
 */
export default class Countdown implements CountdownInstance {
  // DOM element
  private element: HTMLElement;
  
  // Options and state
  private options: CountdownOptions;
  private completed: boolean = false;
  private interval: number | null = null;

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: Partial<CountdownOptions> = {}) {
    // Get element reference
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!this.element) {
      throw new Error('Countdown: element not found');
    }
    
    // Merge default options with provided options
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    // Initialize the component
    this._initialize();
  }

  /**
   * Calculate time parts based on millisecond difference
   * @param diff - Millisecond difference between target and current time
   * @returns Object containing days, hours, minutes, seconds
   * @private
   */
  private _getTimeParts(diff: number): TimeParts {
    const totalSeconds = Math.max(0, Math.floor(diff / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }

  /**
   * Render the countdown component
   * @private
   */
  private _render(): void {
    const now = new Date();
    const targetDate = this.options.target !== undefined 
      ? (typeof this.options.target === 'string' ? new Date(this.options.target) : this.options.target)
      : DEFAULT_OPTIONS.target as Date;
    
    const diff = targetDate.getTime() - now.getTime();
    const { days, hours, minutes, seconds } = this._getTimeParts(diff);
    const show = this.options.show || DEFAULT_OPTIONS.show!;
    
    const timeParts: { label: string; value: number }[] = [];
    if (show.includes('days')) timeParts.push({ label: 'Days', value: days });
    if (show.includes('hours')) timeParts.push({ label: 'Hours', value: hours });
    if (show.includes('minutes')) timeParts.push({ label: 'Minutes', value: minutes });
    if (show.includes('seconds')) timeParts.push({ label: 'Seconds', value: seconds });

    // Build container class
    const rootClass = `${COUNTDOWN.CLASSES.BASE}${
      this.options.focused ? ' ' + COUNTDOWN.CLASSES.FOCUSED : ''
    }${this.options.className ? ' ' + this.options.className : ''}`;
    
    // Build HTML
    let html = `<div class="${rootClass.trim()}">`;
    timeParts.forEach((part, idx) => {
      html += `
        <div class="${COUNTDOWN.SELECTORS.TIME.substring(1)}">
          <span class="${COUNTDOWN.SELECTORS.TIME_COUNT.substring(1)}">${String(part.value).padStart(2, '0')}</span>
          <span class="${COUNTDOWN.SELECTORS.TIME_LABEL.substring(1)}">${part.label}</span>
        </div>
      `;
      if (idx < timeParts.length - 1) {
        html += `<span class="${COUNTDOWN.SELECTORS.SEPARATOR.substring(1)}">${this.options.separator}</span>`;
      }
    });
    html += '</div>';
    
    this.element.innerHTML = html;
  }

  /**
   * Initialize the countdown component
   * @private
   */
  private _initialize(): void {
    this.completed = false;
    this._render();
    this._start();
  }

  /**
   * Start the countdown interval
   * @private
   */
  private _start(): void {
    this.interval = window.setInterval(() => {
      const now = new Date();
      const targetDate = this.options.target !== undefined 
        ? (typeof this.options.target === 'string' ? new Date(this.options.target) : this.options.target)
        : DEFAULT_OPTIONS.target as Date;
      
      const diff = targetDate.getTime() - now.getTime();
      
      if (diff <= 0 && !this.completed) {
        this.completed = true;
        if (this.interval !== null) clearInterval(this.interval);
        this._render();
        if (typeof this.options.onComplete === 'function') this.options.onComplete();
      } else if (!this.completed) {
        this._render();
      }
    }, 1000);
    
    this._render();
  }

  /**
   * Destroy the countdown component
   * Clean up event listeners and DOM
   */
  public destroy(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
    
    this.element.innerHTML = '';
  }

  /**
   * Initialize all Countdown components on the page
   * @param selector - CSS selector for countdown elements
   * @returns Array of Countdown instances
   * @static
   */
  public static initializeAll(selector = '[data-component="countdown"]'): Countdown[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      // Try to get options from data attributes
      const options: CountdownOptions = {};
      
      // Get target date/time
      const target = element.getAttribute('data-target');
      if (target) options.target = target;
      
      // Get show parts
      const showAttr = element.getAttribute('data-show');
      if (showAttr) {
        try {
          options.show = showAttr.split(',') as CountdownShowPart[];
        } catch (e) {
          console.error('Countdown: Error parsing show data attribute', e);
        }
      }
      
      // Get separator
      const separator = element.getAttribute('data-separator');
      if (separator) options.separator = separator;
      
      // Get focused state
      const focused = element.getAttribute('data-focused');
      options.focused = focused === 'true';
      
      // Get className
      const className = element.getAttribute('data-class-name');
      if (className) options.className = className;
      
      return new Countdown(element as HTMLElement, options);
    });
  }
} 