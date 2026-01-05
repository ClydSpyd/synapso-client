// components/modals/ModalHost.tsx
import { Modal, ModalBaseStylesNames } from "@mantine/core";
import { useModalStore } from "@/stores/modal-store";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import TaskFormModal from "@/components/modals/task-modal";
import { CSSProperties } from "react";
import AddHabitModal from "@/components/layout-comps/quick-access-bar/modals/add-habit-modal";
import AddAtomModal from "@/components/layout-comps/quick-access-bar/modals/add-atom-modal";
import AddBookModal from "@/components/layout-comps/quick-access-bar/modals/add-book-modal";
import AddQuoteModal from "@/components/layout-comps/quick-access-bar/modals/add-quote-modal";
import AddMovieModal from "@/components/layout-comps/quick-access-bar/modals/add-movie-modal";
import AddLinkModal from "@/components/layout-comps/quick-access-bar/modals/add-link-modal";
import AtomModal from "@/components/modals/atom-modal";

export default function ModalHost() {
  const { isOpen, type, payload, close, modalStyles, title } = useModalStore();


    if(type === "atom_details") {
      return <AtomModal item={payload as WikiItem} />;
    }

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
        {type === "atom" && <AddAtomModal />}
        {type === "atom_book" && (
          <AddBookModal defaultData={payload as OpenLibBook} />
        )}
        {type === "atom_quote" && (
          <AddQuoteModal defaultData={payload as WikiQuote} />
        )}
        {type === "atom_movie_series" && (
          <AddMovieModal defaultData={payload as { data: OMDBMovie; type: MediaType }} />
        )}
        {type === "atom_link" && (
          <AddLinkModal defaultData={payload as WikiLink} />
        )}
      </ModalContentWrapper>
    </Modal>
  );
}
