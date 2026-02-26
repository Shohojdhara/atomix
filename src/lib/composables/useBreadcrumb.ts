import { BreadcrumbItemLegacy } from '../../components/Breadcrumb/Breadcrumb';
import { BREADCRUMB } from '../constants/components';

interface BreadcrumbOptions {
  items: BreadcrumbItemLegacy[];
  divider?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

/**
 * Breadcrumb state and functionality
 * @param initialOptions - Initial breadcrumb options
 * @returns Breadcrumb state and methods
 */
export function useBreadcrumb(initialOptions?: Partial<BreadcrumbOptions>) {
  // Default breadcrumb options
  const defaultOptions: BreadcrumbOptions = {
    items: [],
    divider: BREADCRUMB.DEFAULTS.DIVIDER,
    className: '',
    'aria-label': 'Breadcrumb',
    ...initialOptions,
  };

  /**
   * Generate breadcrumb class based on options
   * @param options - Breadcrumb options
   * @returns Class string
   */
  const generateBreadcrumbClass = (options: Partial<BreadcrumbOptions>): string => {
    const { className = '' } = options;

    return [BREADCRUMB.CLASSES.BASE, className].filter(Boolean).join(' ').trim();
  };

  /**
   * Generate breadcrumb item class
   * @param item - Breadcrumb item
   * @param isLast - Whether this is the last item
   * @returns Class string
   */
  const generateItemClass = (item: BreadcrumbItemLegacy, isLast: boolean): string => {
    return [BREADCRUMB.CLASSES.ITEM, item.active || isLast ? BREADCRUMB.CLASSES.ACTIVE : '']
      .filter(Boolean)
      .join(' ')
      .trim();
  };

  /**
   * Check if an item should be rendered as a link
   * @param item - Breadcrumb item
   * @param isLast - Whether this is the last item
   * @returns Whether item should be a link
   */
  const isItemLink = (item: BreadcrumbItemLegacy, isLast: boolean): boolean => {
    return Boolean(item.href && !item.active && !isLast);
  };

  /**
   * Parse items from a JSON string
   * @param jsonString - JSON string of items
   * @returns Array of breadcrumb items
   */
  const parseItemsFromJson = (jsonString: string): BreadcrumbItemLegacy[] => {
    try {
      return JSON.parse(jsonString) as BreadcrumbItemLegacy[];
    } catch (error) {
      console.error('Error parsing breadcrumb items:', error);
      return [];
    }
  };

  return {
    defaultOptions,
    generateBreadcrumbClass,
    generateItemClass,
    isItemLink,
    parseItemsFromJson,
  };
}
