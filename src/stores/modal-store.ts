/* eslint-disable @typescript-eslint/no-unused-vars */
// stores/modal-store.ts
import { create } from "zustand";

export type ModalType = "task" | "habit";

type ModalPayloadMap = {
  task: Task | undefined;    
  habit: HabitPayload | undefined;
};

type Handlers<T extends ModalType> = {
  onClose?: () => void;
};

type ModalState = {
  isOpen: boolean;
  type?: ModalType;
  // Payload is keyed to the modal type
  payload?: ModalPayloadMap[ModalType];
  handlers?: Handlers<ModalType>;
  open: <T extends ModalType>(
    type: T,
    payload?: ModalPayloadMap[T],
    handlers?: Handlers<T>
  ) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  type: undefined,
  payload: undefined,
  handlers: undefined,
  open: (type, payload, handlers) =>
    set({ isOpen: true, type, payload, handlers }),
  close: () => {
    get().handlers?.onClose?.();
    set({
      isOpen: false,
      type: undefined,
      payload: undefined,
      handlers: undefined,
    });
  },
}));
