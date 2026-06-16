import type { Operator } from '../../types'

const healthColor: Record<string, string> = {
  Good: 'text-forest font-medium',
  Fair: 'text-turmeric-dark font-medium',
  'Needs Attention': 'text-red-600 font-medium',
}
const healthBg: Record<string, string> = {
  Good: 'bg-forest-faint border-forest/20',
  Fair: 'bg-turmeric-faint border-turmeric/30',
  'Needs Attention': 'bg-red-50 border-red-200',
}

export default function StoryTab({ operator }: { operator: Operator }) {
  return (
    <div className="space-y-10">
      {/* Bio */}
      <div>
        <p className="section-label mb-4">Her Story</p>
        <div className="space-y-4">
          {operator.bio.split('\n\n').map((para, i) => (
            <p key={i} className="font-sans text-charcoal/80 text-base leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Family */}
      <div className="border-t border-cream-warm pt-10">
        <p className="section-label mb-4">Her Family</p>
        <div className="flex flex-col lg:flex-row gap-6">
          {operator.family.photo && (
            <div className="shrink-0">
              <img
                src={operator.family.photo}
                alt="Family"
                className="w-full lg:w-52 h-40 lg:h-36 object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <p className="font-sans text-charcoal/75 text-sm leading-relaxed mb-4">
              {operator.family.story}
            </p>
            <div className="space-y-2">
              {operator.family.members.map((member) => (
                <div key={member.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="font-sans font-semibold text-sm text-charcoal">{member.name}</span>
                  <span className="font-sans text-xs text-charcoal/50">{member.relation}</span>
                  {member.age && (
                    <span className="font-sans text-xs text-charcoal/40">Age {member.age}</span>
                  )}
                  {member.occupation && (
                    <span className="font-sans text-xs text-charcoal/50">— {member.occupation}</span>
                  )}
                  {member.school && (
                    <span className="font-sans text-xs text-charcoal/50">— {member.school}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Faith */}
      {operator.faith && (
        <div className="border-t border-cream-warm pt-10">
          <p className="section-label mb-4">Her Faith</p>
          <div className="flex items-start gap-3">
            <div className="w-1 h-12 bg-turmeric shrink-0 mt-1" />
            <div>
              <p className="font-sans text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2">
                {operator.faith.denomination}
              </p>
              <p className="font-display text-charcoal/80 text-lg italic leading-relaxed">
                "{operator.faith.statement}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Health */}
      <div className="border-t border-cream-warm pt-10">
        <p className="section-label mb-4">Her Health</p>
        <div className={`inline-flex items-center gap-3 border px-4 py-3 ${healthBg[operator.health.status]}`}>
          <div className={`w-2.5 h-2.5 rounded-full ${
            operator.health.status === 'Good' ? 'bg-forest' :
            operator.health.status === 'Fair' ? 'bg-turmeric' : 'bg-red-500'
          }`} />
          <span className={`font-sans text-sm ${healthColor[operator.health.status]}`}>
            {operator.health.status}
          </span>
        </div>
        {operator.health.note && (
          <p className="font-sans text-charcoal/60 text-sm mt-3 leading-relaxed max-w-lg">
            {operator.health.note}
          </p>
        )}
      </div>
    </div>
  )
}
