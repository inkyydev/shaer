import { Fragment } from 'react'
import { getStartedSteps } from './helpers'

const ACTIVE_STEP_INDEX = 2

export default function GetStarted() {
  return (
    <section className="get-started">
      <div className="container">
        <div className="get-started__header" data-aos="fade-up">
          <h2>Get Started In Days, Not Weeks</h2>
          <p>Track every call, booking, and opportunity - all in one place, in real time.</p>
        </div>

        <div className="steps-wrapper">
          <div className="get-started__steps" data-aos="fade-up" data-aos-delay="100">
            {getStartedSteps.map((step, index) => (
              <Fragment key={step.id}>
                <div
                  className={
                    index === ACTIVE_STEP_INDEX
                      ? 'get-started__step get-started__step--active'
                      : 'get-started__step'
                  }
                >
                  <img src={step.icon} alt="icon" />
                </div>
                {index < getStartedSteps.length - 1 && (
                  <div className="get-started__steps-line" aria-hidden />
                )}
              </Fragment>
            ))}
          </div>

          <div className="row get-started__cards">
            {getStartedSteps.map((step, index) => (
              <div
                className="col-12 col-md-6 col-lg-3"
                key={step.id}
                data-aos="fade-up"
                data-aos-delay={200 + index * 100}
              >
                <div
                  className={[
                    'get-started__card',
                    index === ACTIVE_STEP_INDEX ? 'get-started__card--active' : '',
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
