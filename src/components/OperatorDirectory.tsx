import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { operators } from '../data/operators'
import OperatorCard from './OperatorCard'
import type { InvestmentType } from '../types'

const STATES = ['All States', ...Array.from(new Set(operators.map(o => o.state))).sort()]
const INVESTMENT_TYPES: InvestmentType[] = ['Grant', 'Loan', 'Loan with Interest', 'Equity']

export default function OperatorDirectory() {
  const [query, setQuery] = useState('')
  const [selectedState, setSelectedState] = useState('All States')
  const [selectedTypes, setSelectedTypes] = useState<InvestmentType[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleType = (type: InvestmentType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const filtered = useMemo(() => {
    return operators.filter(op => {
      const matchesQuery =
        !query ||
        op.name.toLowerCase().includes(query.toLowerCase()) ||
        op.city.toLowerCase().includes(query.toLowerCase())

      const matchesState =
        selectedState === 'All States' || op.state === selectedState

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.some(t => op.investmentTypes.includes(t))

      return matchesQuery && matchesState && matchesType
    })
  }, [query, selectedState, selectedTypes])

  return (
    <section id="operators" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="section-label mb-2">Our Operators</p>
          <h2 className="font-display text-charcoal text-3xl md:text-4xl font-bold mb-3 [font-optical-sizing:none]">
            Meet the women building India's tempeh future
          </h2>
          <p className="font-sans text-charcoal/60 text-base max-w-2xl">
            Each profile is updated weekly by the operator herself — production numbers, happiness scores, and the moments that matter most.
          </p>
        </div>

        {/* Search & Filter bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type="text"
                placeholder="Search by operator name or city…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-cream-warm font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>

            {/* State dropdown */}
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              className="px-4 py-3 bg-white border border-cream-warm font-sans text-sm text-charcoal focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand sm:w-48"
            >
              {STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border font-sans text-sm font-medium transition-colors ${
                showFilters || selectedTypes.length > 0
                  ? 'bg-brand text-cream border-brand'
                  : 'bg-white border-cream-warm text-charcoal/70 hover:border-brand/40'
              }`}
            >
              <SlidersHorizontal size={15} />
              Investment Type
              {selectedTypes.length > 0 && (
                <span className="ml-1 bg-turmeric text-charcoal text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {selectedTypes.length}
                </span>
              )}
            </button>
          </div>

          {/* Investment type checkboxes */}
          {showFilters && (
            <div className="bg-white border border-cream-warm p-4 flex flex-wrap gap-3">
              {INVESTMENT_TYPES.map(type => (
                <label
                  key={type}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2 border text-sm font-sans font-medium transition-colors ${
                    selectedTypes.includes(type)
                      ? 'border-brand bg-brand-faint text-brand'
                      : 'border-cream-warm text-charcoal/60 hover:border-brand/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                      selectedTypes.includes(type) ? 'border-brand bg-brand' : 'border-charcoal/30'
                    }`}
                  >
                    {selectedTypes.includes(type) && (
                      <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                        <path d="M1 4l3 3 5-6" stroke="#FBF5E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {type}
                </label>
              ))}
              {selectedTypes.length > 0 && (
                <button
                  onClick={() => setSelectedTypes([])}
                  className="text-xs font-sans text-charcoal/40 hover:text-brand underline ml-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="font-sans text-sm text-charcoal/50 mb-6">
          Showing {filtered.length} operator{filtered.length !== 1 ? 's' : ''}
          {selectedState !== 'All States' && ` in ${selectedState}`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(op => (
              <OperatorCard key={op.id} operator={op} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-display text-charcoal/40 text-2xl mb-3">No operators found</p>
            <p className="font-sans text-charcoal/40 text-sm">
              Try adjusting your search or clearing the filters.
            </p>
            <button
              onClick={() => { setQuery(''); setSelectedState('All States'); setSelectedTypes([]); }}
              className="mt-6 btn-secondary text-xs"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
