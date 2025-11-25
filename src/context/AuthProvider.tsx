"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    Cookies.remove("UserData", { path: "/" });
    Cookies.remove("UserToken", { path: "/" });
    Cookies.remove("CurrentDeviceToken", { path: "/" });
    setUser(null);
    setToken(null);
  };

  // Load authentication state
  useEffect(() => {
    const userCookie = Cookies.get("UserData");
    const tokenCookie = Cookies.get("UserToken");

    if (userCookie && tokenCookie) {
      try {
        setUser(JSON.parse(userCookie));
        setToken(tokenCookie);
      } catch (err) {
        console.error("Failed to parse cookie", err);
        logout();
      }
    } else {
      // 👇 Auto logout if cookies are missing
      logout();
    }
  }, []);

  const login = (data: any, token: string) => {
    Cookies.set("UserData", JSON.stringify(data), { expires: 7, path: "/" });
    Cookies.set("UserToken", token, { expires: 7, path: "/" });

    setUser(data);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
