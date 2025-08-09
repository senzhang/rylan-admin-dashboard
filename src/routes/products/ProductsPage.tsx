import { useEffect, useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useProducts } from './products.store'
import { ProductEditor } from './ProductEditor'
import type { Product } from './products.types'
import { DataTable } from '@/shared/ui/DataTable'
import { RequireRole } from '@/shared/routers/RequireRole'
export function ProductsPage() {
  const { list, remove } = useProducts()
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<Product | null>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => { useProducts.getState().load() }, [])
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase()
    const rows = kw ? list.filter(p => p.name.toLowerCase().includes(kw) || p.category.toLowerCase().includes(kw)) : list
    return rows.sort((a,b)=>a.name.localeCompare(b.name))
  }, [list, q])
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">商品管理</h1>
        <RequireRole roles={['admin','editor']}>
          <button onClick={()=>{ setEditing(null); setOpen(true) }} className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-3 py-2"><Plus size={16}/> 新增商品</button>
        </RequireRole>
      </div>
      <div className="rounded-xl border dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="p-3 border-b dark:border-zinc-800 flex items-center gap-2">
          <div className="relative w-72 max-w-full">
            <Search className="absolute left-2 top-2.5" size={16}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="搜索商品名或分类" className="w-full pl-8 pr-3 py-2 rounded-md border dark:border-zinc-700 bg-transparent"/>
          </div>
        </div>
        <DataTable<Product>
          columns={[
            { key:'name', title:'名称' },
            { key:'category', title:'分类' },
            { key:'price', title:'价格', render:r=>`¥${r.price.toFixed(2)}` },
            { key:'stock', title:'库存' },
            { key:'status', title:'状态', render:r=>(<span className="inline-flex rounded-full bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 text-xs">{r.status}</span>) },
          ]}
          data={filtered}
          actions={(p)=>(
            <div className="flex gap-2">
              <RequireRole roles={['admin','editor']}>
                <button onClick={()=>{ setEditing(p); setOpen(true) }} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs dark:border-zinc-700"><Pencil size={14}/> 编辑</button>
              </RequireRole>
              <RequireRole roles={['admin']}>
                <button onClick={()=>{ if(confirm('确认删除该商品？')) remove(p.id) }} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-red-600 border-red-200 dark:border-red-900"><Trash2 size={14}/> 删除</button>
              </RequireRole>
            </div>
          )}
        />
      </div>
      {open && (<ProductEditor open={open} onClose={()=>setOpen(false)} defaultValues={editing ?? undefined} />)}
    </div>
  )
}
