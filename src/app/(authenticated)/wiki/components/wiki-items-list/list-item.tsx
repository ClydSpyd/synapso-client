import WikiBlockBook from "./blocks/wiki-block-book";
import WikiBlockLink from "./blocks/wiki-block-link";
import WikiBlockMovie from "./blocks/wiki-block-movie";
import WikiBlockQuote from "./blocks/wiki-block-quote";
import WikiBlockSeries from "./blocks/wiki-block-series";

export default function ListItem({ item }: { item: WikiItem }) {
  switch (item.type) {
    case "movie":
      return <WikiBlockMovie item={item} />;
    case "series":
      return <WikiBlockSeries item={item} />;
    case "quote":
      return <WikiBlockQuote item={item} />;
    case "book":
      return <WikiBlockBook item={item} />;
    case "link":
      return <WikiBlockLink item={item} />;
    default:
      return null;
  }
}
