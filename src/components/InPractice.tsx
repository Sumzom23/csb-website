import { useState } from 'react'
import './InPractice.css'

type Slide = {
  badge: string
  placeholder: string
  caption: string
  label: string
}

const slides: Slide[] = [
  {
    badge: 'ZOOM',
    placeholder: 'Your photo lives here — swap this tile out from the codebase.',
    caption: 'Sunday LD workshop — twenty debaters, four coaches, one shared doc.',
    label: 'WEEKLY',
  },
  {
    badge: 'CAMP',
    placeholder: 'Your photo lives here — swap this tile out from the codebase.',
    caption: 'Summer intensive — two weeks, six events, zero tuition.',
    label: 'SUMMER',
  },
  {
    badge: 'ZOOM',
    placeholder: 'Your photo lives here — swap this tile out from the codebase.',
    caption: 'PF prep night — cross-ex drills and case swaps until midnight.',
    label: 'WEEKLY',
  },
  {
    badge: 'IN-PERSON',
    placeholder: 'Your photo lives here — swap this tile out from the codebase.',
    caption: 'Regional scrimmage — local teams, national-level feedback.',
    label: 'MONTHLY',
  },
  {
    badge: 'ZOOM',
    placeholder: 'Your photo lives here — swap this tile out from the codebase.',
    caption: 'Policy block — evidence sharing and rebuttal rebuilds.',
    label: 'WEEKLY',
  },
]

function InPractice() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goPrev = () => {
    setActiveIndex((index) => Math.max(0, index - 1))
  }

  const goNext = () => {
    setActiveIndex((index) => Math.min(slides.length - 1, index + 1))
  }

  return (
    <section className="in-practice">
      <div className="in-practice__inner">
        <p className="in-practice__eyebrow">In Practice</p>
        <h2 className="in-practice__title">Real sessions, real students.</h2>

        <div className="in-practice__viewport">
          <div
            className="in-practice__track"
            style={{ transform: `translateX(calc(-${activeIndex} * (78% + 1.5rem)))` }}
          >
            {slides.map((slide) => (
              <article className="in-practice__slide" key={slide.caption}>
                <div className="in-practice__card">
                  <span className="in-practice__badge">{slide.badge}</span>
                  <p className="in-practice__placeholder">{slide.placeholder}</p>
                </div>
                <div className="in-practice__caption-row">
                  <p className="in-practice__caption">{slide.caption}</p>
                  <span className="in-practice__label">{slide.label}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="in-practice__controls">
          <div className="in-practice__dots" role="tablist" aria-label="Session slides">
            {slides.map((slide, index) => (
              <button
                key={slide.caption}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to slide ${index + 1}`}
                className={`in-practice__dot${index === activeIndex ? ' in-practice__dot--active' : ''}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="in-practice__arrows">
            <button
              type="button"
              className="in-practice__arrow"
              aria-label="Previous slide"
              onClick={goPrev}
              disabled={activeIndex === 0}
            >
              ←
            </button>
            <button
              type="button"
              className="in-practice__arrow in-practice__arrow--active"
              aria-label="Next slide"
              onClick={goNext}
              disabled={activeIndex === slides.length - 1}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InPractice
