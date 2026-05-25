import { Link } from "react-router-dom";
import HeroMedia from "./HeroMedia";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="hero__content">
              <div className="hero-content">
                <div
                  className="hero-content__bubble"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <span>Now</span>
                  live for HVAC, Plumbing & Electrical
                </div>
                <h1 data-aos="fade-up" data-aos-delay="200">
                  Your trades business <span>never</span> <span>misses</span> a
                  call again.
                </h1>
                <p data-aos="fade-up" data-aos-delay="300">
                  Shaer is an AI voice agent that answers every inbound call,
                  books appointments, and routes the right jobs — 24 hours a
                  day, in any language.
                </p>
                <Link
                  to="#"
                  className="btn-all"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  );
}
