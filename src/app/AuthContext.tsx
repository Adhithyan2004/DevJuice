"use client";
import React, { createContext, useState, useEffect } from "react";
import { loginAdmin, logoutAdmin, checkAuth } from "./api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/admin-login") return; // ⛔ Skip on login page
  
    checkAuth().then((admin) => {
      setIsAuthenticated(!!admin);
    });
  }, []);

  const login = async (username: string, password: string) => {
    const success = await loginAdmin(username, password);
    if (success) setIsAuthenticated(true);
    return success;
  };

  const logout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
