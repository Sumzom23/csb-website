import '../components/ContentPage.css'

function About() {
  return (
    <main className="content-page">
      <div className="content-page__inner">
        <p className="content-page__eyebrow">Our Mission</p>
        <h1 className="content-page__title">Our Mission</h1>
        <p className="content-page__quote">
          &ldquo;Not just increasing accessibility in debate, but opening avenues to success.&rdquo;
        </p>

        <div className="content-page__body">
          <p>
            High school National Circuit debate is plagued by the persistent problem of
            inclusivity. Due to the incredibly technical and nuanced nature of the activity, it is
            remarkably difficult to learn circuit debate without an established team or a
            comprehensive support system. Underprivileged debaters are frequently left in a state of
            gridlock, unable to improve their skills and with nobody to turn to for help. This is
            compounded by high costs of participation and an overall lack of a welcoming community.
            In other words, debate is by design built against the underdog.
          </p>
          <p>
            Thus, it is no surprise that every year and at every National Circuit tournament, the
            same schools and teams are the ones winning. Low income and other disadvantaged
            debaters are all but pushed out.
          </p>
          <p>
            We hope to help remedy this crisis. Circuit Skillbuilder offers in-depth video lessons
            that teach the essential skills of high level competition, no-cost prep usually
            paywalled behind elite programs, and free but incredibly talented coaches that help with
            regular improvement—serving as a much needed support system. We also aim to foster a
            friendly community through our services and social platforms, breaking down the
            isolation that many fledgling debaters feel. As we expand, we hope to offer scholarships
            to fund promising debaters, practice tournaments, services in different events, and
            more—all in the name of ensuring an equitable playing field.
          </p>
        </div>

        <hr className="content-page__divider" />

        <h2 className="content-page__subtitle">Our Values</h2>
        <div className="content-page__body">
          <p>
            Whether you have a large debate program or a team with just a handful of members, we
            believe that everyone deserves an equal chance to succeed at the highest level of
            debate.
          </p>
          <p>
            We envision a reality where high school National Circuit debate is truly open and
            inviting to all, not just to those who were privileged enough to have it opened for
            them.
          </p>
        </div>
      </div>
    </main>
  )
}

export default About
