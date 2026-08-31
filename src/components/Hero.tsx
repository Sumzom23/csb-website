import { Link } from 'react-router-dom'
import { content } from '../data/content'
import Reveal from './Reveal'
import './Hero.css'

function Hero() {
  const { hero } = content

  return (
    <section className="hero">
      <div className="hero__masthead">
        <span>{hero.mastheadLeft}</span>
        <span>{hero.mastheadRight}</span>
      </div>

      <Reveal className="hero__lede">
        <div className="hero__copy">
          <h1 className="hero__title">
            {hero.titleLine1}
            <br />
            <span className="hero__title-accent">{hero.titleAccent}</span>
            {hero.titleSuffix}
          </h1>
          <p className="hero__deck">{hero.deck}</p>
          <Link className="hero__cta" to="/about">
            {hero.ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="hero__mark" aria-hidden="true">
          <img src="/logo/circuit-skillbuilder-icon-pink.png" alt="" />
        </div>
      </Reveal>
    </section>
  )
}

export default Hero
