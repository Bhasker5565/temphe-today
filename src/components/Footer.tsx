import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-cream/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 216.2 32.6"
              fill="#FBF5E8"
              className="h-5 w-auto mb-4"
              aria-label="Tempeh Today"
            >
              <path d="M0 3.9V.4h14.4v3.5H9.1v19.9H5.3V3.9z"/>
              <path d="M18 22.9c-1.3-.8-2.4-1.8-3.1-3.1-.8-1.3-1.1-2.7-1.1-4.3 0-1.6.4-3 1.1-4.3.8-1.3 1.8-2.4 3.1-3.2 1.3-.8 2.7-1.2 4.3-1.2 1.6 0 3 .4 4.3 1.2 1.3.8 2.3 1.8 3.1 3.1.8 1.3 1.1 2.7 1.1 4.3 0 .4 0 .9-.1 1.3h-13c.2 1.1.7 2 1.6 2.7.9.7 1.9 1.1 3.1 1.1.9 0 1.6-.1 2.3-.4.6-.3 1.1-.7 1.5-1.2h4.4c-.6 1.5-1.6 2.7-3.1 3.7S24.3 24 22.4 24c-1.6 0-3-.4-4.4-1.1m7.2-11.7c-.8-.6-1.8-.9-2.9-.9-1.1 0-2.1.3-2.9.9-.8.6-1.4 1.4-1.6 2.4h9c-.3-1-.8-1.8-1.6-2.4m12.6-4.1V9c.5-.6 1.1-1.2 1.9-1.5.8-.4 1.6-.6 2.5-.6 2 0 3.4.8 4.4 2.3.7-.8 1.5-1.3 2.2-1.7.8-.4 1.7-.6 2.8-.6 1.8 0 3.1.5 4.1 1.5.9 1 1.4 2.5 1.4 4.5v11h-3.7v-10c0-1.1-.3-1.9-.8-2.5-.5-.6-1.2-.9-2.2-.9-.9 0-1.6.3-2.1.9-.6.6-.8 1.4-.8 2.5v10h-3.7v-10c0-1.1-.3-1.9-.8-2.5-.5-.6-1.2-.9-2.2-.9-.9 0-1.6.3-2.1.9-.6.6-.8 1.4-.8 2.5v10h-3.7V7.1h3.6zm26.9 0v1.7c.6-.6 1.3-1 2.1-1.4.8-.4 1.8-.5 2.8-.5 1.7 0 3.1.4 4.4 1.1s2.2 1.7 2.9 3c.7 1.3 1 2.8 1 4.5 0 1.7-.3 3.2-1 4.5-.7 1.3-1.7 2.3-2.9 3-1.2.7-2.7 1.1-4.4 1.1-1 0-1.9-.2-2.8-.5-.9-.4-1.6-.8-2.1-1.4v10.1l-3.7.3V7.1h3.7zm8.2 12c.9-.9 1.3-2.1 1.3-3.6 0-1.4-.4-2.6-1.3-3.6-.9-.9-2.1-1.4-3.5-1.4s-2.6.5-3.5 1.4c-.9.9-1.3 2.1-1.3 3.6s.4 2.7 1.3 3.6c.9.9 2.1 1.4 3.5 1.4 1.5 0 2.6-.5 3.5-1.4m11.9 3.8c-1.3-.8-2.4-1.8-3.1-3.1-.8-1.3-1.1-2.7-1.1-4.3 0-1.6.4-3 1.1-4.3.8-1.3 1.8-2.3 3.1-3.1 1.3-.8 2.7-1.2 4.3-1.2 1.6 0 3 .4 4.3 1.2 1.3.8 2.3 1.8 3.1 3.1.8 1.3 1.1 2.7 1.1 4.3 0 .4 0 .9-.1 1.3h-13c.2 1.1.7 2 1.6 2.7.9.7 1.9 1.1 3.1 1.1.9 0 1.6-.1 2.3-.4.6-.3 1.1-.7 1.5-1.2h4.4c-.6 1.5-1.6 2.7-3.1 3.7-1.5.9-3.2 1.4-5.1 1.4-1.6-.1-3.1-.5-4.4-1.2M92 11.2c-.8-.6-1.8-.9-2.9-.9-1.1 0-2.1.3-2.9.9-.8.6-1.4 1.4-1.6 2.4h9c-.3-1-.8-1.8-1.6-2.4M104.6 0v9c.5-.6 1.2-1.2 2-1.5.8-.4 1.7-.6 2.8-.6 2 0 3.6.6 4.7 1.8s1.7 2.9 1.7 5.1v10h-3.7v-9.2c0-1.3-.3-2.4-.9-3.1-.6-.7-1.5-1.1-2.7-1.1-1.2 0-2.1.4-2.8 1.2-.7.8-1.1 1.8-1.1 3v9.2h-3.7V.4l3.7-.4zm40 22.9c-1.3-.7-2.3-1.8-3.1-3.1-.7-1.3-1.1-2.8-1.1-4.4s.4-3.1 1.1-4.4c.7-1.3 1.8-2.3 3.1-3.1 1.3-.7 2.8-1.1 4.4-1.1 1.6 0 3.1.4 4.4 1.1 1.3.7 2.3 1.8 3.1 3.1.7 1.3 1.1 2.8 1.1 4.4s-.4 3.1-1.1 4.4c-.7 1.3-1.8 2.3-3.1 3.1-1.3.7-2.8 1.1-4.4 1.1-1.6 0-3.1-.3-4.4-1.1m7.9-3.8c.9-.9 1.3-2.1 1.3-3.6s-.4-2.7-1.3-3.6c-.9-.9-2.1-1.4-3.5-1.4s-2.6.5-3.5 1.4c-.9.9-1.3 2.1-1.3 3.6s.4 2.7 1.3 3.6c.9.9 2.1 1.4 3.5 1.4 1.5 0 2.6-.5 3.5-1.4m11.7 3.9c-1.2-.7-2.2-1.7-2.9-3-.7-1.3-1-2.8-1-4.5 0-1.7.3-3.2 1-4.5.7-1.3 1.7-2.3 2.9-3s2.7-1.1 4.4-1.1c1 0 1.9.2 2.8.5.9.4 1.6.8 2.1 1.4V.4l3.7-.4v23.8h-3.7v-1.7c-.6.6-1.3 1-2.1 1.4-.8.4-1.8.5-2.8.5-1.7 0-3.1-.3-4.4-1m8-3.9c.9-.9 1.3-2.1 1.3-3.6 0-1.4-.4-2.6-1.3-3.6-.9-.9-2.1-1.4-3.5-1.4-1.5 0-2.6.5-3.5 1.4-.9.9-1.3 2.1-1.3 3.6s.4 2.7 1.3 3.6c.9.9 2.1 1.4 3.5 1.4 1.5 0 2.6-.5 3.5-1.4m12.4 3.8c-1.3-.7-2.3-1.8-3-3-.7-1.3-1.1-2.8-1.1-4.4s.4-3.1 1.1-4.4c.7-1.3 1.7-2.3 3-3 1.3-.7 2.7-1.1 4.3-1.1 1 0 2 .2 2.9.6.9.4 1.5.8 1.9 1.4V7.1h3.7v16.7h-3.7v-1.7c-.4.5-1 1-1.9 1.4-.9.4-1.8.6-2.9.6-1.6-.1-3-.4-4.3-1.2m7.9-3.8c.9-.9 1.4-2.1 1.4-3.6s-.5-2.7-1.4-3.6c-.9-.9-2-1.4-3.4-1.4s-2.6.5-3.5 1.4c-.9.9-1.4 2.1-1.4 3.6s.5 2.7 1.4 3.6c.9.9 2.1 1.4 3.5 1.4 1.3 0 2.5-.5 3.4-1.4"/>
              <path d="M201.3 32.2l4-.5 10.9-24.6h-3.8l-4.2 9.8-4.1-9.8h-3.8l6.1 13.8z"/>
              <path d="M136.5 19.3c-.2.4-.4.7-.7.9-.3.2-.7.4-1.1.4-.6 0-1-.2-1.4-.5-.3-.3-.5-.8-.5-1.5v-8h5V7.1h-5V2.8l-3.7.4v3.9h-3.4v3.5h3.4v8c0 1.7.5 3 1.5 4s2.3 1.5 3.9 1.5c1.1 0 2.1-.2 2.9-.7.8-.5 1.4-1.1 1.9-1.9l-2.8-2.2z"/>
            </svg>
            <p className="font-sans text-cream/50 text-sm leading-relaxed max-w-xs">
              Connecting impact investors with women-led Micro Fermentation Units across India. Every block of tempeh tells a story.
            </p>
            <p className="font-sans text-cream/30 text-xs mt-4">
              "We grow together."
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/40 mb-5">Platform</p>
            <ul className="space-y-3">
              {[
                { label: 'Browse Operators', to: '/#operators' },
                { label: 'How It Works', to: '/#how-it-works' },
                { label: 'Register as Investor', to: '/register' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="font-sans text-sm text-cream/55 hover:text-turmeric transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-cream/40 mb-5">Get in Touch</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-turmeric mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-cream/55">info@tempeh.today</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-turmeric mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-cream/55">+31 (0)183 44 63 90</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-turmeric mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-cream/55">Burgstraat 12, Giessen, Netherlands</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/30">
            © 2026 Tempeh Today. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-sans text-xs text-cream/30 hover:text-cream/50 transition-colors">Privacy Policy</a>
            <a href="#" className="font-sans text-xs text-cream/30 hover:text-cream/50 transition-colors">Platform Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
