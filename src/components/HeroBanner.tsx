import { useNavigate } from 'react-router-dom'
import { ArrowDown } from 'lucide-react'

export default function HeroBanner() {
  const navigate = useNavigate()

  return (
    <section data-nav-dark className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Background image */}
      <img
        src="/images/hero.jpeg"
        alt="MFU operator at work in her unit"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Left-to-right gradient: heavy brown fading to transparent */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand/10" />
      {/* Bottom vignette to ground the stats */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />

      {/* Content column — fills the full viewport height */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-24 pb-5 md:pb-8">

        {/* ── Main copy: vertically centred in the space above stats ── */}
        <div className="flex-1 flex flex-col justify-center max-w-xl lg:max-w-2xl">
          <p className="font-sans text-turmeric text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-3 md:mb-4">
            Tempeh Today — MFU Operator Connect
          </p>

          <h1 className="font-display text-white leading-[1.08] mb-3 md:mb-5">
            <span className="block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Invest in a Woman.
            </span>
            <span className="block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-turmeric-light mt-0.5 md:mt-1">
              Change a Family.
            </span>
            <span className="block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-0.5 md:mt-1">
              Build a Nation.
            </span>
          </h1>

          <p className="font-sans text-cream/85 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-5 md:mb-8 max-w-md">
            Meet the women behind every block of Tempeh — and choose how you want to support them.
          </p>

          {/* Buttons — always side by side to save vertical space */}
          <div className="flex flex-row flex-wrap gap-3">
            <a href="#operators" className="btn-turmeric gap-2 text-xs sm:text-sm py-3 px-5 sm:py-3.5 sm:px-7">
              Meet Our Operators
              <ArrowDown size={14} />
            </a>
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 border-2 border-cream/60 text-cream font-sans font-semibold text-xs sm:text-sm tracking-wide hover:bg-cream/10 transition-colors"
            >
              Register as Investor
            </button>
          </div>
        </div>

        {/* ── Stats — pinned to the bottom of the viewport ── */}
        <div className="flex items-end gap-5 sm:gap-8 md:gap-12 pt-4">
          <div>
            <div className="font-display text-turmeric text-xl sm:text-2xl md:text-3xl font-bold leading-none">6</div>
            <div className="font-sans text-cream/55 text-[10px] sm:text-xs mt-1">Active MFU Operators</div>
          </div>
          <div className="border-l border-cream/20 pl-5 sm:pl-8 md:pl-12">
            <div className="font-display text-turmeric text-xl sm:text-2xl md:text-3xl font-bold leading-none">
              73,650<span className="text-sm sm:text-base md:text-lg ml-1">kg</span>
            </div>
            <div className="font-sans text-cream/55 text-[10px] sm:text-xs mt-1">Tempeh Produced</div>
          </div>
          <div className="border-l border-cream/20 pl-5 sm:pl-8 md:pl-12">
            <div className="font-display text-turmeric text-xl sm:text-2xl md:text-3xl font-bold leading-none">1,200+</div>
            <div className="font-sans text-cream/55 text-[10px] sm:text-xs mt-1">Families Fed Weekly</div>
          </div>
        </div>
      </div>

      {/* Scroll cue — sits just above the fold */}
      <a
        href="#how-it-works"
        className="absolute bottom-4 right-6 md:right-12 flex flex-col items-center gap-1 text-cream/30 hover:text-cream/60 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={16} />
      </a>
    </section>
  )
}
