"use-client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import MovieForm from "./movie-form";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ModalConfirmState from "@/components/ui/modal-confirm-state";

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
    const { data, error } = await API.wiki.media.add(imdbId, mediaType);
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
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setSubmitError(null);
          }, 500);
        }}
        title="Add Movies/Series"
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
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
