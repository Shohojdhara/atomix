/**
 * Pattern System Exports
 *
 * Slot and render prop patterns for advanced component customization
 */

export {
  renderSlot,
  isSlot,
  mergeSlots,
  createSlotComponent,
  useSlot,
  createSlotProps,
} from './slots';

export type {
  SlotProps,
  ButtonRootSlotProps,
  ButtonIconSlotProps,
  ButtonLabelSlotProps,
  ButtonSpinnerSlotProps,
  CardRootSlotProps,
  CardHeaderSlotProps,
  CardBodySlotProps,
  CardFooterSlotProps,
  ModalRootSlotProps,
  ModalBackdropSlotProps,
  ModalDialogSlotProps,
  ModalContentSlotProps,
  InputRootSlotProps,
  InputElementSlotProps,
  DropdownRootSlotProps,
  DropdownToggleSlotProps,
  DropdownMenuSlotProps,
} from './slots';
