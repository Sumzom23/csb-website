import { Link } from 'react-router-dom'
import { content } from '../data/content'
import Reveal from './Reveal'
import './WhatWeProvide.css'

function WhatWeProvide() {
  const { features } = content.whatWeProvide

  return (
    <section className="provide">
      <div className="provide__inner">
        <div className="provide__list">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 80}>
              <article className="provide__row">
                <h3 className="provide__row-title">
                  {feature.href ? <Link to={feature.href}>{feature.title}</Link> : feature.title}
                </h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeProvide
