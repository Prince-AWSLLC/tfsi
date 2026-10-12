import { T } from "../components/Bind";
import { useSite } from "../data/siteData";

export default function Legal({ path }) {
  const { get } = useSite();
  const sections = get(`${path}.sections`) ?? [];

  return (
    <section className="section legal">
      <div className="wrap narrow">
        <T path={`${path}.kicker`} as="p" className="kicker" />
        <T path={`${path}.title`} as="h1" />
        <T path={`${path}.updated`} as="p" className="legal-updated" />
        <div className="prose" data-json={`${path}.sections`}>
          {sections.map((section) => (
            <section key={section.heading} className="legal-section">
              <h2 className="h3">{section.heading}</h2>
              {(section.body ?? []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
