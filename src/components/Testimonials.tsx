import { useEffect, useRef } from 'react'
import { content } from '../data/content'
import './Testimonials.css'

function Testimonials() {
  const { items } = content.testimonials
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const targets = list.querySelectorAll('.testimonials__item')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('testimonials__item--visible', entry.isIntersecting)
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [items.length])

  return (
    <section className="testimonials">
      <div className="testimonials__list" ref={listRef}>
        {items.map((item, index) => (
          <article className="testimonials__item" key={`${item.name}-${index}`}>
            <span className="testimonials__quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className="testimonials__quote">{item.quote}</blockquote>
            <p className="testimonials__name">{item.name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
