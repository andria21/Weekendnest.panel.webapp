// stores/useAuth.ts
"use client"

import { create } from "zustand"

export type User = {
  name: string
  email: string
}

type AuthState = {
  user: User | null
  initialized: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  init: () => void
}

const STORAGE_KEY = "fake_auth_user"

export const useAuth = create<AuthState>((set) => ({
  user: null,
  initialized: false,

  init: () => {
    if (typeof window === "undefined") return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      set({ user: JSON.parse(raw), initialized: true })
    } else {
      set({ initialized: true })
    }
  },

  login: async (email: string, password: string) => {
    const FAKE_EMAIL = "demo@demo.com"
    const FAKE_PASSWORD = "password123"

    await new Promise((r) => setTimeout(r, 200))

    if (email === FAKE_EMAIL && password === FAKE_PASSWORD) {
      const u: User = { name: "Demo User", email }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
      set({ user: u })
      return true
    }
    return false
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ user: null })
  },
}))
