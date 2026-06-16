import HeroBanner from '../components/HeroBanner'
import HowItWorks from '../components/HowItWorks'
import OperatorDirectory from '../components/OperatorDirectory'

export default function HomePage() {
  return (
    <>
      <div className="pt-0">
        <HeroBanner />
      </div>
      <HowItWorks />
      <OperatorDirectory />
    </>
  )
}
