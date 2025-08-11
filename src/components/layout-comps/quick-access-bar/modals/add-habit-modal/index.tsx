import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import HabitForm from "./habit-form";
import { API } from "@/api";
import { useState } from "react";
import ConfirmState from "./confirm-state";

export default function AddHabbbitModal({
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

  const handleSubmit = async (payload: HabitPayload) => {
    setSubmitting(true);
    const { data, error } = await API.habbits.create(payload);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      setSubmitError(null);
      setSuccess(true);
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
          <ConfirmState setSuccess={setSuccess} submitting={submitting} />
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
