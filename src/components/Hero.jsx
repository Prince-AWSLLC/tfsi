import { Img, T } from "./Bind";

export default function Hero({ path, children, compact = false }) {
  return (
    <section className={compact ? "hero hero-compact" : "hero"}>
      <div className="hero-copy">
        <div className="hero-copy-inner">
          <T path={`${path}.kicker`} as="p" className="kicker" />
          <T path={`${path}.headline`} as="h1" className="hero-title" />
          <T path={`${path}.lead`} as="p" className="lead" />
          {children ? <div className="hero-actions">{children}</div> : null}
        </div>
      </div>
      <div className="hero-media">
        <Img
          path={`${path}.image`}
          altPath={`${path}.imageAlt`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}
