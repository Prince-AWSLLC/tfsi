import { CtaLink, T } from "../components/Bind";

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="wrap narrow">
        <T path="notFound.headline" as="h1" />
        <T path="notFound.body" as="p" className="lead" />
        <CtaLink path="notFound.cta" className="btn btn-primary" />
      </div>
    </section>
  );
}
