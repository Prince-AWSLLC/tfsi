import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IMAGES } from "../data/site";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Our Work" },
  { to: "/people", label: "People" },
  { to: "/judea-samaria", label: "Judea & Samaria" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <img src={IMAGES.logo} alt="Texans for a Safe Israel" />
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className={open ? "nav open" : "nav"}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/donate"
            className="btn"
            onClick={() => setOpen(false)}
          >
            Donate
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
