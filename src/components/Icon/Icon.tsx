import React from 'react';
import * as PhosphorIcons from 'phosphor-react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

// We need to filter out non-icon exports from the Phosphor package
type PhosphorIconsType = Exclude<keyof typeof PhosphorIcons, 'Icon' | 'IconContext' | 'IconBase' | 'IconProps' | 'createIcon' | 'default' | 'SSR'>;

interface IconProps {
  /**
   * Icon name from Phosphor Icons
   */
  name: PhosphorIconsType;
  
  /**
   * Icon size
   */
  size?: IconSize | number;
  
  /**
   * Icon weight/style
   */
  weight?: IconWeight;
  
  /**
   * Icon color
   */
  color?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Alt text for accessibility
   */
  alt?: string;
}

// Map string sizes to pixel values
const sizeMap: Record<IconSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40
};

/**
 * Icon component that displays a Phosphor icon
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  weight = 'regular',
  color,
  className = '',
  alt
}) => {
  // Get the icon component from Phosphor
  const IconComponent = PhosphorIcons[name] as React.FC<
    PhosphorIcons.IconProps & { ref?: React.Ref<SVGSVGElement> }
  >;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Phosphor Icons`);
    return null;
  }
  
  // Convert string size to pixel value if needed
  const pixelSize = typeof size === 'string' ? sizeMap[size as IconSize] || 24 : size;
  
  return (
    <span className={`c-icon c-icon--${size} ${className}`} aria-hidden={!alt} title={alt}>
      <IconComponent
        size={pixelSize}
        weight={weight}
        color={color}
        aria-label={alt}
      />
    </span>
  );
};

export type { IconProps  };

// Set display name for debugging
Icon.displayName = 'Icon';

// Default export (primary)
export default Icon;

// Named export for compatibility
export { Icon };