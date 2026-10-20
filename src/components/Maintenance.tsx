import { Droplets, Lock, Snowflake, Sparkles, Umbrella } from 'lucide-react'
import { cleaning, storage } from '../data/kamado'
import Callout from './Callout'
import CrazingCard from './CrazingCard'

const storageIcons = [Umbrella, Snowflake, Lock]

export default function Maintenance() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-graphite p-5">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <Sparkles className="h-5 w-5 text-ember-amber" aria-hidden="true" />
            {cleaning.title}
          </h3>
          <div className="mt-4 flex items-center gap-4 rounded-xl bg-graphite-2 p-4">
            <span className="whitespace-nowrap text-3xl font-extrabold text-ember-orange">260 °C</span>
            <span className="text-sm text-zinc-300">i 30 minuter, så brinner matresterna bort (självrengörande funktion).</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {cleaning.items.map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-amber" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
          <Callout kind="warning" title="Inget vatten inuti keramiken" className="mt-4">
            <span className="flex items-start gap-2">
              <Droplets className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {cleaning.warning}
            </span>
          </Callout>
        </div>

        <div className="rounded-2xl border border-line bg-graphite p-5">
          <h3 className="text-lg font-bold">{storage.title}</h3>
          <ul className="mt-4 space-y-4">
            {storage.items.map((s, i) => {
              const Icon = storageIcons[i]
              return (
                <li key={s.title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-graphite-2 text-ember-amber">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm leading-relaxed text-zinc-300">{s.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <CrazingCard />
    </div>
  )
}
