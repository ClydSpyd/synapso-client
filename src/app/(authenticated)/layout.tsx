"use client";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="w-full h-[50px] gap-4 flex items-center justify-end px-8 border-b border-gray-200/80 text-fuchsia-600">
        {/* <Link href={"/home"}>home</Link> */}
        <p className="cursor-pointer" onClick={logout}>
          logout
        </p>
      </div>
      <div className="flex w-full grow">
        <div className="w-[250px] h-full border-r border-gray-200/80"></div>
        <div className="h-full grow p-4">{children}</div>
      </div>
    </div>
  );
}