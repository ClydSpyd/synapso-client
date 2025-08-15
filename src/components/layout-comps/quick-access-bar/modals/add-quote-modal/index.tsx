import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { API } from "@/api";
import { useState } from "react";
import QuoteForm from "./quote-form";
import ConfirmState from "./confirm-state";
import { useQueryClient } from "@tanstack/react-query";

export default function AddQuoteModal({
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

  const handleSubmit = async (payload: WikiQuote) => {
    if (!payload.content || !payload.author) {
      setSubmitError("Quote and author are required.");
      return;
    }
    const { data, error } = await API.wiki.quotes.add(payload);
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
          <ConfirmState setSuccess={setSuccess} submitting={false} />
        ) : (
          <QuoteForm
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
