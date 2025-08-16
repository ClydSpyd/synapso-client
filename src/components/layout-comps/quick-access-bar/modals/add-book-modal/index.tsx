"use-client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import BookForm from "./book-form";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function AddBookModal({
  children,
}: {
  children: React.ReactNode;
  defaultData?: HabitPayload;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (bookData: OpenLibBook) => {
    console.log("Adding book with OLID:", bookData.olid);
    const { data, error } = await API.wiki.books.add(bookData);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      queryClient.invalidateQueries({ queryKey: ["wiki-items"] });
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
        title="Add Book"
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
        <BookForm handleFormSubmission={handleSubmit} />
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
