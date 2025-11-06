/**
 * Generate a color from a color scheme based on an index
 * @param colorScheme - Array of colors to choose from
 * @param index - Index to select color from
 * @returns Color string
 */
export const getColorFromScheme = (colorScheme: string[], index: number): string => {
  return colorScheme[index % colorScheme.length];
};

/**
 * Generate a color based on a value within a range
 * @param value - The value to map to a color
 * @param minValue - The minimum value in the range
 * @param maxValue - The maximum value in the range
 * @param colorScheme - Array of colors to interpolate between
 * @returns Color string
 */
export const getColorFromValue = (
  value: number,
  minValue: number,
  maxValue: number,
  colorScheme: string[]
): string => {
  if (minValue === maxValue) {
    return colorScheme[0];
  }

  const normalized = (value - minValue) / (maxValue - minValue);
  const index = Math.floor(normalized * (colorScheme.length - 1));
  return colorScheme[index];
};

/**
 * Default color schemes for charts
 */
export const DEFAULT_COLOR_SCHEMES = {
  primary: [
    'var(--atomix-primary)',
    'var(--atomix-secondary)',
    'var(--atomix-success)',
    'var(--atomix-warning)',
    'var(--atomix-error)',
    'var(--atomix-info)',
  ],
  rainbow: [
    'var(--atomix-error)',
    'var(--atomix-info)',
    'var(--atomix-primary)',
    'var(--atomix-warning)',
    'var(--atomix-success)',
    'var(--atomix-primary-5)',
    'var(--atomix-primary-7)',
    'var(--atomix-warning-5)',
  ],
  monochrome: [
    'var(--atomix-gray-10)',
    'var(--atomix-gray-9)',
    'var(--atomix-gray-8)',
    'var(--atomix-gray-7)',
    'var(--atomix-gray-6)',
    'var(--atomix-gray-5)',
    'var(--atomix-gray-4)',
    'var(--atomix-gray-3)',
  ],
};
