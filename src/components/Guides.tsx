import { useState } from 'react'
import { ChevronDown, Flame, Play, Thermometer, Wind } from 'lucide-react'
import { backdraft, guides, type Guide } from '../data/kamado'
import Callout from './Callout'

const icons = {
  flame: Flame,
  'thermo-low': Thermometer,
  'thermo-high': Thermometer,
  smoke: Wind,
} as const

function GuideBody({ guide, onSimulate }: { guide: Guide; onSimulate: (t: number) => void }) {
  return (
    <div className="space-y-5">
      {guide.intro && <p className="text-zinc-300">{guide.intro}</p>}
      <ol className="space-y-3">
        {guide.steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ember-amber/15 text-sm font-bold text-ember-amber">{i + 1}</span>
            <span className="pt-0.5 leading-relaxed">{s}</span>
          </li>
        ))}
      </ol>
      {guide.simulateTemp && (
        <button
          type="button"
          onClick={() => onSimulate(guide.simulateTemp!)}
          className="inline-flex items-center gap-2 rounded-xl bg-ember-amber px-4 py-2 font-semibold text-coal transition-colors hover:bg-amber-400"
        >
          <Play className="h-4 w-4" aria-hidden="true" /> Visa i simulatorn
        </button>
      )}
      {guide.callouts?.map((c) => (
        <Callout key={c.title} kind={c.kind} title={c.title}>
          {c.text}
        </Callout>
      ))}
    </div>
  )
}

export default function Guides({ onSimulate }: { onSimulate: (t: number) => void }) {
  const [active, setActive] = useState(guides[0].id)
  const [openId, setOpenId] = useState<string | null>(guides[0].id)
  const current = guides.find((g) => g.id === active)!

  return (
    <div className="space-y-8">
      {/* Flikar på bredare skärmar */}
      <div className="hidden md:block">
        <div role="tablist" aria-label="Guider" className="flex gap-2 border-b border-line">
          {guides.map((g) => {
            const Icon = icons[g.icon]
            const on = g.id === active
            return (
              <button
                key={g.id}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={on}
                aria-controls={`panel-${g.id}`}
                tabIndex={on ? 0 : -1}
                type="button"
                onClick={() => setActive(g.id)}
                className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 font-medium transition-colors ${
                  on ? 'border-ember-amber text-ember-amber' : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {g.title}
              </button>
            )
          })}
        </div>
        <div role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} key={current.id} className="fade-up pt-6">
          <GuideBody guide={current} onSimulate={onSimulate} />
        </div>
      </div>

      {/* Accordion på mobil */}
      <div className="space-y-2 md:hidden">
        {guides.map((g) => {
          const Icon = icons[g.icon]
          const isOpen = openId === g.id
          return (
            <div key={g.id} className="rounded-2xl border border-line bg-graphite">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`acc-${g.id}`}
                  onClick={() => setOpenId(isOpen ? null : g.id)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left font-semibold"
                >
                  <Icon className="h-5 w-5 text-ember-amber" aria-hidden="true" />
                  <span className="flex-1">{g.title}</span>
                  <ChevronDown className={`h-5 w-5 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              </h3>
              {isOpen && (
                <div id={`acc-${g.id}`} className="px-4 pb-5">
                  <GuideBody guide={g} onSimulate={onSimulate} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bakdrag */}
      <section aria-labelledby="backdraft" className="rounded-2xl border-2 border-ember-red bg-ember-red/10 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <Flame className="flame mt-1 h-7 w-7 shrink-0 text-ember-red" aria-hidden="true" />
          <div>
            <h3 id="backdraft" className="text-xl font-extrabold">
              {backdraft.title}
            </h3>
            <p className="mt-2 text-zinc-200">{backdraft.text}</p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-zinc-200 marker:font-bold marker:text-ember-red">
              {backdraft.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}
