import { create } from "zustand";
import { ServicesUpdateType } from "../types/services.type";

type DialogMode =
  | {
      mode: "create";
      service?: never;
    }
  | {
      mode: "edit";
      service: ServicesUpdateType;
    };

type DialogState = {
  isOpen: boolean;
  dialog: DialogMode;
  open: (dialog: DialogMode) => void;
  close: () => void;
};
export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  dialog: {
    mode: "create",
  },
  open: (dialog) =>
    set({
      isOpen: true,
      dialog,
    }),
  close: () =>
    set({
      isOpen: false,
    }),
}));
