"use client";
import { useAuth } from "@/context/auth-context";
import { Checkbox } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";
import { FaApple, FaGoogle } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const { login, error, setError, submitting } = useAuth();

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await login(username as string, password as string);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="gradient-bg h-screen min-h-[700px] w-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-[450px] h-[650px] bg-white rounded-xl p-8 px-12 flex flex-col gap-6 items-center shadow-lg relative">
        <Image src={logo} alt="logo" width={350} className="" />
        <form
          onSubmit={handleFormSubmission}
          onChange={() => setError(null)}
          className="w-full flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Username</label>
            <input
              required
              type="text"
              name="username"
              placeholder="username"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm">Password</label>
            <input
              required
              type="password"
              name="password"
              placeholder="password"
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <div className="w-full flex justify-between items-center text-gray-600 text-sm">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <Checkbox
                className="pointer-events-none"
                color="oklch(74.6% 0.16 232.661)"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.currentTarget.checked)}
              />
              <p>Remember me</p>
            </div>
            <p className="text-sky-400 font-semibold cursor-pointer">
              forgotten password?
            </p>
          </div>
          <button
            type="submit"
            className="button-zen mt-2 mb-1 font-bold flex items-center justify-center h-[50px]"
          >
            {!submitting ? (
              "Sign in"
            ) : (
              <Image
                src={"/loaders/loader_rolling.svg"}
                alt="loader"
                width={30}
                height={30}
              />
            )}
          </button>
          <div className="w-full flex items-center justify-center gap-2">
            <p className="text-gray-400 text-sm">Don&apos;t have an account?</p>
            <Link
              href={"/register"}
              className="text-fuchsia-500 font-bold text-sm"
            >
              Sign up
            </Link>
          </div>
        </form>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center w-full relative mb-4">
            <div className="absolute h-[1px] w-full bg-gray-300" />
            <p className="px-2 bg-white text-gray-400 text-sm z-10">
              Or continue with
            </p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full h-[50px] rounded-md border-2 border-gray-300 text-gray-600 flex gap-2 items-center justify-center cursor-pointer">
              <FaGoogle size={22} /> Continue with Google
            </div>
            <div className="w-full h-[50px] rounded-md border-2 bg-black border-black text-white flex gap-2 items-center justify-center cursor-pointer">
              <FaApple size={25} className="relative bottom-0.5" />
              Continue with Apple
            </div>
          </div>
        </div>
        {error && (
          <div className="text-red-500 absolute bottom-[12px] text-sm z-20">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
