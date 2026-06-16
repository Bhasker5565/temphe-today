import { useState } from 'react'
import { X, Gift, RefreshCw, TrendingUp, BarChart2, ChevronRight, ChevronLeft } from 'lucide-react'
import type { Operator, InvestmentType } from '../types'
import { useAuth } from '../context/AuthContext'

interface Props {
  operator: Operator
  onClose: () => void
}

const investmentOptions: { type: InvestmentType; icon: typeof Gift; label: string; desc: string; minAmount: number; showTimeline: boolean }[] = [
  { type: 'Grant', icon: Gift, label: 'Grant Donation', desc: 'I want to give — I expect no financial return', minAmount: 500, showTimeline: false },
  { type: 'Loan', icon: RefreshCw, label: 'Impact Loan', desc: 'I want to lend — return my capital, no interest', minAmount: 5000, showTimeline: true },
  { type: 'Loan with Interest', icon: TrendingUp, label: 'Loan with Interest', desc: 'I want to lend and receive an agreed interest return', minAmount: 10000, showTimeline: true },
  { type: 'Equity', icon: BarChart2, label: 'Equity Investment', desc: 'I want to invest and receive shares in Tempeh Today', minAmount: 25000, showTimeline: false },
]

const timelines = ['6 months', '12 months', '24 months', 'Flexible']

export default function InvestmentInterestModal({ operator, onClose }: Props) {
  const { supportOperator, user } = useAuth()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<InvestmentType | null>(null)
  const [amount, setAmount] = useState('')
  const [timeline, setTimeline] = useState('12 months')
  const [personalMessage, setPersonalMessage] = useState('')
  const [declaration, setDeclaration] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selected = investmentOptions.find(o => o.type === selectedType)
  const amountNum = parseFloat(amount.replace(/,/g, ''))
  const amountValid = !isNaN(amountNum) && amountNum >= (selected?.minAmount ?? 0)

  const handleSubmit = () => {
    if (!selectedType) return
    supportOperator(operator.id)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <ModalShell onClose={onClose}>
        <div className="text-center py-12 px-8">
          <div className="text-5xl mb-6">💛</div>
          <h2 className="font-display text-charcoal text-2xl font-bold mb-4">
            Thank you, {user?.name.split(' ')[0]}!
          </h2>
          <p className="font-sans text-charcoal/70 text-base leading-relaxed max-w-md mx-auto mb-6">
            Your interest in supporting <strong>{operator.name}</strong> has been received. Our team will be in touch at{' '}
            <span className="text-brand">{user?.email}</span> within 2 business days.
          </p>
          <p className="font-sans text-charcoal/60 text-sm leading-relaxed max-w-sm mx-auto mb-8">
            She will be notified that someone wants to support her — you may have already made her day. 💛
          </p>
          <button onClick={onClose} className="btn-primary">
            Explore More Operators
          </button>
        </div>
      </ModalShell>
    )
  }

  return (
    <ModalShell onClose={onClose}>
      {/* Step indicator */}
      <div className="border-b border-cream-warm px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-sans font-bold transition-colors ${
                step >= s ? 'bg-brand text-cream' : 'bg-cream-deep text-charcoal/40'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`h-px w-8 transition-colors ${step > s ? 'bg-brand' : 'bg-cream-deep'}`} />}
            </div>
          ))}
        </div>
        <p className="font-sans text-xs text-charcoal/50 mt-2">
          {step === 1 && 'Choose how you want to help'}
          {step === 2 && 'Your details'}
          {step === 3 && 'Review & submit'}
        </p>
      </div>

      <div className="p-6 overflow-y-auto max-h-[65vh]">
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h3 className="font-display text-charcoal text-xl font-semibold mb-6">
              How would you like to support {operator.name.split(' ')[0]}?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {investmentOptions.map(({ type, icon: Icon, label, desc }) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`text-left p-4 border-2 transition-all duration-150 ${
                    selectedType === type
                      ? 'border-brand bg-brand-faint'
                      : 'border-cream-warm bg-white hover:border-brand/30'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${
                    selectedType === type ? 'bg-brand' : 'bg-cream-deep'
                  }`}>
                    <Icon size={16} className={selectedType === type ? 'text-cream' : 'text-charcoal/60'} />
                  </div>
                  <div className="font-sans font-semibold text-sm text-charcoal mb-1">{label}</div>
                  <div className="font-sans text-xs text-charcoal/55 leading-snug">{desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && selected && (
          <div className="space-y-5">
            <h3 className="font-display text-charcoal text-xl font-semibold">
              Your support details
            </h3>

            {/* Operator display */}
            <div className="flex items-center gap-3 p-3 bg-cream-warm border border-cream-deep">
              <img src={operator.photo} alt={operator.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-sans font-semibold text-sm text-charcoal">{operator.name}</div>
                <div className="font-sans text-xs text-charcoal/50">{operator.city}, {operator.state}</div>
              </div>
              <div className="ml-auto">
                <span className="badge-grant">{selected.label}</span>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                Investment Amount (INR) — minimum ₹{selected.minAmount.toLocaleString()}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-charcoal/60 font-medium">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder={selected.minAmount.toString()}
                  min={selected.minAmount}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-cream-warm font-sans text-sm text-charcoal focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>
              {amount && !amountValid && (
                <p className="font-sans text-xs text-red-500 mt-1">
                  Minimum amount is ₹{selected.minAmount.toLocaleString()}
                </p>
              )}
            </div>

            {/* Timeline (loans only) */}
            {selected.showTimeline && (
              <div>
                <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                  Preferred Timeline
                </label>
                <div className="flex flex-wrap gap-2">
                  {timelines.map(t => (
                    <button
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`px-4 py-2 text-sm font-sans font-medium border transition-colors ${
                        timeline === t
                          ? 'border-brand bg-brand text-cream'
                          : 'border-cream-warm bg-white text-charcoal/70 hover:border-brand/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Personal message */}
            <div>
              <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                A Personal Message to {operator.name.split(' ')[0]} (optional)
              </label>
              <textarea
                value={personalMessage}
                onChange={e => setPersonalMessage(e.target.value)}
                placeholder="Share something personal — she will read every word…"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-cream-warm font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && selected && (
          <div className="space-y-6">
            <h3 className="font-display text-charcoal text-xl font-semibold">
              Review your support
            </h3>

            {/* Summary card */}
            <div className="border border-cream-warm bg-cream p-5 space-y-4">
              <div className="flex items-center gap-3">
                <img src={operator.photo} alt={operator.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-display text-charcoal font-semibold">{operator.name}</div>
                  <div className="font-sans text-xs text-charcoal/50">{operator.city} · {operator.mfuId}</div>
                </div>
              </div>
              <div className="border-t border-cream-warm pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="section-label mb-1">Support Type</p>
                  <p className="font-sans text-sm font-semibold text-charcoal">{selected.label}</p>
                </div>
                <div>
                  <p className="section-label mb-1">Amount</p>
                  <p className="font-sans text-sm font-semibold text-charcoal">₹{parseFloat(amount).toLocaleString()}</p>
                </div>
                {selected.showTimeline && (
                  <div>
                    <p className="section-label mb-1">Timeline</p>
                    <p className="font-sans text-sm font-semibold text-charcoal">{timeline}</p>
                  </div>
                )}
              </div>
              {personalMessage && (
                <div className="border-t border-cream-warm pt-4">
                  <p className="section-label mb-1">Your Message</p>
                  <p className="font-sans text-sm text-charcoal/70 italic">"{personalMessage}"</p>
                </div>
              )}
            </div>

            {/* Declaration */}
            <label className="flex gap-3 cursor-pointer">
              <div
                onClick={() => setDeclaration(!declaration)}
                className={`w-5 h-5 border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  declaration ? 'border-brand bg-brand' : 'border-cream-deep'
                }`}
              >
                {declaration && (
                  <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                    <path d="M1 4l3 3 5-6" stroke="#FBF5E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="font-sans text-sm text-charcoal/70 leading-relaxed">
                I understand this is an expression of interest. The Tempeh Today team will contact me within 2 business days to confirm next steps.
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="border-t border-cream-warm px-6 py-4 flex justify-between items-center">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-1.5 font-sans text-sm font-medium text-charcoal/60 hover:text-brand transition-colors">
            <ChevronLeft size={15} /> Back
          </button>
        ) : <div />}

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={step === 1 ? !selectedType : !amountValid}
            className="btn-primary gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue <ChevronRight size={15} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!declaration}
            className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit My Interest 🚀
          </button>
        )}
      </div>
    </ModalShell>
  )
}

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
      <div className="bg-cream w-full max-w-xl shadow-warm-hover relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-brand hover:bg-brand-faint transition-colors z-10"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}
