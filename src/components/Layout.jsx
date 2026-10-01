import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
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

function useRouteEffects(ready) {
  const { pathname, hash } = useLocation();

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

function useReveal(ready) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!ready) return undefined;

    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (nodes.length === 0) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
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

export default function Layout() {
  const { ready, error, retry } = useSite();
  const { pathname } = useLocation();

  useRouteEffects(ready);
  useReveal(ready);

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
      <main id="main" key={pathname} className="page page-enter">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
