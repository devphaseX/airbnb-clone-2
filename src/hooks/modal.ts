import { create } from 'zustand';

interface Modal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const createModalHook = () =>
  create<Modal>((set) => {
    return {
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    };
  });

export { createModalHook };
