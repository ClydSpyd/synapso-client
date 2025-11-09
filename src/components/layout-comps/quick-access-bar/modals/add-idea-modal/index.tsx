import IdeaInput from "@/app/(authenticated)/home/components/brain-dump/idea-input";
import ModalContentWrapper from "@/components/utility-comps/modal-content-wrapper";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function AddIdeaModal({ children }: { children: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        {...modalConfig}
        styles={{
          content: {
            border: "2px solid cyan",
            minWidth: "600px",
            padding: 0,
            borderRadius: "8px",
          },
          body: {
            margin: 0,
            padding: 0,
          },
        }}
      >
        <ModalContentWrapper title="Add Idea" close={close}>
          <IdeaInput />
        </ModalContentWrapper>
      </Modal>
      <div onClick={open}>{children}</div>
    </>
  );
}
