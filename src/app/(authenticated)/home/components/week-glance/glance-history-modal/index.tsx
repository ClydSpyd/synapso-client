import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import GlanceSummaryBlocks from "../glance-summary-blocks";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { cn } from "@/lib/utils";
import DatePicker from "react-datepicker";
import { getThisWeekRange } from "@/lib/dates";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";

export default function GlanceHistoryModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const handleMonthArrow = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setWeekOffset((prev) => prev - 1);
    } else {
      if (weekOffset === 0) return;
      setWeekOffset((prev) => prev + 1);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        {...modalConfig}
        styles={{
          content: { width: "750px", minWidth: "750px", borderRadius: "16px" },
          body: { padding: 0 },
        }}
      >
        <ModalContentWrapper
          title="Week at a Glance History"
          close={close}
          className="p-6 pb-8"
        >
          <div className="w-full flex justify-center items-center gap-1 mb-4">
            <BiChevronLeft
              className={cn("text-xl text-indigo-600 cursor-pointer")}
              onClick={() => handleMonthArrow("prev")}
            />
            <div className="relative z-20">
              <DatePicker
                calendarStartDay={1}
                showPopperArrow={false}
                disabledKeyboardNavigation
                preventOpenOnFocus
                autoFocus={false}
                // selected={new Date(formatDatePayload(dateOffset, false))}
                // onChange={(date: Date | null) => {
                //   if (!date) return;
                //   const today = new Date();
                //   const selectedDate = new Date(date);
                //   const timeDiff = today.getTime() - selectedDate.getTime();
                //   const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
                //   setDateOffset(-dayDiff);
                // }}
                maxDate={new Date()}
                dateFormat="dd-MM-yyyy"
                className="font-bold min-w-[120px] text-center text-slate-500 p-1 border border-gray-300 rounded-sm cursor-pointer"
                customInput={<p>{getThisWeekRange(weekOffset)}</p>}
              />
            </div>
            <BiChevronRight
              className={cn("text-xl text-indigo-600 cursor-pointer", {
                "opacity-40 pointer-events-none": weekOffset === 0,
              })}
              onClick={() => handleMonthArrow("next")}
            />
          </div>
          <GlanceSummaryBlocks weekOffset={weekOffset} />
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
