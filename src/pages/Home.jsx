import { Link } from "react-router-dom";
import PageMast from "../components/PageMast";
import { IMAGES, WORK_AREAS } from "../data/site";

export default function Home() {
  return (
    <>
      <PageMast
        kicker="Granbury, Texas · 501(c)(3)"
        title="Why can’t we just be friends?"
        lead="Texans for a Safe Israel supports the Jewish people in their God-given homeland — especially Jerusalem, Judea, and Samaria — and educates in Texas by building friendships without a hidden agenda."
        image={IMAGES.lodge}
        imageAlt="The TFSI lodge in Granbury, with Texas and Israel flags over the entrance"
      >
        <p>
          <Link className="btn" to="/donate">
            Donate
          </Link>
        </p>
      </PageMast>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>The work</h2>
            <p>
              TFSI’s greatest role has been as a connector. Guests from the
              Biblical Heartland sit in a Texas house and tell their own
              story. Donors then fund the needs those friendships make
              visible: security, survivors, soldiers, and the next generation
              of visitors.
            </p>
          </div>
          <div className="photo-frame">
            <img
              src={IMAGES.land}
              alt="Hills of Judea and Samaria"
            />
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="wrap">
          <div className="work-list">
            {WORK_AREAS.slice(0, 6).map((item, index) => (
              <article className="work-item work-item-numbered" key={item.title}>
                <div className="work-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="action-row">
            <Link className="btn btn-navy" to="/work">
              Read the work
            </Link>
          </p>
        </div>
      </section>

      <section className="section band-navy">
        <div className="wrap split">
          <div>
            <img
              className="jse-mark"
              src={IMAGES.jseLogo}
              alt="The Judea and Samaria Experience"
            />
          </div>
          <div>
            <p className="kicker">A TFSI initiative</p>
            <h2>The Judea and Samaria Experience</h2>
            <p>
              Personalized travel guidance for people who want to walk the
              land and meet the people who live there. Not a tour company.
              One conversation at a time, then a match with trusted guides
              and hosts.
            </p>
            <p>
              <Link className="btn btn-ghost" to="/judea-samaria">
                Plan a visit
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
