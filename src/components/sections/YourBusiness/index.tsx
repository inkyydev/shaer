import { businessCards } from './helpers'

export default function YourBusiness() {
  const [overview, notifications, booking, revenue] = businessCards

  return (
    <section className="your-business">
      <div className="container">
        <div className="your-business__header" data-aos="fade-up">
          <h2>Your Business, Fully Visible</h2>
          <p>Track every call, booking, and opportunity – all in one place, in real time.</p>
        </div>

        <div className="row your-business__grid">
          <div className="col-12 col-md-7" data-aos="fade-up" data-aos-delay="100">
            <div className="your-business__card your-business__card--1">
              <h4>{overview.title}</h4>
              <p>{overview.description}</p>
              <div className="your-business__card-image">
                <img src={overview.image} alt="" />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5" data-aos="fade-up" data-aos-delay="200">
            <div className="your-business__card your-business__card--2">
              <h4>{notifications.title}</h4>
              <div className="row your-business__card-split">
                <div className="col-6 col-md-5">
                  <div>
                    <p>{notifications.description}</p>
                  </div>
                </div>
                <div className="col-6 col-md-7">
                  <div className="your-business__card-image your-business__card-image--inline">
                    <img src={notifications.image} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5" data-aos="fade-up" data-aos-delay="300">
            <div className="your-business__card your-business__card--3">
              <h4>{booking.title}</h4>
              <p>{booking.description}</p>
              <div className="your-business__card-image">
                <img src={booking.image} alt="" />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-7" data-aos="fade-up" data-aos-delay="400">
            <div className="your-business__card your-business__card--4">
              <h4>{revenue.title}</h4>
              <p>{revenue.description}</p>
              <div className="your-business__card-image">
                <img src={revenue.image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
