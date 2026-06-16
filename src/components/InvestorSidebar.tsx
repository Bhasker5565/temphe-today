import { useState } from 'react'
import { Heart, Lock, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Operator } from '../types'

interface InvestorSidebarProps {
  operator: Operator
  onSupportClick: () => void
}

export default function InvestorSidebar({ operator, onSupportClick }: InvestorSidebarProps) {
  const { isLoggedIn, supportedOperators } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const isSupporting = supportedOperators.includes(operator.id)

  const handleSend = () => {
    if (message.trim()) {
      setMessageSent(true)
      setMessage('')
      setTimeout(() => setMessageSent(false), 4000)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="relative">
        {/* Blurred preview */}
        <div className="card p-6 blur-sm select-none pointer-events-none" aria-hidden>
          <div className="h-5 bg-cream-deep rounded w-3/4 mb-4" />
          <div className="h-11 bg-cream-deep w-full mb-3" />
          <div className="h-11 bg-cream-warm w-full mb-5" />
          <div className="h-20 bg-cream-warm w-full mb-3" />
          <div className="h-10 bg-cream-deep w-full" />
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/80 backdrop-blur-[2px] px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-brand-faint flex items-center justify-center mb-4">
            <Lock size={20} className="text-brand" />
          </div>
          <p className="font-display text-charcoal text-lg font-semibold mb-2">
            Connect with {operator.name.split(' ')[0]}
          </p>
          <p className="font-sans text-charcoal/60 text-sm leading-relaxed mb-6">
            Log in to message her, express your support, and follow her weekly journey.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="btn-primary w-full justify-center mb-3 text-sm"
          >
            Register as Investor
          </button>
          <button
            onClick={() => navigate('/register')}
            className="font-sans text-sm text-charcoal/50 hover:text-brand transition-colors"
          >
            Already registered? Log in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6 space-y-5">
      {/* Connection status */}
      <div>
        {isSupporting ? (
          <div className="flex items-center gap-2 text-forest font-sans text-sm font-semibold">
            <Heart size={16} fill="currentColor" />
            You are supporting {operator.name.split(' ')[0]} ❤️
          </div>
        ) : (
          <p className="font-sans text-sm text-charcoal/60">
            Not yet connected with {operator.name.split(' ')[0]}
          </p>
        )}
      </div>

      {/* Support button */}
      <button
        onClick={onSupportClick}
        className="btn-primary w-full justify-center gap-2 text-sm"
      >
        <Heart size={15} fill={isSupporting ? 'currentColor' : 'none'} />
        {isSupporting ? 'Add More Support' : `Support ${operator.name.split(' ')[0]}`}
      </button>

      <div className="border-t border-cream-warm" />

      {/* Message box */}
      <div>
        <p className="font-sans text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
          Send {operator.name.split(' ')[0]} a message
        </p>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={`Share something with ${operator.name.split(' ')[0]}…`}
          rows={3}
          className="w-full px-3 py-2.5 bg-cream border border-cream-warm font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
        />
        {messageSent ? (
          <div className="mt-2 font-sans text-sm text-forest font-medium flex items-center gap-2">
            <span>✓</span> Message sent to {operator.name.split(' ')[0]}
          </div>
        ) : (
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="mt-2 flex items-center gap-2 font-sans text-sm font-semibold text-brand hover:text-brand-light disabled:text-charcoal/30 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={13} />
            Send
          </button>
        )}
      </div>

      {/* Latest message preview */}
      <div className="border-t border-cream-warm pt-4">
        <p className="font-sans text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
          Latest from {operator.name.split(' ')[0]}
        </p>
        <div className="bg-cream-warm border-l-2 border-turmeric p-3">
          <p className="font-sans text-sm text-charcoal/70 italic leading-relaxed">
            "Thank you to everyone who has believed in me. I couldn't do this without your support."
          </p>
          <p className="font-sans text-xs text-charcoal/40 mt-2">— 9 Jun 2026</p>
        </div>
      </div>
    </div>
  )
}
