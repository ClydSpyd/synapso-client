import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import MovieForm from "./movie-form";
import { API } from "@/api";
import { useState } from "react";
import ConfirmState from "./confirm-state";

export default function AddMovieModal({
  children,
}: {
  children: React.ReactNode;
  defaultData?: HabitPayload;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (movie: OMDBMovie) => {
    const { data, error } = await API.movies.add(movie);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      setSubmitError(null);
      close();
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
        <MovieForm handleFormSubmission={handleSubmit} />
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
