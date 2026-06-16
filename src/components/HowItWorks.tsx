import { Search, Heart, BarChart2 } from 'lucide-react'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse Operators',
    description: 'Discover women running Tempeh MFUs across India — filter by state, city, or investment type.',
  },
  {
    icon: Heart,
    step: '02',
    title: 'Choose Your Support',
    description: 'Grant, Impact Loan, Loan with Interest, or Equity — you decide how you want to make a difference.',
  },
  {
    icon: BarChart2,
    step: '03',
    title: 'Watch the Impact',
    description: 'Follow her weekly production, happiness score, and family journey — updated by her, for you.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-nav-dark className="bg-brand py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="section-label text-cream/40 mb-3">How it works</p>
          <h2 className="font-display text-cream text-3xl md:text-4xl font-bold">
            Three steps to real impact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-cream/10">
          {steps.map(({ icon: Icon, step, title, description }) => (
            <div
              key={step}
              className="bg-brand px-8 py-10 lg:px-12 lg:py-12 group hover:bg-brand-light transition-colors duration-300"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-12 h-12 rounded-full bg-turmeric/15 flex items-center justify-center shrink-0 group-hover:bg-turmeric/25 transition-colors">
                  <Icon size={22} className="text-turmeric" />
                </div>
                <span className="font-display text-cream/20 text-5xl font-bold leading-none pt-1">
                  {step}
                </span>
              </div>
              <h3 className="font-display text-cream text-xl font-semibold mb-3">{title}</h3>
              <p className="font-sans text-cream/65 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
