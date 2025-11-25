// src/context/AuthProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load auth from cookies when app opens
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const tokenCookie = Cookies.get("token");

    if (userCookie && tokenCookie) {
      try {
        setUser(JSON.parse(userCookie));
        setToken(tokenCookie);
      } catch (err) {
        console.error("Failed to parse cookie", err);
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  const login = (data: any, token: string) => {

    console.log("datadsfsdf",data);
    Cookies.set("UserData", JSON.stringify(data), { expires: 1 }); // expires in 7 days
    Cookies.set("UserToken", token, { expires: 1 });
    setUser(data);
    setToken(token);
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
