"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const saved = window.localStorage.getItem("theme") as Theme | null
    if (saved === "dark" || saved === "light") {
      setThemeState(saved)
      return
    }
    setThemeState(defaultTheme)
  }, [defaultTheme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    root.setAttribute("data-theme", theme)
    window.localStorage.setItem("theme", theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (nextTheme: Theme) => setThemeState(nextTheme),
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
