/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /**
   * Item label text
   */
  label: string;

  /**
   * Optional URL for the breadcrumb item
   */
  href?: string;

  /**
   * Whether this item is active/current
   */
  active?: boolean;

  /**
   * Icon name from Phosphor Icons
   */
  icon?: string;

  /**
   * Optional click handler
   */
  onClick?: (event: MouseEvent) => void;
}

/**
 * Breadcrumb options interface
 */
export interface BreadcrumbOptions {
  /**
   * Array of breadcrumb items
   */
  items?: BreadcrumbItem[];

  /**
   * Divider character or string between items
   */
  divider?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Accessible label for the breadcrumb navigation
   */
  ariaLabel?: string;
}

/**
 * Breadcrumb instance interface
 */
export interface BreadcrumbInstance {
  /**
   * Update the breadcrumb with new options
   */
  update: (options: Partial<BreadcrumbOptions>) => void;

  /**
   * Destroy the breadcrumb component
   */
  destroy: () => void;
}
