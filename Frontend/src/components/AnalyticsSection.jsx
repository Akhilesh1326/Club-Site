import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", total: 100 },
  { name: "Feb", total: 120 },
  { name: "Mar", total: 170 },
  { name: "Apr", total: 140 },
  { name: "May", total: 200 },
  { name: "Jun", total: 180 },
]

const AnalyticsSection = () => {
  return (
    <div className="col-span-4 bg-white shadow-md rounded-2xl p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Monthly Member Activity</h2>
      </div>
      <div className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AnalyticsSection