import { TOOLTIP } from '../../../lib/constants/components';
import { Tooltip } from './index';

/**
 * Calculate the best position for a tooltip based on available space
 * @param triggerElement - The trigger element
 * @param tooltipElement - The tooltip element
 * @param preferredPosition - The preferred position
 * @returns The best position to use
 */
export function calculateBestPosition(
  triggerElement: HTMLElement,
  tooltipElement: HTMLElement,
  preferredPosition: string = 'top'
): string {
  if (!triggerElement || !tooltipElement) return preferredPosition;

  // Get element dimensions and positions
  const triggerRect = triggerElement.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();

  // Get viewport dimensions
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Calculate available space in each direction
  const spaceAbove = triggerRect.top;
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = viewportWidth - triggerRect.right;

  // Check if preferred position has enough space
  switch (preferredPosition) {
    case 'top':
      if (spaceAbove >= tooltipRect.height) return 'top';
      break;
    case 'bottom':
      if (spaceBelow >= tooltipRect.height) return 'bottom';
      break;
    case 'left':
      if (spaceLeft >= tooltipRect.width) return 'left';
      break;
    case 'right':
      if (spaceRight >= tooltipRect.width) return 'right';
      break;
    default:
      break;
  }

  // Find the best alternative position
  const spaces = [
    { position: 'top', space: spaceAbove },
    { position: 'bottom', space: spaceBelow },
    { position: 'left', space: spaceLeft },
    { position: 'right', space: spaceRight },
  ];

  // Sort by available space (descending)
  spaces.sort((a, b) => b.space - a.space);

  // Return the position with the most space
  return spaces[0].position;
}

/**
 * Position the tooltip relative to its trigger with smart positioning
 * @param tooltipElement - The tooltip element
 * @param triggerElement - The trigger element
 * @param position - The desired position
 * @param offset - Distance from trigger in pixels
 */
export function positionTooltip(
  tooltipElement: HTMLElement,
  triggerElement: HTMLElement,
  position: string = 'top',
  offset: number = 8
): void {
  if (!tooltipElement || !triggerElement) return;

  // Get element dimensions
  const triggerRect = triggerElement.getBoundingClientRect();
  const tooltipRect = tooltipElement.getBoundingClientRect();

  // Calculate position based on the trigger and tooltip dimensions
  let top = 0;
  let left = 0;

  switch (position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'bottom':
      top = triggerRect.bottom + offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
      break;
    case 'left':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.left - tooltipRect.width - offset;
      break;
    case 'right':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
      left = triggerRect.right + offset;
      break;
    case 'top-left':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left;
      break;
    case 'top-right':
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.right - tooltipRect.width;
      break;
    case 'bottom-left':
      top = triggerRect.bottom + offset;
      left = triggerRect.left;
      break;
    case 'bottom-right':
      top = triggerRect.bottom + offset;
      left = triggerRect.right - tooltipRect.width;
      break;
    default:
      // Default to top
      top = triggerRect.top - tooltipRect.height - offset;
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
  }

  // Apply position
  tooltipElement.style.top = `${top}px`;
  tooltipElement.style.left = `${left}px`;
}

/**
 * Initialize tooltips with custom behavior
 * @param selector - CSS selector for tooltip elements
 * @param options - Custom options
 */
export function initializeTooltipsWithCustomBehavior(
  selector = TOOLTIP.SELECTORS.TOOLTIP,
  options = {}
): Tooltip[] {
  const tooltips = Tooltip.initializeAll(selector, options);

  // Apply smart positioning to each tooltip
  tooltips.forEach((tooltip: Tooltip) => {
    const triggerElement = tooltip.getTriggerElement();
    const tooltipElement = tooltip.getElement();

    if (triggerElement && tooltipElement) {
      // Update position on window resize
      window.addEventListener('resize', () => {
        if (tooltip.isVisible()) {
          const bestPosition = calculateBestPosition(
            triggerElement,
            tooltipElement,
            tooltip.getPosition()
          );

          tooltip.setPosition(bestPosition);
        }
      });
    }
  });

  return tooltips;
}
