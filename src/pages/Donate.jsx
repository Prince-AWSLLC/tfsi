import PageMast from "../components/PageMast";
import { CONTACT, DONATE_AMOUNTS } from "../data/site";

export default function Donate() {
  return (
    <>
      <PageMast
        kicker="Give"
        title="Donate"
        lead={`Gifts go through Texans for a Safe Israel, a U.S. 501(c)(3). They fund security, survivors, soldiers, hosting, and the Judea and Samaria Experience. EIN ${CONTACT.ein}.`}
      />

      <section className="section">
        <div className="wrap">
          <h2>Suggested amounts</h2>
          <p>
            These are the levels on the current site. Each one opens the
            existing PayPal donation page.
          </p>
          <div className="amounts">
            {DONATE_AMOUNTS.map((amount) => (
              <a
                key={amount}
                className="btn amount"
                href={`${CONTACT.paypal}&amount=${amount}`}
              >
                ${amount}
              </a>
            ))}
          </div>
          <p>
            <a className="btn" href={CONTACT.paypal}>
              Give another amount
            </a>
          </p>
        </div>
      </section>

      <section className="section section-rule">
        <div className="wrap">
          <h2>Monthly or one-time</h2>
          <p>
            Either one keeps the house able to answer the next call from
            Arugot, Itamar, Shiloh, or a survivor in Texas. If you want a
            gift designated to a specific need, say so in the PayPal note or
            write{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
