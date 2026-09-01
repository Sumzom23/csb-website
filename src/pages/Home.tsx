import Hero from '../components/Hero'
import InPractice from '../components/InPractice'
import WhatWeProvide from '../components/WhatWeProvide'
import Testimonials from '../components/Testimonials'
import CommunityCTA from '../components/CommunityCTA'
import IntroSplash from '../components/IntroSplash'

function Home() {
  return (
    <main>
      <IntroSplash />
      <Hero />
      <InPractice />
      <WhatWeProvide />
      <Testimonials />
      <CommunityCTA />
    </main>
  )
}

export default Home
