import { useEffect, useState, type KeyboardEvent, type MouseEvent } from 'react'
import './IntroSplash.css'

const STORAGE_KEY = 'csb-intro-seen'
const SWING_MS = 750
const ZOOM_MS = 850

type Phase = 'idle' | 'swing' | 'zoom'

function IntroSplash() {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY)
    if (reducedMotion || alreadySeen) return

    setVisible(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  const dismiss = () => {
    if (phase !== 'idle') return
    setPhase('swing')
    sessionStorage.setItem(STORAGE_KEY, '1')
    document.body.style.overflow = ''
    window.setTimeout(() => setPhase('zoom'), SWING_MS)
    window.setTimeout(() => setVisible(false), SWING_MS + ZOOM_MS)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      dismiss()
    }
  }

  const handleSkip = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    dismiss()
  }

  const className = ['intro-splash', phase !== 'idle' && 'intro-splash--swing', phase === 'zoom' && 'intro-splash--zoom']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label="Enter Circuit Skillbuilder"
      onClick={dismiss}
      onKeyDown={handleKeyDown}
    >
      <button type="button" className="intro-splash__skip" onClick={handleSkip}>
        Skip
      </button>

      <div className="intro-splash__content">
        <div className="intro-splash__mark-wrap">
          <img className="intro-splash__frame intro-splash__frame--black" src="/logo/door-frame-black.png" alt="" aria-hidden="true" />
          <img className="intro-splash__frame intro-splash__frame--pink" src="/logo/door-frame-pink.png" alt="" aria-hidden="true" />
          <img className="intro-splash__leaf" src="/logo/door-leaf.png" alt="" aria-hidden="true" />
        </div>
        <span className="intro-splash__text">Circuit Skillbuilder</span>
        <span className="intro-splash__hint">Click to enter</span>
      </div>
    </div>
  )
}

export default IntroSplash
