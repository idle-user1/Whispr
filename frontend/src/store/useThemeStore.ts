import { create } from 'zustand'

interface ThemeStore {
  theme: string
  setTheme: (newTheme: string) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  setTheme: (newTheme: string) => set({ theme: newTheme }),
}))

