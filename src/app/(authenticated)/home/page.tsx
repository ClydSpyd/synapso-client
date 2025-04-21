"use client";

import { useAuth } from "@/context/auth-context";

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="h-full w-full">
      {/* <TaskBoard /> */}
      <div className="w-full h-[160px] rounded-md gradient-zen-light px-6 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-white">Welcom back, {user?.username}!</h1>
        <p className="text-lg text-white">
          Let&apos;s get those thoughts organised.
        </p>
      </div>
    </div>
  );
}
