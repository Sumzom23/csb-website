import { useEffect, useRef } from 'react'
import { content } from '../data/content'
import './InPractice.css'

const SPEED_PX_PER_SEC = 45
const NUDGE_DURATION_MS = 550

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

type Nudge = { start: number; target: number; startTime: number }

function InPractice() {
  const { slides } = content.inPractice
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const nudgeRef = useRef<Nudge | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || slides.length === 0) return

    const tick = () => {
      const now = performance.now()
      if (lastTimeRef.current === null) lastTimeRef.current = now
      const delta = now - lastTimeRef.current
      lastTimeRef.current = now

      const nudge = nudgeRef.current
      if (nudge) {
        const progress = Math.min(1, (now - nudge.startTime) / NUDGE_DURATION_MS)
        offsetRef.current = nudge.start + (nudge.target - nudge.start) * easeOutCubic(progress)
        if (progress >= 1) {
          nudgeRef.current = null
        }
      } else {
        offsetRef.current += (SPEED_PX_PER_SEC * delta) / 1000
      }

      const singleSetWidth = track.scrollWidth / 2
      const wrapped =
        singleSetWidth > 0
          ? ((offsetRef.current % singleSetWidth) + singleSetWidth) % singleSetWidth
          : offsetRef.current
      track.style.transform = `translateX(-${wrapped}px)`
    }

    const id = setInterval(tick, 16)
    return () => clearInterval(id)
  }, [slides.length])

  const nudge = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const firstSlide = track.querySelector('.in-practice__slide') as HTMLElement | null
    if (!firstSlide) return
    const slideWidth = firstSlide.getBoundingClientRect().width
    const gap = parseFloat(getComputedStyle(firstSlide).paddingRight || '0')

    nudgeRef.current = {
      start: offsetRef.current,
      target: offsetRef.current + direction * (slideWidth + gap),
      startTime: performance.now(),
    }
  }

  return (
    <section className="in-practice">
      <div className="in-practice__inner">
        <div className="in-practice__viewport">
          <div className="in-practice__track" ref={trackRef}>
            {[...slides, ...slides].map((slide, index) => (
              <article className="in-practice__slide" key={index}>
                <div className="in-practice__card">
                  <img className="in-practice__photo" src={slide.photo} alt={slide.caption} loading="lazy" />
                  <span className="in-practice__badge">{slide.badge}</span>
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
          <div className="in-practice__arrows">
            <button type="button" className="in-practice__arrow" aria-label="Previous slide" onClick={() => nudge(-1)}>
              ←
            </button>
            <button type="button" className="in-practice__arrow" aria-label="Next slide" onClick={() => nudge(1)}>
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InPractice
