import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    const success = login(email, password)
    if (success) {
      navigate('/')
    } else {
      setError('No account found with that email. Please register first.')
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-cream-warm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: image panel */}
          <div className="hidden lg:block">
            <div className="relative h-full min-h-[520px] overflow-hidden rounded-2xl">
              <img
                src="/images/hero_2.jpeg"
                alt="MFU operators at work"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand/40 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream-warm/70 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-cream-warm/70 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-cream-warm/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <p className="font-sans text-cream/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                  Welcome back
                </p>
                <blockquote className="font-display text-white text-2xl font-bold italic leading-snug mb-5">
                  "Every week I update my numbers. I love knowing my investors can see my progress in real time."
                </blockquote>
                <p className="font-sans text-cream/55 text-sm">— Priya Sharma, Pune</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="max-w-md w-full">
            <div className="mb-8">
              <p className="section-label mb-2">Investor Login</p>
              <h1 className="font-display text-charcoal text-3xl font-bold mb-2">
                Welcome back
              </h1>
              <p className="font-sans text-charcoal/60 text-sm">
                New here?{' '}
                <Link to="/register" className="text-brand font-medium hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Email */}
              <div>
                <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-cream border border-cream-deep font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-sans text-xs font-semibold text-charcoal/60 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full px-4 py-3 pr-11 bg-cream border border-cream-deep font-sans text-sm text-charcoal placeholder-charcoal/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal/70 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 px-4 py-3">
                  <p className="font-sans text-sm text-red-600">{error}</p>
                </div>
              )}

              <button type="submit" className="btn-primary w-full justify-center text-sm py-3.5">
                Log In
              </button>

              <p className="font-sans text-xs text-charcoal/40 text-center pt-1">
                Don't have an account?{' '}
                <Link to="/register" className="text-brand hover:underline">
                  Register as an investor
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
