import WikiBlockBook from "./blocks/wiki-block-book";
import WikiBlockLink from "./blocks/wiki-block-link";
import WikiBlockMovie from "./blocks/wiki-block-movie";
import WikiBlockQuote from "./blocks/wiki-block-quote";
import WikiBlockSeries from "./blocks/wiki-block-series";
import WikiBlockWrapper from "./blocks/block-wrapper";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import AtomModal from "@/components/modals/atom-modal";

const iconClassMap: Record<WikiType, string> = {
  movie: "",
  series: "",
  quote: "",
  book: "text-xl 600 mb-2",
  link: "",
};

export default function ListItem({
  item,
  pinId,
  pinned,
}: {
  item: WikiItem;
  pinId: string;
  pinned?: boolean;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  let block: React.ReactNode;
  switch (item.type) {
    case "movie":
      block = <WikiBlockMovie item={item as WikiMovie} />;
      break;
    case "series":
      block = <WikiBlockSeries item={item as WikiSeries} />;
      break;
    case "quote":
      block = <WikiBlockQuote item={item as WikiQuote} />;
      break;
    case "book":
      block = <WikiBlockBook item={item as WikiBook} />;
      break;
    case "link":
      block = <WikiBlockLink item={item as WikiLink} />;
      break;
    default:
      return null;
  }

  return (
    <>
      <WikiBlockWrapper
        type={item.type}
        pinId={pinId}
        itemId={item.id}
        pinned={!!pinned}
        iconClass={iconClassMap[item.type]}
        onClick={() => {
          open();
        }}
      >
        {block}
      </WikiBlockWrapper>

      <Modal
        opened={opened}
        onClose={close}
        {...modalConfig}
        styles={{
          content: {
            width: "700px",
            minWidth: "700px",
            borderRadius: "16px",
          },
          body: { padding: 0 },
        }}
      >
        <AtomModal item={item} />
      </Modal>
    </>
  );
}
