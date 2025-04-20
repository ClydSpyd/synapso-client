"use client";
import TaskBoard from "@/components/task-board";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function Home() {
  const { logout } = useAuth();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <TaskBoard />
      <div className="flex gap-4 absolute top-2 right-5">
        <Link href={"/"}>home</Link>
        <p className="cursor-pointer" onClick={logout}>
          logout
        </p>
      </div>
    </div>
  );
}
