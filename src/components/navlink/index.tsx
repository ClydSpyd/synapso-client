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
        `text-slate-500 hover:text-indigo-600 ${className}`,
        isActive && "text-indigo-600"
      )}
    >
      {children}
    </Link>
  );
};
export default NavLink;
