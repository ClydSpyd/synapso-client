"use client";
import { useAuth } from "@/context/auth-context";
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

  return <>{children}</>;
}