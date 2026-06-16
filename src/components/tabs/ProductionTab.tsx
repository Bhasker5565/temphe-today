import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts'
import type { Operator } from '../../types'

function StatusBadge({ kg, target }: { kg: number; target: number }) {
  if (kg >= target * 0.944) return <span className="text-forest font-semibold">On Target ✅</span>
  if (kg >= target * 0.78) return <span className="text-turmeric-dark font-semibold">Near Target 🟡</span>
  return <span className="text-red-600 font-semibold">Below Target 🔴</span>
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value
    const color = val >= 85 ? '#2C4A1E' : val >= 70 ? '#C07820' : '#DC2626'
    return (
      <div className="bg-white border border-cream-warm shadow-warm px-3 py-2">
        <p className="font-sans text-xs text-charcoal/60 mb-1">{label}</p>
        <p className="font-sans text-sm font-semibold" style={{ color }}>
          {val} kg
        </p>
      </div>
    )
  }
  return null
}

export default function ProductionTab({ operator }: { operator: Operator }) {
  const data = operator.weeklyData.map(w => ({
    week: w.week,
    kg: w.production,
    note: w.productionNote,
  }))

  const thisWeek = operator.weeklyData[operator.weeklyData.length - 1]

  return (
    <div className="space-y-10">
      {/* This week highlight */}
      <div>
        <p className="section-label mb-4">This Week</p>
        <div className="flex items-end gap-6 flex-wrap">
          <div>
            <div className="font-display text-5xl font-bold text-charcoal leading-none">
              {operator.lastWeekProduction}
              <span className="text-2xl font-normal text-charcoal/40 ml-2">kg</span>
            </div>
            <div className="font-sans text-sm text-charcoal/50 mt-1">
              of {operator.productionTarget} kg weekly target
            </div>
          </div>
          <div className="font-sans text-base pb-1">
            <StatusBadge kg={operator.lastWeekProduction} target={operator.productionTarget} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-3 bg-cream-deep w-full max-w-md overflow-hidden">
          <div
            className="h-full transition-all duration-700"
            style={{
              width: `${Math.min(100, (operator.lastWeekProduction / operator.productionTarget) * 100)}%`,
              backgroundColor: operator.lastWeekProduction >= 85 ? '#2C4A1E' : operator.lastWeekProduction >= 70 ? '#E8A83E' : '#DC2626',
            }}
          />
        </div>
      </div>

      {/* 12-week chart */}
      <div className="border-t border-cream-warm pt-10">
        <p className="section-label mb-6">12-Week Production Chart</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -10 }}>
              <CartesianGrid vertical={false} stroke="#ECD9A8" strokeDasharray="0" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans', fill: '#1C0D0460' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans', fill: '#1C0D0460' }}
                axisLine={false}
                tickLine={false}
              />
              <ReferenceLine
                y={90}
                stroke="#E8A83E"
                strokeDasharray="4 3"
                strokeWidth={1.5}
                label={{ value: 'Target', position: 'right', fontSize: 9, fill: '#C07820', fontFamily: 'Plus Jakarta Sans' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F5E8CC' }} />
              <Bar dataKey="kg" radius={[2, 2, 0, 0]} maxBarSize={28}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.kg >= 85 ? '#2C4A1E' : entry.kg >= 70 ? '#E8A83E' : '#DC2626'}
                    fillOpacity={index === data.length - 1 ? 1 : 0.65}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-forest" />
            <span className="font-sans text-xs text-charcoal/50">On target (≥85 kg)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-turmeric" />
            <span className="font-sans text-xs text-charcoal/50">Near target (70–84 kg)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span className="font-sans text-xs text-charcoal/50">Below target (&lt;70 kg)</span>
          </div>
        </div>
      </div>

      {/* Cumulative */}
      <div className="border-t border-cream-warm pt-10">
        <p className="section-label mb-2">Cumulative Total</p>
        <div className="font-display text-4xl font-bold text-charcoal">
          {operator.cumulativeProduction.toLocaleString()}
          <span className="text-xl font-normal text-charcoal/40 ml-2">kg</span>
        </div>
        <p className="font-sans text-sm text-charcoal/50 mt-1">
          total tempeh produced since {operator.name.split(' ')[0]} began {operator.yearsInOperation} {operator.yearsInOperation === 1 ? 'year' : 'years'} ago
        </p>
      </div>

      {/* Operator's note */}
      {thisWeek.productionNote && (
        <div className="border-t border-cream-warm pt-10">
          <p className="section-label mb-3">Operator's Note</p>
          <div className="bg-cream-warm border-l-4 border-turmeric pl-4 py-3">
            <p className="font-sans text-charcoal/75 text-sm leading-relaxed italic">
              "{thisWeek.productionNote}"
            </p>
            <p className="font-sans text-xs text-charcoal/40 mt-2">
              — {operator.name}, week of 9 Jun 2026
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
