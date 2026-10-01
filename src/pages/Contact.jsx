import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { T } from "../components/Bind";
import { CheckRow, Field } from "../components/Field";
import Hero from "../components/Hero";
import { useSite } from "../data/siteData";

export default function Contact() {
  const { get } = useSite();
  const [params] = useSearchParams();
  const topics = get("contact.form.topics") ?? [];
  const travelerTypes = get("contact.form.travelerTypes") ?? [];
  const interests = get("contact.form.interests") ?? [];
  const email = get("org.email");

  const requested = params.get("topic");
  const initialTopic = topics.some((t) => t.id === requested) ? requested : topics[0]?.id ?? "general";

  const [topic, setTopic] = useState(initialTopic);
  const [sent, setSent] = useState(false);

  const isVisit = topic === "judea-samaria";
  const topicLabel = topics.find((t) => t.id === topic)?.label ?? "TFSI";

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Topic: ${topicLabel}`,
    ];

    if (isVisit) {
      const picked = interests.filter((item) => data.get(`interest:${item}`));
      lines.push(
        `Traveler type: ${data.get("travelerType") || "—"}`,
        `Group size: ${data.get("groupSize") || "—"}`,
        `Timeframe: ${data.get("timeframe") || "—"}`,
        `Interests: ${picked.join("; ") || "—"}`
      );
    }

    lines.push("", data.get("message") || "");

    const subject = isVisit ? "Judea & Samaria Experience — plan a visit" : topicLabel;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  return (
    <>
      <Hero path="contact.hero" compact />

      <section className="section">
        <div className="wrap contact-grid">
          <div data-reveal>
            <header className="section-head">
              <T path="contact.form.title" as="h2" />
              <T path="contact.form.note" as="p" className="lead" />
            </header>

            {sent ? (
              <div className="confirm" role="status">
                <T path="contact.form.confirm" /> <a href={`mailto:${email}`}>{email}</a>.
              </div>
            ) : null}

            <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
              <div className="form-row">
                <Field id="name" label="Name" type="text" autoComplete="name" required />
                <Field id="email" label="Email" type="email" autoComplete="email" required />
              </div>
              <div className="form-row">
                <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
                <Field
                  id="topic"
                  label="Topic"
                  as="select"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                >
                  {topics.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </Field>
              </div>

              {isVisit ? (
                <fieldset className="form-group">
                  <legend>About the visit</legend>
                  <div className="form-row">
                    <Field id="travelerType" label="Traveler type" as="select" defaultValue={travelerTypes[0]}>
                      {travelerTypes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </Field>
                    <Field id="groupSize" label="Group size" type="number" min="1" inputMode="numeric" />
                  </div>
                  <Field id="timeframe" label="Timeframe (month or season)" type="text" />
                  <div className="check-group">
                    <span className="check-group-label">Interests</span>
                    {interests.map((item) => (
                      <CheckRow key={item} name={`interest:${item}`} label={item} />
                    ))}
                  </div>
                </fieldset>
              ) : null}

              <Field
                id="message"
                label={isVisit ? "What do you hope to experience?" : "Message"}
                as="textarea"
                rows={6}
                required
              />

              <div className="form-actions">
                <button type="submit" className="btn btn-accent btn-lg">
                  {get("contact.form.submit")}
                </button>
              </div>
            </form>
          </div>

          <aside className="contact-aside" data-reveal>
            <T path="contact.direct.title" as="h2" className="h3" />
            <address className="contact-card">
              <span className="contact-card-label">Mail</span>
              <span>
                <T path="org.poBox" />
                <br />
                <T path="org.city" />
              </span>
              <span className="contact-card-label">Phone</span>
              <a href={get("org.phoneHref")}>{get("org.phone")}</a>
              <span className="contact-card-label">Email</span>
              <a href={`mailto:${email}`}>{email}</a>
            </address>
            <T path="contact.direct.note" as="p" className="form-note" />
          </aside>
        </div>
      </section>
    </>
  );
}
