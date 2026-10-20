import { modes } from '../../data/kamado'
import { bottomLabel, topLabel } from '../../lib/vents'
import BottomVent from './BottomVent'
import TopVent from './TopVent'

/** Manualens tabell: ett läge per kolumn med ventilbilder och matlista. Utskriftsvänlig. */
export default function ModeTable({ activeId }: { activeId?: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {modes.map((m) => (
        <article
          key={m.id}
          className={`overflow-hidden rounded-2xl border bg-graphite ${activeId === m.id ? 'border-ember-amber' : 'border-line'}`}
        >
          <header className="bg-graphite-2 px-4 py-3">
            <h3 className="font-bold">{m.label}</h3>
            <p className="text-sm text-ember-amber">
              {m.range[0]}–{m.range[1]} °C
            </p>
          </header>
          <div className="grid grid-cols-2 gap-3 border-b border-line p-4">
            <figure className="text-center">
              <TopVent open={m.topOpen} className="mx-auto h-24 w-24" />
              <figcaption className="mt-1 text-xs text-muted">
                Övre lufthål
                <span className="block font-medium text-zinc-300">{topLabel(m.topOpen)}</span>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-between text-center">
              <BottomVent open={m.bottomOpen} className="mt-6 w-full" />
              <figcaption className="mt-1 text-xs text-muted">
                Nedre lufthål
                <span className="block font-medium text-zinc-300">{bottomLabel(m.bottomOpen)}</span>
              </figcaption>
            </figure>
          </div>
          <table className="w-full text-sm">
            <caption className="sr-only">Tillagningstider för {m.label}</caption>
            <tbody>
              {m.foods.map((f) => (
                <tr key={f.name} className="border-b border-line last:border-0 odd:bg-white/[0.02]">
                  <th scope="row" className="px-4 py-2 text-left font-medium">
                    {f.sv}
                    <span className="block text-xs font-normal text-muted">{f.name}</span>
                  </th>
                  <td className="px-4 py-2 text-right font-semibold text-ember-amber">{f.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      ))}
    </div>
  )
}
