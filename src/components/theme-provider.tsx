"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const appliedTheme = useRef<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const theme = stored === "dark" || stored === "light" ? stored : null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(theme ?? (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (theme === appliedTheme.current) return;
    appliedTheme.current = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}