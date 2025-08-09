import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  set: (t: Theme) => void
  toggle: () => void
}

function applyTheme(t: Theme) {
  const el = document.documentElement
  el.classList.remove('light', 'dark')
  el.classList.add(t)
}

const initial = (typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme | null) : null) || 'light'

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initial,
  set: (t) => {
    localStorage.setItem('theme', t)
    applyTheme(t)
    set({ theme: t })
  },
  toggle: () => set((s) => {
    const next: Theme = s.theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', next)
    applyTheme(next)
    return { theme: next }
  }),
}))
