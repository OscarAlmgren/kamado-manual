import { useRef, useState, type ReactNode } from 'react'
import { RotateCcw, Thermometer, Timer, Wind } from 'lucide-react'
import { TEMP_MAX, TEMP_MIN, modes, type Food, type Mode } from '../../data/kamado'
import { bottomLabel, modeForTemp, modeForVents, modeTemp, topLabel, ventsForTemp, type Vents } from '../../lib/vents'
import Callout from '../Callout'
import BottomVent from './BottomVent'
import FoodIcon from './FoodIcon'
import FoodPicker, { foodKey } from './FoodPicker'
import TopVent from './TopVent'

type Props = {
  temp: number
  setTemp: (t: number) => void
  override: Vents | null
  setOverride: (v: Vents | null) => void
}

const pct = (t: number) => ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100
const modeStartTemp = (m: Mode) => Math.round(modeTemp(m) / 5) * 5

export default function VentSimulator({ temp, setTemp, override, setOverride }: Props) {
  const [pickedFood, setPickedFood] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const vents = override ?? ventsForTemp(temp)
  const byTemp = modeForTemp(temp)
  const mode = override ? modeForVents(override) : byTemp.mode
  const between = !override && !byTemp.inside
  const effectiveTemp = override ? modeTemp(mode) : temp
  const hue = 38 - 38 * Math.min(1, Math.max(0, (effectiveTemp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)))

  // Vald maträtt gäller bara så länge simulatorn står i rättens läge.
  const selectedFood = mode.foods.find((f) => foodKey(mode, f) === pickedFood) ?? null

  const selectFood = (m: Mode, f: Food) => {
    setOverride(null)
    setTemp(modeStartTemp(m))
    setPickedFood(foodKey(m, f))
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <div className="space-y-4">
      {/* Lägesknappar */}
      <div role="group" aria-label="Tillagningsläge" className="grid grid-cols-3 gap-2 md:gap-3">
        {modes.map((m) => {
          const active = !override && byTemp.inside && byTemp.mode.id === m.id
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setOverride(null)
                setTemp(modeStartTemp(m))
              }}
              className={`rounded-xl border px-3 py-2.5 text-left transition-colors md:px-4 md:py-3 ${
                active ? 'border-ember-amber bg-ember-amber/10' : 'border-line bg-graphite hover:border-zinc-500'
              }`}
            >
              <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-muted md:block">{m.sv}</span>
              <span className="block text-sm font-bold md:text-base">{m.label}</span>
              <span className={`block text-xs font-semibold md:text-sm ${active ? 'text-ember-amber' : 'text-zinc-300'}`}>
                {m.range[0]}–{m.range[1]} °C
              </span>
            </button>
          )
        })}
      </div>

      <div ref={cardRef} className="scroll-mt-20 rounded-3xl border border-line bg-graphite p-4 md:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          {/* Temperatur och vald maträtt */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <Thermometer className="h-8 w-8 shrink-0" style={{ color: `hsl(${hue} 95% 55%)` }} aria-hidden="true" />
              <div aria-live="polite">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {override ? 'Ungefärlig temperatur' : 'Temperatur'}
                </p>
                <p className="text-4xl font-extrabold leading-none tabular-nums md:text-5xl" style={{ color: `hsl(${hue} 95% 55%)` }}>
                  {override ? `${mode.range[0]}–${mode.range[1]}` : temp}
                  <span className="ml-1 text-2xl font-semibold">°C</span>
                </p>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="temp" className="sr-only">
                Temperatur
              </label>
              <input
                id="temp"
                type="range"
                className="ember-range"
                min={TEMP_MIN}
                max={TEMP_MAX}
                step={5}
                value={temp}
                aria-valuetext={`${temp} °C`}
                onChange={(e) => {
                  setOverride(null)
                  setTemp(Number(e.target.value))
                }}
              />
              <div className="relative mt-3 h-6" aria-hidden="true">
                {modes.map((m) => (
                  <div
                    key={m.id}
                    className="absolute top-0 h-1.5 rounded-full bg-zinc-500/60"
                    style={{ left: `${pct(m.range[0])}%`, width: `${pct(m.range[1]) - pct(m.range[0])}%` }}
                  >
                    <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap text-[11px] text-muted">
                      {m.range[0]}–{m.range[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex-1 rounded-2xl bg-graphite-2 p-4" aria-live="polite">
              {selectedFood ? (
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-graphite">
                    <FoodIcon kind={selectedFood.kind} className="h-8 w-8" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Vald maträtt</p>
                    <p className="truncate text-lg font-bold leading-tight">
                      {selectedFood.sv} <span className="text-sm font-normal text-muted">({selectedFood.name})</span>
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-ember-amber">
                      <Timer className="h-4 w-4" aria-hidden="true" /> {selectedFood.time}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-zinc-300">
                  <span className="font-semibold text-ink">{mode.label}.</span> {mode.summary}
                  {between && <span className="mt-1 block text-muted">Mellan två lägen, närmaste läge visas.</span>}
                </p>
              )}
            </div>
          </div>

          {/* Ventiler */}
          <div className="grid gap-3 sm:grid-cols-2">
            <VentCard title="Övre lufthål" en="Top Vent" label={topLabel(vents.top)} value={vents.top}
              onChange={(v) => setOverride({ top: v, bottom: vents.bottom })} inputId="top-vent">
              <TopVent open={vents.top} className="mx-auto h-32 w-32 md:h-36 md:w-36" />
            </VentCard>
            <VentCard title="Nedre lufthål" en="Bottom Vent" label={bottomLabel(vents.bottom)} value={vents.bottom}
              onChange={(v) => setOverride({ top: vents.top, bottom: v })} inputId="bottom-vent">
              <div className="flex h-32 flex-col items-center justify-center gap-2 md:h-36">
                <BottomVent open={vents.bottom} className="w-full max-w-[16rem]" />
                <div className="flex gap-2 text-ember-amber" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <Wind key={i} className="h-4 w-4 transition-opacity duration-500" style={{ opacity: Math.min(1, Math.max(0.12, vents.bottom * 3 - i)) }} />
                  ))}
                </div>
              </div>
            </VentCard>
            <p className="flex items-center justify-center gap-x-4 text-xs text-muted sm:col-span-2">
              <span>○ Öppen</span>
              <span>● Stängd</span>
            </p>
          </div>
        </div>

        {override && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ember-amber/40 bg-ember-amber/10 px-4 py-3 text-sm" aria-live="polite">
            <span>
              Egen inställning. Det här liknar läget <strong>{mode.label}</strong>.
            </span>
            <button
              type="button"
              onClick={() => setOverride(null)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-graphite-2 px-3 py-1.5 font-medium hover:border-ember-amber"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Återställ till automatik
            </button>
          </div>
        )}
      </div>

      {effectiveTemp > 230 && (
        <Callout kind="danger" title="Hög temperatur: öppna locket försiktigt">
          Glänta på locket 2–5 cm i några sekunder innan du öppnar helt, annars finns risk för bakdrag (backdraft) och flare-up.
        </Callout>
      )}

      <div className="pt-4">
        <FoodPicker activeId={mode.id} selected={selectedFood ? foodKey(mode, selectedFood) : null} onSelect={selectFood} />
      </div>

      <Callout kind="tip" title="Justera i små steg">
        Vänta 10–15 minuter mellan varje ändring. Det är lättare att höja temperaturen än att sänka den.
      </Callout>
    </div>
  )
}

type VentCardProps = {
  title: string
  en: string
  label: string
  value: number
  onChange: (v: number) => void
  inputId: string
  children: ReactNode
}

function VentCard({ title, en, label, value, onChange, inputId, children }: VentCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-graphite-2 p-3 md:p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold md:text-base">
          {title} <span className="text-xs font-normal text-muted">({en})</span>
        </h3>
      </div>
      <p className="text-sm font-semibold text-ember-amber" aria-live="polite">
        {label}
      </p>
      <div className="my-2">{children}</div>
      <label htmlFor={inputId} className="sr-only">
        {title}, öppning i procent
      </label>
      <input
        id={inputId}
        type="range"
        className="ember-range"
        min={0}
        max={100}
        step={5}
        value={Math.round(value * 100)}
        aria-valuetext={`${Math.round(value * 100)} % öppen, ${label}`}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
      />
      <div className="mt-1 flex justify-between text-xs text-muted" aria-hidden="true">
        <span>Stängd</span>
        <span>Öppen</span>
      </div>
    </div>
  )
}
