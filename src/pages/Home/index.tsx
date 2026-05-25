import Hero from '../../components/sections/Hero'
import Stats from '../../components/sections/Stats'
import FeaturesTabs from '../../components/sections/FeaturesTabs'
import GetStarted from '../../components/sections/GetStarted'
import YourBusiness from '../../components/sections/YourBusiness'
import RoiCalculator from '../../components/sections/RoiCalculator'
import Testimonials from '../../components/sections/Testimonials'
import ShaerAction from '../../components/sections/ShaerAction'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Stats />
      <FeaturesTabs />
      <GetStarted />
      <YourBusiness />
      <RoiCalculator />
      <Testimonials />
      <ShaerAction />
    </div>
  )
}
