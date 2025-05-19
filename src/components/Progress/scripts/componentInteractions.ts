import { PROGRESS } from '../../../lib/constants/components';

/**
 * Set progress value for an element
 * @param element - Progress element
 * @param value - Progress value (0-100)
 */
export function setProgressValue(element: HTMLElement, value: number): void {
  // Clamp value between 0 and 100
  const progressValue = Math.min(Math.max(value, 0), 100);
  
  // Update the CSS variable
  element.style.setProperty(PROGRESS.CSS_VARS.PERCENTAGE, `${progressValue}%`);
  
  // Update ARIA attribute
  element.setAttribute(PROGRESS.ATTRIBUTES.ARIA_VALUENOW, progressValue.toString());
}

/**
 * Set progress variant
 * @param element - Progress element
 * @param variant - Color variant
 */
export function setProgressVariant(element: HTMLElement, variant: string): void {
  // Remove existing variant classes
  const classList = element.classList;
  Array.from(classList)
    .filter(className => className.startsWith(`${PROGRESS.CLASSES.BASE}--`) && 
                        !className.includes('--sm') && 
                        !className.includes('--md') && 
                        !className.includes('--lg'))
    .forEach(className => classList.remove(className));
  
  // Add new variant class
  classList.add(`${PROGRESS.CLASSES.BASE}--${variant}`);
}

/**
 * Set progress size
 * @param element - Progress element
 * @param size - Size variant
 */
export function setProgressSize(element: HTMLElement, size: string): void {
  // Remove existing size classes
  const classList = element.classList;
  [PROGRESS.CLASSES.SM, PROGRESS.CLASSES.MD, PROGRESS.CLASSES.LG]
    .forEach(className => classList.remove(className));
  
  // Add new size class
  classList.add(`${PROGRESS.CLASSES.BASE}--${size}`);
}

/**
 * Create a new progress element
 * @param options - Progress options
 * @returns HTMLElement - The created progress element
 */
export function createProgressElement(options: {
  value?: number;
  variant?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
} = {}): HTMLElement {
  const {
    value = 0,
    variant = 'primary',
    size = 'md',
    ariaLabel = PROGRESS.DEFAULTS.ARIA_LABEL
  } = options;
  
  // Create progress container
  const progressElement = document.createElement('div');
  progressElement.className = PROGRESS.CLASSES.BASE;
  progressElement.classList.add(`${PROGRESS.CLASSES.BASE}--${variant}`);
  progressElement.classList.add(`${PROGRESS.CLASSES.BASE}--${size}`);
  
  // Set ARIA attributes
  progressElement.setAttribute('role', 'progressbar');
  progressElement.setAttribute(PROGRESS.ATTRIBUTES.ARIA_VALUEMIN, '0');
  progressElement.setAttribute(PROGRESS.ATTRIBUTES.ARIA_VALUEMAX, '100');
  progressElement.setAttribute(PROGRESS.ATTRIBUTES.ARIA_VALUENOW, value.toString());
  progressElement.setAttribute(PROGRESS.ATTRIBUTES.ARIA_LABEL, ariaLabel);
  
  // Set progress value
  progressElement.style.setProperty(PROGRESS.CSS_VARS.PERCENTAGE, `${value}%`);
  
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = PROGRESS.CLASSES.BAR;
  
  // Append bar to container
  progressElement.appendChild(progressBar);
  
  return progressElement;
}
