import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { API } from "@/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import CheckinModuleContent from "./module-content";
import { cn } from "@/lib/utils";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { formatDatePayload } from "@/lib/dates";

export default function CheckinHistoryModal({
  children,
  defaultData,
}: {
  children: React.ReactNode;
  defaultData?: FocusItem;
}) {
  const [dateOffset, setDateOffset] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const handleMonthArrow = (direction: "prev" | "next") => {
    if (direction === "prev") {
      console.log("prev month");
      setDateOffset((prev) => prev - 1);
    } else {
      if (dateOffset === 0) return;
      console.log("next month");
      setDateOffset((prev) => prev + 1);
    }
  };

  return (
    <>
      <Modal
        {...modalConfig}
        opened={opened}
        onClose={() => {
          close();
          setTimeout(() => {
            setSubmitting(false);
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
            <p className="font-semibold w-[120px] text-center text-slate-500 p-1 border border-gray-300 rounded-sm cursor-pointer">
              {formatDatePayload(dateOffset, true)}
            </p>
            <BiChevronRight
              className={cn("text-xl text-indigo-600 cursor-pointer", {
                "opacity-40 pointer-events-none": dateOffset === 0,
              })}
              onClick={() => handleMonthArrow("next")}
            />
          </div>
          <CheckinModuleContent date={formatDatePayload(dateOffset)} />
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
