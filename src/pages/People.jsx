import { T } from "../components/Bind";
import PeopleDirectory from "../components/PeopleDirectory";
import Typed from "../components/Typed";

export default function People() {
  return (
    <section className="section people-page">
      <div className="wrap">
        <header className="section-head">
          <T path="about.people.kicker" as="p" className="kicker" />
          <Typed path="about.people.title" />
          <T path="about.people.lead" as="p" className="lead" />
        </header>
        <PeopleDirectory />
      </div>
    </section>
  );
}
