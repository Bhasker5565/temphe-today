import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  onLoginClick?: () => void
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const { isLoggedIn, user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Pages that open with a dark hero image at the top
  const hasDarkHero = pathname === '/' || pathname.startsWith('/operator/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent over dark hero only when at the very top; always opaque on light pages
  const isTransparent = hasDarkHero && !scrolled

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  const linkCls = isTransparent
    ? 'text-sm font-sans font-medium text-cream/90 hover:text-turmeric-light transition-colors duration-200'
    : 'text-sm font-sans font-medium text-charcoal/70 hover:text-brand transition-colors duration-200'

  const iconCls = isTransparent ? 'text-cream/80 hover:text-turmeric-light' : 'text-charcoal/70 hover:text-brand'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isTransparent
        ? 'bg-transparent border-b border-white/10'
        : 'bg-cream/96 backdrop-blur-sm border-b border-cream-warm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 216.2 32.6"
              fill={isTransparent ? '#FBF5E8' : '#522903'}
              className="h-6 w-auto transition-all duration-300"
              aria-label="Tempeh Today"
            >
              <path d="M0 3.9V.4h14.4v3.5H9.1v19.9H5.3V3.9z"/>
              <path d="M18 22.9c-1.3-.8-2.4-1.8-3.1-3.1-.8-1.3-1.1-2.7-1.1-4.3 0-1.6.4-3 1.1-4.3.8-1.3 1.8-2.4 3.1-3.2 1.3-.8 2.7-1.2 4.3-1.2 1.6 0 3 .4 4.3 1.2 1.3.8 2.3 1.8 3.1 3.1.8 1.3 1.1 2.7 1.1 4.3 0 .4 0 .9-.1 1.3h-13c.2 1.1.7 2 1.6 2.7.9.7 1.9 1.1 3.1 1.1.9 0 1.6-.1 2.3-.4.6-.3 1.1-.7 1.5-1.2h4.4c-.6 1.5-1.6 2.7-3.1 3.7S24.3 24 22.4 24c-1.6 0-3-.4-4.4-1.1m7.2-11.7c-.8-.6-1.8-.9-2.9-.9-1.1 0-2.1.3-2.9.9-.8.6-1.4 1.4-1.6 2.4h9c-.3-1-.8-1.8-1.6-2.4m12.6-4.1V9c.5-.6 1.1-1.2 1.9-1.5.8-.4 1.6-.6 2.5-.6 2 0 3.4.8 4.4 2.3.7-.8 1.5-1.3 2.2-1.7.8-.4 1.7-.6 2.8-.6 1.8 0 3.1.5 4.1 1.5.9 1 1.4 2.5 1.4 4.5v11h-3.7v-10c0-1.1-.3-1.9-.8-2.5-.5-.6-1.2-.9-2.2-.9-.9 0-1.6.3-2.1.9-.6.6-.8 1.4-.8 2.5v10h-3.7v-10c0-1.1-.3-1.9-.8-2.5-.5-.6-1.2-.9-2.2-.9-.9 0-1.6.3-2.1.9-.6.6-.8 1.4-.8 2.5v10h-3.7V7.1h3.6zm26.9 0v1.7c.6-.6 1.3-1 2.1-1.4.8-.4 1.8-.5 2.8-.5 1.7 0 3.1.4 4.4 1.1s2.2 1.7 2.9 3c.7 1.3 1 2.8 1 4.5 0 1.7-.3 3.2-1 4.5-.7 1.3-1.7 2.3-2.9 3-1.2.7-2.7 1.1-4.4 1.1-1 0-1.9-.2-2.8-.5-.9-.4-1.6-.8-2.1-1.4v10.1l-3.7.3V7.1h3.7zm8.2 12c.9-.9 1.3-2.1 1.3-3.6 0-1.4-.4-2.6-1.3-3.6-.9-.9-2.1-1.4-3.5-1.4s-2.6.5-3.5 1.4c-.9.9-1.3 2.1-1.3 3.6s.4 2.7 1.3 3.6c.9.9 2.1 1.4 3.5 1.4 1.5 0 2.6-.5 3.5-1.4m11.9 3.8c-1.3-.8-2.4-1.8-3.1-3.1-.8-1.3-1.1-2.7-1.1-4.3 0-1.6.4-3 1.1-4.3.8-1.3 1.8-2.3 3.1-3.1 1.3-.8 2.7-1.2 4.3-1.2 1.6 0 3 .4 4.3 1.2 1.3.8 2.3 1.8 3.1 3.1.8 1.3 1.1 2.7 1.1 4.3 0 .4 0 .9-.1 1.3h-13c.2 1.1.7 2 1.6 2.7.9.7 1.9 1.1 3.1 1.1.9 0 1.6-.1 2.3-.4.6-.3 1.1-.7 1.5-1.2h4.4c-.6 1.5-1.6 2.7-3.1 3.7-1.5.9-3.2 1.4-5.1 1.4-1.6-.1-3.1-.5-4.4-1.2M92 11.2c-.8-.6-1.8-.9-2.9-.9-1.1 0-2.1.3-2.9.9-.8.6-1.4 1.4-1.6 2.4h9c-.3-1-.8-1.8-1.6-2.4M104.6 0v9c.5-.6 1.2-1.2 2-1.5.8-.4 1.7-.6 2.8-.6 2 0 3.6.6 4.7 1.8s1.7 2.9 1.7 5.1v10h-3.7v-9.2c0-1.3-.3-2.4-.9-3.1-.6-.7-1.5-1.1-2.7-1.1-1.2 0-2.1.4-2.8 1.2-.7.8-1.1 1.8-1.1 3v9.2h-3.7V.4l3.7-.4zm40 22.9c-1.3-.7-2.3-1.8-3.1-3.1-.7-1.3-1.1-2.8-1.1-4.4s.4-3.1 1.1-4.4c.7-1.3 1.8-2.3 3.1-3.1 1.3-.7 2.8-1.1 4.4-1.1 1.6 0 3.1.4 4.4 1.1 1.3.7 2.3 1.8 3.1 3.1.7 1.3 1.1 2.8 1.1 4.4s-.4 3.1-1.1 4.4c-.7 1.3-1.8 2.3-3.1 3.1-1.3.7-2.8 1.1-4.4 1.1-1.6 0-3.1-.3-4.4-1.1m7.9-3.8c.9-.9 1.3-2.1 1.3-3.6s-.4-2.7-1.3-3.6c-.9-.9-2.1-1.4-3.5-1.4s-2.6.5-3.5 1.4c-.9.9-1.3 2.1-1.3 3.6s.4 2.7 1.3 3.6c.9.9 2.1 1.4 3.5 1.4 1.5 0 2.6-.5 3.5-1.4m11.7 3.9c-1.2-.7-2.2-1.7-2.9-3-.7-1.3-1-2.8-1-4.5 0-1.7.3-3.2 1-4.5.7-1.3 1.7-2.3 2.9-3s2.7-1.1 4.4-1.1c1 0 1.9.2 2.8.5.9.4 1.6.8 2.1 1.4V.4l3.7-.4v23.8h-3.7v-1.7c-.6.6-1.3 1-2.1 1.4-.8.4-1.8.5-2.8.5-1.7 0-3.1-.3-4.4-1m8-3.9c.9-.9 1.3-2.1 1.3-3.6 0-1.4-.4-2.6-1.3-3.6-.9-.9-2.1-1.4-3.5-1.4-1.5 0-2.6.5-3.5 1.4-.9.9-1.3 2.1-1.3 3.6s.4 2.7 1.3 3.6c.9.9 2.1 1.4 3.5 1.4 1.5 0 2.6-.5 3.5-1.4m12.4 3.8c-1.3-.7-2.3-1.8-3-3-.7-1.3-1.1-2.8-1.1-4.4s.4-3.1 1.1-4.4c.7-1.3 1.7-2.3 3-3 1.3-.7 2.7-1.1 4.3-1.1 1 0 2 .2 2.9.6.9.4 1.5.8 1.9 1.4V7.1h3.7v16.7h-3.7v-1.7c-.4.5-1 1-1.9 1.4-.9.4-1.8.6-2.9.6-1.6-.1-3-.4-4.3-1.2m7.9-3.8c.9-.9 1.4-2.1 1.4-3.6s-.5-2.7-1.4-3.6c-.9-.9-2-1.4-3.4-1.4s-2.6.5-3.5 1.4c-.9.9-1.4 2.1-1.4 3.6s.5 2.7 1.4 3.6c.9.9 2.1 1.4 3.5 1.4 1.3 0 2.5-.5 3.4-1.4"/>
              <path d="M201.3 32.2l4-.5 10.9-24.6h-3.8l-4.2 9.8-4.1-9.8h-3.8l6.1 13.8z"/>
              <path d="M136.5 19.3c-.2.4-.4.7-.7.9-.3.2-.7.4-1.1.4-.6 0-1-.2-1.4-.5-.3-.3-.5-.8-.5-1.5v-8h5V7.1h-5V2.8l-3.7.4v3.9h-3.4v3.5h3.4v8c0 1.7.5 3 1.5 4s2.3 1.5 3.9 1.5c1.1 0 2.1-.2 2.9-.7.8-.5 1.4-1.1 1.9-1.9l-2.8-2.2z"/>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#operators" className={linkCls}>
              Browse Operators
            </a>
            <a href="/#how-it-works" className={linkCls}>
              How It Works
            </a>
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className={`flex items-center gap-2 text-sm font-sans font-medium ${isTransparent ? 'text-cream/90' : 'text-charcoal/80'}`}>
                  <User size={15} className={isTransparent ? 'text-turmeric-light' : 'text-brand'} />
                  <span>Hi, {user?.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-1.5 text-sm font-sans font-medium transition-colors ${isTransparent ? 'text-cream/70 hover:text-turmeric-light' : 'text-charcoal/60 hover:text-brand'}`}
                >
                  <LogOut size={14} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <button onClick={onLoginClick} className={linkCls + ' px-4 py-2'}>
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className={isTransparent ? 'inline-flex items-center justify-center px-5 py-2.5 border-2 border-cream/70 text-cream text-xs font-sans font-semibold tracking-wide hover:bg-cream/15 transition-colors duration-200' : 'btn-primary text-xs py-2.5 px-5'}
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors ${iconCls}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream border-t border-cream-warm px-5 py-4 flex flex-col gap-4">
          <a
            href="/#operators"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-sans font-medium text-charcoal/70"
          >
            Browse Operators
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-sans font-medium text-charcoal/70"
          >
            How It Works
          </a>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-sm font-sans font-medium text-left text-charcoal/70">
              Log out ({user?.name.split(' ')[0]})
            </button>
          ) : (
            <>
              {onLoginClick && (
                <button onClick={() => { onLoginClick(); setMenuOpen(false); }} className="text-sm font-sans text-left text-charcoal/70">
                  Login
                </button>
              )}
              <button onClick={() => { navigate('/register'); setMenuOpen(false); }} className="btn-primary w-full justify-center text-xs">
                Register as Investor
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}
