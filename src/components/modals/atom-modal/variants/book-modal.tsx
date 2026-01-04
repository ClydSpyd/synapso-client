/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { formatMinutes } from "@/lib/utils";
import { FaRegClock, FaRegCalendar } from "react-icons/fa6";

import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { TbExternalLink } from "react-icons/tb";
import StarsPicker from "../components/stars-picker";
import { Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function BooksModal({
  item,
  handleClose,
}: {
  item: WikiBook;
  handleClose: () => void;
}) {
  //   const imdbLink = item.imdb_id
  //     ? `https://www.imdb.com/title/${item.imdb_id}`
  //     : null;

  return (
    <div className="flex relative max-w-[900px] w-[75vw]">
      <div className="min-w-[280px] max-w-[280px] gradient-fade-bottom flex flex-col justify-end gap-2 p-6">
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
        <div className="py-4 px-4 rounded-md bg-gray-100/60 shadow-xs mt-4 border border-indigo-200/80">
          <div className="flex gap-2 font-bold items-center">
            <BiSolidEdit className="text-indigo-600 text-xl" />{" "}
            <h1>My Thoughts</h1>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
                Finished on:
              </p>
              <div className="border border-gray-300 rounded-sm flex items-center p-2 text-gray-500 bg-white">
                <FaRegCalendar className="mr-2" />
                <p>01/06/2025</p>
              </div>
            </div>
            <div className="w-1/2">
              <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
                My Rating:
              </p>
              <StarsPicker />
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
              Review/notes:
            </p>
            <Textarea
              // value={inputVals.reflection}
              // onChange={(e) => handleInputChange("reflection", e.target.value)}
              placeholder={`What did you think of ${item.title}?`}
              size="sm"
              autosize
              minRows={4}
              maxRows={6}
              classNames={{
                input: "!border-gray-200 !rounded-lg",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
