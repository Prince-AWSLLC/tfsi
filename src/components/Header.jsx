import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSite } from "../data/siteData";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const { get } = useSite();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  const nav = get("nav") ?? [];
  const logo = get("org.logo");
  const name = get("org.name");

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("drawer-open");
      return undefined;
    }

    document.body.classList.add("drawer-open");
    const drawer = drawerRef.current;
    const items = drawer ? Array.from(drawer.querySelectorAll(FOCUSABLE)) : [];
    items[0]?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.classList.remove("drawer-open");
    };
  }, [open, close]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="wrap header-inner">
        <NavLink to="/" className="brand" aria-label={name}>
          {logo ? <img src={logo} alt="" width="68" height="50" /> : null}
        </NavLink>

        <nav className="nav-desktop" aria-label="Primary">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/donate" className="btn btn-accent btn-sm">
            Donate
          </NavLink>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>
      </div>

      <div
        id="mobile-drawer"
        ref={drawerRef}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <nav className="drawer-nav" aria-label="Mobile">
          {nav.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              style={{ "--i": index }}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/donate"
            className="btn btn-accent drawer-cta"
            style={{ "--i": nav.length }}
            tabIndex={open ? 0 : -1}
          >
            Donate
          </NavLink>
        </nav>
        <div className="drawer-foot" style={{ "--i": nav.length + 1 }}>
          <a href={`mailto:${get("org.email")}`} tabIndex={open ? 0 : -1}>
            {get("org.email")}
          </a>
        </div>
      </div>
    </header>
  );
}
