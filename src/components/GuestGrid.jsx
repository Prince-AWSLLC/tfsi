import { Link, useLocation } from "react-router-dom";
import PersonMark from "./PersonMark";

export default function GuestGrid({ people, reveal = true }) {
  const { pathname, search } = useLocation();

  return (
    <ul className="guest-grid" data-json="about.people.list">
      {people.map((person, index) => (
        <li key={person.slug} data-reveal={reveal ? "" : undefined} style={{ "--i": index % 5 }}>
          <Link className="guest" to={`/people/${person.slug}`} state={{ from: `${pathname}${search}` }}>
            <PersonMark person={person} size="lg" />
            <span className="guest-name">{person.name}</span>
            {person.affiliation ? <span className="guest-affiliation">{person.affiliation}</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function previewPeople(people, count = 10) {
  return people.slice(0, count);
}
