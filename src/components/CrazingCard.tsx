import { useMemo, useState, type ReactNode } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { crazing } from '../data/kamado'
import { crackPath } from '../lib/crackPattern'

const SIZE = 400

export default function CrazingCard() {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState(50)
  const [magnify, setMagnify] = useState(false)
  const d = useMemo(() => crackPath(SIZE, 7), [])

  return (
    <div className="rounded-2xl border border-line bg-graphite">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="crazing-body"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <Search className="h-5 w-5 shrink-0 text-ember-amber" aria-hidden="true" />
        <span className="flex-1">
          <span className="block text-lg font-bold">{crazing.title}</span>
          <span className="block text-sm text-ember-amber">{crazing.headline}</span>
        </span>
        <ChevronDown className={`h-5 w-5 text-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div id="crazing-body" className="fade-up grid gap-6 border-t border-line p-5 md:grid-cols-2">
          <div>
            <div className="relative mx-auto aspect-square w-full max-w-md select-none overflow-hidden rounded-xl border border-line">
              {/* Efter: glasyr med hårsprickor */}
              <Glaze magnify={magnify}>
                <path
                  d={d}
                  fill="none"
                  stroke="#27272a"
                  strokeWidth={magnify ? 1.6 : 0.9}
                  strokeLinecap="round"
                  opacity={magnify ? 0.9 : 0.4}
                  style={{ transition: 'opacity 400ms ease, stroke-width 400ms ease' }}
                />
              </Glaze>

              {/* Före: blank glasyr, klipps av delaren */}
              <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <Glaze magnify={magnify} />
              </div>

              <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">Före</span>
              <span className="absolute right-3 top-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">Efter</span>

              <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)]" style={{ left: `${pos}%` }}>
                <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-xs font-bold text-coal shadow">
                  ⇆
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label="Jämför före och efter"
                aria-valuetext={`${pos} % före`}
                className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              />
            </div>

            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 text-sm text-zinc-300">
              <input type="checkbox" checked={magnify} onChange={(e) => setMagnify(e.target.checked)} className="h-4 w-4 accent-amber-500" />
              Visa dammig / förstorad yta
            </label>
          </div>

          <div className="space-y-3">
            <p className="text-zinc-300">{crazing.summary}</p>
            <ul className="space-y-2">
              {crazing.facts.map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-amber" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function Glaze({ magnify, children }: { magnify: boolean; children?: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="glaze" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e5e7eb" />
          <stop offset="1" stopColor="#b8bcc4" />
        </linearGradient>
      </defs>
      <rect width={SIZE} height={SIZE} fill="url(#glaze)" />
      <rect width={SIZE} height={SIZE} fill="#a8927a" opacity={magnify ? 0.18 : 0} style={{ transition: 'opacity 400ms ease' }} />
      {children}
    </svg>
  )
}
