"use-client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import MovieForm from "./movie-form";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ModalConfirmState from "@/components/ui/modal-confirm-state";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";

export default function AddMovieModal({
  children,
}: {
  children: React.ReactNode;
  defaultData?: HabitPayload;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (imdbId: string, mediaType: MediaType) => {
    const { data, error } = await API.media.add(imdbId, mediaType);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      queryClient.invalidateQueries({ queryKey: ["wiki-items"] });
      setSubmitError(null);
      setSuccess(true);
    }
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
            setSuccess(false);
          }, 500);
        }}
      >
        <ModalContentWrapper title="Add movie/series" close={close}>
          <>
            {success ? (
              <ModalConfirmState
                itemType="Movie/Series"
                setSuccess={setSuccess}
                submitting={false}
              />
            ) : (
              <MovieForm
                handleFormSubmission={handleSubmit}
                submitError={submitError}
              />
            )}
          </>
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
