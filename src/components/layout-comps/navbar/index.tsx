"use client";
import Image from "next/image";
// import { FaRegLightbulb } from "react-icons/fa";
import { BiAtom, BiBrain } from "react-icons/bi";

import { TbCalendarRepeat } from "react-icons/tb";
import NavLink from "@/components/navlink";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
// import { FaListCheck } from "react-icons/fa6";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="w-full min-h-[60px] gap-4 flex items-center justify-between px-6 text-fuchsia-600">
      <div>
        <Link href={"/home"}>
          <Image src="/images/logo_simple.png" alt="logo" width={180} height={350} />
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <NavLink href="/habits">
          <div className="flex items-center gap-2">
            <TbCalendarRepeat className="text-lg" />
            <p className="text-sm font-[500]">Tracker</p>
          </div>
        </NavLink>
        {/* <NavLink href="/ideas">
          <div className="flex items-center gap-2">
            <FaRegLightbulb className="text-lg" />
            <p className="text-sm font-[500]">Ideas</p>
          </div>
        </NavLink> */}
        <NavLink href="/atoms">
          <div className="flex items-center gap-2">
            <BiAtom className="text-lg" />
            <p className="text-sm font-[500]">Atoms</p>
          </div>
        </NavLink>
        {/* <NavLink href="/tasks">
          <div className="flex items-center gap-2">
            <FaListCheck className="text-md" />
            <p className="text-sm font-[500]">Tasks</p>
          </div>
        </NavLink> */}
      </div>
      <p className="cursor-pointer" onClick={logout}>
        logout
      </p>
    </div>
  );
}
