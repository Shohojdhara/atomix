import { PAGINATION_DEFAULTS } from '../../../lib/constants/components';
import { DOTS, usePagination } from '../../../lib/composables/usePagination';

interface PaginationOptions {
  currentPage?: number;
  totalPages?: number;
  siblingCount?: number;
  showFirstLastButtons?: boolean;
  showPrevNextButtons?: boolean;
  onPageChange?: (page: number) => void;
  size?: 'sm' | 'md' | 'lg';
  paginationSelector?: string;
  pageItemSelector?: string;
  pageLinkSelector?: string;
  dotsSelector?: string;
  activeClass?: string;
  disabledClass?: string;
  ariaLabel?: string;
  useIcons?: boolean; // Option to use icons or HTML entities
}

/**
 * Navigation button types for pagination
 */
type NavButtonType = 'first' | 'prev' | 'next' | 'last';

/**
 * Navigation button configurations
 */
interface NavButtonConfig {
  type: NavButtonType;
  iconHtml: string;
  iconClass: string;
  label: string;
  action: (pagination: Pagination) => void;
  isDisabled: (pagination: Pagination) => boolean;
}

const defaults: PaginationOptions = {
  currentPage: PAGINATION_DEFAULTS.currentPage,
  totalPages: PAGINATION_DEFAULTS.totalPages,
  siblingCount: PAGINATION_DEFAULTS.siblingCount,
  showFirstLastButtons: PAGINATION_DEFAULTS.showFirstLastButtons,
  showPrevNextButtons: PAGINATION_DEFAULTS.showPrevNextButtons,
  size: PAGINATION_DEFAULTS.size,
  onPageChange: () => {},
  paginationSelector: '.c-pagination',
  pageItemSelector: '.c-pagination__item',
  pageLinkSelector: '.c-pagination__link',
  dotsSelector: '.c-pagination__item--dots',
  activeClass: 'is-active',
  disabledClass: 'is-disabled',
  ariaLabel: 'Pagination',
  useIcons: true,
};

/**
 * Navigation button configurations for different button types
 */
const navButtons: NavButtonConfig[] = [
  {
    type: 'first',
    iconHtml: '&laquo;',
    iconClass: 'c-icon c-icon--sm c-pagination__icon-skip-back',
    label: 'Go to first page',
    action: pagination => pagination.goToPage(1),
    isDisabled: pagination => pagination.currentPage === 1,
  },
  {
    type: 'prev',
    iconHtml: '&lsaquo;',
    iconClass: 'c-icon c-icon--sm c-pagination__icon-caret-left',
    label: 'Go to previous page',
    action: pagination => pagination.goToPage(pagination.currentPage - 1),
    isDisabled: pagination => pagination.currentPage === 1,
  },
  {
    type: 'next',
    iconHtml: '&rsaquo;',
    iconClass: 'c-icon c-icon--sm c-pagination__icon-caret-right',
    label: 'Go to next page',
    action: pagination => pagination.goToPage(pagination.currentPage + 1),
    isDisabled: pagination => pagination.currentPage === pagination.totalPages,
  },
  {
    type: 'last',
    iconHtml: '&raquo;',
    iconClass: 'c-icon c-icon--sm c-pagination__icon-skip-forward',
    label: 'Go to last page',
    action: pagination => pagination.goToPage(pagination.totalPages),
    isDisabled: pagination => pagination.currentPage === pagination.totalPages,
  },
];

class Pagination {
  private $element: HTMLElement;
  private options: PaginationOptions = defaults;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(element: string | HTMLElement, options: PaginationOptions = {}) {
    const el = typeof element === 'string' ? document.querySelector<HTMLElement>(element) : element;
    if (!el) {
      console.error('Pagination element not found');
      throw new Error('Pagination element not found');
    }
    this.$element = el;
    this.options = { ...defaults, ...this._parseDataAttributes(), ...options };
    this.currentPage = Number(this.options.currentPage) || 1;
    this.totalPages = Number(this.options.totalPages) || 1;

    this._initialize();
  }

  /**
   * Parse data attributes from the element
   */
  private _parseDataAttributes(): Partial<PaginationOptions> {
    const dataset = this.$element.dataset;
    const result: Partial<PaginationOptions> = {};

    if (dataset.currentPage) result.currentPage = Number(dataset.currentPage);
    if (dataset.totalPages) result.totalPages = Number(dataset.totalPages);
    if (dataset.siblingCount) result.siblingCount = Number(dataset.siblingCount);
    if (dataset.showFirstLastButtons)
      result.showFirstLastButtons = dataset.showFirstLastButtons === 'true';
    if (dataset.showPrevNextButtons)
      result.showPrevNextButtons = dataset.showPrevNextButtons === 'true';
    if (dataset.size) result.size = dataset.size as 'sm' | 'md' | 'lg';
    if (dataset.ariaLabel) result.ariaLabel = dataset.ariaLabel;
    if (dataset.useIcons) result.useIcons = dataset.useIcons === 'true';

    return result;
  }

  private _initialize(): void {
    this._render();
    this._attachEventListeners();
  }

  /**
   * Create a navigation button HTML
   */
  private _createNavButtonHtml(config: NavButtonConfig | undefined): string {
    if (!config) return '';

    const isDisabled = config.isDisabled(this);
    const buttonContent = this.options.useIcons
      ? `<span class="${config.iconClass}" aria-hidden="true"></span>`
      : config.iconHtml;

    return `
      <li class="${this.options.pageItemSelector?.substring(1) || 'c-pagination__item'} c-pagination__item--${config.type}${isDisabled ? ' ' + this.options.disabledClass : ''}" 
          aria-disabled="${isDisabled}">
        <button type="button" 
                class="${this.options.pageLinkSelector?.substring(1) || 'c-pagination__link'}" 
                data-page="${config.type}" 
                aria-label="${config.label}"
                ${isDisabled ? 'disabled' : ''}>
          ${buttonContent}
        </button>
      </li>
    `;
  }

  private _render(): void {
    // Get pagination range using the same logic as React component
    const { paginationRange } = usePagination({
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      siblingCount: this.options.siblingCount,
      onPageChange: this.options.onPageChange || (() => {}),
    });

    // Create container with appropriate attributes
    this.$element.setAttribute('aria-label', this.options.ariaLabel || 'Pagination');
    if (this.options.size) {
      this.$element.classList.add(`c-pagination--${this.options.size}`);
    }

    let html = '<ul class="c-pagination__items">';

    // Add first/prev buttons if enabled
    if (this.options.showFirstLastButtons) {
      const firstButton = navButtons.find(btn => btn.type === 'first');
      html += this._createNavButtonHtml(firstButton);
    }

    if (this.options.showPrevNextButtons) {
      const prevButton = navButtons.find(btn => btn.type === 'prev');
      html += this._createNavButtonHtml(prevButton);
    }

    // Add page number buttons and dots
    paginationRange.forEach(page => {
      if (page === DOTS) {
        html += `<li class="${this.options.pageItemSelector?.substring(1) || 'c-pagination__item'} ${this.options.dotsSelector?.substring(1) || 'c-pagination__item--dots'}" aria-hidden="true">&#8230;</li>`;
      } else {
        const isActive = page === this.currentPage;
        html += `
          <li class="${this.options.pageItemSelector?.substring(1) || 'c-pagination__item'}${isActive ? ' ' + this.options.activeClass : ''}" 
              aria-current="${isActive ? 'page' : 'false'}">
            <button type="button" 
                    class="${this.options.pageLinkSelector?.substring(1) || 'c-pagination__link'}" 
                    data-page="${page}" 
                    aria-label="Page ${page}"
                    ${isActive ? 'aria-current="page"' : ''}>
              ${page}
            </button>
          </li>
        `;
      }
    });

    // Add next/last buttons if enabled
    if (this.options.showPrevNextButtons) {
      const nextButton = navButtons.find(btn => btn.type === 'next');
      html += this._createNavButtonHtml(nextButton);
    }

    if (this.options.showFirstLastButtons) {
      const lastButton = navButtons.find(btn => btn.type === 'last');
      html += this._createNavButtonHtml(lastButton);
    }

    html += '</ul>';
    this.$element.innerHTML = html;
  }

  private _attachEventListeners(): void {
    this.$element.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const pageButton = target.closest('[data-page]') as HTMLElement;

      if (pageButton && !pageButton.hasAttribute('disabled')) {
        const pageAction = pageButton.dataset.page;

        // Handle navigation button actions
        const navButton = navButtons.find(btn => btn.type === (pageAction as NavButtonType));
        if (navButton) {
          navButton.action(this);
          return;
        }

        // Handle page number clicks
        if (pageAction && !isNaN(Number(pageAction))) {
          this.goToPage(Number(pageAction));
        }
      }
    });
  }

  /**
   * Navigate to a specific page
   */
  public goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      if (this.options.onPageChange) {
        this.options.onPageChange(this.currentPage);
      }
      this._render();

      // Dispatch a custom event
      const event = new CustomEvent('pagechange', {
        detail: {
          currentPage: this.currentPage,
          totalPages: this.totalPages,
        },
      });
      this.$element.dispatchEvent(event);
    }
  }

  /**
   * Update pagination options and re-render
   */
  public update(options: Partial<PaginationOptions>): void {
    this.options = { ...this.options, ...options };

    if (options.currentPage !== undefined) {
      this.currentPage = Number(options.currentPage);
    }

    if (options.totalPages !== undefined) {
      this.totalPages = Number(options.totalPages);
    }

    this._render();
  }

  /**
   * Clean up pagination instance
   */
  public destroy(): void {
    this.$element.innerHTML = '';
    this.$element.removeAttribute('aria-label');
    if (this.options.size) {
      this.$element.classList.remove(`c-pagination--${this.options.size}`);
    }
  }

  /**
   * Static initialization method
   */
  static initializeAll(
    selector: string = '[data-component="pagination"]',
    options: PaginationOptions = {}
  ): Pagination[] {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    return Array.from(elements).map(element => new Pagination(element, options));
  }
}

export default Pagination;
