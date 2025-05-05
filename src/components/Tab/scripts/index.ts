import { TAB } from '../../../lib/constants/components';

/**
 * Interface for Tab options
 */
interface TabOptions {
  navItems: string;
  navBtn: string;
  panels: string;
  panelBodys: string;
  activeClass: string;
  activeIndex: number;
  [key: string]: any;
}

/**
 * Interface for Tab instance
 */
interface TabInstance {
  destroy: () => void;
}

/**
 * Default options for the tab component
 */
const DEFAULT_OPTIONS = {
  navItems: TAB.SELECTORS.NAV_ITEMS,
  navBtn: TAB.SELECTORS.NAV_BTN,
  panels: TAB.SELECTORS.PANELS,
  panelBodys: TAB.SELECTORS.PANEL_BODIES,
  activeClass: TAB.CLASSES.ACTIVE,
  activeIndex: TAB.DEFAULTS.ACTIVE_INDEX
};

/**
 * Class representing a Tab component
 */
class Tab implements TabInstance {
  private selector: string | Element;
  private $element: HTMLElement | null;
  private options: TabOptions;
  private $navItems: NodeListOf<HTMLElement> | null;
  private $panels: NodeListOf<HTMLElement> | null;
  private $panelBodys: NodeListOf<HTMLElement> | null;

  /**
   * Creates an instance of Tab
   * @param selector - CSS selector string or DOM Element
   * @param options - Custom options to override defaults
   */
  constructor(selector: string | Element, options = {}) {
    this.selector = selector || TAB.SELECTORS.TAB;
    this.$element =
      typeof selector === 'string'
        ? document.querySelector<HTMLElement>(selector)
        : selector as HTMLElement;
    this.options = { ...DEFAULT_OPTIONS, ...options } as TabOptions;
    this.$navItems = null;
    this.$panels = null;
    this.$panelBodys = null;
    this._initialize();
  }

  /**
   * Initialize the tab component
   */
  private _initialize(): void {
    if (!this.$element) return;

    this._initializeElements();
    this._showTab(this.options.activeIndex);
    this._bindEvents();
  }

  /**
   * Initialize DOM elements
   */
  private _initializeElements(): void {
    if (!this.$element) return;
    
    this.$navItems = this.$element.querySelectorAll<HTMLElement>(this.options.navItems);
    this.$panels = this.$element.querySelectorAll<HTMLElement>(this.options.panels);
    this.$panelBodys = this.$element.querySelectorAll<HTMLElement>(this.options.panelBodys);
  }

  /**
   * Bind event listeners
   */
  private _bindEvents(): void {
    if (!this.$navItems) return;
    
    this.$navItems.forEach((item) => {
      const btn = item.querySelector<HTMLElement>(this.options.navBtn);
      if (btn) {
        btn.addEventListener('click', () => this._handleTabClick(btn));
      }
    });
  }

  /**
   * Handle tab click event
   * @param btn - The clicked tab button
   */
  private _handleTabClick(btn: HTMLElement): void {
    const tabIndex = btn.dataset.tabindex;
    if (tabIndex === undefined) return;
    
    this._hideAllTabs();
    this._showTab(tabIndex);
  }

  /**
   * Hide all tabs
   */
  private _hideAllTabs(): void {
    if (!this.$panels || !this.$navItems) return;
    
    this.$panels.forEach((panel) => {
      panel.style.height = '0px';
      panel.classList.remove(this.options.activeClass);
      panel.style.opacity = '0';
    });

    this.$navItems.forEach((item) => {
      const btn = item.querySelector<HTMLElement>(this.options.navBtn);
      if (btn) {
        btn.classList.remove(this.options.activeClass);
      }
    });
  }

  /**
   * Show tab at specified index
   * @param index - The index of tab to show
   */
  private _showTab(index: number | string): void {
    if (!this.$panels || !this.$navItems || !this.$panelBodys) return;
    
    this.$panels.forEach((panel, pIndex) => {
      if (panel.dataset.tabindex == index.toString()) {
        const panelBody = this.$panelBodys?.[pIndex];
        if (panelBody) {
          panel.classList.add(this.options.activeClass);
          requestAnimationFrame(() => {
            panel.style.height = `${panelBody.clientHeight}px`;
            panel.style.opacity = '1';
          });
        }
      }
    });

    this.$navItems.forEach((navItem, nIndex) => {
      const btn = navItem.querySelector<HTMLElement>(this.options.navBtn);
      if (btn && btn.dataset.tabindex == index.toString()) {
        btn.classList.add(this.options.activeClass);
      }
    });
  }

  /**
   * Clean up event listeners
   */
  public destroy(): void {
    if (!this.$element || !this.$navItems) return;

    this.$navItems.forEach((item) => {
      const btn = item.querySelector<HTMLElement>(this.options.navBtn);
      if (btn) {
        // Need to recreate the bound function to remove it correctly
        btn.removeEventListener('click', () => this._handleTabClick(btn));
      }
    });
  }
}

/**
 * Initialize all tabs in the document
 * @param {string|Element} selector - CSS selector string or DOM Element
 * @param {Object} options - Custom options to override defaults
 * @returns {TabInstance[]} Array of Tab instances
 */
export function initializeTabs(selector = TAB.SELECTORS.TAB, options = {}): TabInstance[] {
  const tabInstances: TabInstance[] = [];
  const tabElements = document.querySelectorAll<HTMLElement>(selector);

  if (!tabElements.length) return tabInstances;

  tabElements.forEach((element) => {
    try {
      const instance = new Tab(element, options);
      tabInstances.push(instance);
    } catch (error) {
      console.error('Error initializing tab:', error);
    }
  });

  return tabInstances;
}

export default Tab; 