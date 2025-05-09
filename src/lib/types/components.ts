import { ReactNode } from 'react';

/**
 * Common component size options
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Theme color variants
 */
export type ThemeColor = 
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'invert'
  | 'brand'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

/**
 * Component variant including theme colors and outline variants
 */
export type Variant = 
  | ThemeColor 
  | `outline-${ThemeColor}`
  | 'link';

/**
 * Base component properties interface
 */
export interface BaseComponentProps {
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Component disabled state
   */
  disabled?: boolean;
}

/**
 * CSS class state modifiers
 */
export type StateModifier = 
  | 'is-open'
  | 'is-closed'
  | 'is-active'
  | 'is-disabled'
  | 'is-loading'
  | 'is-selected'
  | 'is-animating'
  | 'is-hovered';

/**
 * Icon position options
 */
export type IconPosition = 'left' | 'right';

/**
 * Button component properties
 */
export interface ButtonProps extends BaseComponentProps {
  /**
   * Button contents
   */
  label: string;
  
  /**
   * Optional click handler
   */
  onClick?: () => void;
  
  /**
   * Button variant
   */
  variant?: Variant;
  
  /**
   * Button size
   */
  size?: Size;
  
  /**
   * Optional icon
   */
  icon?: ReactNode;
  
  /**
   * Icon only button
   */
  iconOnly?: boolean;
  
  /**
   * Make button fully rounded (pill shape)
   */
  rounded?: boolean;
}

/**
 * Badge component properties
 */
export interface BadgeProps extends BaseComponentProps {
  /**
   * Badge text content
   */
  label: string;
  
  /**
   * Badge color variant
   */
  variant?: ThemeColor;
  
  /**
   * Badge size
   */
  size?: Size;
  
  /**
   * Optional icon
   */
  icon?: ReactNode;
}

/**
 * Accordion component properties
 */
export interface AccordionProps extends BaseComponentProps {
  /**
   * Title of the accordion
   */
  title: string;
  
  /**
   * Content to be shown when accordion is expanded
   */
  children: ReactNode;
  
  /**
   * Whether the accordion is initially open
   */
  defaultOpen?: boolean;
  
  /**
   * Position of the icon (right or left)
   */
  iconPosition?: IconPosition;
  
  /**
   * Custom icon for the accordion
   */
  icon?: ReactNode;
}

/**
 * Accordion state
 */
export interface AccordionState {
  /**
   * Whether the accordion is open
   */
  isOpen: boolean;
  
  /**
   * Current panel height CSS value
   */
  panelHeight: string;
}

/**
 * Common element ref types
 */
export interface ElementRefs {
  panelRef?: React.RefObject<HTMLDivElement>;
  contentRef?: React.RefObject<HTMLDivElement>;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * Hero alignment options
 */
export type HeroAlignment = 'left' | 'center' | 'right';

/**
 * Hero component properties
 */
export interface HeroProps extends BaseComponentProps {
  /**
   * Hero title
   */
  title: string;
  
  /**
   * Hero subtitle
   */
  subtitle?: string;
  
  /**
   * Hero text content
   */
  text?: string;
  
  /**
   * Image source for the hero
   */
  imageSrc?: string;
  
  /**
   * Image alt text
   */
  imageAlt?: string;
  
  /**
   * Content alignment
   */
  alignment?: HeroAlignment;
  
  /**
   * Background image source
   */
  backgroundImageSrc?: string;
  
  /**
   * Whether to show the background overlay
   */
  showOverlay?: boolean;
  
  /**
   * Whether the hero should take full viewport height
   */
  fullViewportHeight?: boolean;
  
  /**
   * Actions to display in the hero
   */
  actions?: ReactNode;
  
  /**
   * Custom grid column size for image (default is 7)
   */
  imageColSize?: number;
  
  /**
   * Custom grid column size for content (default is 5)
   */
  contentColSize?: number;

  /**
   * Custom width for the hero content (overrides the default CSS variable)
   */
  contentWidth?: string;
}

/**
 * Spinner component properties
 */
export interface SpinnerProps extends BaseComponentProps {
  /**
   * Spinner color variant
   */
  variant?: ThemeColor;
  
  /**
   * Spinner size
   */
  size?: Size;
  
  /**
   * Whether the spinner should be displayed fullscreen
   */
  fullscreen?: boolean;
}

/**
 * Navbar position options
 */
export type NavbarPosition = 'static' | 'fixed' | 'fixed-bottom';

/**
 * Nav item alignment options
 */
export type NavAlignment = 'start' | 'center' | 'end';

/**
 * Navbar component properties
 */
export interface NavbarProps extends BaseComponentProps {
  /**
   * Brand/logo component or text
   */
  brand?: ReactNode;
  
  /**
   * Navbar navigation items
   */
  children?: ReactNode;
  
  /**
   * Optional variant/color scheme
   */
  variant?: ThemeColor;
  
  /**
   * Navbar position
   */
  position?: NavbarPosition;
  
  /**
   * Container max width (default is from settings)
   */
  containerWidth?: string;
  
  /**
   * Whether to collapse navbar on mobile
   */
  collapsible?: boolean;
  
  /**
   * Whether navbar is expanded (for controlled component)
   */
  expanded?: boolean;
  
  /**
   * Callback when expansion state changes
   */
  onToggle?: (expanded: boolean) => void;
}

/**
 * Nav component properties
 */
export interface NavProps extends BaseComponentProps {
  /**
   * Navigation items
   */
  children: ReactNode;
  
  /**
   * Alignment of nav items
   */
  alignment?: NavAlignment;
}

/**
 * Nav item properties
 */
export interface NavItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;
  
  /**
   * Whether this item has a dropdown
   */
  dropdown?: boolean;
  
  /**
   * Whether this item has a mega menu
   */
  megaMenu?: boolean;
  
  /**
   * Whether this item is active
   */
  active?: boolean;
  
  /**
   * Optional href for link items
   */
  href?: string;
  
  /**
   * Optional click handler
   */
  onClick?: () => void;
  
  /**
   * Whether dropdown/mega menu is expanded
   */
  'aria-expanded'?: boolean;
}

/**
 * Nav dropdown properties
 */
export interface NavDropdownProps extends BaseComponentProps {
  /**
   * Dropdown title/trigger content
   */
  title: ReactNode;
  
  /**
   * Dropdown menu items
   */
  children: ReactNode;
  
  /**
   * Dropdown alignment
   */
  alignment?: 'start' | 'center' | 'end';
  
  /**
   * Whether it's a mega menu (full width)
   */
  megaMenu?: boolean;
}

/**
 * Menu component properties
 */
export interface MenuProps extends BaseComponentProps {
  /**
   * Menu content
   */
  children: ReactNode;
}

/**
 * Menu item properties
 */
export interface MenuItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;
  
  /**
   * Item href
   */
  href?: string;
  
  /**
   * Item icon
   */
  icon?: ReactNode;
  
  /**
   * Whether item is active
   */
  active?: boolean;
  
  /**
   * Item click handler
   */
  onClick?: () => void;
}

/**
 * MegaMenu component properties
 */
export interface MegaMenuProps extends BaseComponentProps {
  /**
   * MegaMenu content
   */
  children: ReactNode;
}

/**
 * MegaMenu column properties
 */
export interface MegaMenuColumnProps extends BaseComponentProps {
  /**
   * Column title
   */
  title?: ReactNode;
  
  /**
   * Column icon
   */
  icon?: ReactNode;
  
  /**
   * Column content
   */
  children: ReactNode;
  
  /**
   * Column width (auto by default)
   */
  width?: 'auto' | number;
}

/**
 * MegaMenu link properties
 */
export interface MegaMenuLinkProps extends BaseComponentProps {
  /**
   * Link href
   */
  href: string;
  
  /**
   * Link content
   */
  children: ReactNode;
  
  /**
   * Link click handler
   */
  onClick?: () => void;
}

/**
 * EdgePanel position options
 */
export type EdgePanelPosition = 'start' | 'end' | 'top' | 'bottom';

/**
 * EdgePanel animation mode options
 */
export type EdgePanelMode = 'slide' | 'push' | 'none';

/**
 * EdgePanel component properties
 */
export interface EdgePanelProps extends BaseComponentProps {
  /**
   * Panel title
   */
  title?: ReactNode;
  
  /**
   * Panel content
   */
  children: ReactNode;
  
  /**
   * Panel position
   */
  position?: EdgePanelPosition;
  
  /**
   * Animation mode
   */
  mode?: EdgePanelMode;
  
  /**
   * Whether the panel is open
   */
  isOpen?: boolean;
  
  /**
   * Open/close callback
   */
  onOpenChange?: (open: boolean) => void;
  
  /**
   * Show backdrop
   */
  backdrop?: boolean;
  
  /**
   * Close when clicking backdrop
   */
  closeOnBackdropClick?: boolean;
  
  /**
   * Close when pressing escape key
   */
  closeOnEscape?: boolean;
}

/**
 * DataTable column definition
 */
export interface DataTableColumn {
  /**
   * Unique identifier for the column
   */
  key: string;
  
  /**
   * Display title for the column
   */
  title: string;
  
  /**
   * Whether the column is sortable
   */
  sortable?: boolean;
  
  /**
   * Whether the column is filterable
   */
  filterable?: boolean;
  
  /**
   * Custom render function for the cell
   */
  render?: (value: any, row: any) => React.ReactNode;
  
  /**
   * Width of the column (CSS value)
   */
  width?: string;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  /**
   * Column key to sort by
   */
  key: string;
  
  /**
   * Sort direction
   */
  direction: 'asc' | 'desc';
}

/**
 * DataTable component properties
 */
export interface DataTableProps extends BaseComponentProps {
  /**
   * Data array to display in the table
   */
  data: any[];
  
  /**
   * Column definitions
   */
  columns: DataTableColumn[];
  
  /**
   * Whether the table is sortable
   */
  sortable?: boolean;
  
  /**
   * Whether the table is filterable
   */
  filterable?: boolean;
  
  /**
   * Whether the table is paginated
   */
  paginated?: boolean;
  
  /**
   * Number of rows per page
   */
  pageSize?: number;
  
  /**
   * Whether to show alternating row colors
   */
  striped?: boolean;
  
  /**
   * Whether to show borders around cells
   */
  bordered?: boolean;
  
  /**
   * Whether to use compact styling
   */
  dense?: boolean;
  
  /**
   * Whether the table is in loading state
   */
  loading?: boolean;
  
  /**
   * Message to display when there is no data
   */
  emptyMessage?: string;
  
  /**
   * Callback when a row is clicked
   */
  onRowClick?: (row: any) => void;
  
  /**
   * Callback when sorting changes
   */
  onSort?: (sortConfig: SortConfig) => void;
}

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
   * Custom class for the pagination container
   */
  className?: string;

  /**
   * Size variant for the pagination component
   */
  size?: Size;

  /**
   * Accessible label for the navigation element
   */
  ariaLabel?: string;
}

/**
 * Todo item data structure
 */
export interface TodoItem {
  /**
   * Unique identifier for the todo
   */
  id: string;
  
  /**
   * Todo item text
   */
  text: string;
  
  /**
   * Whether the todo is completed
   */
  completed: boolean;
}

/**
 * Todo component properties
 */
export interface TodoProps extends BaseComponentProps {
  /**
   * List of todo items
   */
  items: TodoItem[];
  
  /**
   * Callback when a todo item is added
   */
  onAddTodo?: (text: string) => void;
  
  /**
   * Callback when a todo item is toggled
   */
  onToggleTodo?: (id: string) => void;
  
  /**
   * Callback when a todo item is deleted
   */
  onDeleteTodo?: (id: string) => void;
  
  /**
   * Title of the todo list
   */
  title?: string;
  
  /**
   * Size variant for the todo component
   */
  size?: Size;
  
  /**
   * Placeholder text for the new todo input
   */
  placeholder?: string;
  
  /**
   * Whether to show the completed todos
   */
  showCompleted?: boolean;
}
