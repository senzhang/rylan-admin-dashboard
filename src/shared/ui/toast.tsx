import { createContext, useContext, useState, type ReactNode } from 'react'
type Toast = { id: string; message: string }
const ToastCtx = createContext<{ push:(m:string)=>void } | null>(null)
export function ToastProvider({ children }: { children: ReactNode }){
  const [list, setList] = useState<Toast[]>([])
  const push = (m: string) => {
    const id = crypto.randomUUID()
    setList(s=>[...s,{id, message:m}])
    setTimeout(()=> setList(s=>s.filter(x=>x.id!==id)), 2500)
  }
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="toast">
        {list.map(t => <div key={t.id} className="toast-item">{t.message}</div>)}
      </div>
    </ToastCtx.Provider>
  )
}
export function useToast(){
  const ctx = useContext(ToastCtx); if(!ctx) throw new Error('useToast must be used within ToastProvider'); return ctx
}
