import type { ReactNode } from 'react'
import { Flame, Lightbulb, TriangleAlert } from 'lucide-react'
import type { CalloutKind } from '../data/kamado'

const styles: Record<CalloutKind, { box: string; icon: string; Icon: typeof Flame }> = {
  danger: { box: 'border-ember-red/60 bg-ember-red/10', icon: 'text-ember-red', Icon: Flame },
  warning: { box: 'border-ember-amber/60 bg-ember-amber/10', icon: 'text-ember-amber', Icon: TriangleAlert },
  tip: { box: 'border-sky-400/40 bg-sky-400/10', icon: 'text-sky-300', Icon: Lightbulb },
}

type Props = {
  kind: CalloutKind
  title: string
  children: ReactNode
  className?: string
}

export default function Callout({ kind, title, children, className = '' }: Props) {
  const { box, icon, Icon } = styles[kind]
  return (
    <div role={kind === 'tip' ? 'note' : 'alert'} className={`flex gap-3 rounded-xl border p-4 ${box} ${className}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${icon} ${kind === 'danger' ? 'flame' : ''}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className="font-semibold text-ink">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-zinc-300">{children}</div>
      </div>
    </div>
  )
}
