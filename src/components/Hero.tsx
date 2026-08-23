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
      <a className="hero__cta" href="#about">
        About Us
        <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}

export default Hero
