import { Outlet, NavLink } from 'react-router-dom'
import { useThemeStore } from '@/store/theme'
import { useAuthStore } from '@/store/auth'
import { LogOut, Moon, Sun } from 'lucide-react'
import { useI18n } from '@/shared/i18n/I18nContext'
export function AppLayout() {
  const { theme, toggle } = useThemeStore()
  const logout = useAuthStore((s) => s.logout)
  const { t, locale, setLocale } = useI18n()
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr] grid-rows-[56px_1fr] dark:bg-zinc-950 dark:text-zinc-100">
      <aside className="row-span-2 col-start-1 border-r dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3">
        <div className="text-xl font-bold px-2 py-2">Rylan Admin</div>
        <nav className="space-y-1 mt-2">
          <NavLink to="/" className={linkClass}>{t('dashboard')}</NavLink>
          <NavLink to="/users" className={linkClass}>{t('users')}</NavLink>
          <NavLink to="/products" className={linkClass}>{t('products')}</NavLink>
          <NavLink to="/settings" className={linkClass}>{t('settings')}</NavLink>
        </nav>
      </aside>
      <header className="col-start-2 h-14 border-b dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur flex items-center justify-between px-4">
        <div className="font-medium">{t('welcome')} 👋</div>
        <div className="flex items-center gap-2">
          <select value={locale} onChange={e=>setLocale(e.target.value as any)} className="rounded-md border px-2 py-1 text-sm dark:border-zinc-700 bg-transparent">
            <option value="zh-CN">中文</option>
            <option value="en">English</option>
          </select>
          <button onClick={toggle} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border dark:border-zinc-700">
            {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>} {theme === 'dark' ? t('light') : t('dark')}
          </button>
          <button onClick={logout} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border dark:border-zinc-700">
            <LogOut size={16}/> 退出
          </button>
        </div>
      </header>
      <main className="col-start-2 p-4">
        <div className="container"><Outlet /></div>
      </main>
    </div>
  )
}
