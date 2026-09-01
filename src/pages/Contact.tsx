import { content } from '../data/content'
import Reveal from '../components/Reveal'
import '../components/ContentPage.css'

function Contact() {
  const { contact } = content

  return (
    <main className="content-page">
      <div className="content-page__masthead">
        <span>{contact.mastheadLeft}</span>
        <span>{contact.mastheadRight}</span>
      </div>

      <Reveal className="content-page__inner">
        <h1 className="content-page__title">{contact.title}</h1>
        <div className="content-page__body">
          <p>{contact.intro}</p>
          <p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            <a href={contact.discordHref} target="_blank" rel="noreferrer">
              {contact.discordLabel}
            </a>
          </p>
        </div>
      </Reveal>
    </main>
  )
}

export default Contact
