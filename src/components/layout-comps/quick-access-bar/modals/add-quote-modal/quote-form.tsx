import {
  Button,
  Textarea,
  TextInput,
  Accordion,
  NumberInput,
} from "@mantine/core";
import { useEffect, useState } from "react";

const initialInputVals: WikiQuote = {
  id: "",
  author: "",
  content: "",
  additionalData: "",
  year: "",
};

export default function QuoteForm({
  handleSubmit,
  setSubmitError,
  opened,
}: {
  handleSubmit: (payload: WikiQuote) => void;
  setSubmitError: (error: string | null) => void;
  opened: boolean;
}) {
  const [inputVals, setInputVals] = useState<WikiQuote>(initialInputVals);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof WikiQuote
  ) => {
    setInputVals((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    setSubmitError(null);
  }, [inputVals, setSubmitError]);

  useEffect(() => {
    if (!opened) {
      setSubmitError(null);
      setInputVals(initialInputVals);
    }
  }, [opened, setSubmitError]);

  return (
    <div className="grow w-full h-full flex flex-col gap-2">
      <Textarea
        data-autofocus
        classNames={{
          input: "focus:!border-[var(--accent-three)] !h-[150px]",
        }}
        placeholder="Enter quote text"
        value={inputVals.content}
        name="quote"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handleInput(e, "content")
        }
      />
      <TextInput
        classNames={{
          input: "focus:!border-[var(--accent-three)]",
        }}
        className="col-span-2"
        placeholder="Enter author"
        value={inputVals.author}
        name="author"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(e, "author")
        }
      />
      <Accordion>
        <Accordion.Item className="!border-none" key={"HELLO"} value={"HELLO"}>
          <Accordion.Control>Additional data</Accordion.Control>
          <Accordion.Panel>
            <NumberInput
              classNames={{
                input: "focus:!border-[var(--accent-three)] mb-2",
              }}
              placeholder="Year"
              value={inputVals.year}
              name="year"
              clampBehavior="strict"
              min={0}
              max={9999}
              onChange={(value) =>
                setInputVals((prev) => ({
                  ...prev,
                  year: value?.toString() ?? "",
                }))
              }
            />
            <Textarea
              classNames={{
                input: "focus:!border-[var(--accent-three)] !h-[100px]",
              }}
              placeholder="Additional data"
              value={inputVals.additionalData}
              name="additionalData"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputVals((prev) => ({
                  ...prev,
                  additionalData: e.target.value,
                }))
              }
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Button
        onClick={() => handleSubmit(inputVals)}
        // loading={submittingSearch}
        className="button-zen h-[50px]"
        fullWidth
        variant="gradient"
        gradient={{ from: "indigo", to: "grape", deg: 147 }}
      >
        SUBMIT
      </Button>
    </div>
  );
}
