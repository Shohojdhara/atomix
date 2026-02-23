import React, { useRef, useEffect, memo, forwardRef } from 'react';
import { EdgePanelProps } from '../../lib/types/components';
import { useEdgePanel } from '../../lib/composables/useEdgePanel';
import { EDGE_PANEL } from '../../lib/constants/components';
import { Icon } from '../Icon/Icon';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

// Subcomponents
export const EdgePanelHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-edge-panel__header ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
EdgePanelHeader.displayName = 'EdgePanelHeader';

export const EdgePanelBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-edge-panel__body ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
EdgePanelBody.displayName = 'EdgePanelBody';

export const EdgePanelFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...props }, ref) => (
    <div ref={ref} className={`c-edge-panel__footer ${className}`.trim()} {...props}>
      {children}
    </div>
  )
);
EdgePanelFooter.displayName = 'EdgePanelFooter';

export const EdgePanelCloseButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className = '', onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={`c-edge-panel__close c-btn c-btn--icon ${className}`.trim()}
      onClick={onClick}
      aria-label="Close panel"
      {...props}
    >
      <Icon name="X" />
    </button>
  )
);
EdgePanelCloseButton.displayName = 'EdgePanelCloseButton';

/**
 * EdgePanel - A sliding panel component that appears from any screen edge
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <EdgePanel
 *   title="My Panel"
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   position="start"
 * >
 *   <p>Panel content</p>
 * </EdgePanel>
 *
 * // Compound Usage
 * <EdgePanel isOpen={isOpen} onOpenChange={setIsOpen}>
 *    <EdgePanel.Header>
 *       <h4>Title</h4>
 *       <EdgePanel.CloseButton onClick={() => setIsOpen(false)} />
 *    </EdgePanel.Header>
 *    <EdgePanel.Body>Content</EdgePanel.Body>
 *    <EdgePanel.Footer>Footer</EdgePanel.Footer>
 * </EdgePanel>
 * ```
 */
type EdgePanelComponent = React.FC<EdgePanelProps> & {
  Header: typeof EdgePanelHeader;
  Body: typeof EdgePanelBody;
  Footer: typeof EdgePanelFooter;
  CloseButton: typeof EdgePanelCloseButton;
};

export const EdgePanel: EdgePanelComponent = memo(
  ({
    title,
    children,
    position = 'start',
    mode = 'slide',
    isOpen = false,
    onOpenChange,
    backdrop = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    className = '',
    style,
    glass,
  }: EdgePanelProps) => {
    const {
      isOpen: isOpenState,
      containerRef,
      backdropRef,
      generateEdgePanelClass,
      closePanel,
      handleBackdropClick,
    } = useEdgePanel({
      position,
      mode,
      isOpen,
      onOpenChange,
      backdrop,
      closeOnBackdropClick,
      closeOnEscape,
      glass,
    });

    // Moved useRef outside of conditional rendering to fix hook order issue
    const glassContentRef = useRef<HTMLDivElement>(null);

    const panelClass = generateEdgePanelClass({
      position,
      isOpen,
      className: glass ? `${className} c-edge-panel--glass` : className,
    });

    // If not open and not controlled by parent, don't render
    // Note: useEdgePanel manages internal state if onOpenChange is not provided?
    // Looking at useEdgePanel (implied): it seems to return isOpenState.
    // If we return null here, animations might be cut off.
    // Usually EdgePanel/Drawer should stay mounted but hidden or conditionally mounted.
    // The original code returned null if !isOpenState && isOpen === false.
    // Let's keep that logic.
    if (!isOpenState && isOpen === false) {
      return null;
    }

    const defaultGlassProps = {
      elasticity: 0,
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    // Check for compound components
    const hasCompoundComponents = React.Children.toArray(children).some((child) =>
      React.isValidElement(child) &&
      ['EdgePanelHeader', 'EdgePanelBody', 'EdgePanelFooter'].includes((child.type as any).displayName)
    );

    const panelContent = hasCompoundComponents ? (
      children
    ) : (
      <>
        <div className="c-edge-panel__header">
          <h4>{title}</h4>
          <button
            className="c-edge-panel__close c-btn c-btn--icon"
            onClick={() => closePanel()}
            aria-label="Close panel"
          >
            <Icon name="X" />
          </button>
        </div>
        <div className="c-edge-panel__body">{children}</div>
      </>
    );

    return (
      <div className={panelClass} data-position={position} data-mode={mode} style={style}>
        {backdrop && (
          <div ref={backdropRef} className="c-edge-panel__backdrop" onClick={handleBackdropClick} />
        )}
        <div ref={containerRef} className="c-edge-panel__container">
          {glass ? (
            <AtomixGlass {...glassProps}>
              <div
                ref={glassContentRef}
                className="c-edge-panel__glass-content"
                style={{ borderRadius: containerRef.current?.style.borderRadius }}
              >
                {panelContent}
              </div>
            </AtomixGlass>
          ) : (
            panelContent
          )}
        </div>
      </div>
    );
  }
) as unknown as EdgePanelComponent;

EdgePanel.displayName = 'EdgePanel';
EdgePanel.Header = EdgePanelHeader;
EdgePanel.Body = EdgePanelBody;
EdgePanel.Footer = EdgePanelFooter;
EdgePanel.CloseButton = EdgePanelCloseButton;

export type { EdgePanelProps };

export default EdgePanel;
