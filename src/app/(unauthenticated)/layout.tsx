"use client";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return redirect("/admin");
  }

  return <>{children}</>;
}