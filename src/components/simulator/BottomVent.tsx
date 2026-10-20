import { useId } from 'react'

type Props = {
  /** 0 = stängd, 1 = helt öppen */
  open: number
  className?: string
}

const X = 12
const Y = 14
const W = 216
const H = 52

/** Nedre lufthål: en skjutlucka som glider över en glödande öppning. Mörk del = stängd (●), glöd = öppen (○). */
export default function BottomVent({ open, className }: Props) {
  const uid = useId().replace(/:/g, '')
  const glowId = `bglow-${uid}`
  const closed = 1 - open

  return (
    <svg viewBox="0 0 240 80" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={glowId} x1="0" x2="1">
          <stop offset="0" stopColor="#dc2626" />
          <stop offset="0.5" stopColor="#f97316" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
      </defs>

      {/* Ram */}
      <rect x={X - 6} y={Y - 6} width={W + 12} height={H + 12} rx="12" fill="#2a2b31" stroke="#e4e4e7" strokeWidth="3" />

      {/* Öppning med glöd */}
      <rect x={X} y={Y} width={W} height={H} rx="6" fill={`url(#${glowId})`} opacity={0.25 + 0.75 * open} style={{ transition: 'opacity 600ms ease' }} />

      {/* Skjutlucka, förankrad till vänster */}
      <g style={{ transform: `scaleX(${closed})`, transformOrigin: `${X}px ${Y}px`, transition: 'transform 600ms ease' }}>
        <rect x={X} y={Y} width={W} height={H} rx="6" fill="#4a4b53" />
        {[0.2, 0.4, 0.6, 0.8].map((p) => (
          <line key={p} x1={X + W * p} x2={X + W * p} y1={Y + 6} y2={Y + H - 6} stroke="#2a2b31" strokeWidth="2" />
        ))}
        <rect x={X} y={Y} width={W} height={H} rx="6" fill="none" stroke="#e4e4e7" strokeWidth="2" opacity="0.8" />
      </g>

      {/* Handtag på luckans kant */}
      <rect
        x={X - 3}
        y={Y + 10}
        width="6"
        height={H - 20}
        rx="3"
        fill="#e4e4e7"
        style={{ transform: `translateX(${W * closed}px)`, transition: 'transform 600ms ease, opacity 600ms ease', opacity: closed < 0.02 ? 0 : 1 }}
      />
    </svg>
  )
}
