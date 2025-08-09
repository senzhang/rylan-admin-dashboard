import { useAuthStore } from '@/store/auth'
import { useNavigate, useLocation, type Location } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useI18n } from '@/shared/i18n/I18nContext'
const schema = z.object({ name: z.string().min(1, '请输入账号'), password: z.string().min(1, '请输入密码') })
type FormValues = z.infer<typeof schema>
export function LoginPage() {
  const { t } = useI18n()
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const location = useLocation() as Location & { state?: { from?: Location } }
  const from = location.state?.from?.pathname || '/'
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: FormValues) => {
    try { await login(data.name, data.password); navigate(from, { replace: true }) } catch (e: any) { alert(e.message) }
  }
  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[360px] space-y-3 p-6 rounded-xl border dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <h1 className="text-xl font-semibold">{t('login')}</h1>
        <div>
          <label className="block text-sm mb-1">{t('account')}</label>
          <input {...register('name')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent" />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">{t('password')}</label>
          <input type="password" {...register('password')} className="w-full rounded-md border px-3 py-2 dark:border-zinc-700 bg-transparent" />
          {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting} className="w-full rounded-md bg-primary text-white py-2 disabled:opacity-60">{isSubmitting ? '...' : t('signIn')}</button>
      </form>
    </div>
  )
}
