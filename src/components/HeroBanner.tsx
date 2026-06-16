import { useNavigate } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'

export default function HeroBanner() {
  const navigate = useNavigate()

  return (
    <section className="relative w-full min-h-[92vh] overflow-hidden flex items-center">
      {/* Background image */}
      <img
        src="/images/hero.jpeg"
        alt="MFU operator at work in her unit"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient: strong brown on left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand/75 to-brand/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-xl lg:max-w-2xl">
          <p className="font-sans text-turmeric text-xs font-semibold uppercase tracking-[0.2em] mb-5">
            Tempeh Today — MFU Operator Connect
          </p>

          <h1 className="font-display text-white leading-[1.1] mb-6">
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold">
              Invest in a Woman.
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold italic text-turmeric-light mt-1">
              Change a Family.
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold mt-1">
              Build a Nation.
            </span>
          </h1>

          <p className="font-sans text-cream/90 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
            Meet the women behind every block of Tempeh — and choose how you want to support them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#operators"
              className="btn-turmeric gap-2 text-sm"
            >
              Meet Our Operators
              <ArrowDown size={15} />
            </a>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-cream/60 text-cream font-sans font-semibold text-sm tracking-wide hover:bg-cream/10 transition-colors"
            >
              Register as Investor
            </button>
          </div>

          {/* Impact numbers */}
          <div className="mt-14 flex gap-8 sm:gap-12">
            <div>
              <div className="font-display text-turmeric text-3xl font-bold">6</div>
              <div className="font-sans text-cream/60 text-xs mt-0.5">Active MFU Operators</div>
            </div>
            <div className="border-l border-cream/20 pl-8 sm:pl-12">
              <div className="font-display text-turmeric text-3xl font-bold">73,650<span className="text-lg ml-1">kg</span></div>
              <div className="font-sans text-cream/60 text-xs mt-0.5">Tempeh Produced</div>
            </div>
            <div className="border-l border-cream/20 pl-8 sm:pl-12">
              <div className="font-display text-turmeric text-3xl font-bold">1,200+</div>
              <div className="font-sans text-cream/60 text-xs mt-0.5">Families Fed Weekly</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#how-it-works"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/40 hover:text-cream/70 transition-colors animate-bounce"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
