import { BreadcrumbItem } from '../../components/Breadcrumb/Breadcrumb';
import { BREADCRUMB } from '../constants/components';

interface BreadcrumbOptions {
  items: BreadcrumbItem[];
  divider?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
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
    ariaLabel: 'Breadcrumb',
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
  const generateItemClass = (item: BreadcrumbItem, isLast: boolean): string => {
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
  const isItemLink = (item: BreadcrumbItem, isLast: boolean): boolean => {
    return Boolean(item.href && !item.active && !isLast);
  };

  /**
   * Parse items from a JSON string
   * @param jsonString - JSON string of items
   * @returns Array of breadcrumb items
   */
  const parseItemsFromJson = (jsonString: string): BreadcrumbItem[] => {
    try {
      return JSON.parse(jsonString) as BreadcrumbItem[];
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
