import { useState } from "react";
import PageMast from "../components/PageMast";
import { CONTACT } from "../data/site";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const subject = data.get("topic") || "TFSI";
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Topic: ${subject}`,
      "",
      data.get("message") || "",
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageMast
        kicker="Contact"
        title="Write the house"
        lead="Hosting, trips, volunteering, a speaker coming through Texas, or a need in Israel — start here."
      />

      <section className="section">
        <div className="wrap split">
          <div>
            {sent ? (
              <div className="confirm">
                Your mail app should be open. If it is not, email{" "}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </div>
            ) : null}
            <form onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" />
              </div>
              <div className="field">
                <label htmlFor="topic">Topic</label>
                <select id="topic" name="topic" defaultValue="General">
                  <option>General</option>
                  <option>Volunteer</option>
                  <option>Host an Israeli guest / attend a gathering</option>
                  <option>Israel trip</option>
                  <option>Judea & Samaria Experience</option>
                  <option>Donation question</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required />
              </div>
              <button className="btn" type="submit">
                Open email
              </button>
            </form>
          </div>
          <div>
            <h2>Direct</h2>
            <p>
              {CONTACT.poBox}
              <br />
              {CONTACT.city}
            </p>
            <p>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p className="form-note">
              Join a live event, a Facebook Live or Zoom meeting, or come on a
              trip. The newsletter form on the old site is down. Use this page
              and ask to be added.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
