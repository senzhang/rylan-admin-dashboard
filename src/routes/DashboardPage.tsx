import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
export function DashboardPage() {
  const data = [
    { name: 'Mon', uv: 120 }, { name: 'Tue', uv: 200 }, { name: 'Wed', uv: 150 },
    { name: 'Thu', uv: 280 }, { name: 'Fri', uv: 220 }, { name: 'Sat', uv: 340 }, { name: 'Sun', uv: 260 },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
          <div className="text-sm text-gray-500 mb-2">Weekly Active</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" /><YAxis /><Tooltip />
                <Line type="monotone" dataKey="uv" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
          <div className="text-sm text-gray-500 mb-2">KPI Placeholder</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Extend more charts or KPIs here.</p>
        </div>
      </div>
    </div>
  )
}
