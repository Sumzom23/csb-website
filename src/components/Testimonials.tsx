import './Testimonials.css'

type Testimonial = {
  quote: string
  name: string
  event: string
  year: string
  state: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'I came in with no team and no idea what a K was. A semester in, I broke at my first national. Skillbuilder is the reason.',
    name: 'Jordan M.',
    event: 'LD',
    year: "'25",
    state: 'OHIO',
  },
  {
    quote:
      "The coaches actually care. My mentor blocked out an hour every Sunday, no matter what. That kind of support just doesn't exist otherwise.",
    name: 'Priya S.',
    event: 'POLICY',
    year: "'26",
    state: 'TEXAS',
  },
  {
    quote:
      'For the first time, I felt like I belonged in this activity. Not just as a competitor — as part of a community.',
    name: 'Alex R.',
    event: 'PF',
    year: "'25",
    state: 'CALIFORNIA',
  },
]

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <p className="testimonials__eyebrow">From Debaters</p>
        <h2 className="testimonials__title">What it feels like to stop debating alone.</h2>

        <div className="testimonials__card">
          {testimonials.map((item, index) => (
            <article className="testimonials__item" key={item.name}>
              {index > 0 && <div className="testimonials__divider" />}
              <span className="testimonials__quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote className="testimonials__quote">{item.quote}</blockquote>
              <p className="testimonials__name">{item.name}</p>
              <p className="testimonials__meta">
                {item.event} · CLASS OF {item.year} · {item.state}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
