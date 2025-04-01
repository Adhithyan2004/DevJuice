"use client";  // Make sure this is at the top

import React, { createContext, useState, useEffect } from "react";
import { loginAdmin, setAuthToken } from "./api";

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if we're in the browser before accessing localStorage
  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const [token, setToken] = useState<string | null>(getToken());

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem("token", token);  // Store in localStorage
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const data = await loginAdmin(username, password);
      setToken(data.access_token);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");  // Remove token in browser
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
