import type { ReactNode } from 'react'

/** Примітка-правило збоку від сцени (вайрфрейм: іконка ⓘ + короткий текст, ~230px). */
export function Note({ children, side, className = '' }: { children: ReactNode; side: 'left' | 'right'; className?: string }) {
  return (
    <div className={`absolute w-[230px] text-left text-[13px] leading-[1.45] text-white/85 ${className}`}>
      <span className={`mb-[8px] flex h-[20px] w-[20px] items-center justify-center rounded-full border border-white/70 text-[11px] font-bold ${side === 'right' ? '' : ''}`}>i</span>
      {children}
    </div>
  )
}
