import type { ReactNode } from 'react'
type Column<T> = { key: keyof T; title: ReactNode; render?: (row: T) => ReactNode; width?: string }
export function DataTable<T extends { id: string }>({ columns, data, actions }: { columns: Column<T>[]; data: T[]; actions?: (row: T)=>ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left bg-gray-50 dark:bg-zinc-800">
            {columns.map((c,i)=>(<th key={i} className="p-3" style={{width:c.width}}>{c.title}</th>))}
            {actions && <th className="p-3 w-40">操作</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-t dark:border-zinc-800">
              {columns.map((c,i)=>(<td key={i} className="p-3">{c.render? c.render(row) : String(row[c.key])}</td>))}
              {actions && <td className="p-3">{actions(row)}</td>}
            </tr>
          ))}
          {data.length===0 && <tr><td colSpan={(columns.length + (actions?1:0))} className="p-6 text-center text-gray-500">暂无数据</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
