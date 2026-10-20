import { useState } from 'react'
import { Flame, Menu, X } from 'lucide-react'

export const sections = [
  { id: 'simulator', label: 'Simulator' },
  { id: 'delar', label: 'Delar' },
  { id: 'guider', label: 'Guider' },
  { id: 'underhall', label: 'Underhåll' },
  { id: 'specifikation', label: 'Specifikation' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-coal/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2 font-bold">
          <Flame className="h-5 w-5 text-ember-orange" aria-hidden="true" />
          Kamado
        </a>

        <nav aria-label="Sidor" className="hidden gap-1 md:flex">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-lg px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-ember-amber">
              {s.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sidor" className="border-t border-line bg-coal px-4 py-2 md:hidden">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-zinc-200 hover:bg-white/5">
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
