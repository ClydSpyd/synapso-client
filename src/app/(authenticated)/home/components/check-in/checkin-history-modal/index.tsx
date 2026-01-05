import "react-datepicker/dist/react-datepicker.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import CheckinModuleContent from "./module-content";
import { cn } from "@/lib/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  formatDatePayload,
  getCurrentMonthInt,
  getCurrentYear,
  getDateMonthYearFromOffset,
} from "@/lib/dates";
import DatePicker from "react-datepicker";
import { useMonthlyCheckins } from "@/queries/useCheckin";
import { format } from "date-fns";

export default function CheckinHistoryModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dateOffset, setDateOffset] = useState(0);
  const [month, setMonth] = useState(getCurrentMonthInt());
  const [year, setYear] = useState(getCurrentYear());
  const [opened, { open, close }] = useDisclosure(false);

  const handleMonthArrow = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setDateOffset((prev) => {
        const newOffset = prev - 1;
        const { month: newMonth, year: newYear } =
          getDateMonthYearFromOffset(newOffset);
        if (newMonth !== month) setMonth(newMonth);
        if (newYear !== year) setYear(newYear);
        return newOffset;
      });
    } else {
      if (dateOffset === 0) return;
      setDateOffset((prev) => {
        const newOffset = prev + 1;
        const { month: newMonth, year: newYear } = getDateMonthYearFromOffset(newOffset);
        if (newMonth !== month) setMonth(newMonth);
        if (newYear !== year) setYear(newYear);
        return newOffset;
      });
    }
  };

  const { data: checkinsByMonth } = useMonthlyCheckins(month, year);

  return (
    <>
      <Modal
        {...modalConfig}
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setDateOffset(0);
          }, 500);
        }}
      >
        <ModalContentWrapper title={"Mental Check-in"} close={close}>
          <div className="w-full flex justify-center items-center gap-1">
            <BiChevronLeft
              className={cn("text-xl text-indigo-600 cursor-pointer")}
              onClick={() => handleMonthArrow("prev")}
            />
            <div className="relative z-20">
              <DatePicker
                calendarStartDay={1}
                onMonthChange={(date: Date) => {
                  setMonth(date.getMonth() + 1);
                  setYear(date.getFullYear());
                }}
                onYearChange={(date: Date) => {
                  setYear(date.getFullYear());
                }}
                dayClassName={(date: Date) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  const hasCheckin = checkinsByMonth?.includes(dateStr);
                  return hasCheckin ? "date-with-checkin" : "";
                }}
                showPopperArrow={false}
                disabledKeyboardNavigation
                preventOpenOnFocus
                autoFocus={false}
                selected={new Date(formatDatePayload(dateOffset, false))}
                onChange={(date: Date | null) => {
                  if (!date) return;
                  const today = new Date();
                  const selectedDate = new Date(date);
                  const timeDiff = today.getTime() - selectedDate.getTime();
                  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
                  setDateOffset(-dayDiff);
                }}
                maxDate={new Date()}
                dateFormat="dd-MM-yyyy"
                className="font-bold w-[120px] text-center text-slate-500 p-1 border border-gray-300 rounded-sm cursor-pointer"
                customInput={<p>{formatDatePayload(dateOffset, true)}</p>}
              />
            </div>
            <BiChevronRight
              className={cn("text-xl text-indigo-600 cursor-pointer", {
                "opacity-40 pointer-events-none": dateOffset === 0,
              })}
              onClick={() => handleMonthArrow("next")}
            />
          </div>
          <CheckinModuleContent
            key={dateOffset}
            date={formatDatePayload(dateOffset)}
          />
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
