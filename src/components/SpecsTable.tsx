import { specModels } from '../data/kamado'

export default function SpecsTable() {
  return (
    <div className="space-y-6">
      {specModels.map((m) => (
        <div key={m.subtitle} className="overflow-hidden rounded-2xl border border-line bg-graphite">
          <div className="border-b border-line bg-graphite-2 px-5 py-4">
            <h3 className="text-lg font-bold">{m.title}</h3>
            <p className="text-sm text-ember-amber">{m.subtitle}</p>
          </div>
          <table className="w-full text-left">
            <caption className="sr-only">
              {m.title}, {m.subtitle}
            </caption>
            <tbody>
              {m.rows.map((r) => (
                <tr key={r.label} className="border-b border-line last:border-0 odd:bg-white/[0.02]">
                  <th scope="row" className="px-5 py-3 text-sm font-medium text-muted sm:w-1/2">
                    {r.label}
                  </th>
                  <td className="px-5 py-3 text-right font-semibold sm:text-left">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
