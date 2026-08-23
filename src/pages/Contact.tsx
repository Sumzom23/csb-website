import '../components/ContentPage.css'

function Contact() {
  return (
    <main className="content-page">
      <div className="content-page__inner">
        <p className="content-page__eyebrow">Reach Us</p>
        <h1 className="content-page__title">Contact</h1>
        <div className="content-page__body">
          <p>
            Have questions about joining Circuit Skillbuilder, getting coaching, or partnering with
            us? We&apos;d love to hear from you.
          </p>
          <p>
            <a href="mailto:circuitskillbuilder@gmail.com">circuitskillbuilder@gmail.com</a>
          </p>
          <p>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              Discord
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Contact
