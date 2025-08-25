import { ThemeColor } from '../types/components';

interface UseProgressProps {
  /**
   * Progress value from 0 to 100
   */
  value: number;

  /**
   * Optional color variant
   */
  variant?: ThemeColor;

  /**
   * Optional size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Optional className for custom styling
   */
  className?: string;
}

interface UseProgressReturn {
  /**
   * Computed progress value clamped between 0 and 100
   */
  progressValue: number;

  /**
   * CSS properties for the progress component
   */
  progressStyle: React.CSSProperties;

  /**
   * CSS classes for the progress component
   */
  progressClasses: string;
}

/**
 * Hook for managing Progress component state and behavior
 */
export const useProgress = ({
  value,
  variant = 'primary',
  size = 'md',
  className = '',
}: UseProgressProps): UseProgressReturn => {
  // Clamp value between 0 and 100
  const progressValue = Math.min(Math.max(value, 0), 100);

  // Create CSS custom properties
  const progressStyle = {
    '--atomix-progress-percentage': `${progressValue}%`,
  } as React.CSSProperties;

  // Generate class names
  const baseClass = 'c-progress';
  const variantClass = variant ? `${baseClass}--${variant}` : '';
  const sizeClass = size ? `${baseClass}--${size}` : '';
  const customClass = className || '';

  const progressClasses = [baseClass, variantClass, sizeClass, customClass]
    .filter(Boolean)
    .join(' ');

  return {
    progressValue,
    progressStyle,
    progressClasses,
  };
};
