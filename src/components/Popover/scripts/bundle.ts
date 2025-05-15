import Popover, { initPopovers } from './index';
import { PopoverPosition, PopoverOptions } from './componentInteractions';

// Export for global use
if (typeof window !== 'undefined') {
  (window as any).Atomix = (window as any).Atomix || {};
  (window as any).Atomix.Popover = Popover;
  (window as any).Atomix.initPopovers = initPopovers;
}

export { Popover, initPopovers };
export type { PopoverPosition, PopoverOptions }; 