import { useThemeStore } from '@/store/theme'
import { useI18n } from '@/shared/i18n/I18nContext'
export function SettingsPage() {
  const { theme, set } = useThemeStore()
  const { t, locale, setLocale } = useI18n()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t('settings')}</h1>
      <div className="rounded-xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 max-w-md space-y-3">
        <div className="text-sm text-gray-500">{t('theme')}</div>
        <div className="flex gap-2">
          <button onClick={() => set('light')} className={`${theme==='light'?'bg-primary text-white':''} px-3 py-1.5 rounded-md border`}>{t('light')}</button>
          <button onClick={() => set('dark')} className={`${theme==='dark'?'bg-primary text-white':''} px-3 py-1.5 rounded-md border`}>{t('dark')}</button>
        </div>
        <div className="text-sm text-gray-500">Locale</div>
        <select value={locale} onChange={e=>setLocale(e.target.value as any)} className="rounded-md border px-2 py-1 text-sm dark:border-zinc-700 bg-transparent">
          <option value="zh-CN">中文</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  )
}
