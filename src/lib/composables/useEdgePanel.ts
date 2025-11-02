import { useEffect, useRef, useState, useCallback } from 'react';
import { EdgePanelProps } from '../types/components';
import { EDGE_PANEL } from '../constants/components';

/**
 * EdgePanel state and functionality
 * @param initialProps - Initial EdgePanel properties
 * @returns EdgePanel state and methods
 */
export function useEdgePanel(initialProps?: Partial<EdgePanelProps>) {
  // Default EdgePanel properties
  const defaultProps: Partial<EdgePanelProps> = {
    position: 'start',
    mode: 'slide',
    isOpen: false,
    backdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    glass: undefined,
    ...initialProps,
  };

  const [isOpen, setIsOpen] = useState(defaultProps.isOpen || false);
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  /**
   * Generate EdgePanel class based on properties
   * @param props - EdgePanel properties
   * @returns Class string
   */
  const generateEdgePanelClass = (props: Partial<EdgePanelProps>): string => {
    const { position = defaultProps.position, className = '', isOpen: propIsOpen } = props;

    const baseClass = EDGE_PANEL.CLASSES.BASE;
    const positionClass = position ? `${baseClass}--${position}` : '';
    const openClass = (propIsOpen ?? isOpen) ? EDGE_PANEL.CLASSES.IS_OPEN : '';

    return `${baseClass} ${positionClass} ${openClass} ${className}`.trim();
  };

  /**
   * Adjust body padding in push mode
   */
  const adjustBodyPadding = useCallback(() => {
    if (!containerRef.current || defaultProps.mode !== 'push') return;

    const { position } = defaultProps;
    const size =
      position === 'top' || position === 'bottom'
        ? containerRef.current.clientHeight
        : containerRef.current.clientWidth;

    // Map position to CSS padding property
    let paddingProperty: string;
    switch (position) {
      case 'start':
        paddingProperty = 'paddingLeft';
        break;
      case 'end':
        paddingProperty = 'paddingRight';
        break;
      default:
        // For top/bottom, capitalize first letter
        paddingProperty = `padding${position!.charAt(0).toUpperCase() + position!.slice(1)}`;
    }

    document.body.style[paddingProperty as any] = `${size}px`;
    document.body.classList.add('is-pushed');
  }, [defaultProps.mode, defaultProps.position]);

  /**
   * Reset body padding
   */
  const resetBodyPadding = useCallback(() => {
    if (defaultProps.mode !== 'push') return;

    const { position } = defaultProps;

    // Map position to CSS padding property
    let paddingProperty: string;
    switch (position) {
      case 'start':
        paddingProperty = 'paddingLeft';
        break;
      case 'end':
        paddingProperty = 'paddingRight';
        break;
      default:
        // For top/bottom, capitalize first letter
        paddingProperty = `padding${position!.charAt(0).toUpperCase() + position!.slice(1)}`;
    }

    document.body.style[paddingProperty as any] = '';
    document.body.classList.remove('is-pushed');
  }, [defaultProps.mode, defaultProps.position]);

  /**
   * Open the panel
   */
  const openPanel = useCallback(
    (useFadeAnimation = false) => {
      setIsOpen(true);
      document.body.classList.add('is-edgepanel-open');

      if (containerRef.current) {
        const { mode } = defaultProps;

        // Only add animation if not in 'none' mode
        if (mode !== 'none') {
          if (useFadeAnimation) {
            // Add fade animation class
            containerRef.current.classList.add('is-fade-animating');

            // Force a reflow before starting the animation
            void containerRef.current.offsetHeight;

            // Remove animation class after animation completes
            const container = containerRef.current;
            setTimeout(() => {
              if (container) {
                container.classList.remove('is-fade-animating');
              }
            }, EDGE_PANEL.ANIMATION_DURATION);
          } else {
            // Add transform animation class
            containerRef.current.classList.add('is-animating');

            // Force a reflow before starting the animation
            void containerRef.current.offsetHeight;

            // Remove animation class after animation completes
            const container = containerRef.current;
            setTimeout(() => {
              if (container) {
                container.classList.remove('is-animating');
              }
            }, EDGE_PANEL.ANIMATION_DURATION);
          }
        }

        // Set transform or opacity based on animation type
        if (useFadeAnimation) {
          containerRef.current.style.opacity = '1';
          containerRef.current.style.transform = ''; // Remove transform for fade
        } else {
          containerRef.current.style.transform = 'translate(0)';
        }

        // If push mode, adjust body padding
        if (defaultProps.mode === 'push') {
          adjustBodyPadding();
        }
      }

      if (defaultProps.onOpenChange) {
        defaultProps.onOpenChange(true);
      }
    },
    [defaultProps, adjustBodyPadding]
  );

  /**
   * Close the panel
   */
  const closePanel = useCallback(
    (useFadeAnimation = false) => {
      if (containerRef.current) {
        const { position, mode } = defaultProps;

        // Only add animation if not in 'none' mode
        if (mode !== 'none') {
          if (useFadeAnimation) {
            // Add fade out animation class
            containerRef.current.classList.add('is-fade-animating-out');

            // Capture container for setTimeout
            const container = containerRef.current;

            setTimeout(() => {
              if (container) {
                container.classList.remove('is-fade-animating-out');
              }
            }, EDGE_PANEL.ANIMATION_DURATION);
          } else {
            // Add transform animation class
            containerRef.current.classList.add('is-animating-out');

            // Capture container for setTimeout
            const container = containerRef.current;

            setTimeout(() => {
              if (container) {
                container.classList.remove('is-animating-out');
              }
            }, EDGE_PANEL.ANIMATION_DURATION);
          }
        }

        // Set transform or opacity based on animation type
        if (useFadeAnimation) {
          containerRef.current.style.opacity = '0';
          containerRef.current.style.transform = ''; // Remove transform for fade
        } else {
          // Then set transform
          containerRef.current.style.transform = position
            ? EDGE_PANEL.TRANSFORM_VALUES[position]
            : '';
        }

        // Reset body padding if push mode
        if (defaultProps.mode === 'push') {
          resetBodyPadding();
        }

        // Wait for animation to complete before hiding
        const hideDelay = mode === 'none' ? 0 : EDGE_PANEL.ANIMATION_DURATION;

        setTimeout(() => {
          setIsOpen(false);
          document.body.classList.remove('is-edgepanel-open');

          if (defaultProps.onOpenChange) {
            defaultProps.onOpenChange(false);
          }
        }, hideDelay);
      } else {
        setIsOpen(false);
        document.body.classList.remove('is-edgepanel-open');

        if (defaultProps.onOpenChange) {
          defaultProps.onOpenChange(false);
        }
      }
    },
    [defaultProps, resetBodyPadding]
  );

  /**
   * Handle Escape key press
   */
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (defaultProps.closeOnEscape && event.key === 'Escape' && isOpen) {
        closePanel();
      }
    },
    [closePanel, defaultProps.closeOnEscape, isOpen]
  );

  /**
   * Handle backdrop click
   */
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (defaultProps.closeOnBackdropClick && event.target === event.currentTarget) {
        closePanel();
      }
    },
    [closePanel, defaultProps.closeOnBackdropClick]
  );

  /**
   * Set up event listeners for keyboard events
   */
  useEffect(() => {
    if (isOpen && defaultProps.closeOnEscape) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, handleEscapeKey, defaultProps.closeOnEscape]);

  /**
   * Set initial transform values
   */
  useEffect(() => {
    if (containerRef.current) {
      const { position, mode } = defaultProps;

      if (!isOpen && (mode === 'slide' || mode === 'push') && position) {
        containerRef.current.style.transform = EDGE_PANEL.TRANSFORM_VALUES[position];
        // Set initial opacity for fade animations
        if (defaultProps.glass) {
          containerRef.current.style.opacity = '0';
        }
      }
    }
  }, [defaultProps.mode, defaultProps.position, defaultProps.glass, isOpen]);

  /**
   * Sync with prop changes
   */
  useEffect(() => {
    if (defaultProps.isOpen !== undefined && defaultProps.isOpen !== isOpen) {
      if (defaultProps.isOpen) {
        openPanel(!!defaultProps.glass);
      } else {
        closePanel(!!defaultProps.glass);
      }
    }
  }, [defaultProps.isOpen, closePanel, isOpen, openPanel, defaultProps.glass]);

  return {
    isOpen,
    containerRef,
    backdropRef,
    generateEdgePanelClass,
    openPanel,
    closePanel,
    handleBackdropClick,
  };
}
