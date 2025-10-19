"use-client";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import BookForm from "./book-form";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";

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
    const { data, error } = await API.books.add(bookData);
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
        {...modalConfig}
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setSubmitError(null);
          }, 500);
        }}
      >
        <ModalContentWrapper title="Add book" close={close}>
          <BookForm handleFormSubmission={handleSubmit} />
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
