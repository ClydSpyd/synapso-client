import {
  Button,
  Textarea,
  TextInput,
  Accordion,
} from "@mantine/core";
import { useEffect, useState } from "react";

const initialInputVals: WikiLink = {
  id: "",
  title: "",
  url: "",
  description: "",
  tags: [],
  type: "link",
};

export default function LinkForm({
  handleSubmit,
  setSubmitError,
}: {
  handleSubmit: (payload: WikiLink) => void;
  setSubmitError: (error: string | null) => void;
}) {
  const [inputVals, setInputVals] = useState<WikiLink>(initialInputVals);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof WikiLink
  ) => {
    setInputVals((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    setSubmitError(null);
  }, [inputVals, setSubmitError]);

  return (
    <div className="grow w-full h-full flex flex-col gap-2">
      <TextInput
        data-autofocus
        classNames={{
          input: "focus:!border-[var(--accent-three)]",
        }}
        className="col-span-2"
        placeholder="Enter title"
        value={inputVals.title}
        name="title"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(e, "title")
        }
      />
      <TextInput
        data-autofocus
        classNames={{
          input: "focus:!border-[var(--accent-three)]",
        }}
        className="col-span-2"
        placeholder="Enter URL"
        value={inputVals.url}
        name="url"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInput(e, "url")
        }
      />
      <Accordion>
        <Accordion.Item className="!border-none" key={"HELLO"} value={"HELLO"}>
          <Accordion.Control>Additional data</Accordion.Control>
          <Accordion.Panel>
            <Textarea
              classNames={{
                input: "focus:!border-[var(--accent-three)] !h-[100px]",
              }}
              placeholder="Description"
              value={inputVals.description}
              name="description"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setInputVals((prev) => ({
                  ...prev,
                  description: e.target.value,
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
