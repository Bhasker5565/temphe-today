import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Dot,
} from 'recharts'
import type { Operator } from '../../types'

function HappinessEmoji({ score }: { score: number }) {
  if (score >= 9) return <>😊</>
  if (score >= 7) return <>🙂</>
  if (score >= 5) return <>😐</>
  return <>😔</>
}

const CustomDot = (props: { cx?: number; cy?: number; payload?: { score: number } }) => {
  const { cx, cy, payload } = props
  if (!cx || !cy || !payload) return null
  const color = payload.score >= 9 ? '#2C4A1E' : payload.score >= 7 ? '#E8A83E' : '#DC2626'
  return <Dot cx={cx} cy={cy} r={4} fill={color} stroke="#FBF5E8" strokeWidth={2} />
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value
    const emoji = val >= 9 ? '😊' : val >= 7 ? '🙂' : val >= 5 ? '😐' : '😔'
    return (
      <div className="bg-white border border-cream-warm shadow-warm px-3 py-2">
        <p className="font-sans text-xs text-charcoal/60 mb-1">{label}</p>
        <p className="font-sans text-sm font-semibold text-charcoal">
          {emoji} {val}/10
        </p>
      </div>
    )
  }
  return null
}

export default function HappinessTab({ operator }: { operator: Operator }) {
  const data = operator.weeklyData.map(w => ({
    week: w.week,
    score: w.happiness,
    smileNote: w.smileNote,
    challengeNote: w.challengeNote,
  }))

  const thisWeek = operator.weeklyData[operator.weeklyData.length - 1]
  const allTimeAvg = (
    operator.weeklyData.reduce((sum, w) => sum + w.happiness, 0) / operator.weeklyData.length
  ).toFixed(1)

  const emoji = operator.happinessScore >= 9 ? '😊'
    : operator.happinessScore >= 7 ? '🙂'
    : operator.happinessScore >= 5 ? '😐' : '😔'

  return (
    <div className="space-y-10">
      {/* This week */}
      <div>
        <p className="section-label mb-4">This Week's Score</p>
        <div className="flex items-center gap-6">
          <div className="text-6xl leading-none">{emoji}</div>
          <div>
            <div className="font-display text-5xl font-bold text-charcoal leading-none">
              {operator.happinessScore}
              <span className="text-2xl font-normal text-charcoal/40 ml-1">/10</span>
            </div>
            <div className="font-sans text-sm text-charcoal/50 mt-1">
              All-time average: <span className="font-semibold text-charcoal">{allTimeAvg}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div className="border-t border-cream-warm pt-10">
        <p className="section-label mb-6">Happiness Trend (12 Weeks)</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -10 }}>
              <CartesianGrid horizontal strokeDasharray="4 3" stroke="#ECD9A8" vertical={false} />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans', fill: '#1C0D0460' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 10]}
                ticks={[2, 4, 6, 8, 10]}
                tick={{ fontSize: 10, fontFamily: 'Plus Jakarta Sans', fill: '#1C0D0460' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#E8A83E"
                strokeWidth={2.5}
                dot={(props) => <CustomDot {...props} payload={{ score: props.payload?.score }} />}
                activeDot={{ r: 6, fill: '#522903', stroke: '#FBF5E8', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Her words */}
      {(thisWeek.smileNote || thisWeek.challengeNote) && (
        <div className="border-t border-cream-warm pt-10">
          <p className="section-label mb-4">Her Words This Week</p>
          <div className="space-y-4">
            {thisWeek.smileNote && (
              <div className="flex gap-4">
                <div className="text-2xl shrink-0 mt-0.5">😊</div>
                <div>
                  <p className="font-sans text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-1">
                    What made me smile
                  </p>
                  <p className="font-sans text-charcoal/80 text-sm leading-relaxed">
                    "{thisWeek.smileNote}"
                  </p>
                </div>
              </div>
            )}
            {thisWeek.challengeNote && (
              <div className="flex gap-4">
                <div className="text-2xl shrink-0 mt-0.5">💪</div>
                <div>
                  <p className="font-sans text-xs font-semibold text-charcoal/40 uppercase tracking-wider mb-1">
                    My challenge this week
                  </p>
                  <p className="font-sans text-charcoal/80 text-sm leading-relaxed">
                    "{thisWeek.challengeNote}"
                  </p>
                </div>
              </div>
            )}
          </div>
          <p className="font-sans text-xs text-charcoal/30 mt-4">
            — {operator.name}, week of 9 Jun 2026
          </p>
        </div>
      )}

      {/* All-time average */}
      <div className="border-t border-cream-warm pt-10">
        <p className="section-label mb-2">All-Time Average Happiness</p>
        <div className="flex items-center gap-3">
          <HappinessEmoji score={parseFloat(allTimeAvg)} />
          <div>
            <span className="font-display text-3xl font-bold text-charcoal">
              {allTimeAvg}
            </span>
            <span className="font-sans text-lg text-charcoal/40 ml-1">/10</span>
          </div>
        </div>
        <p className="font-sans text-sm text-charcoal/50 mt-1">
          across {operator.weeklyData.length} weeks since {operator.name.split(' ')[0]} began
        </p>
      </div>
    </div>
  )
}
