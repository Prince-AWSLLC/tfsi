import { CtaLink, Img, Paragraphs, T } from "../components/Bind";
import Hero from "../components/Hero";
import SectionHead from "../components/SectionHead";
import { useSite } from "../data/siteData";

export default function Home() {
  const { get } = useSite();
  const facts = get("home.facts") ?? [];
  const work = get("home.work.items") ?? [];

  return (
    <>
      <Hero path="home.hero">
        <CtaLink path="home.hero.primary" className="btn btn-accent btn-lg" />
        <CtaLink path="home.hero.secondary" className="btn btn-ghost btn-lg" />
      </Hero>

      <section className="facts" aria-label="At a glance">
        <dl className="wrap facts-grid" data-json="home.facts">
          {facts.map((fact, index) => (
            <div key={fact.label} className="fact" data-reveal style={{ "--i": index }}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="wrap split split-media-right">
          <div data-reveal>
            <SectionHead path="home.mission" lead={false} />
            <div className="prose">
              <Paragraphs path="home.mission.body" />
            </div>
          </div>
          <figure className="frame frame-tall" data-reveal>
            <Img path="home.mission.image" altPath="home.mission.imageAlt" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <div className="section-head-row" data-reveal>
            <SectionHead path="home.work" lead={false} />
            <T path="home.work.intro" as="p" className="lead" />
          </div>
          <ol className="work-grid" data-json="home.work.items">
            {work.map((item, index) => (
              <li key={item.title} className="work-card" data-reveal style={{ "--i": index % 4 }}>
                <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ol>
          <div className="section-actions" data-reveal>
            <CtaLink path="home.work.cta" className="btn btn-primary" />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap split split-media-left">
          <figure className="frame frame-wide" data-reveal>
            <Img path="home.jse.image" altPath="home.jse.imageAlt" loading="lazy" decoding="async" />
          </figure>
          <div data-reveal>
            <Img path="home.jse.logo" className="jse-mark" alt="" loading="lazy" decoding="async" />
            <SectionHead path="home.jse" lead={false} light />
            <T path="home.jse.body" as="p" className="lead" />
            <div className="section-actions">
              <CtaLink path="home.jse.cta" className="btn btn-accent" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <blockquote className="wrap pull" data-reveal>
          <T path="home.quote.text" as="p" />
          <T path="home.quote.attribution" as="cite" />
        </blockquote>
      </section>

      <section className="section closing">
        <div className="wrap closing-inner" data-reveal>
          <div>
            <T path="home.closing.title" as="h2" />
            <T path="home.closing.body" as="p" className="lead" />
          </div>
          <div className="closing-actions">
            <CtaLink path="home.closing.primary" className="btn btn-accent btn-lg" />
            <CtaLink path="home.closing.secondary" className="btn btn-ghost btn-lg" />
          </div>
        </div>
      </section>
    </>
  );
}
