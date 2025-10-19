import Link from "next/link";

export default function WikiBlockLink({ item }: { item: WikiLink }) {
  const maximumURLLength = 120;
  return (
      <div className="flex flex-col justify-center flex-1">
        <div className="flex flex-col mb-2">
          <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
          <Link
            href={item.url}
            target="__blank"
            className="text-xs leading-relaxed"
          >
            {item.url?.slice(0, maximumURLLength)}
            {item.url && item.url.length > maximumURLLength ? "..." : ""}
          </Link>
        </div>
        {item.description && (
          <p className="text-xs leading-relaxed">{item.description}</p>
        )}
      </div>
  );
}
