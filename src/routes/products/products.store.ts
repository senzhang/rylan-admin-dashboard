import { create } from 'zustand'
import type { Product } from './products.types'
const KEY = 'mock_products_v1'
function read(): Product[] {
  const raw = localStorage.getItem(KEY); if(raw) return JSON.parse(raw)
  const seed: Product[] = [
    { id: crypto.randomUUID(), name: 'iPhone Case', price: 29.9, stock: 120, category: 'Accessory', status: 'active' },
    { id: crypto.randomUUID(), name: 'Mechanical Keyboard', price: 499, stock: 35, category: 'Peripheral', status: 'active' },
    { id: crypto.randomUUID(), name: 'USB-C Cable', price: 19.9, stock: 300, category: 'Accessory', status: 'inactive' },
  ]; localStorage.setItem(KEY, JSON.stringify(seed)); return seed
}
function write(rows: Product[]){ localStorage.setItem(KEY, JSON.stringify(rows)) }
interface State { list: Product[]; load: () => void; add: (p: Omit<Product,'id'>) => void; update: (id: string, patch: Partial<Omit<Product,'id'>>) => void; remove: (id: string) => void }
export const useProducts = create<State>((set,get)=>({
  list: [], load(){ set({ list: read() }) },
  add(p){ const next=[...get().list, { ...p, id: crypto.randomUUID() }]; write(next); set({ list: next }) },
  update(id, patch){ const next=get().list.map(r=>r.id===id?{...r,...patch}:r); write(next); set({ list: next }) },
  remove(id){ const next=get().list.filter(r=>r.id!==id); write(next); set({ list: next }) },
}))
