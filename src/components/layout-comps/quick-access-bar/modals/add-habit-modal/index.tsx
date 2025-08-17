import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import HabitForm from "./habit-form";
import { API } from "@/api";
import { useState } from "react";
import ModalConfirmState from "@/components/ui/modal-confirm-state";
import { useQueryClient } from "@tanstack/react-query";

export default function AddHabitModal({
  children,
  defaultData,
}: {
  children: React.ReactNode;
  defaultData?: HabitPayload;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient()

  const handleSubmit = async (payload: HabitPayload) => {
    setSubmitting(true);
    const { data, error } = await API.habits.create(payload);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      setSubmitError(null);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["user-habits"] });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setSubmitError(null);
            setSubmitting(false);
            setSuccess(false);
          }, 500);
        }}
        title="New Habit"
        centered
        transitionProps={{
          transition: "scale-y",
          duration: 200,
          timingFunction: "ease",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {success ? (
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
          />
        )}
        {submitError && (
          <p className="text-xs mx-auto text-center mt-2 text-red-500">
            {submitError}
          </p>
        )}
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
