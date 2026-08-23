import './CommunityCTA.css'

function DiscordIcon() {
  return (
    <svg
      className="community-cta__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3c-.18.317-.39.745-.534 1.078a18.27 18.27 0 0 0-4.702 0A8.64 8.64 0 0 0 11.115 3a19.736 19.736 0 0 0-3.432 1.369C5.061 7.662 4.215 10.866 4.473 14.025a19.9 19.9 0 0 0 3.742 1.903c.303-.414.574-.855.807-1.317a12.88 12.88 0 0 1-1.272-.612c.107-.078.212-.16.313-.245 2.454 1.145 5.108 1.145 7.537 0 .102.085.207.167.313.245-.405.234-.83.445-1.272.612.233.462.504.903.807 1.317a19.839 19.839 0 0 0 3.742-1.903c.326-3.642-.558-6.776-2.38-9.656ZM9.32 12.345c-.794 0-1.448-.73-1.448-1.625 0-.896.637-1.631 1.448-1.631.817 0 1.464.742 1.448 1.631 0 .895-.637 1.625-1.448 1.625Zm5.36 0c-.794 0-1.448-.73-1.448-1.625 0-.896.637-1.631 1.448-1.631.817 0 1.464.742 1.448 1.631 0 .895-.631 1.625-1.448 1.625Z" />
    </svg>
  )
}

function CommunityCTA() {
  return (
    <section className="community-cta">
      <div className="community-cta__inner">
        <div className="community-cta__card">
          <p className="community-cta__eyebrow">The Community</p>
          <h2 className="community-cta__title">
            Debate is lonely when you&apos;re the only one on your team.{' '}
            <em>Come sit with us.</em>
          </h2>
          <p className="community-cta__text">
            Our Discord is where students trade prep, get last-minute round advice, and find
            practice partners across the country. Free, moderated, and open to any high school
            debater.
          </p>
          <div className="community-cta__actions">
            <a
              className="community-cta__button"
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
            >
              <DiscordIcon />
              Join our Discord
            </a>
            <span className="community-cta__tags">FREE · MODERATED · STUDENT-SAFE</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityCTA
