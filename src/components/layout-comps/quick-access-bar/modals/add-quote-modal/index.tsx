import { API } from "@/api";
import { useState } from "react";
import QuoteForm from "./quote-form";
import { useQueryClient } from "@tanstack/react-query";
import ModalConfirmState from "@/components/ui/modal-confirm-state";

export default function AddQuoteModal({}: { defaultData: WikiQuote }) {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (payload: WikiQuote) => {
    if (!payload.content || !payload.author) {
      setSubmitError("Quote and author are required.");
      return;
    }
    const { data, error } = await API.quotes.add(payload);
    console.log({ data, error });
    if (error) {
      setSubmitError(error);
    } else if (data) {
      setSubmitError(null);
      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["wiki-items"] });
      // close();
    }
  };

  return (
    <>
      {success ? (
        <ModalConfirmState
          itemType="Quote"
          setSuccess={setSuccess}
          submitting={false}
        />
      ) : (
        <QuoteForm
          handleSubmit={handleSubmit}
          setSubmitError={setSubmitError}
        />
      )}
      {submitError && (
        <p className="text-xs mx-auto text-center mt-2 text-red-500">
          {submitError}
        </p>
      )}
    </>
  );
}
