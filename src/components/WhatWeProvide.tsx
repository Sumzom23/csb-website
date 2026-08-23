import './WhatWeProvide.css'

const features = [
  {
    title: 'Free Video Lessons',
    description:
      'National Circuit success requires extensive knowledge. But given the esoteric nature of debate and a lack of public resources, it can be hard to learn everything that\'s needed. We aim to streamline the process, providing lessons on every aspect critical to success.',
  },
  {
    title: 'Individualized Instruction',
    description:
      'A dedicated coach or even just a mentor can be instrumental in competing on the National Circuit. Recognizing this, our talented staff provides constant support and guidance, all for zero cost.',
  },
  {
    title: 'An Inclusive Community',
    description:
      'National Circuit debate can be incredibly alienating at first, especially if you don\'t have committed teammates or preexisting connections. We strive to make the activity more inclusive, offering a space to connect and learn with other debaters.',
  },
]

function WhatWeProvide() {
  return (
    <section className="provide">
      <div className="provide__inner">
        <h2 className="provide__title">What We Provide</h2>

        <div className="provide__grid">
          {features.map((feature, index) => (
            <article className="provide__item" key={feature.title}>
              {index > 0 && <div className="provide__divider" aria-hidden="true" />}
              <h3 className="provide__item-title">{feature.title}</h3>
              <p className="provide__item-text">{feature.description}</p>
            </article>
          ))}
        </div>

        <p className="provide__footer">
          <em>And more to come!</em>
        </p>
      </div>
    </section>
  )
}

export default WhatWeProvide
