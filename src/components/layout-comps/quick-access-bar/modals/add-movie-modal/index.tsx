"use-client";
import MovieForm from "./movie-form";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ModalConfirmState from "@/components/ui/modal-confirm-state";

export default function AddMovieModal({
  defaultData,
}: {
  defaultData?: { data: OMDBMovie; type: MediaType };
}) {
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
      {success ? (
        <ModalConfirmState
          itemType="Movie/Series"
          setSuccess={setSuccess}
          submitting={false}
        />
      ) : (
        <MovieForm
          defaultData={defaultData?.data ?? undefined}
          type={defaultData?.type ?? undefined}
          handleFormSubmission={handleSubmit}
          submitError={submitError}
        />
      )}
    </>
  );
}
