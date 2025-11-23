// components/modals/ModalHost.tsx
import { Modal, ModalBaseStylesNames } from "@mantine/core";
import { useModalStore } from "@/stores/modal-store";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import TaskFormModal from "@/components/modals/task-modal";
import { CSSProperties } from "react";
import AddHabitModal from "@/components/layout-comps/quick-access-bar/modals/add-habit-modal";

export default function ModalHost() {
  const { isOpen, type, payload, close, modalStyles } = useModalStore();

  const title =
    type === "task"
      ? payload?.id
        ? "Edit task"
        : "Add new task"
      : type === "habit"
      ? payload?.id
        ? "Edit habit"
        : "Add new habit"
      : "";

  return (
    <Modal
      {...modalConfig}
      styles={{
        ...modalConfig.styles,
        ...(modalStyles as Partial<
          Record<ModalBaseStylesNames, CSSProperties>
        >),
      }}
      opened={isOpen}
      onClose={close}
    >
      <ModalContentWrapper title={title} close={close}>
        {type === "task" && <TaskFormModal defaultData={payload as Task} />}
        {type === "habit" && <AddHabitModal defaultData={payload as Habit} />}
      </ModalContentWrapper>
    </Modal>
  );
}
