/* eslint-disable @next/next/no-img-element */
import BooksModal from "./variants/book-modal";
import MovieSeriesModal from "./variants/movie-series-modal";
import QuoteModal from "./variants/quote-modal";

const PlaceholderModal = ({ item }: { item: WikiItem }) => (
  <div className="flex flex-col items-center justify-center gap-4">
    <h1>{item.id}</h1>
    <h6>{item.type}</h6>
  </div>
);

export default function AtomModal({
  item,
  handleClose,
}: {
  item: WikiItem;
  handleClose: () => void;
}) {
  let modalVariant: React.ReactNode;

  switch (item.type) {
    case "movie":
    case "series":
      modalVariant = (
        <MovieSeriesModal
          item={item as WikiMovie | WikiSeries}
          handleClose={handleClose}
        />
      );
      break;
    case "book":
      modalVariant = (
        <BooksModal item={item as WikiBook} handleClose={handleClose} />
      );
      break;
    case "quote":
      modalVariant = (
        <QuoteModal item={item as WikiQuote} handleClose={handleClose} />
      );
      break;
    case "link":
      modalVariant = <PlaceholderModal item={item} />;
      break;
    default:
      modalVariant = <PlaceholderModal item={item} />;
      break;
  }

  return <>{modalVariant}</>;
}
