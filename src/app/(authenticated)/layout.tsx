"use client";
import Navbar from "@/components/layout-comps/navbar";
import QuickAccessBar from "@/components/layout-comps/quick-access-bar";
// import RegisterActivityModal from "@/components/layout-comps/quick-access-bar/modals/register-activity-modal";
import ModalHost from "@/components/utility-comps/modal-host";
import { ToastProvider } from "@/components/utility-comps/toast-provider";
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
      <div className="hidden xl:flex flex-col h-screen w-screen overflow-hidden relative">
        <div className="h-screen w-full absolute z-[-1] spotlight-bg opacity-50" />
        <Navbar />
        <div className="flex w-full h-fit">
          <QuickAccessBar />
          <div className="h-[calc(100vh-60px)] w-full overflow-y-auto border-l border-t border-gray-200/80">
            {" "}
            <div className="w-full max-w-[1500px] mx-auto h-full min-h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* TODO - implement Mobile/Tablet view */}
      {/* <div className="flex xl:hidden flex-col h-screen w-screen overflow-hidden ">
        <RegisterActivityModal openProp={true}>
          <p>HELLO WORLD</p>
        </RegisterActivityModal>
      </div> */}
      <ModalHost />
      <ToastProvider />
    </QueryProvider>
  );
}
