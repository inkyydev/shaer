import { useEffect, useRef, useState } from 'react'
import { stats } from './helpers'
import StatCounter from './StatCounter'

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div className="row">
          {stats.map((item, idx) => (
            <div
              className="col-12 col-md-3"
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="stats__col">
                <StatCounter title={item.title} animate={animate} />
                <p className="stats__label">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
