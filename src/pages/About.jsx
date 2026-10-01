import { CtaLink, Img, Paragraphs, T } from "../components/Bind";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import PeopleDirectory from "../components/PeopleDirectory";
import SectionHead from "../components/SectionHead";
import { useSite } from "../data/siteData";

export default function About() {
  const { get } = useSite();
  const leaders = get("about.leadership.people") ?? [];
  const steps = get("about.jse.steps") ?? [];
  const interests = get("about.jse.interests") ?? [];

  return (
    <>
      <Hero path="about.hero" compact />

      <section className="section">
        <div className="wrap split split-media-right">
          <div data-reveal>
            <SectionHead path="about.story" lead={false} />
            <div className="prose">
              <Paragraphs path="about.story.body" />
            </div>
          </div>
          <figure className="frame frame-tall" data-reveal>
            <Img path="about.story.image" altPath="about.story.imageAlt" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <SectionHead path="about.leadership" lead={false} />
          <div className="leader-grid" data-json="about.leadership.people">
            {leaders.map((person, index) => (
              <article key={person.name} className="leader" data-reveal style={{ "--i": index }}>
                <span className="leader-role">{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow" data-reveal>
          <SectionHead path="about.howWeWork" lead={false} />
          <div className="prose">
            <Paragraphs path="about.howWeWork.body" />
          </div>
        </div>
      </section>

      <section className="section section-rule" id="people">
        <div className="wrap">
          <SectionHead path="about.people" />
          <PeopleDirectory />
        </div>
      </section>

      <section className="section section-dark" id="judea-samaria">
        <div className="wrap split split-media-left">
          <figure className="frame frame-tall" data-reveal>
            <Img path="about.jse.image" altPath="about.jse.imageAlt" loading="lazy" decoding="async" />
          </figure>
          <div data-reveal>
            <Img path="about.jse.logo" className="jse-mark" alt="" loading="lazy" decoding="async" />
            <SectionHead path="about.jse" light />
            <ol className="steps" data-json="about.jse.steps">
              {steps.map((step, index) => (
                <li key={step.title} className="step">
                  <span className="step-index">{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="section-actions">
              <CtaLink path="about.jse.cta" className="btn btn-accent" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap two-col-wide">
          <div data-reveal>
            <h2 className="h3">What kind of visit</h2>
            <ul className="interest-list" data-json="about.jse.interests">
              {interests.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <h2 className="h3">Questions</h2>
            <Faq path="about.jse.faq" />
            <p className="form-note">
              <T path="donate.faq.items.3.a" />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
