import { ReactNode } from 'react';

// ============================================================================
// AtomixGlass Types
// ============================================================================

/**
 * Displacement mode for glass effect
 */
export type DisplacementMode = 'standard' | 'polar' | 'prominent' | 'shader';

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Glass component size dimensions
 */
export interface GlassSize {
  width: number;
  height: number;
}

/**
 * OverLight configuration - can be boolean, 'auto', or object with settings
 * 
 * @example
 * // Boolean - explicit control
 * overLight={true}
 * 
 * @example
 * // Auto-detection - automatically detects background brightness
 * overLight="auto"
 * 
 * @example
 * // Object config - auto-detection with custom settings
 * overLight={{
 *   threshold: 0.8,
 *   opacity: 0.6,
 *   contrast: 1.8,
 *   brightness: 1.0,
 *   saturationBoost: 1.5
 * }}
 */
export type OverLightConfig =
  | boolean
  | 'auto'
  | OverLightObjectConfig;

/**
 * OverLight object configuration
 * 
 * When using object mode, the component will auto-detect background brightness
 * and apply the custom settings. All properties are optional and will use
 * sensible defaults if not provided.
 * 
 * @example
 * // Minimal config - only threshold
 * overLight={{ threshold: 0.8 }}
 * 
 * @example
 * // Full config with all properties
 * overLight={{
 *   threshold: 0.75,
 *   opacity: 0.6,
 *   contrast: 1.8,
 *   brightness: 1.1,
 *   saturationBoost: 1.5
 * }}
 */
export interface OverLightObjectConfig {
  /**
   * Luminance threshold for auto-detection (0.1 - 1.0)
   * 
   * Backgrounds with average luminance above this threshold will be
   * considered "light" and trigger overLight mode.
   * 
   * @default 0.7
   * @minimum 0.1
   * @maximum 1.0
   * 
   * @example
   * // More sensitive detection (triggers on lighter backgrounds)
   * threshold: 0.6
   * 
   * @example
   * // Less sensitive detection (only very light backgrounds)
   * threshold: 0.85
   */
  threshold?: number;
  
  /**
   * Base opacity for overLight layers (0.1 - 1.0)
   * 
   * Controls the opacity of the base and overlay layers when overLight
   * mode is active. This value is multiplied by hover/active intensity
   * multipliers for dynamic effects.
   * 
   * @default 0.5 (dynamic, depends on hover/active state)
   * @minimum 0.1
   * @maximum 1.0
   * 
   * @example
   * // Subtle overlay
   * opacity: 0.3
   * 
   * @example
   * // Strong overlay
   * opacity: 0.7
   */
  opacity?: number;
  
  /**
   * Contrast enhancement multiplier (0.5 - 2.5)
   * 
   * Increases the contrast of the glass effect for better visibility
   * on light backgrounds. Higher values create more dramatic effects.
   * 
   * @default 1.4 (dynamic, includes mouse influence)
   * @minimum 0.5
   * @maximum 2.5
   * 
   * @example
   * // Subtle contrast boost
   * contrast: 1.2
   * 
   * @example
   * // High contrast for maximum visibility
   * contrast: 2.0
   */
  contrast?: number;
  
  /**
   * Brightness adjustment multiplier (0.5 - 2.0)
   * 
   * Adjusts the overall brightness of the glass effect. Values above 1.0
   * brighten the effect, while values below 1.0 darken it.
   * 
   * @default 0.85 (dynamic, includes mouse influence)
   * @minimum 0.5
   * @maximum 2.0
   * 
   * @example
   * // Neutral brightness
   * brightness: 1.0
   * 
   * @example
   * // Brighter effect
   * brightness: 1.2
   */
  brightness?: number;
  
  /**
   * Saturation boost multiplier (0.5 - 3.0)
   * 
   * Enhances color saturation for more vibrant glass effects on light
   * backgrounds. This works in conjunction with the base saturation prop.
   * 
   * @default 1.3 (dynamic, includes mouse influence)
   * @minimum 0.5
   * @maximum 3.0
   * 
   * @example
   * // Moderate saturation boost
   * saturationBoost: 1.2
   * 
   * @example
   * // High saturation for vivid effects
   * saturationBoost: 2.0
   */
  saturationBoost?: number;
}

/**
 * AtomixGlass component props interface
 */
export interface AtomixGlassProps {
  children: React.ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  aberrationIntensity?: number;
  elasticity?: number;
  cornerRadius?: number;
  globalMousePosition?: MousePosition;
  mouseOffset?: MousePosition;
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  className?: string;
  padding?: string;
  style?: React.CSSProperties;
  overLight?: OverLightConfig;
  mode?: DisplacementMode;
  onClick?: () => void;

  /**
   * Shader variant for shader mode
   */
  shaderVariant?: 'liquidGlass' | 'premiumGlass';

  /**
   * Accessibility props
   */
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;

  /**
   * Performance and accessibility options
   */
  reducedMotion?: boolean;
  highContrast?: boolean;
  disableEffects?: boolean;
  enableLiquidBlur?: boolean;
  enableBorderEffect?: boolean;
  enableOverLightLayers?: boolean;

  /**
   * Performance monitoring
   */
  enablePerformanceMonitoring?: boolean;

  /**
   * Debug mode for cornerRadius extraction
   */
  debugCornerRadius?: boolean;

  /**
   * Debug mode for overLight detection and configuration
   * 
   * When enabled, logs detailed information about:
   * - Auto-detection results (luminance values, threshold comparison)
   * - Final overLight configuration values
   * - Detection timing and performance
   * 
   * Useful for debugging auto-detection issues and fine-tuning thresholds.
   * 
   * @default false
   * 
   * @example
   * <AtomixGlass overLight="auto" debugOverLight={true}>
   *   Content
   * </AtomixGlass>
   */
  debugOverLight?: boolean;
}

/**
 * Common component size options
 */
export type Size = 'sm' | 'md' | 'lg';

// ============================================================================
// THEME SYSTEM TYPES
// ============================================================================

/**
 * Available theme variants in the Shaj theme system
 */
export type ThemeName =
  | 'shaj-default'
  | 'shaj-ocean'
  | 'shaj-sunset'
  | 'shaj-forest'
  | 'shaj-midnight'
  | 'shaj-pastel';

// ============================================================================
// END THEME SYSTEM TYPES
// ============================================================================

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
export type Variant = ThemeColor | `outline-${ThemeColor}` | 'link';

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

  /**
   * Component children
   */
  children?: ReactNode;

  /**
   * Inline style for the component root element
   */
  style?: React.CSSProperties;
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

export type listvariant = 'dash' | 'number' | 'text';
/**;
 * List component properties
 */
export interface ListProps extends BaseComponentProps {
  children?: ReactNode;
  /**
   * List items
   */
  items?: ReactNode[];

  /**
   * List variant
   */
  variant?: listvariant;

  /**
   * List size
   */
  size?: Size;

  /**
   * Whether the list is ordered
   */
  ordered?: boolean;

  /**
   * Whether to display list items inline
   */
  inline?: boolean;
}

/**
 * List group component properties
 */
export interface ListGroupProps extends BaseComponentProps {
  /**
   * List group children
   */
  children?: ReactNode;

  /**
   * List group variant
   */
  variant?: Variant;

  /**
   * List group size
   */
  size?: Size;
}

/**
 * Button component properties
 */
export interface ButtonProps extends BaseComponentProps {
  /**
   * Button contents
   */
  label?: string;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

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
   * Icon position (start or end)
   */
  iconPosition?: 'start' | 'end';

  /**
   * Icon only button
   */
  iconOnly?: boolean;

  /**
   * Make button fully rounded (pill shape)
   */
  rounded?: boolean;

  /**
   * Full width button (takes 100% of container width)
   */
  fullWidth?: boolean;

  /**
   * Block-level button (full width with block display)
   */
  block?: boolean;

  /**
   * Loading state - shows spinner and disables button
   */
  loading?: boolean;

  /**
   * Custom loading text (replaces label when loading)
   */
  loadingText?: string;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Selected state
   */
  selected?: boolean;

  /**
   * Button type attribute
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Glass morphism effect for the button
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Optional hover handler
   */
  onHover?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Optional focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  /**
   * Optional blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * ARIA described by reference
   */
  ariaDescribedBy?: string;

  /**
   * ARIA expanded state (for toggle buttons)
   */
  ariaExpanded?: boolean;

  /**
   * ARIA controls reference
   */
  ariaControls?: string;

  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;

  /**
   * Custom style for the button
   */
  style?: React.CSSProperties;
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

  /**
   * Glass morphism effect for the badge
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Custom style for the badge
   */
  style?: React.CSSProperties;
}

/**
 * Callout component properties
 */
export interface CalloutProps extends BaseComponentProps {
  /**
   * Callout title
   */
  title?: ReactNode;

  /**
   * Callout content
   */
  children?: ReactNode;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Callout variant
   */
  variant?: ThemeColor;

  /**
   * Optional close handler
   */
  onClose?: () => void;

  /**
   * Optional action buttons
   */
  actions?: ReactNode;

  /**
   * Display in one line mode
   */
  oneLine?: boolean;

  /**
   * Display as toast notification
   */
  toast?: boolean;

  /**
   * Glass morphism effect for the callout
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Custom style for the callout
   */
  style?: React.CSSProperties;
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

  /**
   * Glass morphism effect for the accordion
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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
  panelRef?: React.RefObject<HTMLDivElement | null>;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Hero alignment options
 */
export type HeroAlignment = 'left' | 'center' | 'right';

/**
 * Hero background slide item
 */
export interface HeroBackgroundSlide {
  /**
   * Type of slide - image or video
   */
  type: 'image' | 'video';

  /**
   * Source URL for the image or video
   */
  src: string;

  /**
   * Alt text for images (optional)
   */
  alt?: string;

  /**
   * Video options (only used when type is 'video')
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
 * Hero background slider configuration
 */
export interface HeroBackgroundSliderConfig {
  /**
   * Array of slides (mixed images and videos)
   */
  slides: HeroBackgroundSlide[];

  /**
   * Autoplay configuration
   */
  autoplay?: {
    /**
     * Delay between transitions in milliseconds
     */
    delay: number;

    /**
     * Whether to pause autoplay on hover
     */
    pauseOnHover?: boolean;
  };

  /**
   * Whether to loop the slider infinitely
   */
  loop?: boolean;

  /**
   * Transition effect type
   */
  transition?: 'fade' | 'slide' | 'custom';

  /**
   * Transition duration in milliseconds
   */
  transitionDuration?: number;

  /**
   * Custom transition function (for custom transition type)
   * Returns CSS transition string or style object
   */
  customTransition?: (currentIndex: number, nextIndex: number) => string | React.CSSProperties;
}

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
   * Glass effect properties for content container
   */
  glass?: AtomixGlassProps | boolean;

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

  /**
   * Component children
   */
  children?: ReactNode;

  /**
   * Background slider configuration
   * When provided, enables background slider with multiple images/videos
   * Takes precedence over backgroundImageSrc and videoBackground props
   */
  backgroundSlider?: HeroBackgroundSliderConfig;
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

  /**
   * Glass morphism effect for the spinner
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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
 * Nav variant options
 */
export type NavVariant = 'default' | 'float-top-center' | 'float-bottom-center';

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

  /**
   * Whether to show backdrop when expanded on mobile
   */
  backdrop?: boolean;

  /**
   * Whether to close navbar when clicking outside
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether to close navbar on escape key press
   */
  closeOnEscape?: boolean;

  /**
   * Custom aria-label for the navigation
   */
  ariaLabel?: string;

  /**
   * ID for the navbar (used for accessibility)
   */
  id?: string;

  /**
   * Enable glass morphism effect.
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;
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

  /**
   * Nav variant (including float variants)
   */
  variant?: NavVariant;

  /**
   * Enable glass morphism effect.
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;
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

  /**
   * Optional custom link component
   */
  LinkComponent?: React.ElementType;
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
 * SideMenu component properties
 */
export interface SideMenuProps extends BaseComponentProps {
  /**
   * Menu title displayed at the top
   */
  title?: ReactNode;

  /**
   * Menu content (typically SideMenuList components)
   */
  children: ReactNode;

  /**
   * Menu items
   */
  menuItems?: {
    title?: ReactNode;
    toggleIcon?: ReactNode;
    items?: {
      title?: ReactNode;
      icon?: ReactNode;
      href?: string;
      onClick?: (event: React.MouseEvent) => void;
      active?: boolean;
      disabled?: boolean;
    }[];
  }[];
  /**
   * Whether the menu is open (for controlled component)
   */
  isOpen?: boolean;

  /**
   * Callback when menu open state changes
   */
  onToggle?: (isOpen: boolean) => void;

  /**
   * Whether the menu is collapsible on mobile
   */
  collapsible?: boolean;

  /**
   * Whether the menu can be collapsed on desktop (vertical collapse)
   * When true, adds a toggle button and supports collapsed/expanded states on desktop
   */
  collapsibleDesktop?: boolean;

  /**
   * Whether the menu starts collapsed on desktop (only applies when collapsibleDesktop is true)
   */
  defaultCollapsedDesktop?: boolean;

  /**
   * Custom toggle icon
   */
  toggleIcon?: ReactNode;

  /**
   * ID for the menu (used for accessibility)
   */
  id?: string;

  /**
   * Glass morphism effect for the side menu
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Optional custom link component (e.g., Next.js Link)
   * Will be passed to all SideMenuItem components
   */
  LinkComponent?: React.ElementType;
}

/**
 * SideMenuList component properties
 */
export interface SideMenuListProps extends BaseComponentProps {
  /**
   * List items (typically SideMenuItem components)
   */
  children: ReactNode;
}

/**
 * SideMenuItem component properties
 */
export interface SideMenuItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Item href (renders as link)
   */
  href?: string;

  /**
   * Item click handler (renders as button if no href)
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Whether this item is active/current
   */
  active?: boolean;

  /**
   * Optional icon for the item
   */
  icon?: ReactNode;

  /**
   * Link target attribute
   */
  target?: string;

  /**
   * Link rel attribute
   */
  rel?: string;

  /**
   * Optional custom link component
   */
  LinkComponent?: React.ElementType;
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
   * Title of the panel
   */
  title?: React.ReactNode;

  /**
   * Position of the panel
   * @default 'start'
   */
  position?: 'start' | 'end' | 'top' | 'bottom';

  /**
   * Animation mode
   * @default 'slide'
   */
  mode?: 'slide' | 'push' | 'none';

  /**
   * Whether the panel is open
   * @default false
   */
  isOpen?: boolean;

  /**
   * Callback when panel open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether to show backdrop
   * @default true
   */
  backdrop?: boolean;

  /**
   * Whether to close panel when clicking backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether to close panel when pressing Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Glass effect configuration
   * @default undefined
   */
  glass?: boolean | AtomixGlassProps;

  /**
   * Children elements
   */
  children: React.ReactNode;
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

  /**
   * Glass morphism effect for the data table
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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

  /**
   * Glass morphism effect for the pagination component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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

  /**
   * Glass morphism effect for the todo component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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

  /**
   * Error message to display
   */
  errorMessage?: string;
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

  /**
   * Glass morphism effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Prefix icon (appears before the input)
   */
  prefixIcon?: React.ReactNode;

  /**
   * Suffix icon (appears after the input)
   */
  suffixIcon?: React.ReactNode;

  /**
   * Whether the input is clearable (shows clear button when value exists)
   */
  clearable?: boolean;

  /**
   * Handler for clear button click
   */
  onClear?: () => void;

  /**
   * Whether to show character counter
   */
  showCounter?: boolean;

  /**
   * Maximum character count for counter (uses maxLength if not provided)
   */
  maxCount?: number;

  /**
   * Whether password visibility toggle is enabled (for password inputs)
   */
  showPasswordToggle?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Whether the input should take full width
   */
  fullWidth?: boolean;
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

  /**
   * Glass morphism effect for the select
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Whether the select should take full width
   */
  fullWidth?: boolean;
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

  /**
   * Glass morphism effect for the checkbox
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;
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

  /**
   * Glass morphism effect for the radio button
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;
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

  /**
   * Glass morphism effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Whether to show character counter
   */
  showCounter?: boolean;

  /**
   * Maximum character count for counter (uses maxLength if not provided)
   */
  maxCount?: number;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Helper text to display
   */
  helperText?: string;

  /**
   * Whether the textarea should take full width
   */
  fullWidth?: boolean;
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

  /**
   * Glass morphism effect for the avatar
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;

  /**
   * Custom style for the avatar
   */
  style?: React.CSSProperties;
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

  /**
   * Glass morphism effect for the avatar group
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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

  /**
   * Glass morphism effect for the modal
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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

  /**
   * Glass morphism effect for the breadcrumb
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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

  /**
   * Glass morphism effect for the messages component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;
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
   * Inline style for the popover
   */
  style?: React.CSSProperties;

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

  /**
   * Glass morphism effect for the popover
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}

/**
 * The trigger method for the dropdown menu
 */
export type DropdownTrigger = 'click' | 'hover';

/**
 * The placement of the dropdown menu
 */
export type DropdownPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

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

  /**
   * Glass morphism effect for the dropdown menu
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
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

  /**
   * Optional custom link component
   */
  LinkComponent?: React.ElementType;
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

/**
 * Progress component properties
 */
export interface ProgressProps extends BaseComponentProps {
  /**
   * Progress value (0-100)
   */
  value: number;

  /**
   * Progress bar color variant
   */
  variant?: ThemeColor;

  /**
   * Progress bar size
   */
  size?: Size;

  /**
   * Accessible label for screen readers
   */
  ariaLabel?: string;

  /**
   * Glass morphism effect for the progress bar
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}

/**
 * Rating component properties
 */
export interface RatingProps extends BaseComponentProps {
  /**
   * The rating value (0-5)
   */
  value?: number;

  /**
   * Default value for uncontrolled mode
   */
  defaultValue?: number;

  /**
   * Maximum possible rating value
   */
  maxValue?: number;

  /**
   * Whether to allow half-star ratings
   */
  allowHalf?: boolean;

  /**
   * Whether the rating is read-only
   */
  readOnly?: boolean;

  /**
   * Size variant
   */
  size?: Size;

  /**
   * Color theme
   */
  color?: ThemeColor;

  /**
   * Optional callback when rating changes
   */
  onChange?: (value: number) => void;

  /**
   * Optional label for the rating component (for accessibility)
   */
  label?: string;

  /**
   * ID for the rating component (for accessibility)
   */
  id?: string;

  /**
   * Whether to use the vanilla JS implementation
   */
  useVanillaJS?: boolean;

  /**
   * Glass morphism effect for the rating component
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: AtomixGlassProps | boolean;
}

/**
 * VideoPlayer component properties
 */
export interface VideoQuality {
  label: string;
  src: string;
  resolution?: string;
}

export interface VideoSubtitle {
  label: string;
  src: string;
  srcLang: string;
  default?: boolean;
}

export interface VideoChapter {
  title: string;
  startTime: number;
  endTime?: number;
}

export interface VideoPlayerProps extends BaseComponentProps {
  /**
   * Video source URL or YouTube video ID
   */
  src: string;

  /**
   * Video player type
   */
  type?: 'video' | 'youtube';

  /**
   * YouTube video ID (alternative to src for YouTube videos)
   */
  youtubeId?: string;

  /**
   * Poster image URL
   */
  poster?: string;

  /**
   * Whether video should autoplay
   */
  autoplay?: boolean;

  /**
   * Whether video should loop
   */
  loop?: boolean;

  /**
   * Whether video should be muted
   */
  muted?: boolean;

  /**
   * Whether to show custom controls
   */
  controls?: boolean;

  /**
   * Video preload setting
   */
  preload?: 'none' | 'metadata' | 'auto';

  /**
   * Video width
   */
  width?: string | number;

  /**
   * Video height
   */
  height?: string | number;

  /**
   * Aspect ratio (e.g., '16:9', '4:3')
   */
  aspectRatio?: string;

  /**
   * Available playback rates
   */
  playbackRates?: number[];

  /**
   * Available video qualities
   */
  quality?: VideoQuality[];

  /**
   * Available subtitles
   */
  subtitles?: VideoSubtitle[];

  /**
   * Video chapters for navigation
   */
  chapters?: VideoChapter[];

  /**
   * Thumbnail images for scrubbing
   */
  thumbnails?: string[];

  /**
   * Whether to show download button
   */
  showDownload?: boolean;

  /**
   * Whether to show share button
   */
  showShare?: boolean;

  /**
   * Whether to show settings menu
   */
  showSettings?: boolean;

  /**
   * Enable ambient mode (YouTube-like background glow)
   */
  ambientMode?: boolean;

  /**
   * Glass morphism variant configuration
   * - true: Enable with default settings
   * - false/undefined: Disable glass effect
   * - object: Custom glass configuration
   */
  glass?:
    | boolean
    | {
        displacementScale?: number;
        blurAmount?: number;
        saturation?: number;
        aberrationIntensity?: number;
        elasticity?: number;
        cornerRadius?: number;
        mode?: 'standard' | 'polar' | 'prominent' | 'shader';
        overLight?: boolean;
      };

  /**
   * Glass overlay opacity (0-1) when glass variant is enabled
   * @default 0.3
   */
  glassOpacity?: number;

  /**
   * Custom content to display over the glass layer
   */
  glassContent?: React.ReactNode;

  /**
   * Play event handler
   */
  onPlay?: () => void;

  /**
   * Pause event handler
   */
  onPause?: () => void;

  /**
   * Ended event handler
   */
  onEnded?: () => void;

  /**
   * Time update event handler
   */
  onTimeUpdate?: (currentTime: number) => void;

  /**
   * Volume change event handler
   */
  onVolumeChange?: (volume: number) => void;

  /**
   * Fullscreen change event handler
   */
  onFullscreenChange?: (isFullscreen: boolean) => void;

  /**
   * Error event handler
   */
  onError?: (error: Event) => void;
}

/**
 * PhotoViewer component properties
 */
/**
 * Interface for image objects used in PhotoViewer
 */
export interface ImageType {
  src: string;
  alt?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
}

export interface PhotoViewerProps extends BaseComponentProps {
  /**
   * Array of image URLs or image objects to display in the viewer
   */
  images: (string | ImageType)[];
  /**
   * Index of the image to show first
   * @default 0
   */
  startIndex?: number;
  /**
   * Additional className for the root element
   */
  className?: string;
  /**
   * Whether the viewer is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Enable keyboard navigation (arrow keys, escape)
   * @default true
   */
  enableKeyboardNavigation?: boolean;
  /**
   * Enable touch gestures for mobile devices
   * @default true
   */
  enableGestures?: boolean;
  /**
   * Enable fullscreen mode
   * @default true
   */
  enableFullscreen?: boolean;
  /**
   * Position of thumbnails
   * @default 'bottom'
   */
  thumbnailPosition?: 'bottom' | 'top' | 'left' | 'right' | 'none';
  /**
   * Callback when image changes
   */
  onImageChange?: (index: number) => void;
  /**
   * Callback when viewer is closed
   */
  onClose?: () => void;
}

/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  /**
   * Card header content
   */
  header?: ReactNode;

  /**
   * Card image source URL
   */
  image?: string;

  /**
   * Alternative text for the image
   */
  imageAlt?: string;

  /**
   * Card title
   */
  title?: ReactNode;

  /**
   * Card text content
   */
  text?: ReactNode;

  /**
   * Card actions (buttons, links, etc.)
   */
  actions?: ReactNode;

  /**
   * Card icon
   */
  icon?: ReactNode;

  /**
   * Card footer content
   */
  footer?: ReactNode;

  /**
   * Size variant of the card
   */
  size?: Size;

  /**
   * Color variant of the card
   */
  variant?: ThemeColor;

  /**
   * Appearance style of the card
   */
  appearance?: 'filled' | 'outlined' | 'ghost' | 'elevated';

  /**
   * Elevation level (shadow depth)
   */
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Row layout (horizontal card)
   */
  row?: boolean;

  /**
   * Flat style (no padding on image container)
   */
  flat?: boolean;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Disabled state - prevents interactions and shows visual feedback
   */
  disabled?: boolean;

  /**
   * Loading state - shows loading indicator
   */
  loading?: boolean;

  /**
   * Selected state - indicates card is selected
   */
  selected?: boolean;

  /**
   * Interactive state - makes card clickable with proper ARIA attributes
   */
  interactive?: boolean;

  /**
   * Applies a glass morphism effect to the card.
   * Can be a boolean to enable with default settings, or an object with `AtomixGlassProps` to customize the effect.
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Link URL - when provided, card renders as an anchor element
   */
  href?: string;

  /**
   * Link target attribute
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Card content (body)
   */
  children?: ReactNode;

  /**
   * Card styles
   */
  style?: React.CSSProperties;

  /**
   * Card className
   */
  className?: string;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;

  /**
   * Optional hover handler
   */
  onHover?: (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;

  /**
   * Optional focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLDivElement | HTMLAnchorElement>) => void;

  /**
   * ARIA role for the card
   */
  role?: 'article' | 'button' | 'link' | 'region';

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * ARIA described by reference
   */
  ariaDescribedBy?: string;

  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;
}

/**
 * Elevation Card component props
 */
export interface ElevationCardProps extends CardProps {
  /**
   * CSS class for elevation effect
   */
  elevationClass?: string;
}

/**
 * Card hook options
 */
export interface UseCardOptions {
  /**
   * Enable elevation effect on hover
   */
  elevationEffect?: boolean;

  /**
   * CSS class for elevation effect
   */
  elevationClass?: string;

  /**
   * Enable flip effect
   */
  flipEffect?: boolean;

  /**
   * Trigger for flip effect: 'click' or 'hover'
   */
  flipTrigger?: 'click' | 'hover';

  /**
   * Make card focusable and add focus effect
   */
  focusEffect?: boolean;

  /**
   * Make card clickable
   */
  clickable?: boolean;

  /**
   * Click handler for clickable card
   */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * Card hook return value
 */
export interface UseCardReturn {
  /**
   * Reference to the card element
   */
  cardRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Reference to the front side of a flip card
   */
  frontRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Reference to the back side of a flip card
   */
  backRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Whether the card is flipped
   */
  isFlipped: boolean;

  /**
   * Whether the card is elevated
   */
  isElevated: boolean;

  /**
   * Whether the card is focused
   */
  isFocused: boolean;

  /**
   * Whether the card is hovered
   */
  isHovered: boolean;

  /**
   * Click event handler
   */
  handleClick: (event: React.MouseEvent) => void;

  /**
   * Keyboard event handler
   */
  handleKeyDown: (event: React.KeyboardEvent) => void;

  /**
   * Mouse enter event handler
   */
  handleMouseEnter: () => void;

  /**
   * Mouse leave event handler
   */
  handleMouseLeave: () => void;

  /**
   * Focus event handler
   */
  handleFocus: () => void;

  /**
   * Blur event handler
   */
  handleBlur: () => void;

  /**
   * Get all card props combined
   */
  getCardProps: () => {
    className: string;
    ref: React.RefObject<HTMLDivElement | null>;
    tabIndex?: number;
    role?: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onClick: (event: React.MouseEvent) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
  };
}

/**
 * Slider slide item interface
 */
export interface SliderSlide {
  /**
   * Unique identifier for the slide
   */
  id: string;

  /**
   * Slide content
   */
  content: ReactNode;

  /**
   * Optional image source
   */
  image?: string;

  /**
   * Optional image alt text
   */
  alt?: string;

  /**
   * Optional title
   */
  title?: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Optional link URL
   */
  href?: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Custom CSS class for the slide
   */
  className?: string;

  /**
   * Custom data attributes
   */
  data?: Record<string, string>;

  /**
   * Lazy loading image source
   */
  dataSrc?: string;

  /**
   * Background image
   */
  backgroundImage?: string;

  /**
   * Video source for video slides
   */
  video?: {
    src: string;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
}

/**
 * Slider breakpoint configuration
 */
export interface SliderBreakpoint {
  /**
   * Number of slides to show
   */
  slidesToShow?: number;

  /**
   * Slides per view
   */
  slidesPerView?: number | 'auto';

  /**
   * Number of slides to scroll
   */
  slidesToScroll?: number;

  /**
   * Slides per group
   */
  slidesPerGroup?: number;

  /**
   * Space between slides in pixels
   */
  spaceBetween?: number;

  /**
   * Whether to center slides
   */
  centeredSlides?: boolean;

  /**
   * Slides per column
   */
  slidesPerColumn?: number;

  /**
   * Slides per column fill
   */
  slidesPerColumnFill?: 'column' | 'row';

  /**
   * Direction
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Width
   */
  width?: number;

  /**
   * Height
   */
  height?: number;

  /**
   * Loop
   */
  loop?: boolean;

  /**
   * Loop additional slides
   */
  loopAdditionalSlides?: number;

  /**
   * Loop filled group with blank
   */
  loopFillGroupWithBlank?: boolean;

  /**
   * Free mode
   */
  freeMode?: boolean;

  /**
   * Speed
   */
  speed?: number;

  /**
   * Effect
   */
  effect?: string;

  /**
   * Autoplay
   */
  autoplay?: boolean | SliderAutoplay;

  /**
   * Navigation
   */
  navigation?: boolean | SliderNavigation;

  /**
   * Pagination
   */
  pagination?: boolean | SliderPagination;

  /**
   * Scrollbar
   */
  scrollbar?: boolean | SliderScrollbar;
}

/**
 * Slider autoplay configuration
 */
export interface SliderAutoplay {
  /**
   * Delay between transitions in milliseconds
   */
  delay: number;

  /**
   * Whether to stop autoplay on interaction
   */
  stopOnInteraction?: boolean;

  /**
   * Whether to disable autoplay on hover
   */
  pauseOnHover?: boolean;

  /**
   * Whether to reverse direction
   */
  reverseDirection?: boolean;

  /**
   * Disable on interaction
   */
  disableOnInteraction?: boolean;

  /**
   * Wait for transition
   */
  waitForTransition?: boolean;

  /**
   * Pause on mouse enter
   */
  pauseOnMouseEnter?: boolean;
}

/**
 * Slider pagination configuration
 */
export interface SliderPagination {
  /**
   * Whether pagination is enabled
   */
  enabled: boolean;

  /**
   * Pagination element selector
   */
  el?: string | HTMLElement;

  /**
   * Pagination type
   */
  type?: 'bullets' | 'fraction' | 'progressbar' | 'custom';

  /**
   * Whether pagination is clickable
   */
  clickable?: boolean;

  /**
   * Whether to hide pagination on single slide
   */
  hideOnClick?: boolean;

  /**
   * Dynamic bullets
   */
  dynamicBullets?: boolean;

  /**
   * Dynamic main bullets
   */
  dynamicMainBullets?: number;

  /**
   * Format fraction current
   */
  formatFractionCurrent?: (number: number) => string;

  /**
   * Format fraction total
   */
  formatFractionTotal?: (number: number) => string;

  /**
   * Render bullet
   */
  renderBullet?: (index: number, className: string) => string;

  /**
   * Render fraction
   */
  renderFraction?: (currentClass: string, totalClass: string) => string;

  /**
   * Render progressbar
   */
  renderProgressbar?: (progressbarFillClass: string) => string;

  /**
   * Render custom
   */
  renderCustom?: (swiper: any, current: number, total: number) => string;

  /**
   * Progressbar opposite
   */
  progressbarOpposite?: boolean;

  /**
   * Bullet class
   */
  bulletClass?: string;

  /**
   * Bullet active class
   */
  bulletActiveClass?: string;

  /**
   * Modifier class
   */
  modifierClass?: string;

  /**
   * Current class
   */
  currentClass?: string;

  /**
   * Total class
   */
  totalClass?: string;

  /**
   * Hidden class
   */
  hiddenClass?: string;

  /**
   * Progressbar fill class
   */
  progressbarFillClass?: string;

  /**
   * Progressbar opposite class
   */
  progressbarOppositeClass?: string;

  /**
   * Clickable class
   */
  clickableClass?: string;

  /**
   * Lock class
   */
  lockClass?: string;

  /**
   * Horizontal class
   */
  horizontalClass?: string;

  /**
   * Vertical class
   */
  verticalClass?: string;
}

/**
 * Slider navigation configuration
 */
export interface SliderNavigation {
  /**
   * Whether navigation is enabled
   */
  enabled: boolean;

  /**
   * Previous button element selector
   */
  prevEl?: string | HTMLElement | ReactNode;

  /**
   * Next button element selector
   */
  nextEl?: string | HTMLElement | ReactNode;

  /**
   * Whether to hide navigation on reach
   */
  hideOnClick?: boolean;

  /**
   * Disabled class
   */
  disabledClass?: string;

  /**
   * Hidden class
   */
  hiddenClass?: string;

  /**
   * Lock class
   */
  lockClass?: string;

  /**
   * Navigation wrapper class
   */
  navigationDisabledClass?: string;
}

/**
 * Slider scrollbar configuration
 */
export interface SliderScrollbar {
  /**
   * Whether scrollbar is enabled
   */
  enabled: boolean;

  /**
   * Scrollbar element selector
   */
  el?: string | HTMLElement;

  /**
   * Whether scrollbar is draggable
   */
  draggable?: boolean;

  /**
   * Whether to hide scrollbar automatically
   */
  hide?: boolean;

  /**
   * Scrollbar snap on release
   */
  snapOnRelease?: boolean;

  /**
   * Drag class
   */
  dragClass?: string;

  /**
   * Lock class
   */
  lockClass?: string;

  /**
   * Horizontal class
   */
  horizontalClass?: string;

  /**
   * Vertical class
   */
  verticalClass?: string;
}

/**
 * Slider effect configuration
 */
export interface SliderEffect {
  /**
   * Transition effect type
   */
  type: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards' | 'creative';

  /**
   * Fade effect options
   */
  fade?: {
    crossFade?: boolean;
  };

  /**
   * Cube effect options
   */
  cube?: {
    slideShadows?: boolean;
    shadow?: boolean;
    shadowOffset?: number;
    shadowScale?: number;
  };

  /**
   * Coverflow effect options
   */
  coverflow?: {
    rotate?: number;
    stretch?: number;
    depth?: number;
    modifier?: number;
    slideShadows?: boolean;
  };

  /**
   * Flip effect options
   */
  flip?: {
    slideShadows?: boolean;
    limitRotation?: boolean;
  };

  /**
   * Cards effect options
   */
  cards?: {
    perSlideOffset?: number;
    perSlideRotate?: number;
    rotate?: boolean;
    slideShadows?: boolean;
  };

  /**
   * Creative effect options
   */
  creative?: {
    prev?: {
      translate?: [number, number, number];
      rotate?: [number, number, number];
      opacity?: number;
      scale?: number;
    };
    next?: {
      translate?: [number, number, number];
      rotate?: [number, number, number];
      opacity?: number;
      scale?: number;
    };
    limitProgress?: number;
    shadowPerProgress?: boolean;
    progressMultiplier?: number;
  };
}

/**
 * Slider thumbs configuration
 */
export interface SliderThumbs {
  /**
   * Whether thumbs are enabled
   */
  enabled: boolean;

  /**
   * Swiper instance for thumbs
   */
  swiper?: any;

  /**
   * Thumbs slides data
   */
  slides?: SliderSlide[];

  /**
   * Number of thumbs to show
   */
  slidesToShow?: number;

  /**
   * Space between thumbs
   */
  spaceBetween?: number;

  /**
   * Thumbs direction
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Whether thumbs are clickable
   */
  clickable?: boolean;

  /**
   * Slide thumb active class
   */
  slideThumbActiveClass?: string;

  /**
   * Thumbs container class
   */
  thumbsContainerClass?: string;

  /**
   * Auto scroll offset
   */
  autoScrollOffset?: number;

  /**
   * Multiple active thumbs
   */
  multipleActiveThumbs?: boolean;
}

/**
 * Slider zoom configuration
 */
export interface SliderZoom {
  /**
   * Whether zoom is enabled
   */
  enabled: boolean;

  /**
   * Maximum zoom ratio
   */
  maxRatio?: number;

  /**
   * Minimum zoom ratio
   */
  minRatio?: number;

  /**
   * Whether to toggle zoom on double tap
   */
  toggle?: boolean;

  /**
   * Container selector for zoom
   */
  containerClass?: string;

  /**
   * Zoomed slide class
   */
  zoomedSlideClass?: string;

  /**
   * Zoom container class
   */
  zoomContainerClass?: string;
}

/**
 * Slider lazy loading configuration
 */
export interface SliderLazy {
  /**
   * Whether lazy loading is enabled
   */
  enabled: boolean;

  /**
   * Check in view
   */
  checkInView?: boolean;

  /**
   * Load on transition start
   */
  loadOnTransitionStart?: boolean;

  /**
   * Number of slides to preload
   */
  loadPrevNext?: boolean;

  /**
   * Number of slides to preload in each direction
   */
  loadPrevNextAmount?: number;

  /**
   * Loading element selector
   */
  loadingClass?: string;

  /**
   * Loaded element selector
   */
  loadedClass?: string;

  /**
   * Preloader element selector
   */
  preloaderClass?: string;

  /**
   * Element class
   */
  elementClass?: string;
}

/**
 * Slider virtual slides configuration
 */
export interface SliderVirtual {
  /**
   * Whether virtual slides are enabled
   */
  enabled: boolean;

  /**
   * Number of slides to render
   */
  slides?: SliderSlide[];

  /**
   * Cache rendered slides
   */
  cache?: boolean;

  /**
   * Render slide function
   */
  renderSlide?: (slide: SliderSlide, index: number) => string;

  /**
   * Render external function
   */
  renderExternal?: (data: any) => void;

  /**
   * Add slides before
   */
  addSlidesBefore?: number;

  /**
   * Add slides after
   */
  addSlidesAfter?: number;

  /**
   * Render external update
   */
  renderExternalUpdate?: boolean;
}

/**
 * Slider state interface
 */
export interface SliderState {
  /**
   * Current active slide index
   */
  activeIndex: number;

  /**
   * Real index (without loop duplicates)
   */
  realIndex: number;

  /**
   * Previous index
   */
  previousIndex: number;

  /**
   * Whether slider is at the beginning
   */
  isBeginning: boolean;

  /**
   * Whether slider is at the end
   */
  isEnd: boolean;

  /**
   * Current progress (0-1)
   */
  progress: number;

  /**
   * Whether autoplay is running
   */
  autoplayRunning: boolean;

  /**
   * Whether slider is transitioning
   */
  transitioning: boolean;

  /**
   * Whether touch is active
   */
  touching: boolean;

  /**
   * Current translate value
   */
  translate: number;

  /**
   * Slides per view
   */
  slidesPerView: number | 'auto';

  /**
   * Total slides count
   */
  slidesCount: number;

  /**
   * Whether slider is locked
   */
  isLocked: boolean;

  /**
   * Whether slider is destroyed
   */
  destroyed: boolean;

  /**
   * Current breakpoint
   */
  currentBreakpoint?: string;

  /**
   * Size
   */
  size: number;

  /**
   * Touches
   */
  touches: {
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    diff: number;
  };

  /**
   * Allow slide next
   */
  allowSlideNext: boolean;

  /**
   * Allow slide prev
   */
  allowSlidePrev: boolean;

  /**
   * Allow touch move
   */
  allowTouchMove: boolean;

  /**
   * Animating
   */
  animating: boolean;

  /**
   * Enabled
   */
  enabled: boolean;

  /**
   * Initialized
   */
  initialized: boolean;
}

/**
 * Slider element refs
 */
export interface SliderRefs {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  wrapperRef?: React.RefObject<HTMLDivElement | null>;
  paginationRef?: React.RefObject<HTMLDivElement | null>;
  navigationPrevRef?: React.RefObject<HTMLButtonElement | null>;
  navigationNextRef?: React.RefObject<HTMLButtonElement | null>;
}

/**
 * Slider component properties
 */
export interface SliderProps extends BaseComponentProps {
  /**
   * Array of slides to display
   */
  slides: SliderSlide[];

  /**
   * Number of slides to show at once
   */
  slidesToShow?: number;

  /**
   * Number of slides to scroll at once
   */
  slidesToScroll?: number;

  /**
   * Space between slides in pixels
   */
  spaceBetween?: number;

  /**
   * Whether to center slides
   */
  centeredSlides?: boolean;

  /**
   * Whether to loop slides infinitely
   */
  loop?: boolean;

  /**
   * Initial slide index
   */
  initialSlide?: number;

  /**
   * Slider direction
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Transition speed in milliseconds
   */
  speed?: number;

  /**
   * CSS easing function
   */
  easing?: string;

  /**
   * Whether to allow touch/swipe gestures
   */
  allowTouchMove?: boolean;

  /**
   * Touch threshold for swipe (default: 10px)
   */
  threshold?: number;

  /**
   * Whether to enable mouse wheel control
   */
  mousewheel?:
    | boolean
    | {
        forceToAxis?: boolean;
        sensitivity?: number;
        releaseOnEdges?: boolean;
      };

  /**
   * Whether to enable keyboard control
   */
  keyboard?:
    | boolean
    | {
        enabled?: boolean;
        onlyInViewport?: boolean;
        pageUpDown?: boolean;
      };

  /**
   * Whether to grab cursor on hover (default: true)
   */
  grabCursor?: boolean;

  /**
   * Autoplay configuration
   */
  autoplay?: SliderAutoplay | boolean;

  /**
   * Pagination configuration
   */
  pagination?: SliderPagination | boolean;

  /**
   * Navigation configuration
   */
  navigation?: SliderNavigation | boolean;

  /**
   * Scrollbar configuration
   */
  scrollbar?: SliderScrollbar | boolean;

  /**
   * Effect configuration
   */
  effect?: SliderEffect;

  /**
   * Thumbs configuration
   */
  thumbs?: SliderThumbs;

  /**
   * Zoom configuration
   */
  zoom?: SliderZoom;

  /**
   * Lazy loading configuration
   */
  lazy?: SliderLazy;

  /**
   * Virtual slides configuration
   */
  virtual?: SliderVirtual;

  /**
   * Responsive breakpoints
   */
  breakpoints?: {
    [key: number]: SliderBreakpoint;
  };

  /**
   * Whether to free mode (no snap to slides)
   */
  freeMode?:
    | boolean
    | {
        enabled?: boolean;
        sticky?: boolean;
        momentumRatio?: number;
        momentumVelocityRatio?: number;
        momentumBounce?: boolean;
        momentumBounceRatio?: number;
        minimumVelocity?: number;
      };

  /**
   * Whether to watch for slides and wrapper size changes
   */
  watchSlidesProgress?: boolean;

  /**
   * Whether to watch for overflow
   */
  watchOverflow?: boolean;

  /**
   * Resistance ratio for edges
   */
  resistanceRatio?: number;

  /**
   * Whether to prevent clicks during transition
   */
  preventClicks?: boolean;

  /**
   * Whether to prevent clicks propagation during transition
   */
  preventClicksPropagation?: boolean;

  /**
   * Parallax configuration
   */
  parallax?: boolean;

  /**
   * Hash navigation
   */
  hashNavigation?:
    | boolean
    | {
        watchState?: boolean;
        replaceState?: boolean;
      };

  /**
   * History navigation
   */
  history?:
    | boolean
    | {
        enabled?: boolean;
        root?: string;
        replaceState?: boolean;
        key?: string;
      };

  /**
   * Controller configuration
   */
  controller?: {
    control?: any;
    inverse?: boolean;
    by?: 'slide' | 'container';
  };

  /**
   * A11y configuration
   */
  a11y?:
    | boolean
    | {
        enabled?: boolean;
        prevSlideMessage?: string;
        nextSlideMessage?: string;
        firstSlideMessage?: string;
        lastSlideMessage?: string;
        paginationBulletMessage?: string;
        notificationClass?: string;
      };

  /**
   * Slide change callback
   */
  onSlideChange?: (swiper: any) => void;

  /**
   * Slide change transition start callback
   */
  onSlideChangeTransitionStart?: (swiper: any) => void;

  /**
   * Slide change transition end callback
   */
  onSlideChangeTransitionEnd?: (swiper: any) => void;

  /**
   * Slider initialization callback
   */
  onInit?: (swiper: any) => void;

  /**
   * Before destroy callback
   */
  onDestroy?: () => void;

  /**
   * Touch start callback
   */
  onTouchStart?: (swiper: any, event: TouchEvent) => void;

  /**
   * Touch move callback
   */
  onTouchMove?: (swiper: any, event: TouchEvent) => void;

  /**
   * Touch end callback
   */
  onTouchEnd?: (swiper: any, event: TouchEvent) => void;

  /**
   * Reach beginning callback
   */
  onReachBeginning?: (swiper: any) => void;

  /**
   * Reach end callback
   */
  onReachEnd?: (swiper: any) => void;

  /**
   * Progress change callback
   */
  onProgress?: (swiper: any, progress: number) => void;

  /**
   * Autoplay start callback
   */
  onAutoplayStart?: (swiper: any) => void;

  /**
   * Autoplay stop callback
   */
  onAutoplayStop?: (swiper: any) => void;

  /**
   * Before resize callback
   */
  onBeforeResize?: (swiper: any) => void;

  /**
   * After resize callback
   */
  onResize?: (swiper: any) => void;

  /**
   * Slider size
   */
  size?: Size;

  /**
   * Slider height (for horizontal sliders)
   */
  height?: string | number;

  /**
   * Slider width (for vertical sliders)
   */
  width?: string | number;

  /**
   * Custom container class
   */
  containerClass?: string;

  /**
   * Whether to use vanilla JS implementation
   */
  useVanillaJS?: boolean;

  /**
   * Modules to enable
   */
  modules?: string[];

  /**
   * Update on window resize
   */
  updateOnWindowResize?: boolean;

  /**
   * Resize observer
   */
  resizeObserver?: boolean;

  /**
   * Observer
   */
  observer?: boolean;

  /**
   * Observer parents
   */
  observeParents?: boolean;

  /**
   * Observer slide children
   */
  observeSlideChildren?: boolean;

  /**
   * Run callbacks on init
   */
  runCallbacksOnInit?: boolean;

  /**
   * Preload images
   */
  preloadImages?: boolean;

  /**
   * Update on images ready
   */
  updateOnImagesReady?: boolean;

  /**
   * CSS mode
   */
  cssMode?: boolean;

  /**
   * Simulate touch
   */
  simulateTouch?: boolean;

  /**
   * Touch ratio
   */
  touchRatio?: number;

  /**
   * Touch angle
   */
  touchAngle?: number;

  /**
   * Short swipes
   */
  shortSwipes?: boolean;

  /**
   * Long swipes
   */
  longSwipes?: boolean;

  /**
   * Long swipes ratio
   */
  longSwipesRatio?: number;

  /**
   * Long swipes ms
   */
  longSwipesMs?: number;

  /**
   * Follow finger
   */
  followFinger?: boolean;

  /**
   * Touch move stop propagation
   */
  touchMoveStopPropagation?: boolean;

  /**
   * Touch start prevent default
   */
  touchStartPreventDefault?: boolean;

  /**
   * Touch start force prevent default
   */
  touchStartForcePreventDefault?: boolean;

  /**
   * Touch release on edges
   */
  touchReleaseOnEdges?: boolean;

  /**
   * Unique nav elements
   */
  uniqueNavElements?: boolean;

  /**
   * Slides per group
   */
  slidesPerGroup?: number;

  /**
   * Slides per group skip
   */
  slidesPerGroupSkip?: number;

  /**
   * Slides per group auto
   */
  slidesPerGroupAuto?: boolean;

  /**
   * Centered slides bounds
   */
  centeredSlidesBounds?: boolean;

  /**
   * Slides grid
   */
  grid?: {
    rows?: number;
    fill?: 'row' | 'column';
  };

  /**
   * Set wrapper size
   */
  setWrapperSize?: boolean;

  /**
   * Virtual translate
   */
  virtualTranslate?: boolean;

  /**
   * Round lengths
   */
  roundLengths?: boolean;

  /**
   * Nested
   */
  nested?: boolean;

  /**
   * Focus on select
   */
  focusableElements?: string;

  /**
   * Release form elements
   */
  releaseFormElements?: boolean;

  /**
   * Auto height
   */
  autoHeight?: boolean;

  /**
   * Slides offset before
   */
  slidesOffsetBefore?: number;

  /**
   * Slides offset after
   */
  slidesOffsetAfter?: number;

  /**
   * Normalize slide index
   */
  normalizeSlideIndex?: boolean;

  /**
   * Center insufficient slides
   */
  centerInsufficientSlides?: boolean;

  /**
   * Watch slides visibility
   */
  watchSlidesVisibility?: boolean;

  /**
   * Max backface hidden slides
   */
  maxBackfaceHiddenSlides?: number;

  /**
   * Edge swipe detection
   */
  edgeSwipeDetection?: boolean | string;

  /**
   * Edge swipe threshold
   */
  edgeSwipeThreshold?: number;

  /**
   * Resistance
   */
  resistance?: boolean;

  /**
   * Passive listeners
   */
  passiveListeners?: boolean;

  /**
   * Container modifier class
   */
  containerModifierClass?: string;

  /**
   * Slide class
   */
  slideClass?: string;

  /**
   * Slide blank class
   */
  slideBlankClass?: string;

  /**
   * Slide active class
   */
  slideActiveClass?: string;

  /**
   * Slide duplicate active class
   */
  slideDuplicateActiveClass?: string;

  /**
   * Slide visible class
   */
  slideVisibleClass?: string;

  /**
   * Slide duplicate class
   */
  slideDuplicateClass?: string;

  /**
   * Slide next class
   */
  slideNextClass?: string;

  /**
   * Slide duplicate next class
   */
  slideDuplicateNextClass?: string;

  /**
   * Slide prev class
   */
  slidePrevClass?: string;

  /**
   * Slide duplicate prev class
   */
  slideDuplicatePrevClass?: string;

  /**
   * Wrapper class
   */
  wrapperClass?: string;

  /**
   * Lazy preloader class
   */
  lazyPreloaderClass?: string;

  /**
   * Lazy preloader custom
   */
  lazyPreloaderCustom?: string;

  /**
   * Init
   */
  init?: boolean;

  /**
   * On any
   */
  onAny?: (eventName: string, ...args: any[]) => void;

  /**
   * Before init
   */
  onBeforeInit?: (swiper: any) => void;

  /**
   * Slides length change
   */
  onSlidesLengthChange?: (swiper: any) => void;

  /**
   * Snap index change
   */
  onSnapIndexChange?: (swiper: any) => void;

  /**
   * Real index change
   */
  onRealIndexChange?: (swiper: any) => void;

  /**
   * Before loop fix
   */
  onBeforeLoopFix?: (swiper: any) => void;

  /**
   * Loop fix
   */
  onLoopFix?: (swiper: any) => void;

  /**
   * Before transition start
   */
  onBeforeTransitionStart?: (swiper: any, speed: number, internal: boolean) => void;

  /**
   * Transition start
   */
  onTransitionStart?: (swiper: any) => void;

  /**
   * Transition end
   */
  onTransitionEnd?: (swiper: any) => void;

  /**
   * Slider move
   */
  onSliderMove?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Slider first move
   */
  onSliderFirstMove?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Set translate
   */
  onSetTranslate?: (swiper: any, translate: number) => void;

  /**
   * Set transition
   */
  onSetTransition?: (swiper: any, duration: number) => void;

  /**
   * From edge
   */
  onFromEdge?: (swiper: any) => void;

  /**
   * To edge
   */
  onToEdge?: (swiper: any) => void;

  /**
   * Tap
   */
  onTap?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Double tap
   */
  onDoubleTap?: (swiper: any, event: TouchEvent | MouseEvent) => void;

  /**
   * Images ready
   */
  onImagesReady?: (swiper: any) => void;

  /**
   * Lock
   */
  onLock?: (swiper: any) => void;

  /**
   * Unlock
   */
  onUnlock?: (swiper: any) => void;

  /**
   * Breakpoint
   */
  onBreakpoint?: (swiper: any, breakpointParams: any) => void;

  /**
   * Orientation change
   */
  onOrientationchange?: (swiper: any) => void;

  /**
   * Keyboard
   */
  onKeyPress?: (swiper: any, keyCode: string) => void;

  /**
   * Mousewheel
   */
  onScroll?: (swiper: any, event: WheelEvent) => void;

  /**
   * Navigation hide
   */
  onNavigationHide?: (swiper: any) => void;

  /**
   * Navigation show
   */
  onNavigationShow?: (swiper: any) => void;

  /**
   * Pagination hide
   */
  onPaginationHide?: (swiper: any) => void;

  /**
   * Pagination show
   */
  onPaginationShow?: (swiper: any) => void;

  /**
   * Pagination render
   */
  onPaginationRender?: (swiper: any, paginationEl: HTMLElement) => void;

  /**
   * Scrollbar drag start
   */
  onScrollbarDragStart?: (swiper: any, event: MouseEvent | TouchEvent) => void;

  /**
   * Scrollbar drag move
   */
  onScrollbarDragMove?: (swiper: any, event: MouseEvent | TouchEvent) => void;

  /**
   * Scrollbar drag end
   */
  onScrollbarDragEnd?: (swiper: any, event: MouseEvent | TouchEvent) => void;

  /**
   * Zoom change
   */
  onZoomChange?: (swiper: any, scale: number, imageEl: HTMLElement, slideEl: HTMLElement) => void;

  /**
   * Autoplay pause
   */
  onAutoplayPause?: (swiper: any) => void;

  /**
   * Autoplay resume
   */
  onAutoplayResume?: (swiper: any) => void;

  /**
   * Autoplay time left
   */
  onAutoplayTimeLeft?: (swiper: any, timeLeft: number, percentage: number) => void;
}

// ============================================================================
// CHART COMPONENT TYPES
// ============================================================================

/**
 * Chart type options
 */
export type ChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'horizontal-bar'
  | 'pie'
  | 'donut'
  | 'doughnut'
  | 'scatter'
  | 'radar'
  | 'bubble'
  | 'candlestick'
  | 'interactive'
  | 'advanced'
  | 'gauge'
  | 'funnel'
  | 'waterfall'
  | 'heatmap'
  | 'treemap'
  | 'realtime';

/**
 * Extended size options for charts
 */
export type ChartSize = Size | 'xl' | 'full';

/**
 * Chart data point interface
 */
export interface ChartDataPoint {
  /**
   * Data point label
   */
  label: string;

  /**
   * Data point value
   */
  value: number;

  /**
   * Optional color for this data point
   */
  color?: string;

  /**
   * Optional metadata
   */
  metadata?: Record<string, any>;
}

/**
 * Chart dataset interface
 */
export interface ChartDataset {
  /**
   * Dataset label
   */
  label: string;

  /**
   * Dataset data points
   */
  data: ChartDataPoint[];

  /**
   * Dataset color
   */
  color?: string;

  /**
   * Whether this dataset is visible
   */
  visible?: boolean;
}

/**
 * Chart axis configuration
 */
export interface ChartAxis {
  /**
   * Axis label
   */
  label?: string;

  /**
   * Whether to show grid lines
   */
  showGrid?: boolean;

  /**
   * Whether to show axis labels
   */
  showLabels?: boolean;

  /**
   * Minimum value
   */
  min?: number;

  /**
   * Maximum value
   */
  max?: number;

  /**
   * Value formatter function
   */
  formatter?: (value: number) => string;

  /**
   * Number of ticks
   */
  ticks?: number;
}

/**
 * Chart configuration
 */
export interface ChartConfig {
  /**
   * X-axis configuration
   */
  xAxis?: ChartAxis;

  /**
   * Y-axis configuration
   */
  yAxis?: ChartAxis;

  /**
   * Whether to show legend
   */
  showLegend?: boolean;

  /**
   * Whether to show tooltips
   */
  showTooltips?: boolean;

  /**
   * Whether to animate the chart
   */
  animate?: boolean;

  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
}

/**
 * Chart component properties
 */
export interface ChartProps extends BaseComponentProps {
  /**
   * Chart type
   */
  type?: ChartType;

  /**
   * Chart datasets
   */
  datasets?: ChartDataset[];

  /**
   * Chart configuration
   */
  config?: ChartConfig;

  /**
   * Chart title
   */
  title?: string;

  /**
   * Chart subtitle
   */
  subtitle?: string;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Error message
   */
  error?: string;

  /**
   * Chart size
   */
  size?: ChartSize;

  /**
   * Chart variant
   */
  variant?: Variant;

  /**
   * Chart content (for wrapper chart component)
   */
  children?: React.ReactNode;

  /**
   * Click handler for data points
   */
  onDataPointClick?: (dataPoint: ChartDataPoint, datasetIndex: number, pointIndex: number) => void;

  /**
   * Legend item click handler
   */
  onLegendItemClick?: (datasetIndex: number, visible: boolean) => void;

  /**
   * Interactive mode - enables hover/click effects
   */
  interactive?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Fullscreen mode
   */
  fullscreen?: boolean;

  /**
   * Minimized mode
   */
  minimized?: boolean;

  /**
   * Show toolbar with actions
   */
  showToolbar?: boolean;

  /**
   * Enable fullscreen functionality
   */
  enableFullscreen?: boolean;

  /**
   * Enable export functionality
   */
  enableExport?: boolean;

  /**
   * Enable refresh functionality
   */
  enableRefresh?: boolean;

  /**
   * Available export formats
   */
  exportFormats?: ('png' | 'svg' | 'csv' | 'json')[];

  /**
   * Fullscreen state change handler
   */
  onFullscreen?: (isFullscreen: boolean) => void;

  /**
   * Export handler
   */
  onExport?: (format: string) => Promise<void> | void;

  /**
   * Refresh handler
   */
  onRefresh?: () => void;

  /**
   * Custom toolbar actions
   */
  toolbarActions?: React.ReactNode;

  /**
   * Empty state configuration
   */
  emptyState?: {
    message?: string;
    icon?: React.ReactNode;
  };

  /**
   * Accessibility label
   */
  'aria-label'?: string;
}

/**
 * CodeBlock component properties
 */
export interface CodeBlockProps extends BaseComponentProps {
  /**
   * The code to be displayed
   */
  code: string;

  /**
   * The language of the code
   */
  language: string;

  /**
   * Whether to show line numbers
   */
  showLineNumbers?: boolean;

  /**
   * Theme variant for the code block
   */
  theme?: 'light' | 'dark' | 'auto';

  /**
   * Maximum height of the code block in pixels or CSS units
   */
  maxHeight?: string | number;

  /**
   * Minimum height of the code block in pixels or CSS units
   */
  minHeight?: string | number;

  /**
   * Callback when code is copied to clipboard
   */
  onCopy?: () => void;

  /**
   * Callback when fullscreen mode changes
   */
  onFullscreenChange?: (isFullscreen: boolean) => void;

  /**
   * Whether to enable line wrapping
   */
  wrapLines?: boolean;

  /**
   * Whether to enable fullscreen mode
   */
  enableFullscreen?: boolean;

  /**
   * Whether to enable copy functionality
   */
  enableCopy?: boolean;

  /**
   * Whether to show the toolbar with actions
   */
  showToolbar?: boolean;
}

// ============================================================================
// FOOTER COMPONENT TYPES
// ============================================================================

/**
 * Footer layout options
 */
export type FooterLayout =
  | 'columns'
  | 'centered'
  | 'minimal'
  | 'stacked'
  | 'flexible'
  | 'sidebar'
  | 'wide';

/**
 * Social media platform types
 */
export type SocialPlatform =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'github'
  | 'discord'
  | 'tiktok'
  | 'pinterest'
  | 'snapchat'
  | 'whatsapp'
  | 'telegram'
  | 'reddit'
  | 'twitch'
  | 'spotify'
  | 'dribbble'
  | 'behance'
  | 'medium'
  | 'dev'
  | 'codepen'
  | 'custom';

/**
 * Social link configuration
 */
export interface SocialLink {
  /**
   * Social media platform
   */
  platform: SocialPlatform;

  /**
   * URL to the social media profile
   */
  url: string;

  /**
   * Custom icon (for custom platform or override)
   */
  icon?: ReactNode;

  /**
   * Custom label for accessibility
   */
  label?: string;
}

/**
 * Footer component properties
 */
export interface FooterProps extends BaseComponentProps {
  /**
   * Brand name or logo
   */
  brand?: ReactNode;

  /**
   * Brand logo (image URL or React element)
   */
  brandLogo?: string | ReactNode;

  /**
   * Brand description text
   */
  brandDescription?: ReactNode;

  /**
   * Copyright text
   */
  copyright?: ReactNode;

  /**
   * Footer layout variant
   */
  layout?: FooterLayout;

  /**
   * Color variant
   */
  variant?: ThemeColor;

  /**
   * Size variant
   */
  size?: Size;

  /**
   * Whether to show newsletter signup
   */
  showNewsletter?: boolean;

  /**
   * Newsletter section title
   */
  newsletterTitle?: string;

  /**
   * Newsletter section description
   */
  newsletterDescription?: string;

  /**
   * Newsletter input placeholder
   */
  newsletterPlaceholder?: string;

  /**
   * Newsletter submit button text
   */
  newsletterButtonText?: string;

  /**
   * Newsletter submit handler
   */
  onNewsletterSubmit?: (email: string) => void | Promise<void>;

  /**
   * Social media links
   */
  socialLinks?: SocialLink[];

  /**
   * Whether to show back to top button
   */
  showBackToTop?: boolean;

  /**
   * Back to top button text
   */
  backToTopText?: string;

  /**
   * Back to top click handler
   */
  onBackToTop?: () => void;

  /**
   * Whether to show divider above bottom section
   */
  showDivider?: boolean;

  /**
   * Whether footer should be sticky
   */
  sticky?: boolean;

  /**
   * Footer sections content
   */
  children?: ReactNode;

  /**
   * Whether footer should be glass
   */
  glass?: boolean;
}

/**
 * Footer section component properties
 */
export interface FooterSectionProps extends BaseComponentProps {
  /**
   * Section title
   */
  title?: ReactNode;

  /**
   * Section icon
   */
  icon?: ReactNode;

  /**
   * Whether section is collapsible on mobile
   */
  collapsible?: boolean;

  /**
   * Whether section is collapsed by default
   */
  defaultCollapsed?: boolean;

  /**
   * Whether newsletter is shown in the footer
   */
  showNewsletter?: boolean;

  /**
   * Section content
   */
  children: ReactNode;
}

/**
 * Footer link component properties
 */
export interface FooterLinkProps extends BaseComponentProps {
  /**
   * Link URL
   */
  href?: string;

  /**
   * Link icon
   */
  icon?: ReactNode;

  /**
   * Whether link opens in new tab
   */
  external?: boolean;

  /**
   * Whether link is active
   */
  active?: boolean;

  /**
   * Link click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Link content
   */
  children: ReactNode;

  /**
   * Custom link component (e.g., React Router Link)
   */
  LinkComponent?: React.ElementType;
}

/**
 * Footer social link component properties
 */
export interface FooterSocialLinkProps extends BaseComponentProps {
  /**
   * Social media platform
   */
  platform: SocialPlatform;

  /**
   * Social media profile URL
   */
  url: string;

  /**
   * Custom icon
   */
  icon?: ReactNode;

  /**
   * Custom label for accessibility
   */
  label?: string;

  /**
   * Size variant
   */
  size?: Size;

  /**
   * Visual variant
   */
  variant?: 'default' | 'filled' | 'outlined';
}

// ============================================================================
// GLASS CONTAINER COMPONENT TYPES
// ============================================================================

/**
 * Glass container displacement modes
 */
export type GlassMode = 'standard' | 'polar' | 'prominent' | 'shader';

/**
 * Glass container size configuration
 */
export interface GlassSize {
  /**
   * Width of the glass container
   */
  width: number;

  /**
   * Height of the glass container
   */
  height: number;
}

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  /**
   * X coordinate
   */
  x: number;

  /**
   * Y coordinate
   */
  y: number;
}

/**
 * Glass container component properties
 */
export interface GlassContainerProps extends BaseComponentProps {
  /**
   * Content to display inside the glass container
   */
  children: ReactNode;

  /**
   * Scale of the displacement effect (0-100)
   * @default 25
   */
  displacementScale?: number;

  /**
   * Amount of blur applied to the backdrop (0-50)
   * @default 12
   */
  blurAmount?: number;

  /**
   * Saturation level of the backdrop filter (0-300%)
   * @default 180
   */
  saturation?: number;

  /**
   * Intensity of chromatic aberration effect (0-10)
   * @default 2
   */
  aberrationIntensity?: number;

  /**
   * Elasticity of mouse interaction effects (0-1)
   * @default 0.15
   */
  elasticity?: number;

  /**
   * Border radius of the glass container
   * @default 999
   */
  cornerRadius?: number;

  /**
   * Padding inside the glass container
   * @default '24px 32px'
   */
  padding?: string;

  /**
   * Size configuration for the glass container
   * @default { width: 270, height: 69 }
   */
  glassSize?: GlassSize;

  /**
   * Displacement map mode
   * @default 'standard'
   */
  mode?: GlassMode;

  /**
   * Whether the container is over a light background
   * @default false
   */
  overLight?: boolean;

  /**
   * Active state of the container
   * @default false
   */
  active?: boolean;

  /**
   * Click handler for the glass container
   */
  onClick?: () => void;

  /**
   * Mouse enter handler
   */
  onMouseEnter?: () => void;

  /**
   * Mouse leave handler
   */
  onMouseLeave?: () => void;

  /**
   * Mouse down handler
   */
  onMouseDown?: () => void;

  /**
   * Mouse up handler
   */
  onMouseUp?: () => void;

  /**
   * External mouse container reference for tracking
   */
  mouseContainer?: React.RefObject<HTMLElement | null>;

  /**
   * External global mouse position
   */
  globalMousePos?: MousePosition;

  /**
   * External mouse offset from container center
   */
  mouseOffset?: MousePosition;

  /**
   * Custom CSS styles
   */
  style?: React.CSSProperties;
}

/**
 * AtomixGlass component properties
 */
