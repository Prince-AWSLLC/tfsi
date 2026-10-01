import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSite } from "../data/siteData";
import Header from "./Header";
import Footer from "./Footer";
import { LoadError, PageSkeleton } from "./Skeleton";

const TITLES = {
  "/": "Texans for a Safe Israel",
  "/about": "About | Texans for a Safe Israel",
  "/donate": "Donate | Texans for a Safe Israel",
  "/media": "Media | Texans for a Safe Israel",
  "/contact": "Contact | Texans for a Safe Israel",
};

const VEIL_COVER_MS = 380;
const VEIL_TOTAL_MS = 900;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useRouteTransition(ready) {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [veil, setVeil] = useState(0);
  const shownRef = useRef(location);
  const pending = useRef(location);
  const busy = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    const show = (next) => {
      shownRef.current = next;
      setShown(next);
    };

    const run = () => {
      busy.current = true;
      setVeil((n) => n + 1);
      timers.current = [
        window.setTimeout(() => show(pending.current), VEIL_COVER_MS),
        window.setTimeout(() => {
          busy.current = false;
          if (pending.current.pathname !== shownRef.current.pathname) run();
          else if (pending.current !== shownRef.current) show(pending.current);
        }, VEIL_TOTAL_MS),
      ];
    };

    pending.current = location;
    if (!ready || prefersReducedMotion() || location.pathname === shownRef.current.pathname) {
      show(location);
      return;
    }
    if (!busy.current) run();
  }, [location, ready]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  return { shown, veil };
}

function useRouteEffects(shown, ready) {
  const { pathname, hash } = shown;

  useEffect(() => {
    document.title = TITLES[pathname] ?? "Texans for a Safe Israel";
  }, [pathname]);

  useLayoutEffect(() => {
    if (!ready) return;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, ready]);
}

function useReveal(shown, ready) {
  const { pathname } = shown;

  useEffect(() => {
    if (!ready) return undefined;

    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (nodes.length === 0) return undefined;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname, ready]);
}

export default function Layout({ children }) {
  const { ready, error, retry, get } = useSite();
  const { shown, veil } = useRouteTransition(ready);

  useRouteEffects(shown, ready);
  useReveal(shown, ready);

  useEffect(() => {
    if (!ready) return;
    const boot = document.getElementById("boot");
    if (!boot) return;
    boot.classList.add("is-done");
    const timer = window.setTimeout(() => boot.remove(), 500);
    return () => window.clearTimeout(timer);
  }, [ready]);

  if (error && !ready) {
    return (
      <main id="main" className="page">
        <LoadError error={error} onRetry={retry} />
      </main>
    );
  }

  if (!ready) {
    return (
      <main id="main" className="page">
        <PageSkeleton />
      </main>
    );
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" key={shown.pathname} className="page page-enter">
        {children(shown)}
      </main>
      <Footer />
      {veil > 0 ? (
        <div key={veil} className="route-veil" aria-hidden="true">
          <img src={get("org.logo")} alt="" width="68" height="50" />
          <span className="route-veil-rule" />
        </div>
      ) : null}
    </>
  );
}
