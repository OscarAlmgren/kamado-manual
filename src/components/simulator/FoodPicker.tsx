import { Timer } from 'lucide-react'
import { modes, type Food, type Mode } from '../../data/kamado'
import FoodIcon from './FoodIcon'

export const foodKey = (m: Mode, f: Food) => `${m.id}:${f.name}`

type Props = {
  activeId: Mode['id']
  selected: string | null
  onSelect: (mode: Mode, food: Food) => void
}

/** Alla maträtter, grupperade efter läge. Ett klick ställer in simulatorn för rätten. */
export default function FoodPicker({ activeId, selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold">
        Välj maträtt <span className="text-sm font-normal text-muted">så ställs grillen in åt dig</span>
      </h2>
      <div className="mt-3 grid gap-5 lg:grid-cols-3 xl:grid-cols-5">
        {modes.map((m) => (
          <section key={m.id} aria-labelledby={`food-${m.id}`}>
            <h3 id={`food-${m.id}`} className={`mb-2 text-sm font-semibold ${m.id === activeId ? 'text-ember-amber' : 'text-muted'}`}>
              {m.label} <span className="font-normal">· {m.range[0]}–{m.range[1]} °C</span>
              {m.source === 'general' && (
                <span className="mt-0.5 block text-[11px] font-normal italic text-muted">Allmänt riktvärde, ej ur manualen</span>
              )}
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">              {m.foods.map((f) => {
                const on = selected === foodKey(m, f)
                return (
                  <li key={f.name}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => onSelect(m, f)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                        m.source === 'general' ? 'border-dashed' : ''
                      } ${
                        on ? 'border-ember-amber bg-ember-amber/10' : 'border-line bg-graphite-2 hover:border-zinc-500'
                      }`}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-graphite">
                        <FoodIcon kind={f.kind} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium leading-tight">{f.sv}</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-ember-amber">
                          <Timer className="h-3 w-3" aria-hidden="true" />
                          {f.time}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
