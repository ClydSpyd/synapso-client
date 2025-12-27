import { API } from "@/api";
import { useState } from "react";
import LinkForm from "./link-form";
import { useQueryClient } from "@tanstack/react-query";
import ModalConfirmState from "@/components/ui/modal-confirm-state";

export default function AddLinkModal({
}: {
  defaultData?: WikiLink;
}) {
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (payload: WikiLink) => {
    if (!payload.title || !payload.url) {
      setSubmitError("Title and URL are required.");
      return;
    }
    const { data, error } = await API.links.add(payload);
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
      {success ? (
        <ModalConfirmState
          itemType="Link"
          setSuccess={setSuccess}
          submitting={false}
        />
      ) : (
        <LinkForm
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
