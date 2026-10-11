
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Card } from './components/Card'
import { HeroCard } from './components/HeroCard'
import { Note } from './components/Note'

gsap.registerPlugin(ScrollTrigger)

/**
 * Сторітелінг-лендинг «Борщ» за ТЗ (Figma, Workout #12) і вайрфреймом
 * Desktop-36. Оповідач — карта: вилітає з колоди в хіро і летить крізь
 * чотири ігрові ситуації (ринок → перчинка/сметана → рецепт). Фреймворк
 * Star-Chain-Hook: перша секція ставить проблему, далі ланцюг її живить.
 * Колір фону змінюється в кожній секції; карти світлі з білими полями.
 */
export default function App() {
  return (
    <div className="relative">
      <Header />
      <HeroCard />
      <Hero />
      <Market />
      <Pepper />
      <Recipe />
      <Outro />
    </div>
  )
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-[40px] py-[20px] mix-blend-difference text-white">
      <span className="font-display text-[22px]">Борщ</span>
      <a
        href="https://lordofboards.com.ua/nastilna-hra-borshch/"
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-white px-[20px] py-[10px] text-[14px] font-bold text-black mix-blend-normal"
      >
        Придбати 950 ₴
      </a>
    </header>
  )
}

/** Секція 1 — проблема (Star): у кожного свій борщ, а продукти одні. Світлий фон. */
function Hero() {
  return (
    <section data-section="hero" className="relative flex min-h-[100vh] flex-col items-center bg-cream px-[40px] pt-[150px] text-center text-ink">
      <h1 className="max-w-[820px] font-display text-[52px] leading-[1.12] tracking-[0.01em]">
        У кожного свій борщ!
        <br />
        Але продукти на всіх одні…
      </h1>
      <p className="mt-[25px] max-w-[520px] text-[18px] leading-[1.5] text-ink/80">
        Думав, просто пограєш із друзями? Подивишся, хто торгується до останнього, хто краде буряк, а хто тримає
        сметану про запас.
      </p>
      {/* Колода, з якої вилітає карта-герой (сама карта — у HeroCard, закріплена) */}
      <div className="relative mt-[60px] h-[420px] w-[300px]" aria-hidden>
        <div className="deck-card absolute left-1/2 top-0 h-[400px] w-[290px] -translate-x-1/2 rotate-[-6deg] rounded-[22px] bg-white shadow-[0_30px_60px_rgba(42,26,20,0.18)]" />
        <div className="deck-card absolute left-1/2 top-[10px] h-[400px] w-[290px] -translate-x-1/2 rotate-[3deg] rounded-[22px] bg-white shadow-[0_30px_60px_rgba(42,26,20,0.18)]" />
        <div className="deck-card absolute left-1/2 top-[20px] h-[400px] w-[290px] -translate-x-1/2 rounded-[22px] bg-white shadow-[0_30px_60px_rgba(42,26,20,0.18)]" />
      </div>
    </section>
  )
}

/** Секція 2 — ринок (Chain): помаранчевий фон, продукти навколо карти, обмін. */
function Market() {
  return (
    <section data-section="market" className="relative flex min-h-[120vh] flex-col items-center bg-tomato px-[40px] pt-[160px] text-center text-white">
      <div className="relative h-[520px] w-full max-w-[900px]">
        {/* продукти на ринку — кола-плейсхолдери з вайрфрейму, поки немає карт інгредієнтів */}
        <Produce className="left-[14%] top-[6%] h-[110px] w-[110px]" label="Буряк" tone="bg-beet" />
        <Produce className="left-[26%] top-[26%] h-[70px] w-[70px]" label="Часник" tone="bg-cream" dark />
        <Produce className="right-[16%] top-[14%] h-[60px] w-[60px]" label="Сіль" tone="bg-cream" dark />
        <Produce className="right-[22%] top-[52%] h-[90px] w-[90px]" label="Морква" tone="bg-[#f08a2a]" />
        <Produce className="left-[18%] top-[62%] h-[80px] w-[80px]" label="Капуста" tone="bg-dill" />
        <Note side="right" className="right-0 top-[40%]">
          Продукти для твого борщу не завжди приходять самі. Шукай потрібне на спільному ринку й міняй те, що маєш.
        </Note>
      </div>
      <h2 className="mt-[40px] max-w-[700px] font-display text-[44px] leading-[1.12] tracking-[0.01em]">
        Останній буряк?
        <br />
        За нього доведеться поторгуватися
      </h2>
      <p className="mt-[20px] max-w-[520px] text-[18px] leading-[1.5] text-white/85">
        Продукти для твого борщу не завжди приходять самі. Шукай потрібне на спільному ринку й міняй те, що маєш.
      </p>
      <div className="h-[200px]" />
    </section>
  )
}

/** Секція 3 — перчинка і сметана (Chain): темний теплий фон. */
function Pepper() {
  return (
    <section data-section="pepper" className="relative flex min-h-[120vh] flex-col items-center bg-soot px-[40px] pt-[120px] text-center text-white">
      <div className="relative h-[560px] w-full max-w-[900px]">
        <Note side="left" className="left-0 top-[20%]">
          Інші можуть забрати продукт із твого борщу. Деякі карти дозволяють відповісти в найпотрібніший момент.
        </Note>
        {/* суперник підсипає перцю — карта з цибулею; сметана прикриває */}
        <Card src="./img/card-cybulya.png" alt="Карта: сусід сипле цибулю в казан" className="left-1/2 top-[30px] w-[230px] -translate-x-[70%] rotate-[-10deg]" />
        <Card src="./img/card-babusya.png" alt="Карта: бабуся біля казана зі сметаною" className="left-1/2 top-[80px] w-[230px] -translate-x-[20%] rotate-[8deg]" />
      </div>
      <h2 className="mt-[20px] max-w-[760px] font-display text-[44px] leading-[1.12] tracking-[0.01em]">
        Тобі підсипали перцю?
        <br />
        Добре, що ти припас сметану.
      </h2>
      <p className="mt-[20px] max-w-[520px] text-[18px] leading-[1.5] text-white/85">
        Якщо не виходить приготувати свій борщ, то залишається тільки зіпсувати чужий! Хоча є карти і проти цього.
      </p>
      <div className="h-[200px]" />
    </section>
  )
}

/** Секція 4 — секретний рецепт (Hook): зелений фон, чужі карти в тумані. */
function Recipe() {
  return (
    <section data-section="recipe" className="relative flex min-h-[120vh] flex-col items-center overflow-hidden bg-dill px-[40px] pt-[140px] text-center text-white">
      {/* розмиті чужі карти в глибині */}
      <Ghost className="left-[6%] top-[8%] rotate-[-14deg]" />
      <Ghost className="left-[20%] top-[42%] rotate-[9deg]" />
      <Ghost className="right-[8%] top-[6%] rotate-[12deg]" />
      <Ghost className="right-[18%] top-[48%] rotate-[-7deg]" />
      <Ghost className="left-[44%] top-[70%] rotate-[4deg]" />
      <div className="relative h-[520px] w-full max-w-[900px]">
        <Card src="./img/card-babusya.png" alt="Карта: бабуся біля казана" className="left-[18%] top-[40px] w-[220px] rotate-[-8deg]" />
        <Card src="./img/card-cybulya.png" alt="Карта: цибуля" className="right-[18%] top-[0px] w-[220px] rotate-[7deg]" />
      </div>
      <h2 className="mt-[10px] max-w-[700px] font-display text-[44px] leading-[1.12] tracking-[0.01em]">
        Хтось розбовкав твій
        <br />
        секретний рецепт?
      </h2>
      <p className="mt-[20px] max-w-[520px] text-[18px] leading-[1.5] text-white/85">
        Твій секрет уже знають усі. Тепер дивись, хто першим зварить його краще за тебе. А інші тепер заважатимуть
        варити тобі.
      </p>
      <div className="relative mt-[60px] h-[460px] w-full max-w-[900px]">
        <Note side="right" className="right-0 top-[55%]">
          Зазвичай кожен тримає свій рецепт при собі. Але на цій кухні секрети довго не живуть.
        </Note>
      </div>
    </section>
  )
}

/** Фінал: коробка і кнопка. */
function Outro() {
  return (
    <section data-section="outro" className="relative flex min-h-[100vh] flex-col items-center justify-center bg-cream px-[40px] py-[120px] text-center text-ink">
      <img src="./img/box-full.png" alt="Коробка гри Борщ" className="w-[420px] max-w-full rounded-[18px] shadow-[0_40px_80px_rgba(42,26,20,0.25)]" />
      <h2 className="mt-[50px] max-w-[700px] font-display text-[44px] leading-[1.12] tracking-[0.01em]">Зваримо?</h2>
      <p className="mt-[20px] max-w-[520px] text-[18px] leading-[1.5] text-ink/80">
        2–7 гравців · від 7 років · партія 10–20 хвилин. 185 карт інгредієнтів, 21 рецепт, 20 шкварок.
      </p>
      <a
        href="https://lordofboards.com.ua/nastilna-hra-borshch/"
        target="_blank"
        rel="noreferrer"
        className="mt-[35px] rounded-full bg-tomato px-[30px] py-[16px] text-[17px] font-bold text-white"
      >
        Придбати 950 ₴
      </a>
    </section>
  )
}

function Produce({ className, label, tone, dark }: { className: string; label: string; tone: string; dark?: boolean }) {
  return (
    <div
      className={`absolute flex items-center justify-center rounded-full text-[12px] font-bold ${tone} ${dark ? 'text-ink' : 'text-white'} ${className}`}
      aria-label={label}
      title={label}
    >
      {label}
    </div>
  )
}

function Ghost({ className }: { className: string }) {
  return <div aria-hidden className={`absolute h-[260px] w-[180px] rounded-[18px] bg-white/25 blur-[14px] ${className}`} />
}

