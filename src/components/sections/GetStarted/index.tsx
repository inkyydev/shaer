import { Fragment, useEffect, useRef, useState } from 'react'
import { getStartedSteps } from './helpers'

/** Step three (Go Live) — only card with purple border */
const HIGHLIGHT_STEP_INDEX = 2

const STEP_REVEAL_MS = 500
const LINE_FILL_MS = 700
const PAUSE_MS = 200

export default function GetStarted() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [filledLineCount, setFilledLineCount] = useState(0)
  const [fillingLine, setFillingLine] = useState(-1)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      {
        // Trigger only when a meaningful part of the section is inside viewport.
        threshold: 0.45,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisibleCount(getStartedSteps.length)
      setFilledLineCount(getStartedSteps.length - 1)
      return
    }

    let cancelled = false
    const timeouts: number[] = []

    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(
        window.setTimeout(() => {
          if (!cancelled) fn()
        }, delay),
      )
    }

    let t = 0
    const stepCount = getStartedSteps.length

    schedule(() => setVisibleCount(1), t)
    t += STEP_REVEAL_MS + PAUSE_MS

    for (let i = 0; i < stepCount - 1; i++) {
      schedule(() => setFillingLine(i), t)
      t += LINE_FILL_MS
      schedule(() => {
        setFilledLineCount(i + 1)
        setFillingLine(-1)
      }, t)
      t += PAUSE_MS
      schedule(() => setVisibleCount(i + 2), t)
      t += STEP_REVEAL_MS + PAUSE_MS
    }

    return () => {
      cancelled = true
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [started])

  const isStepVisible = (index: number) => visibleCount > index

  const getLineClass = (lineIndex: number) => {
    if (fillingLine === lineIndex) return 'get-started__steps-line get-started__steps-line--filling'
    if (filledLineCount > lineIndex) return 'get-started__steps-line get-started__steps-line--filled'
    return 'get-started__steps-line'
  }

  return (
    <section className="get-started" ref={sectionRef}>
      <div className="container">
        <div className="get-started__header" data-aos="fade-up">
          <h2>Get Started In Days, Not Weeks</h2>
          <p>
            Track every call, booking, and opportunity - all in one place, in real time.
          </p>
        </div>

        <div className="steps-wrapper">
          <div className="get-started__steps">
            {getStartedSteps.map((step, index) => (
              <Fragment key={step.id}>
                <div
                  className={[
                    'get-started__step',
                    index === HIGHLIGHT_STEP_INDEX ? 'get-started__step--active' : '',
                    isStepVisible(index)
                      ? 'get-started__step--revealed'
                      : 'get-started__step--pending',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <img src={step.icon} alt="" />
                </div>
                {index < getStartedSteps.length - 1 && (
                  <div className={getLineClass(index)} aria-hidden>
                    <span className="get-started__steps-line-fill" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <div className="row get-started__cards">
            {getStartedSteps.map((step, index) => (
              <div
                className={[
                  'col-12 col-md-6 col-lg-3',
                  isStepVisible(index)
                    ? 'get-started__card-col--revealed'
                    : 'get-started__card-col--pending',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={step.id}
              >
                <div
                  className={[
                    'get-started__card',
                    index === HIGHLIGHT_STEP_INDEX ? 'get-started__card--active' : '',
                    index === getStartedSteps.length - 1 ? 'get-started__card--dashed' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <p className="get-started__card-label">{step.label}</p>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
