
import actionBg from '../../../assets/saer-action-img.png'

export default function ShaerAction() {
  return (
    <section
      className="shaer-action"
      style={{ backgroundImage: `url(${actionBg})` }}
    >
      <div className="container">
            <div className="shaer-action__content" data-aos="zoom-in">
              <h2>See Shaer In Action</h2>
              <p>
                Get a personalized walkthrough and see how much revenue your
                business is currently missing.
              </p>
              <a href="#" className="btn-all">
                Book a Demo
              </a>
        </div>
      </div>
    </section>
  )
}
