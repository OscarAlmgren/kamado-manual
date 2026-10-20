import { modes, type Mode } from '../data/kamado'

export type Vents = { top: number; bottom: number }

const mid = (m: Mode) => (m.range[0] + m.range[1]) / 2
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Ventilöppning (0–1) för en temperatur, interpolerad mellan lägenas mittpunkter. */
export function ventsForTemp(temp: number): Vents {
  const first = modes[0]
  const last = modes[modes.length - 1]
  if (temp <= mid(first)) return { top: first.topOpen, bottom: first.bottomOpen }
  if (temp >= mid(last)) return { top: last.topOpen, bottom: last.bottomOpen }
  for (let i = 0; i < modes.length - 1; i++) {
    const a = modes[i]
    const b = modes[i + 1]
    if (temp <= mid(b)) {
      const t = (temp - mid(a)) / (mid(b) - mid(a))
      return { top: lerp(a.topOpen, b.topOpen, t), bottom: lerp(a.bottomOpen, b.bottomOpen, t) }
    }
  }
  return { top: last.topOpen, bottom: last.bottomOpen }
}

/** Närmaste tillagningsläge för en temperatur. `inside` är sant när temperaturen ligger inom lägets intervall. */
export function modeForTemp(temp: number): { mode: Mode; inside: boolean } {
  let best = modes[0]
  let bestDist = Infinity
  for (const m of modes) {
    const d = temp < m.range[0] ? m.range[0] - temp : temp > m.range[1] ? temp - m.range[1] : 0
    if (d < bestDist || (d === bestDist && Math.abs(temp - mid(m)) < Math.abs(temp - mid(best)))) {
      best = m
      bestDist = d
    }
  }
  return { mode: best, inside: bestDist === 0 }
}

/** Närmaste läge utifrån manuellt inställda ventiler. */
export function modeForVents(v: Vents): Mode {
  let best = modes[0]
  let bestDist = Infinity
  for (const m of modes) {
    const d = Math.hypot(v.top - m.topOpen, v.bottom - m.bottomOpen)
    if (d < bestDist) {
      best = m
      bestDist = d
    }
  }
  return best
}

export const modeTemp = mid

export function topLabel(open: number): string {
  if (open < 0.25) return 'Nästan stängd'
  if (open < 0.75) return 'Halvöppen'
  return 'Helt öppen'
}

export function bottomLabel(open: number): string {
  if (open < 0.1) return 'Stängd'
  if (open < 0.25) return 'Liten springa'
  if (open > 0.95) return 'Helt öppen'
  return `${Math.round(open * 100)} % öppen`
}
