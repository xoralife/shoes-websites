"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("solemate-user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("solemate-users") || "[]");
    const found = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
    if (found) {
      const userData = { name: found.name, email: found.email };
      setUser(userData);
      localStorage.setItem("solemate-user", JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const signup = useCallback((name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("solemate-users") || "[]");
    if (users.some((u: { email: string }) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem("solemate-users", JSON.stringify(users));
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem("solemate-user", JSON.stringify(userData));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("solemate-user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
