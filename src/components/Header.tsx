import Logo from './Logo'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <button className="header__menu" type="button" aria-label="Open menu">
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
