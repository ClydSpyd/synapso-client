"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@/context/auth-context";
import { Loader } from "@mantine/core";
import { useEffect } from "react";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Loader type="dots" size={50} />
    </div>
  );
}
