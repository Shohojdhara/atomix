/**
 * EdgePanel Component Bundle
 * This file bundles all EdgePanel exports for use in a global namespace
 */
import EdgePanel, { 
  initializeEdgePanels, 
  openEdgePanel,
  closeEdgePanel,
  closeAllEdgePanels,
  toggleEdgePanel,
  POSITIONS,
  MODES,
  SELECTORS,
  CLASSES 
} from './index';

// Export for bundling into global namespace
// The global namespace is defined in the webpack config
export {
  EdgePanel,
  initializeEdgePanels,
  openEdgePanel,
  closeEdgePanel,
  closeAllEdgePanels,
  toggleEdgePanel,
  POSITIONS,
  MODES,
  SELECTORS,
  CLASSES
}; 