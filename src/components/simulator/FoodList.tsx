import { Timer } from 'lucide-react'
import type { Mode } from '../../data/kamado'

export default function FoodList({ mode }: { mode: Mode }) {
  return (
    <div aria-live="polite">
      <h3 className="text-lg font-semibold">
        Passar för {mode.label}{' '}
        <span className="text-sm font-normal text-muted">
          ({mode.range[0]}–{mode.range[1]} °C)
        </span>
      </h3>
      <ul key={mode.id} className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {mode.foods.map((f, i) => (
          <li
            key={f.name}
            className="fade-up flex items-center justify-between gap-3 rounded-xl border border-line bg-graphite-2 px-4 py-3"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className="min-w-0">
              <span className="block truncate font-medium">{f.sv}</span>
              <span className="block truncate text-xs text-muted">{f.name}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ember-amber">
              <Timer className="h-4 w-4" aria-hidden="true" />
              {f.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
