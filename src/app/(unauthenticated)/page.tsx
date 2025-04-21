"use client";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/home");
    } else {
      redirect("/login");
    }
  }, [isAuthenticated]);

}
