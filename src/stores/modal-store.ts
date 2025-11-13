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

type OpenProps<T extends ModalType> = {
  type: T;
  payload?: ModalPayloadMap[T];
  handlers?: Handlers<T>;
  modalStyles?: Record<string, Record<string, string | number>>;
};

type ModalState = {
  isOpen: boolean;
  type?: ModalType;
  // Payload is keyed to the modal type
  payload?: ModalPayloadMap[ModalType];
  handlers?: Handlers<ModalType>;
  modalStyles?: Record<string, Record<string, string | number>>;
  open: <T extends ModalType>({}: OpenProps<T>) => void;
  close: () => void;
};

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  type: undefined,
  payload: undefined,
  handlers: undefined,
  modalStyles: undefined,
  open: ({ type, payload, handlers, modalStyles }: OpenProps<ModalType>) =>
    set({ isOpen: true, type, payload, handlers, modalStyles }),
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
