import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PEOPLE, TAGS } from "../data/people";

export default function People() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PEOPLE.filter((person) => {
      const matchesTag = tag === "All" || person.tags.includes(tag);
      const haystack = `${person.name} ${person.affiliation} ${person.summary}`.toLowerCase();
      const matchesQuery = !needle || haystack.includes(needle);
      return matchesTag && matchesQuery;
    });
  }, [query, tag]);

  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="kicker">Guests</p>
        <h1>People we have hosted</h1>
        <p className="lead">
          Israeli pioneers, Texas friends, and the people who introduced them.
          Search the list or open a name for the longer account.
        </p>

        <div className="toolbar">
          <input
            className="search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or organization"
            aria-label="Search guests"
          />
        </div>
        <div className="chips">
          {TAGS.map((item) => (
            <button
              key={item}
              type="button"
              className={item === tag ? "chip active" : "chip"}
              onClick={() => setTag(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="muted result-count">
          {rows.length} {rows.length === 1 ? "person" : "people"}
        </p>

        <table className="people-table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="hide-sm">Affiliation</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((person) => (
              <tr key={person.slug}>
                <td>
                  <Link to={`/people/${person.slug}`}>{person.name}</Link>
                  <div className="tag">{person.tags.join(" · ")}</div>
                </td>
                <td className="hide-sm">{person.affiliation}</td>
                <td>{person.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
