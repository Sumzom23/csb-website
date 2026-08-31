import { content } from '../data/content'
import Reveal from '../components/Reveal'
import '../components/ContentPage.css'
import './About.css'

function About() {
  const { about } = content

  return (
    <main className="content-page">
      <div className="content-page__masthead">
        <span>{about.mastheadLeft}</span>
        <span>{about.mastheadRight}</span>
      </div>

      <Reveal className="content-page__inner about-lede">
        <h1 className="content-page__title">{about.title}</h1>
      </Reveal>

      <div className="content-page__inner">
        <div className="content-page__body">
          {about.bodyParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="content-page__inner about-values">
        <h2 className="content-page__subtitle">{about.valuesTitle}</h2>
        <div className="content-page__body">
          {about.valuesParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  )
}

export default About
