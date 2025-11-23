import HabitForm from "./habit-form";
import { API } from "@/api";
import { useState } from "react";
import ModalConfirmState from "@/components/ui/modal-confirm-state";
import { useQueryClient } from "@tanstack/react-query";

export default function AddHabitModal({
  defaultData,
}: {
  defaultData?: HabitPayload;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (payload: HabitPayload) => {
    setSubmitting(true);
    let data, error;
    console.log({ defaultData });
    if (defaultData?.id) {
      ({ data, error } = await API.habits.update(payload));
    } else {
      ({ data, error } = await API.habits.create(payload));
    }
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      setSubmitError(null);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["user-habits"] });

      // if created from idea, delete idea
      const search =
        typeof window !== "undefined" ? window.location.search : "";
      const params = new URLSearchParams(search);
      const ideaId = params.get("ideaId");
      if (ideaId) {
        API.ideas.delete(String(ideaId));
        queryClient.invalidateQueries({ queryKey: ["ideas"] });
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      {success && !defaultData ? (
        <ModalConfirmState
          itemType="Habit"
          setSuccess={setSuccess}
          submitting={submitting}
        />
      ) : (
        <HabitForm
          handleFormSubmission={handleSubmit}
          defaultData={defaultData}
          submitting={submitting}
          confirm={success}
          resetSuccess={() => setSuccess(false)}
        />
      )}
      {submitError && (
        <p className="text-xs mx-auto text-center mt-2 text-red-500">
          {submitError}
        </p>
      )}
    </>
  );
}
