export type Status = 'active' | 'inactive'
export interface Product { id: string; name: string; price: number; stock: number; category: string; status: Status; image?: string }
