/* THEME_INIT */
(() => {
  try {
    const t = (localStorage.getItem('theme') as 'light'|'dark'|null) || 'light';
    const el = document.documentElement;
    el.classList.remove('light','dark');
    el.classList.add(t);
  } catch {}
})();

// ✅ 初始化主题
const savedTheme = localStorage.getItem('theme') || 'light'
document.documentElement.classList.add(savedTheme)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ToastProvider } from '@/shared/ui/toast'
import { I18nProvider } from '@/shared/i18n/I18nContext'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
)
