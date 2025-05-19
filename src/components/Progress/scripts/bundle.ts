import { Progress } from './index';
import { setProgressValue, setProgressVariant, setProgressSize, createProgressElement } from './componentInteractions';

// Export for global use
export default {
  Progress,
  setProgressValue,
  setProgressVariant,
  setProgressSize,
  createProgressElement,
  initializeAll: Progress.initializeAll
};
