import type { Config } from 'tailwindcss'
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(240 5% 84%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(240 10% 3.9%)',
        muted: 'hsl(240 4.8% 95.9%)',
        primary: { DEFAULT: 'hsl(221 83% 53%)', foreground: '#fff' }
      }
    }
  },
  plugins: []
} satisfies Config
