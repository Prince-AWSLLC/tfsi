import { Link } from "react-router-dom";
import PageMast from "../components/PageMast";
import { IMAGES } from "../data/site";

export default function Work() {
  return (
    <>
      <PageMast
        kicker="Our work"
        title="What the money actually does"
        lead="These are the projects on the current site — named people, named places, named items. No invented totals."
        image={IMAGES.hills}
        imageAlt="Hills in Judea and Samaria"
      />

      <section className="section">
        <div className="wrap">
          <article className="story-block">
            <h2>Meeting critical needs</h2>
            <p>
              The Monday after the October 7 massacre, before Texas sunrise,
              TFSI called Jeremy Gimpel. His family and others live at Arugot
              Farm in the Judean Desert, surrounded by hostile neighbors. He
              needed a drone — the equivalent of fifty men on watch. The next
              day it was active. The farm later became a fortress for fifteen
              mothers and children while their fathers were at war.
            </p>
          </article>

          <article className="story-block">
            <h2>Holocaust survivors</h2>
            <p>
              Survivors are often the group most wary of the word Christian.
              The work is kindness without proselytizing: two air
              conditioners, a refrigerator, washer and dryer, a deep freezer,
              iPads, phones, computers, a remodeled bathroom, a bread maker
              for challah, grocery cards at the holidays.
            </p>
            <p>
              A 92-year-old concert pianist received a piano. If you want
              more on this work, contact the house and ask.
            </p>
          </article>

          <article className="story-block">
            <h2>Security</h2>
            <p>
              Since October 7, TFSI has funded drones, bulletproof vests,
              scopes, cameras, helmets, medical bags, tactical boots, winter
              jackets, and a hand-warmer campaign. Communities helped include
              Har Bracha, Chavat Gilad, Arugot Farm, Susya, Itamar, Shiloh,
              and Homesh.
            </p>
          </article>

          <article className="story-block">
            <h2>Feed the soldiers</h2>
            <p>
              Donations fed battalions in the field. Judy Tashbook Safern
              organized and raised most of those funds through tfsi.org —
              water, Coca-Cola, Red Bull, whatever they asked for.
            </p>
          </article>

          <article className="story-block">
            <h2>Emotional needs</h2>
            <p>
              Amitsim, headed by Rabbi Yehuda and Hadass Glick, works with
              young widows and orphans. David Rubin’s Shiloh Israel
              Children’s Fund works with traumatized children. After October
              7, that demand is not shrinking.
            </p>
          </article>

          <article className="story-block">
            <h2>Israel trips</h2>
            <p>
              The first TFSI trip was May 2023: seven American Christians
              with nine American Jews from Americans for a Safe Israel.
              Contact the house for the next one.
            </p>
          </article>

          <article className="story-block">
            <h2>The Biblical Highway</h2>
            <p>
              One long goal is that Route 60 become known as Israel’s
              national highway — the Biblical Highway. Rest stops in the Holy
              Cities, scenic overlooks, tourist information, a restaurant, a
              hotel. Tourism and Israeli business both change if people can
              actually travel the spine of the land.
            </p>
          </article>

          <article className="story-block">
            <h2>Young adult influencers</h2>
            <p>
              Support for Israel is high among retired Americans and drops
              sharply in younger age groups. TFSI takes young people to the
              land. A page of those stories is still being built. Until then,
              the invitation is the same: come to Israel and become an
              influencer yourself.
            </p>
          </article>

          <article className="story-block">
            <h2>Texas–Israel Embassy</h2>
            <p>
              A working embassy between the State of Texas and the State of
              Israel: staffers from Texas in Israel, staffers from Israel in
              Texas. A place Texans can go for assistance, guides, and
              recommended travel — and a place for Texas and Israeli
              businesses to meet.
            </p>
          </article>

          <p className="action-row">
            <Link className="btn" to="/donate">
              Donate
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
