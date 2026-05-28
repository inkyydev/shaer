import { testimonials } from './helpers'
import starsImg from '../../../assets/stars-img.svg'
import avatarImg from '../../../assets/testimonials-img.png'
import './Testimonials.css'

function TestimonialCard({
  item,
  ariaHidden = false,
}: {
  item: (typeof testimonials)[0]
  ariaHidden?: boolean
}) {
  return (
    <article className="testimonials__card" aria-hidden={ariaHidden || undefined}>
      <img className="testimonials__stars" src={starsImg} alt="" aria-hidden />
      <p>{item.quote}</p>
      <div className="testimonials__author">
        <img src={avatarImg} alt="" />
        <div className="testimonials__author-info">
          <h4>{item.name}</h4>
          <p>{item.title}</p>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 data-aos="fade-up">Real Results From Real Businesses</h2>
        <div
          className="testimonials__marquee"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div className="testimonials__marquee-track">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
            {testimonials.map((item) => (
              <TestimonialCard
                key={`dup-${item.id}`}
                item={item}
                ariaHidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
