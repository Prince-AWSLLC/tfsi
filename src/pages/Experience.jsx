import { useState } from "react";
import { Link } from "react-router-dom";
import PageMast from "../components/PageMast";
import { CONTACT, IMAGES } from "../data/site";

const INTERESTS = [
  "Ancient paths and biblical roots",
  "Community stories and modern Zionism",
  "Wine, food, and local makers",
  "Security, demography, and geopolitics",
];

const FAQS = [
  {
    q: "Do you organize full tours?",
    a: "No. This is not a tour operator. The team listens, recommends, and connects. You then work directly with the guides or hosts they introduce.",
  },
  {
    q: "Is there a cost for the consultation?",
    a: "No. The one-on-one planning session is free.",
  },
  {
    q: "Can I book a full-day or half-day itinerary?",
    a: "They will help design a visit — a few hours or a full day — and refer you to trusted guides or hosts who can run it.",
  },
  {
    q: "What kinds of visitors do you work with?",
    a: "Individuals, couples, families, small groups, first-timers, and returning visitors, including people with specific religious or cultural interests.",
  },
  {
    q: "Is it safe to visit Judea and Samaria?",
    a: "Travelers are referred to locations and providers that understand current security and travel guidelines. Safety and comfort are the first filter.",
  },
  {
    q: "Can you help with transportation or lodging?",
    a: "They do not book logistics directly. They will recommend transportation and lodging in or near the areas you will visit.",
  },
  {
    q: "Can I bring a group or community?",
    a: "Yes. Tell them the goal of the group and they will shape the visit around it.",
  },
  {
    q: "Is this a religious or political program?",
    a: "The point is the land through its people and stories — not slogans. The region is tied to biblical heritage and modern Zionism. Visitors from any background who will engage respectfully are welcome.",
  },
];

const EPISODES = [
  {
    title: "How Christians Help Israeli Farmers With Josh Waller",
    n: 30,
    image: IMAGES.ep30,
    blurb:
      "Franny Waisman talks with Josh Waller about ordinary people, Israeli farmers, and whether human choices still matter.",
  },
  {
    title: "Israel’s Future Is Judea and Samaria with Natalie Sopinsky",
    n: 29,
    image: IMAGES.ep29,
    blurb:
      "What looks dangerous from the outside is often ordinary life in Judea and Samaria. Natalie Sopinsky explains why.",
  },
  {
    title: "Why the Future Is Built by People Who Believe Before They See",
    n: 28,
    image: IMAGES.ep28,
    blurb:
      "A Torah episode connecting King David’s mighty men, Israel’s early pioneers, and the people living in the Heartland now.",
  },
];

export default function Experience() {
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const interests = INTERESTS.filter((item) => data.get(item));
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Traveler type: ${data.get("type")}`,
      `Group size: ${data.get("size") || "—"}`,
      `Timeframe: ${data.get("when") || "—"}`,
      `Interests: ${interests.join("; ") || "—"}`,
      "",
      data.get("message") || "",
    ].join("\n");

    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      "Judea & Samaria Experience — plan a visit"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <>
      <PageMast
        kicker="Judea and Samaria Experience"
        title="Real places. Real people."
        lead="Personalized travel guidance so a visit to the Heartland is a conversation, not a packaged tour. Supported by Texans for a Safe Israel."
        image={IMAGES.hebron}
        imageAlt="Hebron and the surrounding hills"
      />

      <section className="section reveal">
        <div className="wrap split">
          <div>
            <h2>How it works</h2>
            <div className="steps">
              <div className="step">
                <div>
                  <h3>Share your vision</h3>
                  <p>
                    One planning session. Who you are, what you care about,
                    and what you hope to see.
                  </p>
                </div>
              </div>
              <div className="step">
                <div>
                  <h3>Get matched</h3>
                  <p>
                    The team connects you with service providers, communities,
                    and destinations that fit your time and interests.
                  </p>
                </div>
              </div>
              <div className="step">
                <div>
                  <h3>Experience the land</h3>
                  <p>
                    Walk the land, meet the people, and work directly with
                    the guides or hosts you were introduced to.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="photo-frame">
            <img src={IMAGES.walking} alt="Walking the land" />
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="wrap">
          <h2>What kind of visit</h2>
          <div className="work-list reveal-stagger">
            <article className="work-item">
              <div className="work-meta">Paths</div>
              <div>
                <h3>Ancient paths and biblical roots</h3>
                <p>Walk where the patriarchs walked. Sites that put the text on the ground.</p>
              </div>
            </article>
            <article className="work-item">
              <div className="work-meta">People</div>
              <div>
                <h3>Community stories and modern Zionism</h3>
                <p>Meet the families building life in the Heartland now.</p>
              </div>
            </article>
            <article className="work-item">
              <div className="work-meta">Table</div>
              <div>
                <h3>Wine, food, and local makers</h3>
                <p>Growers, chefs, and wineries — including the Samaria vineyards.</p>
              </div>
            </article>
            <article className="work-item">
              <div className="work-meta">Reality</div>
              <div>
                <h3>Security, demography, and geopolitics</h3>
                <p>Hear the current situation from people who live inside it.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="wrap">
          <p className="kicker">Live the Land</p>
          <h2>Israel travel podcast</h2>
          <p>
            Hosted by Franny Waisman. Hear the people and places before you
            go. Twenty-one episodes in season one.
          </p>
          <div className="reveal-stagger">
            {EPISODES.map((episode) => (
              <article className="podcast" key={episode.n}>
                <img src={episode.image} alt="" />
                <div>
                  <div className="work-meta">Episode {episode.n}</div>
                  <h3>{episode.title}</h3>
                  <p>{episode.blurb}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="action-row">
            <a
              className="btn btn-navy"
              href="https://podcasts.apple.com/us/podcast/live-the-land/id1860812584"
              target="_blank"
              rel="noreferrer"
            >
              Listen on Apple Podcasts
            </a>
          </p>
        </div>
      </section>

      <section className="section section-rule" id="plan">
        <div className="wrap split">
          <div>
            <h2>Plan your visit</h2>
            <p>
              The form opens an email to TFSI with your details. Someone will
              follow up for the planning conversation.
            </p>
            {sent ? (
              <div className="confirm">
                Your mail app should be open. If it is not, write{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and
                say you want to plan a Judea and Samaria visit.
              </div>
            ) : null}
            <form onSubmit={onSubmit}>
              <div className="two-col">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
              </div>
              <div className="two-col">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" />
                </div>
                <div className="field">
                  <label htmlFor="type">Traveler type</label>
                  <select id="type" name="type" defaultValue="Individual">
                    <option>Individual</option>
                    <option>Couple</option>
                    <option>Family</option>
                    <option>Group</option>
                  </select>
                </div>
              </div>
              <div className="two-col">
                <div className="field">
                  <label htmlFor="size">Group size</label>
                  <input id="size" name="size" type="number" min="1" />
                </div>
                <div className="field">
                  <label htmlFor="when">Timeframe</label>
                  <input id="when" name="when" type="text" placeholder="Month or season" />
                </div>
              </div>
              <div className="field">
                <span className="kicker">Interests</span>
                {INTERESTS.map((item) => (
                  <label className="check-row" key={item}>
                    <input type="checkbox" name={item} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <div className="field">
                <label htmlFor="message">What do you hope to experience?</label>
                <textarea id="message" name="message" />
              </div>
              <button className="btn" type="submit">
                Send planning request
              </button>
            </form>
          </div>
          <div>
            <h2>Questions</h2>
            <dl className="faq">
              {FAQS.map((item) => (
                <div key={item.q}>
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
            <p className="action-row">
              U.S. gifts to this initiative are processed through TFSI and
              are tax-deductible in the United States.
            </p>
            <p>
              <Link className="btn btn-navy" to="/donate">
                Support the work
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
