import { teamMembers, type TeamGroup, type TeamMember } from '../data/team'
import { content } from '../data/content'
import Reveal from '../components/Reveal'
import '../components/ContentPage.css'
import '../components/BlogContent.css'

const sections: { group: TeamGroup; title: string }[] = [
  { group: 'executive', title: 'Executive board' },
  { group: 'leadership', title: 'Leadership' },
  { group: 'instructor', title: 'Instructors' },
]

function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="team-grid">
      {members.map((member, index) => (
        <Reveal key={member.name} delay={(index % 6) * 60}>
          <article className="team-card">
            {member.photo ? (
              <img className="team-card__photo" src={member.photo} alt={member.name} loading="lazy" />
            ) : (
              <div className="team-card__photo team-card__photo--placeholder" aria-hidden="true" />
            )}
            <h2 className="team-card__name">{member.name}</h2>
            <p className="team-card__role">{member.role}</p>
            <p className="team-card__bio">{member.bio}</p>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

function Team() {
  const { teamPage } = content

  return (
    <main className="content-page">
      <div className="content-page__masthead">
        <span>{teamPage.mastheadLeft}</span>
        <span>{teamMembers.length} instructors</span>
      </div>

      <div className="content-page__inner content-page__inner--wide">
        <Reveal>
          <h1 className="content-page__title">{teamPage.title}</h1>
        </Reveal>

        {sections.map(({ group, title }) => {
          const members = teamMembers.filter((member) => member.group === group)
          if (members.length === 0) return null
          return (
            <section className="team-section" key={group}>
              <div className="team-section__head">
                <h2 className="team-section__title">{title}</h2>
                <span className="team-section__count">
                  {members.length} {members.length === 1 ? 'person' : 'people'}
                </span>
              </div>
              <TeamGrid members={members} />
            </section>
          )
        })}

        <Reveal>
          <section className="team-join">
            <h2 className="team-join__title">{teamPage.joinTitle}</h2>
            <p className="team-join__text">{teamPage.joinText}</p>
          </section>
        </Reveal>
      </div>
    </main>
  )
}

export default Team
