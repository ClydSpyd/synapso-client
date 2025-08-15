export default function PageHeader({
  title,
  subtitle,
//   addItemModal,
}: {
  title: string;
  subtitle: string;
//   addItemModal: React.ReactNode;
}) {
  return (
    <section className="w-full flex items-center justify-between">
      <div className="">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-400">{subtitle}</p>
      </div>
      <button className="bg-zen-shift flex items-center gap-1 px-4 py-1 hover:scale-105 !transition-transform ease-in-out !duration-300">
        <h1 className="text-2xl m-0 relative bottom-0.5">+</h1>
        <p className="m-0 font-semibold">ADD</p>
      </button>
    </section>
  );
}