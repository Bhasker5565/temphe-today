import { Link } from 'react-router-dom'
import type { Operator, InvestmentType } from '../types'

function ProductionMeter({ kg, target = 90 }: { kg: number; target?: number }) {
  const dots = 15
  const filled = Math.round(Math.min(dots, (kg / target) * dots))
  const color = kg >= 85 ? '#2C4A1E' : kg >= 70 ? '#E8A83E' : '#DC2626'
  const bgColor = kg >= 85 ? '#EAF0E5' : kg >= 70 ? '#FDF6E3' : '#FEF2F2'
  const label = kg >= 85 ? '✅' : kg >= 70 ? '🟡' : '🔴'

  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        {Array.from({ length: dots }, (_, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full transition-colors"
            style={{ backgroundColor: i < filled ? color : bgColor }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-sans text-sm font-semibold" style={{ color }}>
          {kg} kg
        </span>
        <span className="text-xs">{label}</span>
        <span className="font-sans text-xs text-charcoal/40">/ {target} kg target</span>
      </div>
    </div>
  )
}

function InvestmentBadge({ type }: { type: InvestmentType }) {
  const classMap: Record<InvestmentType, string> = {
    'Grant': 'badge-grant',
    'Loan': 'badge-loan',
    'Loan with Interest': 'badge-interest',
    'Equity': 'badge-equity',
  }
  const labelMap: Record<InvestmentType, string> = {
    'Grant': 'Grant',
    'Loan': 'Impact Loan',
    'Loan with Interest': 'Loan + Interest',
    'Equity': 'Equity',
  }
  return <span className={classMap[type]}>{labelMap[type]}</span>
}

export default function OperatorCard({ operator }: { operator: Operator }) {
  const happinessEmoji = operator.happinessScore >= 9 ? '😊'
    : operator.happinessScore >= 7 ? '🙂'
    : operator.happinessScore >= 5 ? '😐' : '😔'

  return (
    <Link
      to={`/operator/${operator.id}`}
      className="group block bg-cream border border-cream-deep hover:border-brand/30 shadow-warm hover:shadow-warm-hover transition-all duration-300 ease-out overflow-hidden rounded-lg hover:-translate-y-1"
    >
      {/* Photo */}
      <div className="relative h-44 bg-cream-warm overflow-hidden">
        <img
          src={operator.bannerPhoto}
          alt={`${operator.name}'s MFU unit`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

        {/* Profile photo overlay */}
        <div className="absolute bottom-0 left-0 p-3.5 flex items-end gap-2.5">
          <img
            src={operator.photo}
            alt={operator.name}
            className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-lg ring-2 ring-white/20"
          />
          <div>
            <div className="font-display text-white font-semibold text-base leading-tight drop-shadow-sm">
              {operator.name}
            </div>
            <div className="font-sans text-white/65 text-xs">{operator.city}, {operator.state}</div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* One-liner */}
        <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-4 line-clamp-2">
          {operator.oneLiner}
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 divide-x divide-cream-deep border border-cream-deep rounded-md overflow-hidden mb-4">
          <div className="px-3 py-2.5 bg-cream/50">
            <p className="section-label mb-1">Happiness</p>
            <div className="flex items-center gap-1.5">
              <span className="text-base leading-none">{happinessEmoji}</span>
              <span className="font-sans text-sm font-bold text-charcoal">{operator.happinessScore}/10</span>
            </div>
          </div>
          <div className="px-3 py-2.5 bg-cream/50">
            <p className="section-label mb-1">MFU ID</p>
            <span className="font-sans text-sm font-medium text-charcoal/55">{operator.mfuId}</span>
          </div>
        </div>

        {/* Production meter */}
        <div className="mb-4">
          <p className="section-label mb-1.5">Last Week's Production</p>
          <ProductionMeter kg={operator.lastWeekProduction} target={operator.productionTarget} />
        </div>

        {/* Badges + CTA */}
        <div className="pt-3.5 border-t border-cream-deep flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {operator.investmentTypes.map(type => (
              <InvestmentBadge key={type} type={type} />
            ))}
          </div>
          <span className="font-sans text-sm font-semibold text-brand group-hover:text-brand-light transition-colors flex items-center gap-1 shrink-0">
            View Her Story
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
