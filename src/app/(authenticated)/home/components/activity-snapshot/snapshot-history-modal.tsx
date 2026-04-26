import HistoryModalWrapper from "@/components/utility-comps/history-modal-wrapper";
import ActivityModuleContent from "./module-content";
import { formatDatePayload } from "@/lib/dates";
import { useDisclosure } from "@mantine/hooks";

export default function SnapshotHistoryModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <HistoryModalWrapper
        opened={opened}
        close={close}
        title={"Activity Snapshot History"}
        size={"xl"}
      >
        {({ dateOffset }) => (
          <ActivityModuleContent
            key={dateOffset}
            date={formatDatePayload(dateOffset)}
          />
        )}
      </HistoryModalWrapper>
      <div onClick={open}>{children}</div>
    </>
  );
}