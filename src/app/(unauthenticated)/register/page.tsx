"use client";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/images/logo.png";
import DecoyInput from "@/components/decoy-input";

export default function Home() {
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
    <div className="h-screen min-h-[700px] w-screen flex flex-col items-center justify-center overflow-hidden gradient-bg-zen">
      <div className="relative">
        <div className="w-[450px] bg-white rounded-xl p-8 px-12 flex flex-col gap-6 items-center shadow-lg relative">
          <Image src={logo} alt="logo" width={250} className="" />
          <h1 className="font-bold text-sky-400">
            Create your free Synapso account
          </h1>
          <form
            onSubmit={handleFormSubmission}
            onChange={() => setError(null)}
            className="w-full flex flex-col gap-2"
          >
            <div className="flex flex-col gap-1">
              <DecoyInput type="text" name="username_decoy" />
              <DecoyInput type="password" name="password_decoy" />
              <input
                required
                type="text"
                name="username"
                placeholder="username"
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                autoComplete="password"
                type="password"
                name="password"
                placeholder="password"
                className="border border-gray-300 rounded p-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <input
                required
                type="password"
                name="repeatPassword"
                placeholder="repeat password"
                className="border border-gray-300 rounded p-2"
              />
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
              <p className="text-gray-400 text-sm">Already registered?</p>
              <Link
                href={"/login"}
                className="text-fuchsia-500 font-bold text-sm"
              >
                Login
              </Link>
            </div>
          </form>
          {error && (
            <div className="text-red-500 absolute bottom-[12px] text-xs z-20">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
