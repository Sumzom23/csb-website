import Logo from './Logo'
import './Footer.css'

const siteLinks = ['About', 'Team', 'Blog', 'Contact']
const reachLinks = [
  { label: 'circuitskillbuilder@gmail.com', href: 'mailto:circuitskillbuilder@gmail.com' },
  { label: 'Discord', href: 'https://discord.com' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo />
          <p className="footer__mission">
            A student-led nonprofit opening high school National Circuit debate to everyone —
            not just those born into it.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__group">
            <p className="footer__label">Site</p>
            <ul className="footer__list">
              {siteLinks.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__group">
            <p className="footer__label">Reach Us</p>
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
          <p className="footer__copyright">
            © 2026 Circuit Skillbuilder — a 501(c)(3) in progress.
          </p>
          <p className="footer__tagline">For the Underdog.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
