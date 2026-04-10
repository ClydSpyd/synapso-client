export default function ModuleWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full h-fit px-6 py-4 relative z-10  bg-white/80 border border-gray-200 rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
