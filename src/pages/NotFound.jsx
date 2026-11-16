import { CtaLink, T } from "../components/Bind";
import Typed from "../components/Typed";

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="wrap narrow">
        <Typed path="notFound.headline" />
        <T path="notFound.body" as="p" className="lead" />
        <CtaLink path="notFound.cta" className="btn btn-primary" />
      </div>
    </section>
  );
}
