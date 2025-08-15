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
      return (
        <>
          <div>{item.title}</div>
          <div>by {item.author}</div>
        </>
      );
    case "link":
      return (
        <>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          {item.description && <div>{item.description}</div>}
        </>
      );
    default:
      return null;
  }
}
