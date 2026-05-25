import { stats } from './helpers'

export default function Stats() {
  return (
    <section className="stats">
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
                <p className="stats__title">{item.title}</p>
                <p className="stats__label">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
