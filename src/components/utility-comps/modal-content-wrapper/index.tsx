"use client";
import { RxCross2 } from "react-icons/rx";

export default function ModalContentWrapper({
  children,
  title,
  subtitle,
  close,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  close: () => void;
}) {
  return (
    <>
      <div className="w-full bg-zen-shift rounded-none p-6 relative">
        <div className="absolute top-4 right-4">
          <RxCross2
            className="text-white cursor-pointer"
            size={24}
            onClick={() => {
              close();
            }}
          />
        </div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-gray-200">{subtitle}</p>}
      </div>
      <div className="w-full flex flex-col gap-2 p-4">{children}</div>
    </>
  );
}
