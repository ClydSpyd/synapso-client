import { FaRegCalendar } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";

import { BiSolidEdit } from "react-icons/bi";
import StarsPicker from "../components/stars-picker";
import { Textarea } from "@mantine/core";
import { format } from "date-fns";
import { formatDatePayload } from "@/lib/dates";
import DatePicker from "react-datepicker";

export default function FeedbackBlock({
  itemTitle,
  myFeedback,
  setMyFeedback,
}: {
  itemTitle: string;
  myFeedback: MediaFeedback;
  setMyFeedback: React.Dispatch<React.SetStateAction<MediaFeedback>>;
}) {
  const handleInputChange = (
    field: keyof MediaFeedback,
    value: string | number,
  ) => {
    setMyFeedback((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="py-4 px-4 rounded-md bg-gray-100/60 shadow-xs mt-4 border border-indigo-200/80">
      <div className="flex gap-2 font-bold items-center">
        <BiSolidEdit className="text-indigo-600 text-xl" /> <h1>My Thoughts</h1>
      </div>
      <div className="flex w-full gap-4">
        <div className="w-1/2">
          <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
            Watched on:
          </p>

          <DatePicker
            popperPlacement={"top-start"}
            calendarStartDay={1}
            showPopperArrow={false}
            disabledKeyboardNavigation
            preventOpenOnFocus
            autoFocus={false}
            selected={
              myFeedback.my_completed ? new Date(myFeedback.my_completed) : null
            }
            onChange={(date: Date | null) => {
              setMyFeedback((prev) => ({
                ...prev,
                my_completed: date ? format(date, "yyyy-MM-dd") : "",
              }));
            }}
            maxDate={new Date()}
            dateFormat="dd-MM-yyyy"
            wrapperClassName="w-[90%]"
            className="font-bold w-[300px] text-center text-slate-700 p-1 rounded-sm cursor-pointer"
            customInput={
              <div className="w-full border border-gray-300 rounded-sm flex items-center p-2 text-gray-700 bg-white font-normal">
                <FaRegCalendar className="mr-2 text-gray-500" />
                {myFeedback.my_completed
                  ? format(new Date(myFeedback.my_completed), "dd-MM-yyyy")
                  : "--"}
              </div>
            }
          />
        </div>
        <div className="w-1/2">
          <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
            My Rating:
          </p>
          <StarsPicker
            defaultStars={myFeedback.my_rating ?? 0}
            onChange={(stars) => handleInputChange("my_rating", stars)}
          />
        </div>
      </div>
      <div>
        <p className="mb-1 text-xs font-extrabold text-gray-400 mt-2">
          Review/notes:
        </p>
        <Textarea
          value={myFeedback.my_notes}
          onChange={(e) => handleInputChange("my_notes", e.target.value)}
          placeholder={`What did you think of ${itemTitle}?`}
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
  );
}
