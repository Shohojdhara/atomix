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
  
  /**
   * Enable parallax effect on background image
   */
  parallax?: boolean;
  
  /**
   * Parallax effect intensity (0-1)
   */
  parallaxIntensity?: number;
  
  /**
   * Video background URL
   */
  videoBackground?: string;
  
  /**
   * Video background options
   */
  videoOptions?: {
    /**
     * Whether the video should autoplay
     */
    autoplay?: boolean;
    
    /**
     * Whether the video should loop
     */
    loop?: boolean;
    
    /**
     * Whether the video should be muted
     */
    muted?: boolean;
    
    /**
     * Poster image URL for the video
     */
    posterUrl?: string;
  };
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

/**
 * Form component properties
 */
export interface FormProps extends BaseComponentProps {
  /**
   * Form content
   */
  children: ReactNode;
  
  /**
   * Form submit handler
   */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  
  /**
   * Form reset handler
   */
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void;
  
  /**
   * Form ID
   */
  id?: string;
  
  /**
   * Form method
   */
  method?: 'get' | 'post';
  
  /**
   * Form encoding type
   */
  encType?: string;
  
  /**
   * Whether to disable HTML5 validation
   */
  noValidate?: boolean;
  
  /**
   * Form autocomplete setting
   */
  autoComplete?: string;
}

/**
 * Form Group component properties
 */
export interface FormGroupProps extends BaseComponentProps {
  /**
   * Form control content
   */
  children: ReactNode;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Helper text displayed below the input
   */
  helperText?: ReactNode;
  
  /**
   * ID of the form control this label is for
   */
  htmlFor?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * Whether the field is invalid
   */
  invalid?: boolean;
  
  /**
   * Whether the field is valid
   */
  valid?: boolean;
  
  /**
   * Size variant
   */
  size?: Size;
}

/**
 * Input component properties
 */
export interface InputProps extends BaseComponentProps {
  /**
   * Input type
   */
  type?: string;
  
  /**
   * Input value
   */
  value?: string | number;
  
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Whether the input is required
   */
  required?: boolean;
  
  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;
  
  /**
   * Input ID
   */
  id?: string;
  
  /**
   * Input name
   */
  name?: string;
  
  /**
   * Autocomplete attribute
   */
  autoComplete?: string;
  
  /**
   * Whether the input should receive focus on render
   */
  autoFocus?: boolean;
  
  /**
   * Size variant
   */
  size?: Size;
  
  /**
   * Color variant
   */
  variant?: ThemeColor;
  
  /**
   * Whether the input is invalid
   */
  invalid?: boolean;
  
  /**
   * Whether the input is valid
   */
  valid?: boolean;
  
  /**
   * Maximum length
   */
  maxLength?: number;
  
  /**
   * Minimum length
   */
  minLength?: number;
  
  /**
   * Input pattern
   */
  pattern?: string;
  
  /**
   * Minimum value (for number inputs)
   */
  min?: number | string;
  
  /**
   * Maximum value (for number inputs)
   */
  max?: number | string;
  
  /**
   * Step value (for number inputs)
   */
  step?: number | string;
  
  /**
   * Accessible label (if no visible label)
   */
  ariaLabel?: string;
  
  /**
   * ID of element that describes this input
   */
  ariaDescribedBy?: string;
}

/**
 * Select option
 */
export interface SelectOption {
  /**
   * Option value
   */
  value: string;
  
  /**
   * Option display label
   */
  label: string;
  
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

/**
 * Select component properties
 */
export interface SelectProps extends BaseComponentProps {
  /**
   * Select options
   */
  options: SelectOption[];
  
  /**
   * Selected value(s)
   */
  value?: string | string[];
  
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Whether the select is required
   */
  required?: boolean;
  
  /**
   * Select ID
   */
  id?: string;
  
  /**
   * Select name
   */
  name?: string;
  
  /**
   * Size variant
   */
  size?: Size;
  
  /**
   * Whether the select is invalid
   */
  invalid?: boolean;
  
  /**
   * Whether the select is valid
   */
  valid?: boolean;
  
  /**
   * Whether multiple options can be selected
   */
  multiple?: boolean;
  
  /**
   * Accessible label (if no visible label)
   */
  ariaLabel?: string;
  
  /**
   * ID of element that describes this select
   */
  ariaDescribedBy?: string;
}

/**
 * Checkbox component properties
 */
export interface CheckboxProps extends BaseComponentProps {
  /**
   * Checkbox label
   */
  label?: ReactNode;
  
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean;
  
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  
  /**
   * Checkbox ID
   */
  id?: string;
  
  /**
   * Checkbox name
   */
  name?: string;
  
  /**
   * Checkbox value
   */
  value?: string;
  
  /**
   * Whether the checkbox is invalid
   */
  invalid?: boolean;
  
  /**
   * Whether the checkbox is valid
   */
  valid?: boolean;
  
  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate?: boolean;
  
  /**
   * Accessible label (if no visible label)
   */
  ariaLabel?: string;
  
  /**
   * ID of element that describes this checkbox
   */
  ariaDescribedBy?: string;
}

/**
 * Radio component properties
 */
export interface RadioProps extends BaseComponentProps {
  /**
   * Radio label
   */
  label?: ReactNode;
  
  /**
   * Whether the radio is checked
   */
  checked?: boolean;
  
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Whether the radio is required
   */
  required?: boolean;
  
  /**
   * Radio ID
   */
  id?: string;
  
  /**
   * Radio name
   */
  name?: string;
  
  /**
   * Radio value
   */
  value?: string;
  
  /**
   * Whether the radio is invalid
   */
  invalid?: boolean;
  
  /**
   * Whether the radio is valid
   */
  valid?: boolean;
  
  /**
   * Accessible label (if no visible label)
   */
  ariaLabel?: string;
  
  /**
   * ID of element that describes this radio
   */
  ariaDescribedBy?: string;
}

/**
 * Textarea component properties
 */
export interface TextareaProps extends BaseComponentProps {
  /**
   * Textarea value
   */
  value?: string;
  
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Whether the textarea is required
   */
  required?: boolean;
  
  /**
   * Whether the textarea is read-only
   */
  readOnly?: boolean;
  
  /**
   * Textarea ID
   */
  id?: string;
  
  /**
   * Textarea name
   */
  name?: string;
  
  /**
   * Number of rows
   */
  rows?: number;
  
  /**
   * Number of columns
   */
  cols?: number;
  
  /**
   * Maximum length
   */
  maxLength?: number;
  
  /**
   * Minimum length
   */
  minLength?: number;
  
  /**
   * Size variant
   */
  size?: Size;
  
  /**
   * Color variant
   */
  variant?: ThemeColor;
  
  /**
   * Whether the textarea is invalid
   */
  invalid?: boolean;
  
  /**
   * Whether the textarea is valid
   */
  valid?: boolean;
  
  /**
   * Whether the textarea should receive focus on render
   */
  autoFocus?: boolean;
  
  /**
   * Accessible label (if no visible label)
   */
  ariaLabel?: string;
  
  /**
   * ID of element that describes this textarea
   */
  ariaDescribedBy?: string;
}

/**
 * Avatar size options
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Avatar component properties
 */
export interface AvatarProps extends BaseComponentProps {
  /**
   * Avatar image source URL
   */
  src?: string;

  /**
   * Alt text for the avatar image
   */
  alt?: string;

  /**
   * Initials to display when no image is available
   */
  initials?: string;

  /**
   * Icon to display when no image or initials are available
   */
  icon?: ReactNode;

  /**
   * Size variant for the avatar
   */
  size?: AvatarSize;

  /**
   * Whether to make the avatar circular
   */
  circle?: boolean;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Avatar Group component properties
 */
export interface AvatarGroupProps extends BaseComponentProps {
  /**
   * Child Avatar components
   */
  children: ReactNode;

  /**
   * Maximum number of avatars to display before showing a "+X" indicator
   */
  max?: number;

  /**
   * Whether to display avatars in a stacked formation
   */
  stacked?: boolean;

  /**
   * Custom text for the "more" indicator
   */
  moreText?: string;
}

/**
 * Modal component props
 */
export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Whether the modal is open
   */
  isOpen?: boolean;
  
  /**
   * Callback when the modal's open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Callback when the modal is opened
   */
  onOpen?: () => void;
  
  /**
   * Callback when the modal is closed
   */
  onClose?: () => void;
  
  /**
   * Modal title displayed in the header
   */
  title?: React.ReactNode;
  
  /**
   * Modal subtitle displayed below the title
   */
  subtitle?: React.ReactNode;
  
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether to close when backdrop is clicked
   */
  backdrop?: boolean;
  
  /**
   * Whether to close when the escape key is pressed
   */
  keyboard?: boolean;
  
  /**
   * Whether to show the close button
   */
  closeButton?: boolean;
  
  /**
   * Content for the modal footer
   */
  footer?: React.ReactNode;
}

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

/**
 * Message item interface
 */
export interface MessageItem {
  /**
   * Unique identifier for the message
   */
  id: string;
  
  /**
   * Message text content
   */
  text?: string;
  
  /**
   * Image URL for image messages
   */
  image?: string;
  
  /**
   * File information for file messages
   */
  file?: {
    /**
     * File name
     */
    name: string;
    
    /**
     * File size (formatted string)
     */
    size: string;
  };
  
  /**
   * Message timestamp
   */
  time: string;
  
  /**
   * Whether the message is from the current user
   */
  isSelf?: boolean;
}

/**
 * Messages component properties
 */
export interface MessagesProps extends BaseComponentProps {
  /**
   * Array of message items to display
   */
  messages: MessageItem[];
  
  /**
   * Avatar image URL for the other person
   */
  otherAvatar?: string;
  
  /**
   * Avatar image URL for the current user
   */
  selfAvatar?: string;
  
  /**
   * Name of the other person
   */
  otherName?: string;
  
  /**
   * Custom width for the messages container
   */
  width?: string;
  
  /**
   * Callback when a new message is sent
   */
  onSendMessage?: (text: string) => void;
  
  /**
   * Placeholder text for the input field
   */
  placeholder?: string;
  
  /**
   * Maximum height for the messages body
   */
  bodyHeight?: string;

  /**
   * Unique identifier for the messages component
   */
  id?: string;
}

/**
 * Popover component properties
 */
export interface PopoverTriggerProps {
  /**
   * The element that will trigger the popover
   */
  children: ReactNode;
  
  /**
   * How the popover is triggered
   */
  trigger?: 'hover' | 'click';
  
  /**
   * Popover reference passed from PopoverContext
   */
  popoverId?: string;
}

export interface PopoverProps {
  /**
   * Content to be displayed in the popover
   */
  content: ReactNode;
  
  /**
   * The position of the popover relative to the trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  
  /**
   * How the popover is triggered
   */
  trigger?: 'hover' | 'click';
  
  /**
   * Additional CSS class for the popover
   */
  className?: string;
  
  /**
   * Delay before showing the popover (in milliseconds)
   */
  delay?: number;
  
  /**
   * Offset from the trigger element (in pixels)
   */
  offset?: number;
  
  /**
   * Whether the popover should be open initially
   */
  defaultOpen?: boolean;
  
  /**
   * Controlled state of the popover
   */
  isOpen?: boolean;
  
  /**
   * Callback when the popover open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Whether to close the popover when clicking outside
   */
  closeOnClickOutside?: boolean;
  
  /**
   * Whether to close the popover when pressing escape key
   */
  closeOnEscape?: boolean;
  
  /**
   * Optional ID for the popover
   */
  id?: string;
  
  /**
   * Children content (removed in favor of using PopoverTrigger)
   */
  children?: ReactNode;
}

/**
 * The trigger method for the dropdown menu
 */
export type DropdownTrigger = 'click' | 'hover';

/**
 * The placement of the dropdown menu
 */
export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';

/**
 * Dropdown component properties
 */
export interface DropdownProps extends BaseComponentProps {
  /**
   * Dropdown trigger element
   */
  children: ReactNode;
  
  /**
   * Dropdown menu content
   */
  menu: ReactNode;
  
  /**
   * How the dropdown is triggered
   */
  trigger?: DropdownTrigger;
  
  /**
   * The placement of the dropdown menu
   */
  placement?: DropdownPlacement;
  
  /**
   * Whether the dropdown is initially open
   */
  defaultOpen?: boolean;
  
  /**
   * Controlled state of the dropdown
   */
  isOpen?: boolean;
  
  /**
   * Callback when the dropdown open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
  
  /**
   * Offset from the trigger element (in pixels)
   */
  offset?: number;
  
  /**
   * Whether the dropdown should be closed when clicking outside
   */
  closeOnClickOutside?: boolean;
  
  /**
   * Whether the dropdown should be closed when pressing escape key
   */
  closeOnEscape?: boolean;
  
  /**
   * Max height for the dropdown menu
   */
  maxHeight?: string;
  
  /**
   * Min width for the dropdown menu
   */
  minWidth?: string | number;

  /**
   * Color variant for the dropdown trigger
   */
  variant?: ThemeColor;
  
  /**
   * Optional ID for the dropdown
   */
  id?: string;
}

/**
 * Dropdown menu item properties
 */
export interface DropdownItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;
  
  /**
   * Item href
   */
  href?: string;
  
  /**
   * Whether item is active
   */
  active?: boolean;
  
  /**
   * Whether item is disabled
   */
  disabled?: boolean;
  
  /**
   * Item icon
   */
  icon?: ReactNode;
  
  /**
   * Item click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

/**
 * Dropdown divider properties
 */
export interface DropdownDividerProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Dropdown header properties
 */
export interface DropdownHeaderProps {
  /**
   * Header content
   */
  children: ReactNode;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}
