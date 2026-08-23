import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { navLinks } from '../data/navigation'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
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

  return (
    <header className="header">
      <div className="header__bar">
        <div className="header__inner">
          <Link to="/" className="header__logo-link" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>
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
          <nav className="header__nav" aria-label="Main navigation">
            <ul className="header__nav-list">
              {navLinks.map((link) => (
                <li key={link.path}>
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
            <Link
              to="/about"
              className="header__nav-cta"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
