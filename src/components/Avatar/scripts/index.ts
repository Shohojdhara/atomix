import { AVATAR, AVATAR_GROUP } from '../../../lib/constants/components';

/**
 * AvatarOptions interface for the vanilla JS implementation
 */
export interface AvatarOptions {
  src?: string;
  alt?: string;
  initials?: string;
  icon?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  circle?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}

/**
 * AvatarGroupOptions interface for the vanilla JS implementation
 */
export interface AvatarGroupOptions {
  max?: number;
  stacked?: boolean;
  moreText?: string;
}

/**
 * Default options for the Avatar component
 */
const DEFAULT_AVATAR_OPTIONS: AvatarOptions = {
  alt: 'Avatar',
  size: 'md',
  circle: false,
  disabled: false
};

/**
 * Default options for the AvatarGroup component
 */
const DEFAULT_AVATAR_GROUP_OPTIONS: AvatarGroupOptions = {
  stacked: false
};

/**
 * Create a user icon SVG element
 * @returns SVG element as HTML string
 */
function createUserIcon(size: number = 24): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="currentColor" viewBox="0 0 256 256">
    <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z"></path>
  </svg>`;
}

/**
 * Avatar Class - Vanilla JS implementation
 */
export class Avatar {
  // DOM element
  private element: HTMLElement;
  
  // Options
  private options: AvatarOptions;

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: AvatarOptions = {}) {
    // Get element reference
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!this.element) {
      throw new Error('Avatar: Element not found');
    }
    
    // Merge default options with provided options
    this.options = { ...DEFAULT_AVATAR_OPTIONS, ...options };
    
    // Initialize the component
    this._initialize();
  }

  /**
   * Initialize the component
   * @private
   */
  private _initialize(): void {
    // Clear element
    this.element.innerHTML = '';
    
    // Add base class
    this.element.classList.add(AVATAR.CLASSES.BASE);
    
    // Add size class if not default
    if (this.options.size && this.options.size !== 'md') {
      this.element.classList.add(`c-avatar--${this.options.size}`);
    }
    
    // Add circle class if needed
    if (this.options.circle) {
      this.element.classList.add(AVATAR.CLASSES.CIRCLE);
    }
    
    // Add disabled class if needed
    if (this.options.disabled) {
      this.element.classList.add('is-disabled');
    }
    
    // Set role and tabindex if clickable
    if (this.options.onClick && !this.options.disabled) {
      this.element.setAttribute('role', 'button');
      this.element.setAttribute('tabindex', '0');
      this.element.addEventListener('click', this.options.onClick);
      
      // Add keyboard accessibility
      this.element.addEventListener('keydown', (e: KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && this.options.onClick) {
          e.preventDefault();
          this.options.onClick(e as unknown as MouseEvent);
        }
      });
    }
    
    // Create content
    this._createContent();
  }

  /**
   * Create avatar content
   * @private
   */
  private _createContent(): void {
    if (this.options.src) {
      // Create image
      const img = document.createElement('img');
      img.src = this.options.src;
      img.alt = this.options.alt || 'Avatar';
      img.className = 'c-avatar__image';
      
      // Handle image error
      img.addEventListener('error', () => {
        this._handleImageError();
      });
      
      this.element.appendChild(img);
    } else if (this.options.initials) {
      // Create initials
      const initialsSpan = document.createElement('span');
      initialsSpan.className = 'c-avatar__initials';
      initialsSpan.textContent = this.options.initials;
      this.element.appendChild(initialsSpan);
    } else if (this.options.icon) {
      // Create custom icon
      const iconSpan = document.createElement('span');
      iconSpan.className = 'c-avatar__icon';
      iconSpan.innerHTML = this.options.icon;
      this.element.appendChild(iconSpan);
    } else {
      // Create default user icon
      const iconSpan = document.createElement('span');
      iconSpan.className = 'c-avatar__icon';
      
      // Determine icon size based on avatar size
      let iconSize = 24;
      switch (this.options.size) {
        case 'xs':
          iconSize = 16;
          break;
        case 'sm':
          iconSize = 20;
          break;
        case 'lg':
          iconSize = 28;
          break;
        case 'xl':
          iconSize = 32;
          break;
      }
      
      iconSpan.innerHTML = createUserIcon(iconSize);
      this.element.appendChild(iconSpan);
    }
  }

  /**
   * Handle image loading error
   * @private
   */
  private _handleImageError(): void {
    // Clear element
    this.element.innerHTML = '';
    
    // Fall back to initials or icon
    if (this.options.initials) {
      const initialsSpan = document.createElement('span');
      initialsSpan.className = 'c-avatar__initials';
      initialsSpan.textContent = this.options.initials;
      this.element.appendChild(initialsSpan);
    } else if (this.options.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'c-avatar__icon';
      iconSpan.innerHTML = this.options.icon;
      this.element.appendChild(iconSpan);
    } else {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'c-avatar__icon';
      
      // Determine icon size based on avatar size
      let iconSize = 24;
      switch (this.options.size) {
        case 'xs':
          iconSize = 16;
          break;
        case 'sm':
          iconSize = 20;
          break;
        case 'lg':
          iconSize = 28;
          break;
        case 'xl':
          iconSize = 32;
          break;
      }
      
      iconSpan.innerHTML = createUserIcon(iconSize);
      this.element.appendChild(iconSpan);
    }
  }

  /**
   * Update the avatar with new options
   * @public
   */
  public update(options: Partial<AvatarOptions>): void {
    // Update options
    this.options = { ...this.options, ...options };
    
    // Re-initialize
    this._initialize();
  }

  /**
   * Destroy the avatar component
   * @public
   */
  public destroy(): void {
    // Remove event listeners
    if (this.options.onClick) {
      this.element.removeEventListener('click', this.options.onClick);
    }
    
    // Remove all classes
    this.element.classList.remove(
      AVATAR.CLASSES.BASE,
      AVATAR.CLASSES.XS,
      AVATAR.CLASSES.SM,
      AVATAR.CLASSES.MD,
      AVATAR.CLASSES.LG,
      AVATAR.CLASSES.XL,
      AVATAR.CLASSES.CIRCLE,
      'is-disabled'
    );
    
    // Clear content
    this.element.innerHTML = '';
    
    // Remove attributes
    this.element.removeAttribute('role');
    this.element.removeAttribute('tabindex');
  }

  /**
   * Initialize all Avatar components on the page
   * @public
   * @static
   */
  public static initializeAll(selector = '[data-component="avatar"]'): Avatar[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      // Try to get options from data attributes
      const options: AvatarOptions = {};
      
      // Get src
      const src = element.getAttribute('data-src');
      if (src) options.src = src;
      
      // Get alt
      const alt = element.getAttribute('data-alt');
      if (alt) options.alt = alt;
      
      // Get initials
      const initials = element.getAttribute('data-initials');
      if (initials) options.initials = initials;
      
      // Get icon
      const icon = element.getAttribute('data-icon');
      if (icon) options.icon = icon;
      
      // Get size
      const size = element.getAttribute('data-size') as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null;
      if (size && ['xs', 'sm', 'md', 'lg', 'xl'].includes(size)) options.size = size;
      
      // Get circle
      const circle = element.getAttribute('data-circle');
      options.circle = circle === 'true';
      
      // Get disabled
      const disabled = element.getAttribute('data-disabled');
      options.disabled = disabled === 'true';
      
      return new Avatar(element as HTMLElement, options);
    });
  }
}

/**
 * AvatarGroup Class - Vanilla JS implementation
 */
export class AvatarGroup {
  // DOM element
  private element: HTMLElement;
  
  // Options
  private options: AvatarGroupOptions;
  
  // Child avatars
  private avatars: HTMLElement[] = [];

  /**
   * Constructor
   * @param element - DOM element or selector
   * @param options - Configuration options
   */
  constructor(element: string | HTMLElement, options: AvatarGroupOptions = {}) {
    // Get element reference
    this.element = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;
    
    if (!this.element) {
      throw new Error('AvatarGroup: Element not found');
    }
    
    // Merge default options with provided options
    this.options = { ...DEFAULT_AVATAR_GROUP_OPTIONS, ...options };
    
    // Find child avatars
    this.avatars = Array.from(this.element.querySelectorAll('.c-avatar'));
    
    // Initialize the component
    this._initialize();
  }

  /**
   * Initialize the component
   * @private
   */
  private _initialize(): void {
    // Add base class
    this.element.classList.add(AVATAR_GROUP.CLASSES.BASE);
    
    // Add stacked class if needed
    if (this.options.stacked) {
      this.element.classList.add(AVATAR_GROUP.CLASSES.STACKED);
    }
    
    // Handle max avatars
    if (this.options.max !== undefined && this.avatars.length > this.options.max) {
      this._handleMaxAvatars();
    }
  }

  /**
   * Handle maximum number of avatars
   * @private
   */
  private _handleMaxAvatars(): void {
    if (!this.options.max) return;
    
    // Hide avatars beyond the max
    const visibleAvatars = this.avatars.slice(0, this.options.max);
    const hiddenAvatars = this.avatars.slice(this.options.max);
    
    // Hide extra avatars
    hiddenAvatars.forEach(avatar => {
      avatar.style.display = 'none';
    });
    
    // Get size and shape from first avatar to ensure consistent styling
    const firstAvatar = this.avatars[0];
    let avatarSize = 'md';
    let isCircle = false;
    
    if (firstAvatar) {
      // Extract size from class name
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        if (firstAvatar.classList.contains(`c-avatar--${size}`)) {
          avatarSize = size;
        }
      });
      
      // Check if circular
      isCircle = firstAvatar.classList.contains('c-avatar--circle');
    }
    
    // Create "more" indicator
    const moreElement = document.createElement('div');
    moreElement.className = AVATAR_GROUP.CLASSES.MORE;
    
    // Add size and shape classes to match avatars
    if (avatarSize !== 'md') {
      moreElement.classList.add(`c-avatar--${avatarSize}`);
    }
    
    if (isCircle) {
      moreElement.classList.add('c-avatar--circle');
    }
    
    moreElement.textContent = this.options.moreText || `+${hiddenAvatars.length}`;
    
    // Append to element
    this.element.appendChild(moreElement);
  }

  /**
   * Update the avatar group with new options
   * @public
   */
  public update(options: Partial<AvatarGroupOptions>): void {
    // Update options
    this.options = { ...this.options, ...options };
    
    // Clear "more" indicator
    const moreElement = this.element.querySelector(`.${AVATAR_GROUP.CLASSES.MORE}`);
    if (moreElement) {
      moreElement.remove();
    }
    
    // Reset hidden avatars
    this.avatars.forEach(avatar => {
      avatar.style.display = '';
    });
    
    // Remove stacked class
    this.element.classList.remove(AVATAR_GROUP.CLASSES.STACKED);
    
    // Re-initialize
    this._initialize();
  }

  /**
   * Destroy the avatar group component
   * @public
   */
  public destroy(): void {
    // Remove classes
    this.element.classList.remove(
      AVATAR_GROUP.CLASSES.BASE,
      AVATAR_GROUP.CLASSES.STACKED
    );
    
    // Show all avatars
    this.avatars.forEach(avatar => {
      avatar.style.display = '';
    });
    
    // Remove "more" indicator
    const moreElement = this.element.querySelector(`.${AVATAR_GROUP.CLASSES.MORE}`);
    if (moreElement) {
      moreElement.remove();
    }
  }

  /**
   * Initialize all AvatarGroup components on the page
   * @public
   * @static
   */
  public static initializeAll(selector = '[data-component="avatar-group"]'): AvatarGroup[] {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements).map(element => {
      // Try to get options from data attributes
      const options: AvatarGroupOptions = {};
      
      // Get max
      const max = element.getAttribute('data-max');
      if (max) options.max = parseInt(max, 10);
      
      // Get stacked
      const stacked = element.getAttribute('data-stacked');
      options.stacked = stacked === 'true';
      
      // Get more text
      const moreText = element.getAttribute('data-more-text');
      if (moreText) options.moreText = moreText;
      
      return new AvatarGroup(element as HTMLElement, options);
    });
  }
} 