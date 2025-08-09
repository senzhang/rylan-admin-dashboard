import { create } from 'zustand'
export type Role = 'admin' | 'editor' | 'viewer'
export interface User { id: string; name: string; role: Role }
interface AuthState {
  user: User | null
  login: (name: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (roles: Role | Role[]) => boolean
}
export const useAuthStore = create<AuthState>((set, get) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  async login(name, password) {
    if (!name || !password) throw new Error('请输入账户与密码')
    // 简单账号分配角色：name=admin/editor/viewer
    const role = (['admin','editor','viewer'] as Role[]).includes(name as Role) ? (name as Role) : 'admin'
    const user = { id: crypto.randomUUID(), name, role }
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },
  logout() {
    localStorage.removeItem('user'); set({ user: null })
  },
  hasRole(roles) {
    const r = Array.isArray(roles) ? roles : [roles]
    const u = get().user
    return !!u && r.includes(u.role)
  }
}))
