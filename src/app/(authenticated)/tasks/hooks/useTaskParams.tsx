import { useTasks } from "@/queries/useTasks";
import { useModalStore } from "@/stores/modal-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function useTaskParams() {
  const params = useParams();
  const id = Array.isArray(params.id) ? +params.id[0] : params.id; // undefined if not present
  const { data: tasks } = useTasks();
  const { open } = useModalStore();

  useEffect(() => {
    // check for task ID param
    if (id && tasks) {
      const paramTask = tasks.find((t) => +t.id === id);
      if (paramTask) {
        open({
          title: "Edit Action",
          type: "task",
          payload: paramTask,
          modalStyles: {
            content: {
              maxWidth: "80vw",
              width: "700px",
              minWidth: "60vw",
            },
          },
          handlers: {
            onClose: () => {
              window.history.replaceState({}, document.title, "/tasks");
            },
          },
        });
      } else {
        window.history.replaceState({}, document.title, "/tasks");
      }
    }
  }, [id, tasks, open]);

useEffect(() => {
    // check for new task params
    const searchParams = new URLSearchParams(window.location.search);
    const newTitle = searchParams.get("newTitle");
    if (newTitle) {
        open({
          title: "Add Task",
          type: "task",
          payload: { title: newTitle } as Task,
          modalStyles: {
            content: {
              maxWidth: "80vw",
              width: "700px",
              minWidth: "60vw",
            },
          },
          handlers: {
            onClose: () => {
              window.history.replaceState({}, document.title, "/tasks");
            },
          },
        });
    }
}, []);
}
