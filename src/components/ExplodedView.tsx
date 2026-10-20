import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { parts } from '../data/kamado'

type HitProps = {
  n: number
  active: number
  onSelect: (n: number) => void
  badge: { x: number; y: number; line: [number, number] }
  children: (on: boolean) => ReactNode
}

/** Klickbar del med numrerat märke och ledlinje, som i manualen. */
function Hit({ n, active, onSelect, badge, children }: HitProps) {
  const on = active === n
  const part = parts.find((p) => p.n === n)!
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(n)
    }
  }
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${n}. ${part.sv}`}
      aria-pressed={on}
      className="cursor-pointer outline-none [&:focus-visible_rect.badge]:stroke-white"
      onClick={() => onSelect(n)}
      onMouseEnter={() => onSelect(n)}
      onFocus={() => onSelect(n)}
      onKeyDown={onKey}
    >
      {children(on)}
      <line x1={badge.line[0]} y1={badge.line[1]} x2={badge.x} y2={badge.y} stroke={on ? '#f59e0b' : '#71717a'} strokeWidth="1.5" />
      <rect className="badge" x={badge.x - 12} y={badge.y - 12} width="24" height="24" rx="7" fill={on ? '#f59e0b' : '#0f0f10'} stroke={on ? '#f59e0b' : '#52525b'} strokeWidth="1.5" />
      <text x={badge.x} y={badge.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={on ? '#0f0f10' : '#f4f4f5'}>
        {n}
      </text>
    </g>
  )
}

const stroke = (on: boolean) => (on ? '#f59e0b' : '#a1a1aa')
const fill = (on: boolean) => (on ? 'rgba(245,158,11,0.18)' : '#1f2024')

type ViewProps = { active: number; onSelect: (n: number) => void }

/** Vy A: hel grill (lock, termometer, ventiler, handtag). */
function ViewA({ active, onSelect }: ViewProps) {
  const h = { active, onSelect }
  return (
    <svg viewBox="0 0 320 410" className="h-auto w-full" role="group" aria-label="Grillen sedd från sidan">
      {/* Underdel (ej numrerad) */}
      <path d="M58 212 C58 320 100 380 160 380 C220 380 262 320 262 212 Z" fill="#1f2024" stroke="#52525b" strokeWidth="2" />
      <ellipse cx="160" cy="212" rx="108" ry="16" fill="#25262b" stroke="#52525b" strokeWidth="2" />
      <rect x="112" y="168" width="10" height="40" rx="3" fill="#3f3f46" />
      <rect x="198" y="168" width="10" height="40" rx="3" fill="#3f3f46" />

      <Hit n={4} {...h} badge={{ x: 28, y: 349, line: [118, 349] }}>
        {(on) => (
          <>
            <rect x="118" y="335" width="84" height="28" rx="8" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            <line x1="160" y1="335" x2="160" y2="363" stroke={stroke(on)} strokeWidth="2" />
          </>
        )}
      </Hit>

      <Hit n={3} {...h} badge={{ x: 28, y: 84, line: [80, 84] }}>
        {(on) => (
          <>
            <path d="M58 150 C58 60 105 34 160 34 C215 34 262 60 262 150 Z" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            <ellipse cx="160" cy="150" rx="104" ry="15" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
          </>
        )}
      </Hit>

      <Hit n={1} {...h} badge={{ x: 262, y: 22, line: [184, 22] }}>
        {(on) => (
          <>
            <path d="M138 34 L142 17 L178 17 L182 34 Z" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            <rect x="134" y="9" width="52" height="8" rx="4" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
          </>
        )}
      </Hit>

      <Hit n={2} {...h} badge={{ x: 292, y: 70, line: [210, 70] }}>
        {(on) => (
          <>
            <circle cx="198" cy="70" r="12" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            <line x1="198" y1="70" x2="204" y2="63" stroke={stroke(on)} strokeWidth="2" strokeLinecap="round" />
          </>
        )}
      </Hit>

      <Hit n={11} {...h} badge={{ x: 292, y: 106, line: [224, 106] }}>
        {(on) => (
          <>
            <rect x="98" y="100" width="124" height="13" rx="6.5" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            <rect x="112" y="113" width="8" height="12" fill={stroke(on)} />
            <rect x="200" y="113" width="8" height="12" fill={stroke(on)} />
          </>
        )}
      </Hit>
    </svg>
  )
}

/** Vy B: delarna 5–10 isärdragna, i manualens ordning. */
function ViewB({ active, onSelect }: ViewProps) {
  const h = { active, onSelect }
  return (
    <svg viewBox="0 0 320 520" className="h-auto w-full" role="group" aria-label="Delarna isärdragna">
      <Hit n={5} {...h} badge={{ x: 292, y: 40, line: [240, 40] }}>
        {(on) => (
          <>
            <ellipse cx="140" cy="40" rx="100" ry="16" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            {[-60, -30, 0, 30, 60].map((dx) => (
              <line key={dx} x1={140 + dx} y1={26 + Math.abs(dx) / 20} x2={140 + dx} y2={54 - Math.abs(dx) / 20} stroke={stroke(on)} strokeWidth="1" opacity="0.7" />
            ))}
            {[-8, 0, 8].map((dy) => (
              <line key={dy} x1={60} y1={40 + dy} x2={220} y2={40 + dy} stroke={stroke(on)} strokeWidth="1" opacity="0.5" />
            ))}
          </>
        )}
      </Hit>

      <Hit n={6} {...h} badge={{ x: 292, y: 118, line: [224, 118] }}>
        {(on) => (
          <path
            d="M88 92 C104 80 124 86 140 76 C156 86 176 80 192 92 C204 110 222 122 222 138 C202 148 184 140 164 152 C152 160 128 160 116 152 C96 140 78 148 58 138 C58 122 76 110 88 92 Z"
            fill={fill(on)}
            stroke={stroke(on)}
            strokeWidth="2"
          />
        )}
      </Hit>

      <Hit n={7} {...h} badge={{ x: 292, y: 206, line: [184, 206] }}>
        {(on) => (
          <>
            <polygon points="140,176 62,236 218,236" fill="rgba(255,255,255,0.01)" />
            <g fill="none" stroke={stroke(on)} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="62,226 140,176 218,226" />
              <line x1="62" y1="226" x2="218" y2="226" />
              <line x1="140" y1="166" x2="140" y2="176" />
              <polyline points="62,226 62,240 74,240" />
              <polyline points="218,226 218,240 206,240" />
            </g>
          </>
        )}
      </Hit>

      <Hit n={8} {...h} badge={{ x: 292, y: 306, line: [218, 306] }}>
        {(on) => (
          <>
            <path d="M60 284 L72 328 C72 340 208 340 208 328 L220 284 Z" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            <ellipse cx="140" cy="284" rx="80" ry="14" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
          </>
        )}
      </Hit>

      <Hit n={9} {...h} badge={{ x: 292, y: 384, line: [226, 384] }}>
        {(on) => (
          <>
            <ellipse cx="140" cy="384" rx="84" ry="16" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            {[-1, 0, 1].map((r) =>
              [-4, -3, -2, -1, 0, 1, 2, 3, 4].map((c) => {
                const x = 140 + c * 15 + (r % 2 ? 7 : 0)
                const y = 384 + r * 6
                return Math.abs(x - 140) < 70 ? <ellipse key={`${r}${c}`} cx={x} cy={y} rx="4" ry="2" fill="none" stroke={stroke(on)} strokeWidth="1.2" /> : null
              }),
            )}
          </>
        )}
      </Hit>

      <Hit n={10} {...h} badge={{ x: 292, y: 466, line: [232, 466] }}>
        {(on) => (
          <>
            <path
              d="M38 432 C44 470 70 486 92 490 L92 512 L116 512 L116 498 L164 498 L164 512 L188 512 L188 490 C210 486 236 470 242 432 Z"
              fill={fill(on)}
              stroke={stroke(on)}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <ellipse cx="140" cy="432" rx="104" ry="16" fill={fill(on)} stroke={stroke(on)} strokeWidth="2" />
            <circle cx="140" cy="472" r="8" fill="#0f0f10" stroke={stroke(on)} strokeWidth="2" />
          </>
        )}
      </Hit>
    </svg>
  )
}

export default function ExplodedView() {
  const [active, setActive] = useState(1)
  const part = parts.find((p) => p.n === active)!

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <div className="grid gap-4 rounded-3xl border border-line bg-graphite p-4 sm:grid-cols-2 md:p-6">
        <figure>
          <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Hel grill</figcaption>
          <div className="mx-auto max-w-xs">
            <ViewA active={active} onSelect={setActive} />
          </div>
        </figure>
        <figure>
          <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Delar isär</figcaption>
          <div className="mx-auto max-w-xs">
            <ViewB active={active} onSelect={setActive} />
          </div>
        </figure>
      </div>

      {/* Under lg ligger panelen överst (fastnålad), sedan bilderna och sist listan. Från lg bildar de en sticky kolumn. */}
      <div className="contents lg:sticky lg:top-24 lg:block lg:space-y-4 lg:self-start">
        <div className="order-first rounded-2xl border border-ember-amber/50 bg-graphite p-5 max-lg:sticky max-lg:top-16 max-lg:z-10 lg:order-none" aria-live="polite">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ember-amber text-lg font-extrabold text-coal">{part.n}</span>
            <div>
              <h3 className="text-lg font-bold leading-tight">{part.sv}</h3>
              <p className="text-sm text-muted">{part.en}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">{part.desc}</p>
        </div>

        <ol className="order-last grid grid-cols-1 gap-1 sm:grid-cols-2 lg:order-none lg:grid-cols-1">
          {parts.map((p) => (
            <li key={p.n}>
              <button
                type="button"
                aria-pressed={p.n === active}
                onClick={() => setActive(p.n)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  p.n === active ? 'bg-ember-amber/15 text-ember-amber' : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line text-xs font-bold">{p.n}</span>
                {p.sv}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
