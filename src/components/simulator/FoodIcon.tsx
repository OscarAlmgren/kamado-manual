import type { ComponentType } from 'react'
import { Beef, Bird, Bone, Carrot, Croissant, Drumstick, Fish, Ham, Hamburger, Pizza } from 'lucide-react'
import type { FoodKind } from '../../data/kamado'

type IconProps = { className?: string }

// Lucide saknar korv och lammstek, så de ritas i samma stil (24×24, 2 px linje).
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function Sausage({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <rect x="1.5" y="8.5" width="21" height="7" rx="3.5" transform="rotate(-35 12 12)" />
      <path d="M9.5 9.2l2.4 3.4M13.2 6.6l2.4 3.4" />
    </svg>
  )
}

function LambLeg({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className}>
      <ellipse cx="14" cy="10" rx="7.2" ry="5.4" transform="rotate(35 14 10)" />
      <path d="M15.2 6.6c1.6.4 2.8 1.6 3.3 3.2" />
      <path d="M9.6 13.6L6.8 16.4" />
      <circle cx="5.2" cy="16.6" r="1.4" />
      <circle cx="7.4" cy="18.8" r="1.4" />
    </svg>
  )
}

export const foodMeta: Record<FoodKind, { Icon: ComponentType<IconProps>; color: string }> = {
  beef: { Icon: Beef, color: 'text-red-400' },
  pork: { Icon: Ham, color: 'text-pink-300' },
  ribs: { Icon: Bone, color: 'text-orange-300' },
  chicken: { Icon: Bird, color: 'text-amber-300' },
  drumstick: { Icon: Drumstick, color: 'text-amber-300' },
  turkey: { Icon: Bird, color: 'text-yellow-200' },
  fish: { Icon: Fish, color: 'text-sky-300' },
  lamb: { Icon: LambLeg, color: 'text-violet-300' },
  ham: { Icon: Ham, color: 'text-rose-300' },
  burger: { Icon: Hamburger, color: 'text-orange-400' },
  sausage: { Icon: Sausage, color: 'text-rose-400' },
  veg: { Icon: Carrot, color: 'text-lime-300' },
  pizza: { Icon: Pizza, color: 'text-yellow-300' },
  bread: { Icon: Croissant, color: 'text-amber-200' },
}

export default function FoodIcon({ kind, className = 'h-6 w-6' }: { kind: FoodKind; className?: string }) {
  const { Icon, color } = foodMeta[kind]
  return <Icon className={`${className} ${color}`} />
}
