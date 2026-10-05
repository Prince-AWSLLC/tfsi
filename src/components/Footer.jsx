import { Link } from "react-router-dom";
import { T } from "./Bind";
import { useSite } from "../data/siteData";

export default function Footer() {
  const { get } = useSite();
  const nav = get("nav") ?? [];
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src={get("org.logo")} alt="" width="68" height="50" />
          <T path="org.tagline" as="p" className="footer-tagline" />
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
          <Link to="/donate">Donate</Link>
        </nav>
        <address className="footer-contact">
          <T path="org.poBox" as="span" />
          <T path="org.city" as="span" />
          <a href={`mailto:${get("org.email")}`}>{get("org.email")}</a>
        </address>
      </div>
      <div className="wrap footer-legal">
        <span>
          © {year} {get("org.name")}. {get("org.status")}, EIN {get("org.ein")}.
        </span>
        <T path="org.legal" as="span" />
      </div>
    </footer>
  );
}
