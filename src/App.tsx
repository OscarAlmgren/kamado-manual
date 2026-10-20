import { useState, type ReactNode } from 'react'
import { ArrowDown } from 'lucide-react'
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
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-line">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-ember-orange/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
            <p className="text-sm font-semibold uppercase tracking-widest text-ember-amber">Interaktiv bruksanvisning</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
              Behärska elden i din <span className="bg-gradient-to-r from-ember-amber to-ember-red bg-clip-text text-transparent">Kamado</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-300">
              Lär dig hur övre och nedre lufthål styr temperaturen, och få rätt inställning och tid för allt från långkok till bryning.
            </p>
            <a href="#simulator" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ember-amber px-5 py-3 font-semibold text-coal transition-colors hover:bg-amber-400">
              Prova simulatorn <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <Section id="simulator" kicker="Luftflöde & temperatur" title="Ställ in lufthålen (Top Vent / Bottom Vent)">
          <VentSimulator temp={temp} setTemp={setTemp} override={override} setOverride={setOverride} />
          <h3 className="mt-14 mb-4 text-xl font-bold">Snabbtabell</h3>
          <ModeTable activeId={activeId} />
        </Section>

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
