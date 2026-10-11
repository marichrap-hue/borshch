/**
 * Ігрова карта: ілюстрація з білими полями (ТЗ: «важливо робити білі поля,
 * щоб контрастно відділяти карту від фона»), скруглення як у реальних карт.
 */
export function Card({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`absolute aspect-[2/3] rounded-[18px] bg-white p-[10px] shadow-[0_30px_60px_rgba(0,0,0,0.35)] ${className}`}>
      <img src={src} alt={alt} className="h-full w-full rounded-[10px] object-cover" draggable={false} />
    </div>
  )
}
