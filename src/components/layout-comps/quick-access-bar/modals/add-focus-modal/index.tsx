import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { API } from "@/api";
import { useState } from "react";
import FocusItemForm from "./focus-item-form";
import { useQueryClient } from "@tanstack/react-query";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";

export default function AddFocusModal({
  children,
  defaultData,
}: {
  children: React.ReactNode;
  defaultData?: FocusItem;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const handleSubmit = async (payload: FocusPayload) => {
    setSubmitting(true);
    let data, error;
    if(defaultData) {
      const { data: updatedData, error: updateError } = await API.focus.update(
        defaultData.id,
        payload
      );
      data = updatedData;
      error = updateError;
    } else {
      const { data: createdData, error: createError } = await API.focus.create(
        payload
      );
      data = createdData;
      error = createError;
    }
    if (error) {
      setSubmitError(error);
    } else if (data) {
      queryClient.invalidateQueries({ queryKey: ["focus-items"] });
      setSubmitError(null);
      close();
    }
    setSubmitting(false);
  };

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
          }, 500);
        }}
      >
        <ModalContentWrapper
          title={defaultData ? "Edit Focus Item" : "Add Focus Item"}
          close={close}
        >
          <FocusItemForm
            handleFormSubmission={handleSubmit}
            defaultData={defaultData}
            submitting={submitting}
          />
          {submitError && (
            <p className="text-xs mx-auto text-center mt-2 text-red-500">
              {submitError}
            </p>
          )}
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
