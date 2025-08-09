import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
type Locale = 'zh-CN' | 'en'
type Dict = Record<string, string>
const zhCN: Dict = {
  dashboard: '仪表盘', users: '用户管理', products: '商品管理', settings: '系统设置',
  welcome: '欢迎回来', light: '浅色', dark: '深色',
  login: '登录', account: '账号', password: '密码', signIn: '登录',
  searchPlaceholder: '搜索姓名或邮箱', add: '新增', edit: '编辑', delete: '删除',
  role: '角色', email: '邮箱', name: '姓名', actions: '操作', confirmDelete: '确认删除该项？',
  theme: '主题'
}
const en: Dict = {
  dashboard: 'Dashboard', users: 'Users', products: 'Products', settings: 'Settings',
  welcome: 'Welcome back', light: 'Light', dark: 'Dark',
  login: 'Login', account: 'Account', password: 'Password', signIn: 'Sign in',
  searchPlaceholder: 'Search name or email', add: 'Add', edit: 'Edit', delete: 'Delete',
  role: 'Role', email: 'Email', name: 'Name', actions: 'Actions', confirmDelete: 'Are you sure to delete?',
  theme: 'Theme'
}
const packs: Record<Locale, Dict> = { 'zh-CN': zhCN, en }
const I18nCtx = createContext<{t:(k:string)=>string; locale: Locale; setLocale:(l:Locale)=>void} | null>(null)
export function I18nProvider({ children }: { children: ReactNode }){
  const [locale, setLocale] = useState<Locale>((localStorage.getItem('locale') as Locale) || 'zh-CN')
  const t = useMemo(()=>{
    const dict = packs[locale] || zhCN
    return (k: string) => dict[k] || k
  },[locale])
  const value = useMemo(()=>({ t, locale, setLocale:(l:Locale)=>{localStorage.setItem('locale', l); setLocale(l)} }),[t, locale])
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}
export function useI18n(){
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
