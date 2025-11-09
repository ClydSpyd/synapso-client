// components/modals/ModalHost.tsx
import { Modal } from "@mantine/core";
import { useModalStore } from "@/stores/modal-store";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import TaskFormModal from "@/components/modals/task-modal";

export default function ModalHost() {
  const { isOpen, type, payload, close } = useModalStore();

  const title =
    type === "task"
      ? payload
        ? "Edit task"
        : "Add new task"
      : type === "habit"
      ? payload
        ? "Edit habit"
        : "Add new habit"
      : "";

  return (
    <Modal {...modalConfig} opened={isOpen} onClose={close}>
      <ModalContentWrapper title={title} close={close}>
        {type === "task" && <TaskFormModal defaultData={payload as Task} />}
        {/* {type === "habit" && <AddHabitModal defaultData={payload as any} />} */}
      </ModalContentWrapper>
    </Modal>
  );
}
