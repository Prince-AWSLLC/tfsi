import { Fragment } from "react";
import { Img, T } from "./Bind";
import { useSite } from "../data/siteData";

function Headline({ path }) {
  const { get } = useSite();
  const text = get(path);
  if (typeof text !== "string") return null;
  const words = text.split(" ");
  return (
    <h1 className="hero-title" data-json={path}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="hero-word" style={{ "--i": index }}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}

export default function Hero({ path, children, compact = false }) {
  return (
    <section className={compact ? "hero hero-compact" : "hero"}>
      <div className="hero-copy">
        <div className="hero-copy-inner">
          <T path={`${path}.kicker`} as="p" className="kicker" />
          <Headline path={`${path}.headline`} />
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
