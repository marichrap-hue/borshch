import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Карта-герой (ключовий прийом з ТЗ): закріплена поверх сторінки, їде
 * від скролу. Маршрут:
 *  1. хіро — лежить у колоді (центр, під заголовком);
 *  2. вилітає вгору-праворуч і приземляється на ринку (секція market);
 *  3. у секції pepper відходить ліворуч і трохи назад (на неї «сиплють»);
 *  4. у recipe розвертається по центру — її рецепт уже всі знають;
 *  5. в outro — лягає на коробку.
 * Усе через один GSAP-таймлайн зі scrub по всьому документу; у кожної
 * секції є data-section, від них беремо точки маршруту.
 */
export function HeroCard() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const sec = (name: string) => document.querySelector<HTMLElement>(`[data-section="${name}"]`)!
      // Точки маршруту в координатах вьюпорта (% від ширини/висоти), кут і масштаб.
      const stops: { at: HTMLElement; x: number; y: number; r: number; s: number }[] = [
        { at: sec('hero'), x: 50, y: 78, r: 0, s: 1 },
        { at: sec('market'), x: 50, y: 42, r: 6, s: 1.05 },
        { at: sec('pepper'), x: 32, y: 46, r: -14, s: 0.95 },
        { at: sec('recipe'), x: 50, y: 48, r: 0, s: 1.1 },
        { at: sec('outro'), x: 66, y: 30, r: 12, s: 0.7 },
      ]
      const place = (p: (typeof stops)[number]) => ({
        left: `${p.x}vw`,
        top: `${p.y}vh`,
        rotate: p.r,
        scale: p.s,
      })
      gsap.set(el, { xPercent: -50, yPercent: -50, ...place(stops[0]) })
      if (reduced) return

      stops.slice(1).forEach((p, i) => {
        const prev = stops[i]
        gsap.to(el, {
          ...place(p),
          ease: 'none',
          scrollTrigger: {
            trigger: p.at,
            start: 'top bottom', // секція починає входити знизу
            end: 'top 20%', // карта на місці, коли секція майже заповнила екран
            scrub: 0.6,
            // плавний «політ»: по дорозі піднімаємо карту (дуга)
            onUpdate: (st) => {
              const arc = Math.sin(st.progress * Math.PI) * 10
              el.style.setProperty('--arc', `${-arc}vh`)
            },
          },
        })
        void prev
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-20 w-[290px]" style={{ translate: '0 var(--arc, 0)' }}>
      <div className="aspect-[2/3] rounded-[22px] bg-white p-[12px] shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
        <img src="./img/card-did.png" alt="Карта-герой: дід з капустою" className="h-full w-full rounded-[12px] object-cover" draggable={false} />
      </div>
    </div>
  )
}

