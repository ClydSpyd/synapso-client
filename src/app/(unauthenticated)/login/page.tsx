"use client";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { login, error, loading } = useAuth();

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
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <form onSubmit={handleFormSubmission}>
        <div className="flex flex-col gap-4">
          <input
            required
            type="text"
            name="username"
            placeholder="username"
            className="border border-gray-300 rounded p-2"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="password"
            className="border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white rounded p-2 hover:bg-blue-600 flex items-center justify-center"
          >
            {!loading ? (
              "login"
            ) : (
              <Image
                src={"/loaders/loader_rolling.svg"}
                alt="loader"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}
      <div className="flex gap-4 absolute top-2 right-5">
        <Link href={"/"}>home</Link>
        <Link href={"/admin"}>admin</Link>
      </div>
    </div>
  );
}
