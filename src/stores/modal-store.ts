/* eslint-disable @typescript-eslint/no-unused-vars */
// stores/modal-store.ts
import { create } from "zustand";

export type ModalType =
  | "task"
  | "habit"
  | "atom"
  | "atom_book"
  | "atom_quote"
  | "atom_movie_series"
  | "atom_link";

type ModalPayloadMap = {
  task: Task | undefined;
  habit: HabitPayload | undefined;
  atom: Record<string, unknown>;
  atom_book: OpenLibBook | undefined;
  atom_quote: WikiQuote | undefined;
  atom_movie_series: { data: OMDBMovie; type: MediaType } | undefined;
  atom_link: WikiLink | undefined;
};

type Handlers<T extends ModalType> = {
  onClose?: () => void;
};

type OpenProps<T extends ModalType> = {
  title: string;
  type: T;
  payload?: ModalPayloadMap[T];
  handlers?: Handlers<T>;
  modalStyles?: Record<string, Record<string, string | number>>;
};

type ModalState = {
  title: string;
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
  title: "",
  isOpen: false,
  type: undefined,
  payload: undefined,
  handlers: undefined,
  modalStyles: undefined,
  open: ({
    type,
    payload,
    handlers,
    modalStyles,
    title,
  }: OpenProps<ModalType>) =>
    set({ isOpen: true, type, payload, handlers, modalStyles, title }),
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
