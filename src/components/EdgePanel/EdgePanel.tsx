import React, { useRef, useEffect } from 'react';
import { EdgePanelProps } from '../../lib/types/components';
import { useEdgePanel } from '../../lib/composables/useEdgePanel';
import { EDGE_PANEL } from '../../lib/constants/components';
import { Icon } from '../Icon/Icon';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

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
 * // With glass effect
 * <EdgePanel
 *   title="Glass Panel"
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   position="end"
 *   glass={true}
 * >
 *   <p>Panel with glass morphism</p>
 * </EdgePanel>
 *
 * // With custom glass configuration
 * <EdgePanel
 *   title="Custom Glass"
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   position="start"
 *   glass={{
 *     mode: 'shader',
 *     shaderVariant: 'liquidGlass',
 *     displacementScale: 70,
 *     blurAmount: 1.8,
 *     saturation: 170,
 *   }}
 * >
 *   <p>Panel with custom glass effect</p>
 * </EdgePanel>
 * ```
 */
export const EdgePanel: React.FC<EdgePanelProps> = ({
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
}) => {
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
  if (!isOpenState && isOpen === false) {
    return null;
  }

  const defaultGlassProps = {
    elasticity: 0,
  };

  const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

  const panelContent = (
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
          <AtomixGlass
            {...glassProps}
            className="c-edge-panel__glass-wrapper"
            style={{
              position: 'fixed',
              width: glassContentRef.current?.offsetWidth,
              height: glassContentRef.current?.offsetHeight,
              top: containerRef.current?.offsetTop,
              left: containerRef.current?.offsetLeft,
              bottom: containerRef.current?.style.bottom,
              right: containerRef.current?.style.right,
            }}
          >
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
};

export type { EdgePanelProps };

EdgePanel.displayName = 'EdgePanel';

export default EdgePanel;
