import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { testimonials } from './helpers'
import starsImg from '../../../assets/stars-img.svg'
import avatarImg from '../../../assets/testimonials-img.png'
import 'swiper/css'
import './Testimonials.css'

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 data-aos="fade-up">Real Results From Real Businesses</h2>
        <div className="testimonials__slider" data-aos="fade-up" data-aos-delay="150">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop
            speed={1500}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1150: { slidesPerView: 4 },
              1400: { slidesPerView: 4 },
            }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="testimonials__card">
                  <img
                    className="testimonials__stars"
                    src={starsImg}
                    alt=""
                    aria-hidden
                  />
                  <p>{item.quote}</p>
                  <div className="testimonials__author">
                    <img src={avatarImg} alt="" />
                    <div className="testimonials__author-info">
                      <h4>{item.name}</h4>
                      <p>{item.title}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
