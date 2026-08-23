import { joinUsText, teamMembers } from '../data/team'
import { teamImages } from '../data/teamImages'
import '../components/ContentPage.css'
import '../components/BlogContent.css'

function Team() {
  return (
    <main className="content-page">
      <div className="content-page__inner content-page__inner--wide">
        <p className="content-page__eyebrow">Our Team</p>
        <h1 className="content-page__title">Meet The Team!</h1>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <article className="team-card" key={member.name}>
              <img
                className="team-card__photo"
                src={teamImages[index]}
                alt={member.name}
                loading="lazy"
              />
              <h2 className="team-card__name">{member.name}</h2>
              <p className="team-card__role">{member.role}</p>
              <p className="team-card__bio">{member.bio}</p>
            </article>
          ))}
        </div>

        <section className="team-join">
          <h2 className="team-join__title">Join Us!</h2>
          <p className="team-join__text">{joinUsText}</p>
        </section>
      </div>
    </main>
  )
}

export default Team
