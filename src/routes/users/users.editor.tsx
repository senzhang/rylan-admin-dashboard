import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User, Role } from './users.types'
import { useUsers } from './users.store'
import { useI18n } from '@/shared/i18n/I18nContext'
const schema = z.object({ name: z.string().min(1, '请输入姓名'), email: z.string().email('邮箱格式不正确'), role: z.enum(['admin','editor','viewer']) })
type FormValues = z.infer<typeof schema>
export function UserEditor({ open, onClose, defaultValues }: { open: boolean; onClose: () => void; defaultValues?: User }) {
  const { t } = useI18n()
  const { add, update } = useUsers()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaultValues ?? { name:'', email:'', role:'viewer' } })
  useEffect(()=>{ reset(defaultValues ?? { name:'', email:'', role:'viewer' }) }, [defaultValues, reset])
  const onSubmit = async (data: FormValues) => { if (defaultValues) update(defaultValues.id, data); else add(data); onClose() }
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4" onClick={e=>e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-3">{defaultValues ? t('edit') : t('add')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">{t('name')}</label>
            <input {...register('name')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent"/>
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">{t('email')}</label>
            <input {...register('email')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent"/>
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">{t('role')}</label>
            <select {...register('role')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent">
              {(['admin','editor','viewer'] as Role[]).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-md border px-3 py-1.5 dark:border-zinc-700">取消</button>
            <button disabled={isSubmitting} className="rounded-md bg-primary text-white px-3 py-1.5">保存</button>
          </div>
        </form>
      </div>
    </div>
  )
}
