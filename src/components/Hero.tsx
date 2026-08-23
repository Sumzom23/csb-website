import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">Circuit Skillbuilder</p>
      <h1 className="hero__title">
        Circuit Debate.
        <br />
        <em>Available</em> to All.
      </h1>
      <Link className="hero__cta" to="/about">
        About Us
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

export default Hero
