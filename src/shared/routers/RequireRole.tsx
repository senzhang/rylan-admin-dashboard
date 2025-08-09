import type { ReactNode } from 'react'
import { useAuthStore, type Role } from '@/store/auth'
export function RequireRole({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const has = useAuthStore(s=>s.hasRole)
  if (!has(roles)) return null
  return <>{children}</>
}
