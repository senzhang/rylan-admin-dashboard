import { useEffect, useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useUsers } from './users.store'
import { UserEditor } from './users.editor'
import type { User } from './users.types'
import { DataTable } from '@/shared/ui/DataTable'
import { RequireRole } from '@/shared/routers/RequireRole'
import { useI18n } from '@/shared/i18n/I18nContext'
export function UsersPage() {
  const { t } = useI18n()
  const { list, remove } = useUsers()
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<User | null>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => { useUsers.getState().load() }, [])
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    const rows = kw ? list.filter(u => u.name.toLowerCase().includes(kw) || u.email.toLowerCase().includes(kw)) : list
    return rows.sort((a,b)=>a.name.localeCompare(b.name))
  }, [list, q])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t('users')}</h1>
        <RequireRole roles={['admin','editor']}>
          <button onClick={()=>{ setEditing(null); setOpen(true) }} className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-3 py-2"><Plus size={16}/> {t('add')}</button>
        </RequireRole>
      </div>
      <div className="rounded-xl border dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="p-3 border-b dark:border-zinc-800 flex items-center gap-2">
          <div className="relative w-72 max-w-full">
            <Search className="absolute left-2 top-2.5" size={16}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('searchPlaceholder')} className="w-full pl-8 pr-3 py-2 rounded-md border dark:border-zinc-700 bg-transparent"/>
          </div>
        </div>
        <DataTable<User>
          columns={[
            { key: 'name', title: t('name') },
            { key: 'email', title: t('email') },
            { key: 'role', title: t('role'), render: r => <span className="inline-flex rounded-full bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 text-xs">{r.role}</span> },
          ]}
          data={filtered}
          actions={(u)=>(
            <div className="flex gap-2">
              <RequireRole roles={['admin','editor']}>
                <button onClick={()=>{ setEditing(u); setOpen(true) }} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs dark:border-zinc-700"><Pencil size={14}/> {t('edit')}</button>
              </RequireRole>
              <RequireRole roles={['admin']}>
                <button onClick={()=>{ if(confirm(t('confirmDelete'))) remove(u.id) }} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-red-600 border-red-200 dark:border-red-900"><Trash2 size={14}/> {t('delete')}</button>
              </RequireRole>
            </div>
          )}
        />
      </div>
      {open && (<UserEditor open={open} onClose={()=>setOpen(false)} defaultValues={editing ?? undefined} />)}
    </div>
  )
}
