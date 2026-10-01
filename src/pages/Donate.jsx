import { T } from "../components/Bind";
import DonationTiers from "../components/DonationTiers";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import SectionHead from "../components/SectionHead";
import { useSite } from "../data/siteData";

export default function Donate() {
  const { get } = useSite();
  const stories = get("donate.stories.items") ?? [];

  return (
    <>
      <Hero path="donate.hero" compact>
        <a className="btn btn-accent btn-lg" href="#give">
          Choose an amount
        </a>
      </Hero>

      <section className="section" id="give">
        <div className="wrap narrow-wide" data-reveal>
          <header className="section-head">
            <T path="donate.tiers.title" as="h2" />
            <T path="donate.tiers.lead" as="p" className="lead" />
          </header>
          <DonationTiers />
        </div>
      </section>

      <section className="section section-tint" id="where-gifts-go">
        <div className="wrap">
          <SectionHead path="donate.stories" />
          <div className="story-grid" data-json="donate.stories.items">
            {stories.map((story, index) => (
              <article key={story.title} className="story" data-reveal style={{ "--i": index % 3 }}>
                <span className="story-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{story.title}</h3>
                {story.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow" data-reveal>
          <T path="donate.faq.title" as="h2" />
          <Faq path="donate.faq.items" />
        </div>
      </section>
    </>
  );
}
