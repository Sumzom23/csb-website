import './Logo.css'

type LogoProps = {
  showText?: boolean
}

function Logo({ showText = true }: LogoProps) {
  return (
    <div className="logo">
      <div className="logo__mark" aria-hidden="true">
        c
      </div>
      {showText && <span className="logo__text">Circuit Skillbuilder</span>}
    </div>
  )
}

export default Logo
