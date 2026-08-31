import { Link } from 'react-router-dom'
import Logo from './Logo'
import { navLinks } from '../data/navigation'
import { content } from '../data/content'
import './Footer.css'

const reachLinks = [
  { label: 'circuitskillbuilder@gmail.com', href: 'mailto:circuitskillbuilder@gmail.com' },
  { label: 'Discord', href: 'https://discord.com' },
]

function Footer() {
  const { footer } = content

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__mission">{footer.mission}</p>
          </div>

          <div className="footer__group">
            <p className="footer__label">Site</p>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__group">
            <p className="footer__label">Reach us</p>
            <ul className="footer__list">
              {reachLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{footer.copyright}</p>
          <p className="footer__tagline">{footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
