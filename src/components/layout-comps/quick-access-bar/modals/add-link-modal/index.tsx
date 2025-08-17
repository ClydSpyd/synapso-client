import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { API } from "@/api";
import { useEffect, useState } from "react";
import LinkForm from "./link-form";
import { useQueryClient } from "@tanstack/react-query";
import ModalConfirmState from "@/components/ui/modal-confirm-state";

export default function AddLinkModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if(!opened) setInputVals(initialInputVals);
  // }, [opened]);

  const handleSubmit = async (payload: WikiLink) => {
    if (!payload.title || !payload.url) {
      setSubmitError("Title and URL are required.");
      return;
    }
    const { data, error } = await API.wiki.links.add(payload);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      setSubmitError(null);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['wiki-items'] });
      // close();
    }
  };

  useEffect(() => {
    if (!opened) {
      setSuccess(false);
      setSubmitError(null);
    }
  }, [opened]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setSubmitError(null);
          }, 500);
        }}
        title="Add Quote"
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
            itemType="Link"
            setSuccess={setSuccess}
            submitting={false}
          />
        ) : (
          <LinkForm
            handleSubmit={handleSubmit}
            setSubmitError={setSubmitError}
            opened={opened}
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
