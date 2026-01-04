"use-client";
import MovieForm from "./movie-form";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ModalConfirmState from "@/components/ui/modal-confirm-state";
import { useModalStore } from "@/stores/modal-store";
import { useToastStore } from "@/stores/toast-store";

export default function AddMovieModal({
  defaultData,
}: {
  defaultData?: { data: OMDBMovie; type: MediaType };
}) {
  const [success, setSuccess] = useState(false);
  const [searchType, setSearchType] = useState<MediaType>(
    defaultData?.type ?? "movie"
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { open } = useModalStore();
  const { show } = useToastStore();

  const handleSubmit = async (imdbId: string, mediaType: MediaType) => {
    const { data, error } = await API.media.add(imdbId, mediaType);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      show({
        variant: "success",
        message: `${searchType} added successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ["wiki-items"] });
      open({
        title: "Atom",
        type: "atom_details",
        payload: { ...data, type: searchType } as WikiItem,
      });
      setSubmitError(null);
      // setSuccess(true);
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
          searchType={searchType}
          setSearchType={setSearchType}
          handleFormSubmission={handleSubmit}
          submitError={submitError}
        />
      )}
    </>
  );
}
