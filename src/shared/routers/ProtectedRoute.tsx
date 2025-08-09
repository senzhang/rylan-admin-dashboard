import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/auth'
import { Navigate, useLocation } from 'react-router-dom'
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <>{children}</>
}
