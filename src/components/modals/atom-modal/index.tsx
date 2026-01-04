/* eslint-disable @next/next/no-img-element */
import { Modal } from "@mantine/core";
import BooksModal from "./variants/book-modal";
import MovieSeriesModal from "./variants/movie-series-modal";
import QuoteModal from "./variants/quote-modal";
import { modalConfig } from "@/components/utility-comps/modal-content-wrapper/modal-config";
import { useModalStore } from "@/stores/modal-store";

const PlaceholderModal = ({ item }: { item: WikiItem }) => (
  <div className="flex flex-col items-center justify-center gap-4">
    <h1>{item.id}</h1>
    <h6>{item.type}</h6>
  </div>
);

export default function AtomModal({ item }: { item: WikiItem }) {
  let modalVariant: React.ReactNode;
  const { close, isOpen } = useModalStore();
  switch (item.type) {
    case "movie":
    case "series":
      modalVariant = <MovieSeriesModal item={item as WikiMovie | WikiSeries} />;
      break;
    case "book":
      modalVariant = <BooksModal item={item as WikiBook} />;
      break;
    case "quote":
      modalVariant = <QuoteModal item={item as WikiQuote} />;
      break;
    case "link":
      modalVariant = <PlaceholderModal item={item} />;
      break;
    default:
      modalVariant = <PlaceholderModal item={item} />;
      break;
  }

  // return <>{modalVariant}</>;

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      {...modalConfig}
      styles={{
        content: {
          width: "fit-content",
          minWidth: "fit-content",
          borderRadius: "16px",
        },
        body: { padding: 0 },
      }}
    >
      {modalVariant}
    </Modal>
  );
}
