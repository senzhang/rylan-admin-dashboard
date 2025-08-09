import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Product, Status } from './products.types'
import { useProducts } from './products.store'
const schema = z.object({
  name: z.string().min(1, '请输入商品名'),
  price: z.coerce.number().min(0, '价格应大于等于0'),
  stock: z.coerce.number().int().min(0, '库存应为非负整数'),
  category: z.string().min(1, '请输入分类'),
  status: z.enum(['active','inactive']),
  image: z.string().optional()
})
type FormValues = z.infer<typeof schema>
export function ProductEditor({ open, onClose, defaultValues }: { open: boolean; onClose: () => void; defaultValues?: Product }) {
  const { add, update } = useProducts()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaultValues ?? { name:'', price:0, stock:0, category:'', status:'active' } })
  useEffect(()=>{ reset(defaultValues ?? { name:'', price:0, stock:0, category:'', status:'active' }) }, [defaultValues, reset])
  const onSubmit = async (data: FormValues) => { if (defaultValues) update(defaultValues.id, data); else add(data); onClose() }
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4" onClick={e=>e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-3">{defaultValues ? '编辑商品' : '新增商品'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div><label className="block text-sm mb-1">名称</label><input {...register('name')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent"/>{errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}</div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-sm mb-1">价格</label><input type="number" step="0.01" {...register('price')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent"/>{errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}</div>
            <div><label className="block text-sm mb-1">库存</label><input type="number" {...register('stock')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent"/>{errors.stock && <p className="text-sm text-red-600 mt-1">{errors.stock.message}</p>}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="block text-sm mb-1">分类</label><input {...register('category')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent"/></div>
            <div><label className="block text-sm mb-1">状态</label><select {...register('status')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent">{(['active','inactive'] as Status[]).map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          </div>
          <div><label className="block text-sm mb-1">图片URL（可选）</label><input {...register('image')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent"/></div>
          <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={onClose} className="rounded-md border px-3 py-1.5 dark:border-zinc-700">取消</button><button disabled={isSubmitting} className="rounded-md bg-primary text-white px-3 py-1.5">保存</button></div>
        </form>
      </div>
    </div>
  )
}
