import * as PhosphorIcons from '@phosphor-icons/react';
import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

// We need to filter out non-icon exports from the Phosphor package
type PhosphorIconsType = Exclude<
  keyof typeof PhosphorIcons,
  'Icon' | 'IconContext' | 'IconBase' | 'IconProps' | 'createIcon' | 'default' | 'SSR'
>;

export interface IconProps {
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
  xl: 40,
};

/**
 * Icon component that displays a Phosphor icon
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  weight = 'regular',
  color,
  className = '',
  alt,
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
      <IconComponent size={pixelSize} weight={weight} color={color} aria-label={alt} />
    </span>
  );
};

Icon.displayName = 'Icon';

export default Icon;
