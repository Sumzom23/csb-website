import './Logo.css'

type LogoProps = {
  variant?: 'mark' | 'full'
}

function Logo({ variant = 'full' }: LogoProps) {
  return (
    <span className="logo">
      <img
        className="logo__icon"
        src="/logo/circuit-skillbuilder-icon.png"
        alt="Circuit Skillbuilder"
        width={24}
        height={39}
      />
      {variant === 'full' && <span className="logo__text">Circuit Skillbuilder</span>}
    </span>
  )
}

export default Logo
