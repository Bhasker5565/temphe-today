import { useState } from 'react'
import { X } from 'lucide-react'
import type { Operator, PhotoCategory } from '../../types'

const categoryColor: Record<PhotoCategory, string> = {
  Production: 'bg-forest-faint text-forest border-forest/20',
  Family: 'bg-turmeric-faint text-turmeric-dark border-turmeric/30',
  Faith: 'bg-brand-faint text-brand border-brand/20',
  Milestone: 'bg-purple-50 text-purple-700 border-purple-200',
}

export default function GalleryTab({ operator }: { operator: Operator }) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const active = operator.gallery.find(p => p.id === lightbox)

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {operator.gallery.map(photo => (
          <button
            key={photo.id}
            onClick={() => setLightbox(photo.id)}
            className="group relative overflow-hidden text-left"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-400"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className={`inline-flex items-center px-2 py-0.5 text-xs font-sans font-semibold border ${categoryColor[photo.category]} mb-1.5`}>
                {photo.category}
              </span>
              <p className="font-sans text-white text-xs leading-snug line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white max-w-2xl w-full shadow-warm-hover"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={active.url}
                alt={active.caption}
                className="w-full h-72 md:h-96 object-cover"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 bg-charcoal/70 text-white w-8 h-8 flex items-center justify-center hover:bg-brand transition-colors"
              >
                <X size={16} />
              </button>
              <span className={`absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 text-xs font-sans font-semibold border ${categoryColor[active.category]}`}>
                {active.category}
              </span>
            </div>
            <div className="p-5">
              <p className="font-sans text-charcoal/80 text-sm leading-relaxed mb-2">{active.caption}</p>
              <p className="font-sans text-xs text-charcoal/40">{active.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
