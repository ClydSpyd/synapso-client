import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import HabitForm from "./habit-form";
import { API } from "@/api";
import { useEffect, useState } from "react";
import ModalConfirmState from "@/components/ui/modal-confirm-state";
import { useQueryClient } from "@tanstack/react-query";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import { useParams } from "next/navigation";

export default function AddHabitModal({
  children,
  defaultData,
  onClose
}: {
  children: React.ReactNode;
  defaultData?: HabitPayload;
  onClose?: () => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient()
  const params = useParams();

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
      const ideaIDParam = params["ideaId"];
      if (ideaIDParam) {
        API.ideas.delete(String(ideaIDParam));
      }

    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (!opened) {
      onClose?.();
    }
  }, [opened])

  return (
    <>
      <Modal
        {...modalConfig}
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setSubmitError(null);
            setSubmitting(false);
            setSuccess(false);
          }, 500);
        }}
      >
        <ModalContentWrapper
          title={defaultData ? "Edit habit" : "Add new habit"}
          close={close}
        >
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
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
