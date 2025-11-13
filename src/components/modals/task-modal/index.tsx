import { useEffect, useState } from "react";
import { API } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/stores/modal-store";
import TaskForm from "./task-form";

export default function TaskFormModal({
  defaultData,
}: {
  defaultData?: Task;
}) {
  const { close } = useModalStore();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (payload: TaskPayload) => {
    console.log({ payload });
    setSubmitting(true);
    let error;

    if (defaultData) {
      ({ error } = await API.tasks.update(defaultData.id, payload));
    } else {
      ({ error } = await API.tasks.create(payload));
    }

    if (error) {
      setSubmitError(error);
    } else {
      setSubmitError(null);
      await queryClient.refetchQueries({ queryKey: ["tasks"] });
      close();
    }

    setSubmitting(false);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      setSubmitError(null);
      setSubmitting(false);
    };
  }, []);

  return (
    <>
      <TaskForm
        defaultData={defaultData as TaskPayload}
        submitting={submitting}
        handleFormSubmission={handleSubmit}
      />
      {submitError && (
        <p className="text-xs mx-auto text-center mt-2 text-red-500">
          {submitError}
        </p>
      )}
    </>
  );
}
