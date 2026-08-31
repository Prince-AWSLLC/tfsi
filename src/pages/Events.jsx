import { Link } from "react-router-dom";
import PageMast from "../components/PageMast";
import { CONTACT } from "../data/site";

export default function Events() {
  return (
    <>
      <PageMast
        kicker="Gatherings"
        title="Events"
        lead="Live evenings in Texas, Facebook Live, Zoom, and trips to Israel. The current public listing from the existing site is below. For what is next, write the house."
      />

      <section className="section">
        <div className="wrap reveal-stagger">
          <article className="event">
            <div className="event-date">February 15 · listed event</div>
            <h2>Yair Levi concert</h2>
            <p>
              The concert posted on the current TFSI events page. Tickets were
              processed through the same PayPal button used for gifts.
            </p>
            <p>
              <a className="btn btn-navy" href={CONTACT.paypal}>
                Open the PayPal page
              </a>
            </p>
          </article>

          <article className="event">
            <div className="event-date">Ongoing</div>
            <h2>Israeli guests in Texas</h2>
            <p>
              When a speaker is coming through Granbury or Dallas–Fort Worth,
              TFSI gathers a room. If you want those invitations, send your
              name and email.
            </p>
            <p>
              <Link className="btn" to="/contact">
                Ask to be notified
              </Link>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
