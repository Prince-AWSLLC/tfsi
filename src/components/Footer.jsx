import { Link } from "react-router-dom";
import { CONTACT } from "../data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h2>Texans for a Safe Israel</h2>
          <p>
            A 501(c)(3) that stands with the Jewish people in their homeland —
            especially Jerusalem, Judea, and Samaria — and builds friendships
            in Texas.
          </p>
        </div>
        <div>
          <h2>Visit</h2>
          <p>
            <Link to="/judea-samaria">Judea &amp; Samaria Experience</Link>
            <br />
            <Link to="/people">People we have hosted</Link>
            <br />
            <Link to="/work">Our work</Link>
            <br />
            <Link to="/donate">Donate</Link>
          </p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>
            {CONTACT.poBox}
            <br />
            {CONTACT.city}
            <br />
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>
      </div>
      <div className="wrap legal">
        EIN {CONTACT.ein}. Contributions are tax-deductible in the United
        States to the extent allowed by law.
      </div>
    </footer>
  );
}
