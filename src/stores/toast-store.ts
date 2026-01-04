import { create } from "zustand";

export type NotificationVariant = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  variant: NotificationVariant;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (toast) => {
    const id = crypto.randomUUID();
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    // Automatically dismiss the toast after its duration
    setTimeout(() => {
      set((s) => ({
        toasts: s.toasts.filter((t) => t.id !== id),
      }));
    }, 5000);
  },
  dismiss: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
