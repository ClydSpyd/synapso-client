import Link from "next/link";

export default function SpacesPage() {
  return (
    <div className="h-full w-full bg-slate-50/50">
      <div className="h-full w-full max-w-[1250px] mx-auto flex flex-col py-8 px-12">
        <Link
          className="w-[140px] h-[40px] bg-zen-shift flex items-center text-white rounded-md gap-1 px-2 py-1 !transition-all ease-in-out !duration-300 cursor-pointer"
          href="/spaces/123"
        >
          ONETWOTHREE
        </Link>
      </div>
    </div>
  );
} 