import { Textarea, TextInput } from "@mantine/core";
import { FaRegCalendar, FaUser } from "react-icons/fa";
import { wikiItemsConfig } from "@/app/(authenticated)/atoms/config";
import { useState } from "react";
import BottomBar from "../components/bottom-bar";
import { useModalStore } from "@/stores/modal-store";
import { useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { useToastStore } from "@/stores/toast-store";

export default function QuoteModal({ item }: { item: WikiQuote }) {
  const [localData, setLocalData] = useState<WikiQuote>(item);
  const queryClient = useQueryClient();
  const { close } = useModalStore();
  const { show } = useToastStore();
  const handleInput = (field: keyof WikiQuote, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = async () => {
    const { error } = await API.quotes.delete(item.id);
    if (error) {
      return { error };
    }
    queryClient.invalidateQueries({ queryKey: ["wiki-items"] });
    queryClient.invalidateQueries({ queryKey: ["pinned-items"] });
    show({
      variant: "success",
      message: `Quote deleted successfully!`,
    });
    close();
    return {
      error: undefined,
    };
  };

  const config = wikiItemsConfig.quote;
  const quoteLength = localData.content.length;
  const fontSize =
    quoteLength < 50
      ? "32px"
      : quoteLength < 100
      ? "26px"
      : quoteLength < 200
      ? "20px"
      : "16px";

  return (
    <div className="flex relative max-w-[800px] w-[75vw]">
      <div
        className="min-w-[280px] max-w-[280px] flex flex-col justify-between gap-2 p-6 relative"
        style={{
          backgroundColor: config?.accentColor ?? "transparent",
        }}
      >
        <config.icon
          className="text-3xl mb-2"
          style={{ color: config?.mainColor ?? "inherit" }}
        />
        <h1
          className="grow italic flex items-center pb-2 leading-snug font-semibold"
          style={{
            fontSize,
          }}
        >
          {localData.content}
        </h1>
        <div className="">
          <p className="text-sm">{localData.author}</p>
          {localData.year && <p className="text-xs">{localData.year}</p>}
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 grow h-full text-sm p-6 px-8">
        {/* <h1 className="text-xl font-bold">Quote details</h1> */}
        <div>
          <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
            Quote:
          </p>
          <Textarea
            value={localData.content}
            onChange={(e) => handleInput("content", e.target.value)}
            placeholder={`Enter the quote`}
            size="sm"
            autosize
            minRows={4}
            maxRows={6}
            classNames={{
              input: "!border-gray-200 !rounded-lg",
            }}
          />
        </div>

        <div className="flex w-full gap-4">
          <div className="w-1/2">
            <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
              Author:
            </p>
            <TextInput
              styles={{
                wrapper: {
                  height: "40px",
                },
                input: {
                  height: "40px",
                },
              }}
              leftSection={<FaUser className="mr-2 text-base" />}
              className="w-full h-[40px] border-none bg-transparent"
              placeholder="Enter author"
              value={localData.author}
              name="author"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInput("author", e.target.value)
              }
            />
          </div>
          <div className="w-1/2">
            <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
              Year:
            </p>
            <TextInput
              styles={{
                wrapper: {
                  height: "40px",
                },
                input: {
                  height: "40px",
                },
              }}
              leftSection={<FaRegCalendar className="mr-2 text-base" />}
              className="w-full h-[40px] border-none bg-transparent"
              placeholder="Enter year"
              value={localData.year ?? "N/A"}
              name="year"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInput("year", e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
            Additional Data:
          </p>
          <Textarea
            value={localData.additionalData}
            onChange={(e) => handleInput("additionalData", e.target.value)}
            placeholder={`Enter any additional data about the quote`}
            size="sm"
            autosize
            minRows={2}
            maxRows={4}
            classNames={{
              input: "!border-gray-200 !rounded-lg",
            }}
          />
        </div>
        <BottomBar handleDelete={handleDelete} />
      </div>
    </div>
  );
}
