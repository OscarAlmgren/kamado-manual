import { useState, type ReactNode } from 'react'
import { modeTemp, modeForTemp, type Vents } from './lib/vents'
import ExplodedView from './components/ExplodedView'
import Guides from './components/Guides'
import Header from './components/Header'
import Maintenance from './components/Maintenance'
import SpecsTable from './components/SpecsTable'
import ModeTable from './components/simulator/ModeTable'
import VentSimulator from './components/simulator/VentSimulator'
import { modes } from './data/kamado'

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-ember-amber">{kicker}</p>
      <h2 id={`${id}-h`} className="mt-1 mb-8 text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function App() {
  const [temp, setTemp] = useState(Math.round(modeTemp(modes[1]) / 5) * 5)
  const [override, setOverride] = useState<Vents | null>(null)
  const activeId = override ? undefined : (() => {
    const m = modeForTemp(temp)
    return m.inside ? m.mode.id : undefined
  })()

  const simulate = (t: number) => {
    setOverride(null)
    setTemp(t)
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div id="top">
      <Header />

      <main>
        <section id="simulator" aria-labelledby="simulator-h" className="mx-auto max-w-6xl px-4 pt-5 pb-14 md:pt-6 md:pb-20">
          <h1 id="simulator-h" className="mb-3 text-2xl font-extrabold tracking-tight md:mb-4 md:text-3xl">
            Ställ in lufthålen <span className="text-base font-medium text-muted md:text-lg">(Top Vent / Bottom Vent)</span>
          </h1>
          <VentSimulator temp={temp} setTemp={setTemp} override={override} setOverride={setOverride} />
          <h2 className="mt-14 mb-4 text-xl font-bold">Snabbtabell</h2>
          <ModeTable activeId={activeId} />
        </section>

        <Section id="delar" kicker="Översikt" title="Grillens delar">
          <ExplodedView />
        </Section>

        <Section id="guider" kicker="Steg för steg" title="Guider">
          <Guides onSimulate={simulate} />
        </Section>

        <Section id="underhall" kicker="Underhåll & felsökning" title="Rengöring, krackelering och förvaring">
          <Maintenance />
        </Section>

        <Section id="specifikation" kicker="Fakta" title="Teknisk data">
          <SpecsTable />
        </Section>
      </main>

      <footer className="border-t border-line px-4 py-8 text-center text-sm text-muted">
        Läs alltid den tryckta bruksanvisningen för din grill. Tider och temperaturer är riktvärden.
      </footer>
    </div>
  )
}
