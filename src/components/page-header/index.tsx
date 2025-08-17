export default function PageHeader({
  title,
  subtitle,
  rightSideElements,
}: {
  title: string;
  subtitle: string;
  rightSideElements: React.ReactNode;
}) {
  return (
    <section className="w-full flex items-center justify-between">
      <div className="">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-400">{subtitle}</p>
      </div>
      {rightSideElements}
    </section>
  );
}