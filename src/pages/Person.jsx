import { Link, useParams } from "react-router-dom";
import { PEOPLE } from "../data/people";

export default function Person() {
  const { slug } = useParams();
  const person = PEOPLE.find((item) => item.slug === slug);

  if (!person) {
    return (
      <section className="page-hero">
        <div className="wrap">
          <h1>Not in this list</h1>
          <p>
            <Link to="/people">Back to people we have hosted</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="kicker">{person.affiliation}</p>
        <h1>{person.name}</h1>
        <p className="tag">{person.tags.join(" · ")}</p>
        <div className="section">
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
          <p>
            <Link to="/people">All guests</Link>
            {" · "}
            <Link to="/contact">Ask to be connected</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
