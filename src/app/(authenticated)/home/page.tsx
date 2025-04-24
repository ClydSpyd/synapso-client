"use client";

import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { useEffect } from "react";
import { FaBrain, FaLightbulb } from "react-icons/fa";
import { FaListCheck, FaBell } from "react-icons/fa6";


const BoxModule = ({
  icon,
  title,
  iconBoxClassName,
  count,
}:{
  title: string;
  icon: React.ReactNode;
  iconBoxClassName: string;
  count: number;
  description: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div className="w-full h-full bg-white border border-gray-100 rounded-md shadow-md flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center w-full">
        <div className={`w-[50px] h-[50px] rounded-md flex items-center justify-center ${iconBoxClassName}`}>
          {icon}
        </div>
        <h1 className="text-xl font-semibold text-slate-600">{count}</h1>
      </div>
      <h1 className="text-md font-bold text-slate-400">{title}</h1>
    </div>
  );
}

// const getWeatherData = async () => {
//   console.log("getWeatherData");
//   const { data } = await axios.get("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/madrid?unitGroup=us&key=JKBWD7BTWV9AXGREULU453ADT&contentType=json");
//   console.log({data});
// }

export default function Home() {
  const { user } = useAuth();

  // useEffect(() => {
  //   getWeatherData();
  // },[])

  return (
    <div className="h-full w-full flex flex-col gap-4 bg-gray-100/40 p-4">
      {/* <TaskBoard /> */}
      <div className="w-full h-[130px] rounded-md !overflow-hidden px-6 flex flex-col justify-center relative z-10">
        <div className="!absolute min-h-[100vw] min-w-screen left-0 z-[-1] abs-center">
          <div className="!absolute h-full w-full left-0 gradient-bg-zen-alt rotate-alt" />
        </div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-lg text-white">
          Let&apos;s get those thoughts organised.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 h-[110px]">
        <BoxModule
          title="Active Tasks"
          count={12}
          icon={<FaListCheck className="text-xl text-indigo-500" />}
          iconBoxClassName="bg-blue-100"
          description="Manage your tasks efficiently."
          onClick={() => {}}
          className="col-span-2"
        />
        <BoxModule
          title="Reminders"
          count={5}
          icon={<FaBell className="text-xl text-indigo-700" />}
          iconBoxClassName="bg-violet-100"
          description="Manage your tasks efficiently."
          onClick={() => {}}
          className="col-span-2"
        />
        <BoxModule
          title="Ideas"
          count={16}
          icon={<FaLightbulb className="text-xl text-fuchsia-500" />}
          iconBoxClassName="bg-fuchsia-100"
          description="Manage your tasks efficiently."
          onClick={() => {}}
          className="col-span-2"
        />
        <BoxModule
          title="Wiki"
          count={18}
          icon={<FaBrain className="text-xl text-sky-700" />}
          iconBoxClassName="bg-cyan-100"
          description="Manage your tasks efficiently."
          onClick={() => {}}
          className="col-span-2"
        />
      </div>
    </div>
  );
}
