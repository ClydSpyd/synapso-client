"use client";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/admin");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1>&quot;/&quot;</h1>
      <div className="flex gap-4">
        <Link href={"/login"}>login</Link>
        <Link href={"/admin"}>admin</Link>
      </div>
    </div>
  );
}
