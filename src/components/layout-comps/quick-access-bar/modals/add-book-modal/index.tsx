"use-client";
import BookForm from "./book-form";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/stores/modal-store";

export default function AddBookModal({}: { defaultData?: OpenLibBook }) {
  const { close } = useModalStore();
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
      <BookForm handleFormSubmission={handleSubmit} />
      {submitError && (
        <p className="text-xs mx-auto text-center mt-2 text-red-500">
          {submitError}
        </p>
      )}
    </>
  );
}
