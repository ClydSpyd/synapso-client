export default function ModuleWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full h-fit px-6 py-4 relative z-10  bg-white border border-gray-100 rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
