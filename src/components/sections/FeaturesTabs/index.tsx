import { useCallback, useEffect, useRef, useState } from 'react'
import {
  featureTabs,
  getDemoteStack,
  getPromoteStack,
  getStack,
  isNextTab,
  isPrevTab,
  type CardLayer,
} from './helpers'

const DURATION_MS = 420
const JUMP_OUT_MS = 200
const AUTO_ADVANCE_MS = 5000

type Anim =
  | { kind: 'promote'; from: number }
  | { kind: 'demote'; from: number }
  | { kind: 'jump'; to: number; phase: 'out' | 'in' }

function CardBody({
  title,
  description,
  image,
  showContent,
}: {
  title: string
  description: string
  image: string
  showContent: boolean
}) {
  return (
    <div className="features-tabs__card-inner">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div
            className={`features-tabs__card-content${showContent ? ' features-tabs__card-content--visible' : ''}`}
          >
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`features-tabs__card-media${showContent ? ' features-tabs__card-media--visible' : ''}`}
          >
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

function getHighlightIndex(activeIndex: number, anim: Anim | null) {
  if (!anim) return activeIndex
  if (anim.kind === 'promote') return anim.from + 1
  if (anim.kind === 'demote') return anim.from - 1
  return anim.to
}

function getCards(activeIndex: number, anim: Anim | null, run: boolean) {
  if (!anim) return getStack(activeIndex)
  if (anim.kind === 'promote') return getPromoteStack(anim.from, run)
  if (anim.kind === 'demote') return getDemoteStack(anim.from, run)
  if (anim.phase === 'out') return getStack(activeIndex)
  return getStack(anim.to)
}

export default function FeaturesTabs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [anim, setAnim] = useState<Anim | null>(null)
  const [run, setRun] = useState(false)
  const animTimer = useRef<number | null>(null)
  const autoInterval = useRef<number | null>(null)
  const activeIndexRef = useRef(activeIndex)
  const busyRef = useRef(false)

  const busy = anim !== null

  activeIndexRef.current = activeIndex
  busyRef.current = busy
  const cards = getCards(activeIndex, anim, run)
  const highlightIndex = getHighlightIndex(activeIndex, anim)

  useEffect(() => {
    if (!anim || anim.kind === 'jump') return

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRun(true))
    })
    return () => cancelAnimationFrame(id)
  }, [anim])

  const clearAnimTimer = () => {
    if (animTimer.current) {
      window.clearTimeout(animTimer.current)
      animTimer.current = null
    }
  }

  const clearAutoInterval = () => {
    if (autoInterval.current) {
      window.clearInterval(autoInterval.current)
      autoInterval.current = null
    }
  }

  const endAnim = useCallback(() => {
    setAnim(null)
    setRun(false)
  }, [])

  const finishStep = useCallback(
    (to: number) => {
      setActiveIndex(to)
      endAnim()
    },
    [endAnim],
  )

  const startJump = useCallback(
    (to: number) => {
      clearAnimTimer()
      setRun(false)
      setAnim({ kind: 'jump', to, phase: 'out' })

      animTimer.current = window.setTimeout(() => {
        setActiveIndex(to)
        setAnim({ kind: 'jump', to, phase: 'in' })
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setRun(true))
        })
        animTimer.current = window.setTimeout(() => {
          endAnim()
        }, DURATION_MS)
      }, JUMP_OUT_MS)
    },
    [endAnim],
  )

  const goToTab = useCallback(
    (index: number) => {
      const from = activeIndexRef.current
      if (index === from || busyRef.current) return

      if (isNextTab(from, index)) {
        clearAnimTimer()
        setRun(false)
        setAnim({ kind: 'promote', from })
        animTimer.current = window.setTimeout(() => finishStep(index), DURATION_MS)
        return
      }

      if (isPrevTab(from, index)) {
        clearAnimTimer()
        setRun(false)
        setAnim({ kind: 'demote', from })
        animTimer.current = window.setTimeout(() => finishStep(index), DURATION_MS)
        return
      }

      startJump(index)
    },
    [finishStep, startJump],
  )

  const handleTabClick = useCallback(
    (index: number) => {
      goToTab(index)
    },
    [goToTab],
  )

  useEffect(() => {
    if (anim !== null) return

    autoInterval.current = window.setInterval(() => {
      const from = activeIndexRef.current
      const next = (from + 1) % featureTabs.length
      goToTab(next)
    }, AUTO_ADVANCE_MS)

    return () => clearAutoInterval()
  }, [anim, activeIndex, goToTab])

  const deckClass = [
    'features-tabs__deck',
    run && anim?.kind !== 'jump' ? 'features-tabs__deck--run' : '',
    anim?.kind === 'jump' && anim.phase === 'out' ? 'features-tabs__deck--jump-out' : '',
    anim?.kind === 'jump' && anim.phase === 'in' ? 'features-tabs__deck--jump-in' : '',
    anim?.kind === 'jump' && anim.phase === 'in' && run ? 'features-tabs__deck--run' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const showFrontContent = (layer: CardLayer) => layer === 'front' && (!anim || run)

  return (
    <section className="features-tabs">
      <div className="container">
        <div className="features-tabs__header" data-aos="fade-up">
          <h2>Everything Your Team Needs To Never Miss A Job.</h2>
          <p>Five powerful tools. One voice. Completely hands-free for your team.</p>
        </div>

        <div className="features-tabs__nav" data-aos="fade-up" data-aos-delay="150">
          {featureTabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              className={
                index === highlightIndex
                  ? 'features-tabs__tab features-tabs__tab--active'
                  : 'features-tabs__tab'
              }
              onClick={() => handleTabClick(index)}
              disabled={busy}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="features-tabs__stack" data-aos="zoom-in" data-aos-delay="200">
          <div className={deckClass}>
            {cards.map(({ tab, layer }) => (
              <StackCard
                key={tab.id}
                tab={tab}
                layer={layer}
                showContent={showFrontContent(layer)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StackCard({
  tab,
  layer,
  showContent,
}: {
  tab: (typeof featureTabs)[0]
  layer: CardLayer
  showContent: boolean
}) {
  return (
    <article
      className={['features-tabs__card', `features-tabs__card--${layer}`].filter(Boolean).join(' ')}
    >
      <CardBody
        title={tab.title}
        description={tab.description}
        image={tab.image}
        showContent={showContent}
      />
    </article>
  )
}
