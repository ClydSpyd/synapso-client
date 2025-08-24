"use client";
import Navbar from "@/components/layout-comps/navbar";
import QuickAccessBar from "@/components/layout-comps/quick-access-bar";
import { useAuth } from "@/context/auth-context";
import { QueryProvider } from "@/context/query-provider";
import { redirect } from "next/navigation";
export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return redirect("/login");
  }

  return (
    <QueryProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <Navbar />
        <div className="flex w-full h-fit">
          <QuickAccessBar />
          <div className="h-[calc(100vh-4rem)] grow overflow-y-auto border-l border-t border-gray-200/80 ">
            {" "}
            {children}
          </div>
        </div>
      </div>
    </QueryProvider>
  );
}
