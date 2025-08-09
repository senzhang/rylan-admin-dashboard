import { Suspense, lazy } from 'react'
import { AppLayout } from '@/shared/layouts/AppLayout'
import { ProtectedRoute } from '@/shared/routers/ProtectedRoute'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ErrorBoundary } from '@/shared/routers/ErrorBoundary'
const DashboardPage = lazy(() => import('@/routes/DashboardPage').then(m=>({default:m.DashboardPage})))
const UsersPage = lazy(() => import('@/routes/users/UsersPage').then(m=>({default:m.UsersPage})))
const ProductsPage = lazy(() => import('@/routes/products/ProductsPage').then(m=>({default:m.ProductsPage})))
const SettingsPage = lazy(() => import('@/routes/SettingsPage').then(m=>({default:m.SettingsPage})))
const LoginPage = lazy(() => import('@/routes/auth/LoginPage').then(m=>({default:m.LoginPage})))
export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
