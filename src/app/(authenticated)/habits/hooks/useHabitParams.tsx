import { useModalStore } from "@/stores/modal-store";
import { useEffect } from "react";

export default function useHabitParams() {
  const { open } = useModalStore();

  useEffect(() => {
    // check for new task params
    const searchParams = new URLSearchParams(window.location.search);
    const newTitle = searchParams.get("newTitle");
    if (newTitle) {
      open({
        title: "Add Habit",
        type: "habit",
        payload: { title: newTitle } as Habit,
      });
    }
  }, []);
}
