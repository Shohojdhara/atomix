import { AtomixGlassProps } from './atomixGlass';
import { Size, BaseComponentProps } from './common';


/**
 * Pagination component properties
 */
export interface PaginationProps extends BaseComponentProps {
  /**
   * Current active page
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback function when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * Number of page links to show before and after current page
   */
  siblingCount?: number;

  /**
   * Whether to show first/last page buttons
   */
  showFirstLastButtons?: boolean;

  /**
   * Whether to show previous/next page buttons
   */
  showPrevNextButtons?: boolean;

  /**
   * Whether to show search input for jumping to a specific page
   */
  showSearch?: boolean;

  /**
   * Placeholder text for the search input
   */
  searchPlaceholder?: string;

  /**
   * Custom class for the pagination container
   */
  className?: string;

  /**
   * Size variant for the pagination component
   * @default 'md'
   */
  size?: Size;

  /**
   * Accessible label for the navigation element
   */
  'aria-label'?: string;

  /**
   * Glass morphism effect for the pagination component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}
