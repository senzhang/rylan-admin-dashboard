import { create } from 'zustand'
import type { User } from './users.types'
const KEY = 'mock_users_v2'
function read(): User[] {
  const raw = localStorage.getItem(KEY)
  if (raw) return JSON.parse(raw)
  const seed: User[] = [
    { id: crypto.randomUUID(), name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: crypto.randomUUID(), name: 'Bob', email: 'bob@example.com', role: 'editor' },
    { id: crypto.randomUUID(), name: 'Cindy', email: 'cindy@example.com', role: 'viewer' },
  ]
  localStorage.setItem(KEY, JSON.stringify(seed))
  return seed
}
function write(rows: User[]) { localStorage.setItem(KEY, JSON.stringify(rows)) }
interface UsersState { list: User[]; load: () => void; add: (u: Omit<User, 'id'>) => void; update: (id: string, patch: Partial<Omit<User, 'id'>>) => void; remove: (id: string) => void }
export const useUsers = create<UsersState>((set, get) => ({
  list: [], load() { set({ list: read() }) },
  add(u) { const next = [...get().list, { ...u, id: crypto.randomUUID() }]; write(next); set({ list: next }) },
  update(id, patch) { const next = get().list.map(r => r.id===id ? { ...r, ...patch } : r); write(next); set({ list: next }) },
  remove(id) { const next = get().list.filter(r => r.id!==id); write(next); set({ list: next }) },
}))
