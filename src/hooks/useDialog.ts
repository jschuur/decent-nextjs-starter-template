import { createStore, useStore } from 'zustand';

type DialogStore<T> = {
  isOpen: boolean;
  data: T | null;
  setIsOpen: (isOpen: boolean) => void;
  open: (data?: T) => void;
  close: () => void;
};

const createDialogStore = <T>() =>
  createStore<DialogStore<T>>((set) => ({
    isOpen: false,
    data: null,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    open: (data?: T) => set({ isOpen: true, data }),
    close: () => set({ isOpen: false }),
  }));

type DialogStores<T> = ReturnType<typeof createDialogStore<T>>;

const dialogStores: Record<string, DialogStores<any>> = {};

const useDialog = <T>(dialogId: string) => {
  if (!dialogStores[dialogId]) {
    dialogStores[dialogId] = createDialogStore<T>();
  }
  return useStore(dialogStores[dialogId] as DialogStores<T>);
};

export default useDialog;
