import { useEffect, useMemo, useState } from 'react'

const DURATION_MS = 2000

type ParsedTitle =
  | { kind: 'percent'; value: number }
  | { kind: 'plus'; value: number }
  | { kind: 'fraction'; left: number; right: number }
  | { kind: 'lessThanSeconds'; value: number }

function parseStatTitle(title: string): ParsedTitle | null {
  const fractionMatch = title.match(/^(\d+)\/(\d+)$/)
  if (fractionMatch) {
    return {
      kind: 'fraction',
      left: Number(fractionMatch[1]),
      right: Number(fractionMatch[2]),
    }
  }

  const lessThanSecondsMatch = title.match(/^<\s*([\d.]+)s$/)
  if (lessThanSecondsMatch) {
    return { kind: 'lessThanSeconds', value: Number(lessThanSecondsMatch[1]) }
  }

  const percentMatch = title.match(/^(\d+)%$/)
  if (percentMatch) {
    return { kind: 'percent', value: Number(percentMatch[1]) }
  }

  const plusMatch = title.match(/^(\d+)\+$/)
  if (plusMatch) {
    return { kind: 'plus', value: Number(plusMatch[1]) }
  }

  return null
}

function getInitialDisplay(parsed: ParsedTitle): string {
  switch (parsed.kind) {
    case 'percent':
      return '0%'
    case 'plus':
      return '0+'
    case 'fraction':
      return '0/0'
    case 'lessThanSeconds':
      return '< 0.0s'
  }
}

function formatAtProgress(parsed: ParsedTitle, progress: number): string {
  const t = Math.min(Math.max(progress, 0), 1)

  switch (parsed.kind) {
    case 'percent':
      return `${Math.round(t * parsed.value)}%`
    case 'plus':
      return `${Math.round(t * parsed.value)}+`
    case 'fraction':
      return `${Math.round(t * parsed.left)}/${Math.round(t * parsed.right)}`
    case 'lessThanSeconds': {
      const stepped = Math.round(t * parsed.value * 10) / 10
      return `< ${stepped.toFixed(1)}s`
    }
  }
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

type StatCounterProps = {
  title: string
  animate: boolean
}

export default function StatCounter({ title, animate }: StatCounterProps) {
  const parsed = useMemo(() => parseStatTitle(title), [title])
  const [display, setDisplay] = useState(title)

  useEffect(() => {
    if (!animate || !parsed) {
      setDisplay(title)
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplay(title)
      return
    }

    setDisplay(getInitialDisplay(parsed))

    const start = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const linear = Math.min(elapsed / DURATION_MS, 1)
      const eased = easeOutCubic(linear)

      setDisplay(formatAtProgress(parsed, eased))

      if (linear < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        setDisplay(title)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [animate, parsed, title])

  return <p className="stats__title">{display}</p>
}
