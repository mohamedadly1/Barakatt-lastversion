"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AuthContextType {
  isAdmin: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  const login = (username: string, password: string): boolean => {
    // Mock authentication - in production, this would call an API
    if (username === "admin" && password === "admin") {
      setIsAdmin(true)
      // Store in sessionStorage for persistence during session (only in browser)
      try {
        sessionStorage.setItem("isAdmin", "true")
      } catch (e) {
        // sessionStorage not available (SSR context)
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    // Only access storage APIs in browser
    try {
      sessionStorage.removeItem("isAdmin")
      localStorage.removeItem("adminModeEnabled")
      // Dispatch a custom event to notify AdminModeContext to update
      window.dispatchEvent(new Event("adminLogout"))
    } catch (e) {
      // Storage not available (SSR context)
    }
  }

  return <AuthContext.Provider value={{ isAdmin, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
