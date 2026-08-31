import { Link, useParams } from "react-router-dom";
import PageMast from "../components/PageMast";
import { PEOPLE } from "../data/people";

export default function Person() {
  const { slug } = useParams();
  const person = PEOPLE.find((item) => item.slug === slug);

  if (!person) {
    return (
      <PageMast title="Not in this list">
        <p>
          <Link className="btn btn-ghost" to="/people">
            Back to people we have hosted
          </Link>
        </p>
      </PageMast>
    );
  }

  return (
    <>
      <PageMast kicker={person.affiliation} title={person.name}>
        <p className="tag">{person.tags.join(" · ")}</p>
      </PageMast>

      <section className="section">
        <div className="wrap">
          {(person.story || person.summary)
            .split("\n\n")
            .map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          {person.website ? (
            <p>
              <a href={person.website} target="_blank" rel="noreferrer">
                {person.website.replace(/^https?:\/\//, "")}
              </a>
            </p>
          ) : null}
          <p className="action-row">
            <Link to="/people">All guests</Link>
            {" · "}
            <Link to="/contact">Ask to be connected</Link>
          </p>
        </div>
      </section>
    </>
  );
}
