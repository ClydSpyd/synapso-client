
export default function WikiBlockQuote({ item }: { item: WikiQuote }) {
  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex flex-col justify-center flex-1">
        <p className="text-base italic text-gray-700 font-semibold">
          {item.content}
        </p>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        - {item.author}
        {item.year && <span>{`, ${item.year}`}</span>}
      </div>
    </div>
  );
}
