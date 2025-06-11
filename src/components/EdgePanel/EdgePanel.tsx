import React from 'react';
import { EdgePanelProps } from '../../lib/types/components';
import { useEdgePanel } from '../../lib/composables/useEdgePanel';
import { EDGE_PANEL } from '../../lib/constants/components';
import { Icon } from '../Icon/Icon';
const EdgePanel: React.FC<EdgePanelProps> = ({
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
}) => {
  const {
    isOpen: isOpenState,
    containerRef,
    backdropRef,
    generateEdgePanelClass,
    closePanel,
    handleBackdropClick
  } = useEdgePanel({
    position,
    mode,
    isOpen,
    onOpenChange,
    backdrop,
    closeOnBackdropClick,
    closeOnEscape,
  });

  const panelClass = generateEdgePanelClass({
    position,
    isOpen,
    className,
  });

  // If not open and not controlled by parent, don't render
  if (!isOpenState && isOpen === false) {
    return null;
  }

  return (
    <div className={panelClass} data-position={position} data-mode={mode}>
      {backdrop && (
        <div 
          ref={backdropRef}
          className="c-edge-panel__backdrop"
          onClick={handleBackdropClick}
        />
      )}
      <div ref={containerRef} className="c-edge-panel__container">
        <div className="c-edge-panel__header">
          <h4>{title}</h4>
          <button 
            className="c-edge-panel__close c-btn c-btn--icon" 
            onClick={closePanel}
            aria-label="Close panel"
          >
            <Icon name="X" />
          </button>
        </div>
        <div className="c-edge-panel__body">
          {children}
        </div>
      </div>
    </div>
  );
}; 



export type { EdgePanelProps } from '../../lib/types/components';

// Set display name for debugging
EdgePanel.displayName = 'EdgePanel';

// Default export (primary)
export default EdgePanel;

// Named export for compatibility
export { EdgePanel };