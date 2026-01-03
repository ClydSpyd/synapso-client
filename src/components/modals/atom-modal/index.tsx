/* eslint-disable @next/next/no-img-element */
import { formatMinutes } from "@/lib/utils";
import { FaRegClock, FaRegCalendar } from "react-icons/fa6";

import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { TbExternalLink } from "react-icons/tb";

import StarsPicker from "./stars-picker";
import { Textarea } from "@mantine/core";

export default function AtomModal({item}:{item: WikiItem}){

  
  if(item.type === "movie" || item.type === "series"){
    const imdbLink = item.imdb_id
      ? `https://www.imdb.com/title/${item.imdb_id}`
      : null;

    return (
      <div className="flex">
        <div className="min-w-[240px] max-w-[240px] gradient-fade-bottom flex flex-col justify-end gap-2 p-6">
          <img
            src={item.poster_url}
            alt={item.title}
            className="object-cover w-full h-full absolute top-0 left-0"
          />
          <div className="flex w-full justify-center gap-1">
            {item.genre?.split(",").map((g) => (
              <p
                key={g}
                className="uppercase font-bold text-white bg-indigo-600 px-2 py-1 w-fit rounded-sm z-20 text-[10px] whitespace-nowrap"
              >
                {g.trim().toLowerCase()}
              </p>
            ))}
          </div>
          <div className="flex gap-2 w-full justify-center z-50">
            <div className="w-1/3 flex flex-col items-center text-yellow-400">
              <div className="flex items-center gap-1">
                <FaStar className="text-sm" />
                <p className="font-extrabold z-20 m-0">
                  {item.imdb_rating ? item.imdb_rating : "N/A"}
                </p>
              </div>
              <h5 className="text-[10px] text-gray-400 font-bold my-0 ">
                IMDB
              </h5>
            </div>
            <div className="w-1/3 flex flex-col items-center text-teal-500">
              <div className="flex items-center gap-1">
                <p className="font-extrabold z-20 m-0">
                  {item.metascore ? item.metascore : "N/A"}
                </p>
              </div>
              <h5 className="text-[10px] text-gray-400 font-bold my-0 ">
                Metascore
              </h5>
            </div>
            {item.year && (
              <div className="w-1/3 flex flex-col items-center text-blue-500">
                <div className="flex items-center gap-1">
                  <p className="font-extrabold z-20 m-0">{item.year}</p>
                </div>
                <h5 className="text-[10px] text-gray-400 font-bold my-0 ">
                  Year
                </h5>
              </div>
            )}
          </div>
        </div>
        <div className="grow h-full text-sm p-6 px-8">
          <h1 className="text-3xl font-bold">{item.title}</h1>

          <div className="flex items-center gap-0 text-xs text-gray-500 font-medium h-[25px]">
            {item.runtime && (
              <>
                <div className="flex items-center gap-1">
                  <FaRegClock className="text-xs" />
                  <p>{formatMinutes(+item.runtime)}</p>
                </div>
                <LuDot className="text-3xl leading-0 h-[25px]" />
              </>
            )}
            <p>Released {item.released}</p>
            {imdbLink && (
              <>
                <LuDot className="text-3xl leading-0 h-[25px]" />
                <a
                  href={imdbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-600/80 transition-colors duration-200 p-1 rounded-sm bg-amber-200 text-amber-500 flex items-center font-bold"
                >
                  <TbExternalLink className="text-lg mr-1" />
                  IMDB
                </a>
              </>
            )}
          </div>
          <div className="my-2">
            <h2 className="text-xs font-extrabold my-0 text-gray-400">
              SYNOPSIS
            </h2>
            <p className="text-sm leading-snug line-clamp-[8]">{item.plot}</p>
          </div>
          {item.director && item.director !== "N/A" && (
            <div>
              <h2 className="text-xs font-extrabold my-0 text-gray-400">
                DIRECTOR
              </h2>
              <p>{item.director}</p>
            </div>
          )}
          <div>
            <h2 className="text-xs font-extrabold text-gray-400 mt-2">
              TOP CAST
            </h2>
            <p>{item.actors}</p>
          </div>
          <div className="py-4 px-4 rounded-md bg-gray-100/60 shadow-xs mt-4 border border-indigo-200/80">
            <div className="flex gap-2 font-bold items-center">
              <BiSolidEdit className="text-indigo-600 text-xl" />{" "}
              <h1>My Thoughts</h1>
            </div>
            <div className="flex w-full gap-4">
              <div className="w-1/2">
                <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
                  Watched on:
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
                placeholder={`What did you think of the ${item.type}?`}
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

  // if(item.type === "series"){
  //   return (
  //     <div className="w-[700px] flex gap-4">
  //       <div className="min-w-[200px] max-w-[200px] h-[300px]">
  //         <img
  //           src={item.poster_url}
  //           alt={item.title}
  //           className="object-cover w-full h-full"
  //         />
  //       </div>
  //       <div className="grow h-full text-sm">
  //         <p>
  //           <span className="font-bold text-base">Director:</span>{" "}
  //           {item.director}
  //         </p>
  //         <p>
  //           <span className="font-bold text-base">Genre:</span> {item.genre}
  //         </p>
  //         <p className="my-2">
  //           {" "}
  //           <span className="font-bold text-base">Plot:</span> {item.plot}
  //         </p>
  //         <p>
  //           <span className="font-bold text-base">Actors:</span> {item.actors}
  //         </p>
  //         <p>
  //           <span className="font-bold text-base">Released:</span>{" "}
  //           {item.released}
  //         </p>
  //         {item.imdb_rating && (
  //           <p>
  //             <span className="font-bold text-base">IMDB Rating:</span>{" "}
  //             {item.imdb_rating}
  //           </p>
  //         )}
  //         {item.metascore && (
  //           <p>
  //             <span className="font-bold text-base">Metascore:</span>{" "}
  //             {item.metascore}
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>{item.id}</h1>
      <h6>{item.type}</h6>
    </div>
  );

}