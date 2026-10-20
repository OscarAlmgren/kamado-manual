import { useId } from 'react'

type Props = {
  /** 0 = stängd, 1 = helt öppen */
  open: number
  className?: string
}

const PETALS = [0, 1, 2, 3, 4]
const STEP = 72 // grader mellan petalerna
// Hålbredden är ~35° och mellanrummet ~37°, så 36° vridning stänger hålen helt.
const FULL_CLOSE_DEG = 36

/**
 * Solfjäder (daisy wheel) med fem hål. Ett vridbart lock med samma hål ligger över basplattan:
 * ligger hålen över varandra är ventilen öppen (glöd syns), annars täcker det mörka locket hålen.
 */
export default function TopVent({ open, className }: Props) {
  const uid = useId().replace(/:/g, '')
  const maskId = `holes-${uid}`
  const glowId = `glow-${uid}`
  const rotation = (1 - open) * FULL_CLOSE_DEG

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true">
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="0.6" stopColor="#f97316" />
          <stop offset="1" stopColor="#dc2626" />
        </radialGradient>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
          <rect width="200" height="200" fill="white" />
          {PETALS.map((i) => (
            <ellipse key={i} cx="100" cy="48" rx="16" ry="30" fill="black" transform={`rotate(${i * STEP} 100 100)`} />
          ))}
        </mask>
      </defs>

      {/* Glöd bakom ventilen, syns bara genom de öppna hålen */}
      <circle cx="100" cy="100" r="88" fill={`url(#${glowId})`} opacity={0.3 + 0.7 * open} style={{ transition: 'opacity 600ms ease' }} />

      {/* Basplatta */}
      <circle cx="100" cy="100" r="88" fill="#2a2b31" mask={`url(#${maskId})`} />

      {/* Vridbart lock */}
      <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 100px', transition: 'transform 600ms ease' }}>
        <circle cx="100" cy="100" r="88" fill="#4a4b53" mask={`url(#${maskId})`} />
        <circle cx="100" cy="100" r="9" fill="#17171a" stroke="#6b6c75" strokeWidth="2" />
      </g>

      {/* Hålkonturer, som i manualens bild (○ öppen, ● stängd) */}
      {PETALS.map((i) => (
        <ellipse key={i} cx="100" cy="48" rx="16" ry="30" fill="none" stroke="#e4e4e7" strokeWidth="2" opacity="0.8" transform={`rotate(${i * STEP} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#e4e4e7" strokeWidth="3" />
    </svg>
  )
}
