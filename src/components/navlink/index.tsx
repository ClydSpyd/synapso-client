"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");

  return (
    <Link
      href={href}
      className={cn(
        `text-slate-700 hover:text-indigo-600 p-2 py-1 border border-transparent hover:border-gray-200 rounded-sm ${className}`,
        isActive && "text-indigo-600 pointer-events-none border-indigo-400"
      )}
    >
      {children}
    </Link>
  );
};
export default NavLink;
