import { T } from "./Bind";

export default function SectionHead({ path, lead = true, light = false, align = "left" }) {
  return (
    <header className={`section-head align-${align}${light ? " on-dark" : ""}`} data-reveal>
      <T path={`${path}.kicker`} as="p" className="kicker" />
      <T path={`${path}.title`} as="h2" />
      {lead ? <T path={`${path}.lead`} as="p" className="lead" /> : null}
    </header>
  );
}
