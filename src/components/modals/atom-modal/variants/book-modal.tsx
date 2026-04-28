/* eslint-disable @next/next/no-img-element */
import { FaRegCalendar } from "react-icons/fa6";

import { BiSolidEdit } from "react-icons/bi";
import StarsPicker from "../components/stars-picker";
import { Textarea } from "@mantine/core";
import BottomBar from "../components/bottom-bar";
import { API } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/stores/modal-store";
import { useToastStore } from "@/stores/toast-store";
import { useState } from "react";
import FeedbackBlock from "./feedback-block";

export default function BooksModal({ item }: { item: WikiBook }) {
  const [myFeedback, setMyFeedback] = useState<MediaFeedback>({
    my_rating: item.my_rating ?? 0,
    my_completed: item.my_completed ?? "",
    my_notes: item.my_notes ?? "",
  });
  const queryClient = useQueryClient();
  const { close } = useModalStore();
  const { show } = useToastStore();

  const handleDelete = async () => {
    const { error } = await API.books.delete(item.olid);
    if (error) {
      return { error };
    }
    queryClient.invalidateQueries({ queryKey: ["wiki-items"] });
    queryClient.invalidateQueries({ queryKey: ["pinned-items"] });
    show({
      variant: "success",
      message: `Book deleted successfully!`,
    });
    close();
    return {
      error: undefined,
    };
  };

  return (
    <div className="flex relative max-w-[900px] w-[75vw]">
      <div className="min-w-[280px] max-w-[280px] flex flex-col justify-end gap-2 p-6 relative">
        <img
          src={item.cover}
          alt={item.title}
          className="object-cover w-full h-full absolute top-0 left-0"
        />
      </div>
      <div className="grow h-full text-sm p-6 px-8">
        <h1 className="text-2xl font-extrabold">{item.title}</h1>
        {item.description?.length && (
          <div className="my-2">
            <h2 className="text-xs font-extrabold my-0 text-gray-400">
              SYNOPSIS
            </h2>
            <p className="text-sm leading-snug line-clamp-[8]">
              {item.description}
            </p>
          </div>
        )}
        {item.authors && (
          <div>
            <h2 className="text-xs font-extrabold my-0 text-gray-400">
              AUTHOR(S)
            </h2>
            <p>{item.authors.join(", ")}</p>
          </div>
        )}
        <FeedbackBlock
          itemTitle={item.title}
          myFeedback={myFeedback}
          setMyFeedback={setMyFeedback}
        />
        <BottomBar
          handleDelete={handleDelete}
          myFeedback={myFeedback}
          type="book"
          id={item.id}
        />
      </div>
    </div>
  );
}
