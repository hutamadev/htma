import { StateCreator } from 'zustand';

export interface IModalSlice {
  isModalShow: boolean;
  isModalExpanded: boolean;
  showModalHandler: () => void;
  toggleModalExpandedHandler: () => void;
}

export const modalSlice: StateCreator<IModalSlice, [], [], IModalSlice> = (
  set
) => ({
  isModalShow: false,
  isModalExpanded: false,
  showModalHandler: () =>
    set((state) => ({
      isModalShow: !state.isModalShow,
      // Reset on open, not on close: M3 sheets always reopen at the peek height,
      // but collapsing while closing would shrink the sheet mid-exit instead of
      // letting it slide down at a constant size.
      isModalExpanded: state.isModalShow ? state.isModalExpanded : false,
    })),
  toggleModalExpandedHandler: () =>
    set((state) => ({ isModalExpanded: !state.isModalExpanded })),
});
