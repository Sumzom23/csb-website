import Header from '../components/Header'
import Hero from '../components/Hero'
import Mission from '../components/Mission'
import InPractice from '../components/InPractice'
import WhatWeProvide from '../components/WhatWeProvide'
import Testimonials from '../components/Testimonials'
import CommunityCTA from '../components/CommunityCTA'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mission />
        <InPractice />
        <WhatWeProvide />
        <Testimonials />
        <CommunityCTA />
      </main>
      <Footer />
    </>
  )
}

export default Home
