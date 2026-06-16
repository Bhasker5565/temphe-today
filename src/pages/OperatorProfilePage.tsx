import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, MessageSquare, MapPin, Calendar } from 'lucide-react'
import { operators } from '../data/operators'
import type { InvestmentType } from '../types'
import StoryTab from '../components/tabs/StoryTab'
import ProductionTab from '../components/tabs/ProductionTab'
import HappinessTab from '../components/tabs/HappinessTab'
import GalleryTab from '../components/tabs/GalleryTab'
import InvestorSidebar from '../components/InvestorSidebar'
import InvestmentInterestModal from '../components/InvestmentInterestModal'
import { useAuth } from '../context/AuthContext'

type TabId = 'story' | 'production' | 'happiness' | 'gallery'

const TABS: { id: TabId; label: string }[] = [
  { id: 'story', label: 'Her Story' },
  { id: 'production', label: 'Her Production' },
  { id: 'happiness', label: 'Her Happiness' },
  { id: 'gallery', label: 'Her Gallery' },
]

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

export default function OperatorProfilePage() {
  const { id } = useParams<{ id: string }>()
  const operator = operators.find(o => o.id === id)
  const [activeTab, setActiveTab] = useState<TabId>('story')
  const [showModal, setShowModal] = useState(false)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  if (!operator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 text-center px-6">
        <p className="font-display text-charcoal text-2xl mb-3">Operator not found</p>
        <Link to="/" className="btn-primary text-sm mt-4">Back to Directory</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Banner */}
      <div data-nav-dark className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={operator.bannerPhoto}
          alt={`${operator.name}'s MFU unit`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-sans text-sm font-medium text-cream/80 hover:text-cream bg-charcoal/30 backdrop-blur-sm px-3 py-1.5 transition-colors"
          >
            <ArrowLeft size={14} /> All Operators
          </Link>
        </div>

        {/* Profile overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-6">
          <div className="max-w-7xl mx-auto flex items-end gap-5 flex-wrap">
            <img
              src={operator.photo}
              alt={operator.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white object-cover shadow-warm-lg shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-white text-2xl md:text-3xl font-bold leading-tight">
                {operator.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 font-sans text-cream/70 text-sm">
                  <MapPin size={13} /> {operator.city}, {operator.state}
                </div>
                <div className="font-sans text-cream/50 text-sm">{operator.mfuId}</div>
                <div className="flex items-center gap-1.5 font-sans text-cream/70 text-sm">
                  <Calendar size={13} /> {operator.yearsInOperation} {operator.yearsInOperation === 1 ? 'year' : 'years'} in operation
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {operator.investmentTypes.map(type => (
                  <InvestmentBadge key={type} type={type} />
                ))}
              </div>
            </div>

            {/* Action buttons (visible on large screens only here) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button
                onClick={() => isLoggedIn ? setShowModal(true) : navigate('/register')}
                className="btn-turmeric gap-2 text-sm"
              >
                <Heart size={15} /> Support Her
              </button>
              {isLoggedIn && (
                <button className="flex items-center gap-2 px-5 py-3 border-2 border-cream/50 text-cream font-sans font-semibold text-sm hover:bg-cream/10 transition-colors">
                  <MessageSquare size={15} /> Send a Message
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile action buttons */}
      <div className="md:hidden px-6 py-4 flex gap-3 border-b border-cream-warm bg-white">
        <button
          onClick={() => isLoggedIn ? setShowModal(true) : navigate('/register')}
          className="btn-turmeric flex-1 justify-center gap-2 text-sm"
        >
          <Heart size={14} /> Support Her
        </button>
        {isLoggedIn && (
          <button className="flex-1 btn-secondary justify-center gap-2 text-sm">
            <MessageSquare size={14} /> Message
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: tabs */}
          <div className="flex-1 min-w-0">
            {/* Tab bar */}
            <div className="border-b border-cream-warm flex overflow-x-auto mb-8">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={activeTab === tab.id ? 'tab-btn-active' : 'tab-btn'}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div>
              {activeTab === 'story' && <StoryTab operator={operator} />}
              {activeTab === 'production' && <ProductionTab operator={operator} />}
              {activeTab === 'happiness' && <HappinessTab operator={operator} />}
              {activeTab === 'gallery' && <GalleryTab operator={operator} />}
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24">
              <InvestorSidebar
                operator={operator}
                onSupportClick={() => setShowModal(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Investment modal */}
      {showModal && (
        <InvestmentInterestModal
          operator={operator}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
