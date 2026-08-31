import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { navLinks } from '../data/navigation'
import { content } from '../data/content'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__bar">
        <div className="header__inner">
          <Link to="/" className="header__logo-link" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          <nav className="header__nav-desktop" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`header__nav-desktop-link${location.pathname === link.path ? ' header__nav-desktop-link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="header__menu"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="header__overlay">
          <nav className="header__nav" aria-label="Mobile navigation">
            <ul className="header__nav-list">
              {navLinks.map((link, index) => (
                <li key={link.path} style={{ animationDelay: `${index * 45}ms` }}>
                  <span className="header__nav-index">{String(index + 1).padStart(2, '0')}</span>
                  <Link
                    to={link.path}
                    className={`header__nav-link${location.pathname === link.path ? ' header__nav-link--active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/about" className="header__nav-cta" onClick={() => setMenuOpen(false)}>
              {content.nav.ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
