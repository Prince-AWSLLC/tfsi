import { Link } from "react-router-dom";
import { CtaLink } from "../components/Bind";
import Hero from "../components/Hero";
import PersonMark from "../components/PersonMark";
import SectionHead from "../components/SectionHead";
import { useSite } from "../data/siteData";

function EventCta({ cta }) {
  if (!cta) return null;
  if (cta.href) {
    return (
      <a className="btn btn-primary" href={cta.href} target="_blank" rel="noreferrer">
        {cta.label}
      </a>
    );
  }
  return (
    <Link className="btn btn-primary" to={cta.to}>
      {cta.label}
    </Link>
  );
}

export default function Media() {
  const { get } = useSite();
  const episodes = get("media.podcast.episodes") ?? [];
  const events = get("media.events.items") ?? [];
  const gallery = get("media.gallery.items") ?? [];
  const people = get("about.people.list") ?? [];

  return (
    <>
      <Hero path="media.hero" compact />

      <section className="section" id="podcast">
        <div className="wrap">
          <SectionHead path="media.podcast" />
          <div className="episode-grid" data-json="media.podcast.episodes">
            {episodes.map((episode, index) => (
              <article key={episode.n} className="episode" data-reveal style={{ "--i": index }}>
                <figure className="episode-art">
                  <img
                    src={episode.image}
                    alt=""
                    width="480"
                    height="360"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <div className="episode-body">
                  <span className="kicker">Episode {episode.n}</span>
                  <h3>{episode.title}</h3>
                  <p>{episode.blurb}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="section-actions" data-reveal>
            <CtaLink path="media.podcast.link" className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section className="section section-tint" id="events">
        <div className="wrap">
          <SectionHead path="media.events" />
          <div className="event-list" data-json="media.events.items">
            {events.map((event, index) => (
              <article
                key={event.title}
                className={`event${event.image ? " has-art" : ""}`}
                data-reveal
                style={{ "--i": index }}
              >
                {event.image ? (
                  <figure className="event-art">
                    <img src={event.image} alt={event.imageAlt ?? ""} width="540" height="540" loading="lazy" decoding="async" />
                  </figure>
                ) : null}
                <div className="event-body">
                  <span className="event-date">{event.date}</span>
                  <h3>{event.title}</h3>
                  <p>{event.body}</p>
                  {event.detail ? <p className="event-detail">{event.detail}</p> : null}
                  <EventCta cta={event.cta} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="people">
        <div className="wrap">
          <SectionHead path="media.people" />
          <ul className="guest-grid" data-json="about.people.list">
            {people.map((person, index) => (
              <li key={person.slug} data-reveal style={{ "--i": index % 5 }}>
                <Link
                  className="guest"
                  to={`/about?guest=${person.slug}#people`}
                  aria-label={`${person.name} in the guest directory`}
                >
                  <PersonMark person={person} size="lg" />
                  <span className="guest-name">{person.name}</span>
                  <span className="guest-affiliation">{person.affiliation}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="section-actions" data-reveal>
            <CtaLink path="media.people.cta" className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section className="section section-tint" id="gallery">
        <div className="wrap">
          <SectionHead path="media.gallery" />
          <ul className="gallery" data-json="media.gallery.items">
            {gallery.map((item, index) => (
              <li
                key={item.src}
                className={`gallery-item${item.wide ? " is-wide" : ""}`}
                data-reveal
                style={{ "--i": index % 3 }}
              >
                <figure>
                  <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
