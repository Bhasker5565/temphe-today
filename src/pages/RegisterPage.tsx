import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, CheckCircle2, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

type InterestType = 'Grant Donation' | 'Impact Loan' | 'Loan with Interest' | 'Equity Investment' | 'Not Sure Yet'

const interestOptions: { value: InterestType; label: string; desc: string }[] = [
  { value: 'Grant Donation', label: 'Grant Donation', desc: 'I want to give — no financial return' },
  { value: 'Impact Loan', label: 'Impact Loan', desc: 'Return my capital, no interest' },
  { value: 'Loan with Interest', label: 'Loan with Interest', desc: 'I want an agreed interest return' },
  { value: 'Equity Investment', label: 'Equity Investment', desc: 'Shares in Tempeh Today' },
  { value: 'Not Sure Yet', label: 'Not Sure Yet', desc: 'I want to explore first' },
]

const COUNTRIES = ['India', 'United Kingdom', 'United States', 'Netherlands', 'Germany', 'Singapore', 'Australia', 'Canada', 'UAE', 'Other']

export default function RegisterPage() {
  const { register } = useAuth()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    country: 'India',
    interest: '' as InterestType | '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Please enter your name'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please enter a valid email'
    if (!form.interest) e.interest = 'Please choose an investment interest'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.agreeTerms) e.agreeTerms = 'You must agree to the platform terms'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    register({ name: form.fullName, email: form.email, investmentInterest: form.interest as string }, form.password)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-6">
        <div className="bg-white shadow-warm max-w-md w-full p-10 text-center">
          <div className="w-16 h-16 bg-forest-faint rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-forest" />
          </div>
          <h2 className="font-display text-charcoal text-2xl font-bold mb-3">
            Welcome to Tempeh Today, {form.fullName.split(' ')[0]}!
          </h2>
          <p className="font-sans text-charcoal/65 text-sm leading-relaxed mb-2">
            A verification link has been sent to{' '}
            <span className="font-semibold text-brand">{form.email}</span>.
          </p>
          <p className="font-sans text-charcoal/55 text-sm leading-relaxed mb-8">
            Click the link to activate your account and start browsing our MFU operators.
          </p>
          <Link to="/#operators" className="btn-primary w-full justify-center gap-2">
            Browse Operators <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: story panel */}
          <div className="hidden lg:block">
            <div className="relative h-full min-h-[500px] overflow-hidden">
              <img
                src="https://tempeh.today/wp-content/uploads/2026/06/fdd99f54-4e39-4d4a-92a1-7ec41249c5cd-1024x768.jpg"
                alt="MFU operator"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <p className="font-display text-white/40 text-sm uppercase tracking-widest mb-4">Why register?</p>
                <blockquote className="font-display text-white text-2xl font-bold italic leading-snug mb-6">
                  "I never thought someone from the other side of the world would believe in my work. Now I have three investors following my weekly journey."
                </blockquote>
                <p className="font-sans text-cream/60 text-sm">— Kavitha Reddy, Hyderabad</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <div className="mb-8">
              <p className="section-label mb-2">Investor Registration</p>
              <h1 className="font-display text-charcoal text-3xl font-bold mb-2">
                Create your account
              </h1>
              <p className="font-sans text-charcoal/60 text-sm">
                Already registered?{' '}
                <Link to="/login" className="text-brand hover:underline font-medium">
                  Log in here
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => set('fullName', e.target.value)}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 bg-white border font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-1 focus:ring-brand ${errors.fullName ? 'border-red-400 focus:border-red-400' : 'border-cream-warm focus:border-brand'}`}
                />
                {errors.fullName && <p className="font-sans text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 bg-white border font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-1 focus:ring-brand ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-cream-warm focus:border-brand'}`}
                />
                {errors.email && <p className="font-sans text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Mobile + Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-charcoal/30 normal-case font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.mobile}
                    onChange={e => set('mobile', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-white border border-cream-warm font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                    Country
                  </label>
                  <select
                    value={form.country}
                    onChange={e => set('country', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-cream-warm font-sans text-sm text-charcoal focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Investment interest */}
              <div>
                <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-2">
                  I am interested in <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2">
                  {interestOptions.map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                        form.interest === opt.value
                          ? 'border-brand bg-brand-faint'
                          : 'border-cream-warm bg-white hover:border-brand/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={opt.value}
                        checked={form.interest === opt.value}
                        onChange={() => set('interest', opt.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                        form.interest === opt.value ? 'border-brand' : 'border-charcoal/30'
                      }`}>
                        {form.interest === opt.value && (
                          <div className="w-2 h-2 rounded-full bg-brand" />
                        )}
                      </div>
                      <div>
                        <div className="font-sans text-sm font-semibold text-charcoal">{opt.label}</div>
                        <div className="font-sans text-xs text-charcoal/50">{opt.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.interest && <p className="font-sans text-xs text-red-500 mt-1">{errors.interest}</p>}
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => set('password', e.target.value)}
                      placeholder="Min. 8 characters"
                      className={`w-full px-4 py-3 bg-white border font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-1 focus:ring-brand pr-10 ${errors.password ? 'border-red-400 focus:border-red-400' : 'border-cream-warm focus:border-brand'}`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-brand">
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.password && <p className="font-sans text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={e => set('confirmPassword', e.target.value)}
                      placeholder="Repeat password"
                      className={`w-full px-4 py-3 bg-white border font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-1 focus:ring-brand pr-10 ${errors.confirmPassword ? 'border-red-400 focus:border-red-400' : 'border-cream-warm focus:border-brand'}`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-brand">
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="font-sans text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    onClick={() => set('agreeTerms', !form.agreeTerms)}
                    className={`w-5 h-5 border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      form.agreeTerms ? 'border-brand bg-brand' : 'border-cream-deep'
                    }`}
                  >
                    {form.agreeTerms && (
                      <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                        <path d="M1 4l3 3 5-6" stroke="#FBF5E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="font-sans text-sm text-charcoal/70 leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-brand hover:underline font-medium" target="_blank" rel="noopener">
                      Platform Terms and Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.agreeTerms && <p className="font-sans text-xs text-red-500 mt-1 ml-8">{errors.agreeTerms}</p>}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button type="submit" className="btn-primary w-full justify-center gap-2 py-4 text-sm">
                  Create My Account 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
