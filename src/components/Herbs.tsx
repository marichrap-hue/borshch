/**
 * «Посипано зеленню» (11.10.2026): гілочки кропу й петрушки сиплються зверху
 * вниз на хіро. Намальовані векторно за мотивами ілюстрації коробки (кольори
 * взяті з неї), бо вирізки з растру виходили дірявими. Кожна гілочка — свій
 * розмір, швидкість, стартова фаза та кут; покачування — окремою анімацією.
 * prefers-reduced-motion → гілочки лежать нерухомо.
 */

const DILL = '#3f8139'
const DILL_LIGHT = '#5aa048'
const PARSLEY = '#4f9a44'
const PARSLEY_LIGHT = '#7cc05a'

/** Кріп: стебло з бічними гілочками, що віялом розходяться на тонкі нитки. */
function Dill() {
  // гілка: від точки на стеблі вигнутою дугою в бік, на кінці — віяло з 4 ниток
  const branch = (x: number, y: number, dir: number, len: number, key: number) => {
    const ang = (-90 + dir * 55) * (Math.PI / 180)
    const ex = x + Math.cos(ang) * len
    const ey = y + Math.sin(ang) * len
    const cx = x + Math.cos(ang + dir * 0.5) * len * 0.5
    const cy = y + Math.sin(ang + dir * 0.5) * len * 0.5
    const threads = [-0.9, -0.3, 0.3, 0.9].map((t, i) => {
      const a = ang + t * 0.7
      const l = len * (0.55 + (i % 2) * 0.15)
      const tx = ex + Math.cos(a) * l
      const ty = ey + Math.sin(a) * l
      const qx = ex + Math.cos(a + t * 0.4) * l * 0.5
      const qy = ey + Math.sin(a + t * 0.4) * l * 0.5
      return `M${ex.toFixed(1)} ${ey.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}`
    })
    return (
      <g key={key} stroke={key % 2 ? DILL_LIGHT : DILL}>
        <path d={`M${x} ${y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`} strokeWidth="2" />
        <path d={threads.join(' ')} strokeWidth="1.5" />
      </g>
    )
  }
  const branches = [
    [50, 96, -1, 20],
    [50, 84, 1, 22],
    [50, 70, -1, 24],
    [50, 56, 1, 22],
    [50, 42, -1, 20],
    [50, 30, 1, 18],
    [50, 18, -1, 14],
    [50, 10, 1, 12],
  ] as const
  return (
    <svg viewBox="0 -6 100 116" fill="none" strokeLinecap="round">
      <path d="M50 108 C 52 80 48 50 50 4" stroke={DILL} strokeWidth="2.6" />
      {branches.map((b, i) => branch(b[0], b[1], b[2], b[3], i))}
      <path d="M50 4 Q 44 -2 40 -4 M50 4 Q 56 -2 60 -4" stroke={DILL_LIGHT} strokeWidth="1.5" />
    </svg>
  )
}

/** Петрушка: черешок і три пальчасті листочки з виїмками, як на коробці. */
function Parsley() {
  const leaf = (cx: number, cy: number, rot: number, s: number) => {
    const fingers = [-70, -35, 0, 35, 70]
    return (
      <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${s})`}>
        {fingers.map((f, i) => (
          <g key={i} transform={`rotate(${f})`}>
            <path d="M0 0 C -5 -10 -5 -22 0 -30 C 5 -22 5 -10 0 0 Z" fill={i % 2 ? PARSLEY_LIGHT : PARSLEY} />
            <path d="M-4 -14 l-5 -4 M4 -14 l5 -4 M-3 -22 l-4 -4 M3 -22 l4 -4" stroke={i % 2 ? PARSLEY_LIGHT : PARSLEY} strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        <path d="M0 0 L0 -24" stroke="#3b7a35" strokeWidth="1.4" />
      </g>
    )
  }
  return (
    <svg viewBox="0 0 110 120" fill="none">
      <path d="M55 118 C 55 90 52 70 50 58" stroke={PARSLEY} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M50 58 C 40 50 30 46 22 44 M50 58 C 62 50 72 48 82 46" stroke={PARSLEY} strokeWidth="2.6" strokeLinecap="round" />
      {leaf(20, 42, -40, 0.9)}
      {leaf(84, 44, 40, 0.9)}
      {leaf(50, 52, 0, 1.05)}
    </svg>
  )
}

/** Детермінований «випадок», щоб картина не стрибала між рендерами. */
function rnd(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const COUNT = 16

export function Herbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: COUNT }).map((_, i) => {
        const isDill = i % 2 === 0
        const left = 2 + rnd(i + 1) * 94
        const size = 56 + rnd(i + 11) * 84
        const dur = 11 + rnd(i + 21) * 9
        const delay = -rnd(i + 31) * dur
        const r0 = -40 + rnd(i + 41) * 80
        const r1 = r0 + (rnd(i + 51) > 0.5 ? 1 : -1) * (120 + rnd(i + 61) * 200)
        const sway = 4 + rnd(i + 71) * 5
        return (
          <div
            key={i}
            className="herb absolute top-0"
            style={
              {
                left: `${left}%`,
                width: size,
                '--dur': `${dur}s`,
                '--delay': `${delay}s`,
                '--r0': `${r0}deg`,
                '--r1': `${r1}deg`,
                '--sway': `${sway}s`,
                opacity: 0.75 + rnd(i + 81) * 0.25,
              } as React.CSSProperties
            }
          >
            <div className="herb-sway">{isDill ? <Dill /> : <Parsley />}</div>
          </div>
        )
      })}
    </div>
  )
}
