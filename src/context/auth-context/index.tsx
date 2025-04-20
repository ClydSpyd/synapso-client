"use client";
// hooks/useAuth.ts
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContextData, defaultAuthContext, User } from "./types";

const AuthContext = createContext<AuthContextData>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (username: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL! + "auth/login/",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      axios.defaults.withCredentials = true;
      console.log("res", res);
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (error) {
    const err = error as { response: { data: { detail: string } } };
      console.error("Login failed", error);
      setIsAuthenticated(false);
      setUser(null);
      setError(err.response?.data?.detail || "Login failed");
    }
    setLoading(false);
  };
  const handleLogout = async () => {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL! + "auth/logout/",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getUserData = async () => {
    console.log("getUserData");
    await axios
      .get(process.env.NEXT_PUBLIC_API_BASE_URL! + "auth/me/", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("USER", res.data);
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => setUser(null));
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: isAuthenticated,
        loading,
        error,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
