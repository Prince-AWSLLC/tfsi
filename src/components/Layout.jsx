import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BootScreen from "./BootScreen";

const TITLES = {
  "/": "Texans for a Safe Israel",
  "/about": "About | TFSI",
  "/work": "Our Work | TFSI",
  "/people": "People We've Hosted | TFSI",
  "/judea-samaria": "Judea & Samaria Experience | TFSI",
  "/events": "Events | TFSI",
  "/donate": "Donate | TFSI",
  "/contact": "Contact | TFSI",
};

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (TITLES[pathname]) {
      document.title = TITLES[pathname];
    } else if (pathname.startsWith("/people/")) {
      document.title = "Guest | TFSI";
    } else {
      document.title = "Texans for a Safe Israel";
    }
  }, [pathname]);
  return null;
}

function RouteBar() {
  const { pathname } = useLocation();
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(true);
    const timer = window.setTimeout(() => setOn(false), 420);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return <div className={on ? "route-bar is-on" : "route-bar"} />;
}

function RevealOnScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal, .reveal-stagger"));
    if (nodes.length === 0) {
      return undefined;
    }

    const show = () => {
      nodes.forEach((el) => el.classList.add("is-in"));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      show();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const [booted, setBooted] = useState(false);
  const finishBoot = useCallback(() => setBooted(true), []);

  return (
    <>
      <BootScreen onDone={finishBoot} />
      <RouteEffects />
      {booted ? <RouteBar /> : null}
      {booted ? <RevealOnScroll /> : null}
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        key={pathname}
        className={booted ? "page-enter" : "page-pending"}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
