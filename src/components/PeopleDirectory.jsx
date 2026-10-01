import { useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSite } from "../data/siteData";
import { Field } from "./Field";
import PersonMark from "./PersonMark";

export default function PeopleDirectory() {
  const { get } = useSite();
  const people = get("about.people.list") ?? [];
  const tags = get("about.people.tags") ?? ["All"];
  const [searchParams] = useSearchParams();
  const requested = people.find((person) => person.slug === searchParams.get("guest"));

  const [query, setQuery] = useState(requested?.name ?? "");
  const [tag, setTag] = useState("All");
  const [openSlug, setOpenSlug] = useState(requested?.slug ?? null);
  const deferredQuery = useDeferredValue(query);

  const rows = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return people.filter((person) => {
      const matchesTag = tag === "All" || person.tags.includes(tag);
      if (!matchesTag) return false;
      if (!needle) return true;
      const haystack = `${person.name} ${person.affiliation} ${person.summary}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [people, deferredQuery, tag]);

  return (
    <div className="directory" data-json="about.people.list">
      <div className="directory-tools">
        <Field
          id="people-search"
          label="Search by name or organization"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
        <div className="chips" role="group" aria-label="Filter guests">
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${item === tag ? " is-active" : ""}`}
              aria-pressed={item === tag}
              onClick={() => setTag(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="directory-count" aria-live="polite">
        {rows.length} {rows.length === 1 ? "person" : "people"}
        {tag !== "All" ? ` · ${tag}` : ""}
      </p>

      {rows.length === 0 ? (
        <p className="empty">No guests match that search. Clear the filter or try another name.</p>
      ) : (
        <ul className="directory-list">
          {rows.map((person, index) => {
            const hasStory = Array.isArray(person.story) && person.story.length > 0;
            const expanded = openSlug === person.slug;
            return (
              <li
                key={person.slug}
                className={`directory-row${expanded ? " is-open" : ""}`}
                style={{ "--i": Math.min(index, 10) }}
              >
                <div className="directory-main">
                  <div className="directory-name">
                    <PersonMark person={person} />
                    <div>
                      <h3>{person.name}</h3>
                      <span className="directory-affiliation">{person.affiliation}</span>
                    </div>
                  </div>
                  <p className="directory-summary">{person.summary}</p>
                  <div className="directory-meta">
                    <span className="directory-tags">{person.tags.join(" · ")}</span>
                    {hasStory ? (
                      <button
                        type="button"
                        className="text-btn"
                        aria-expanded={expanded}
                        aria-controls={`story-${person.slug}`}
                        onClick={() => setOpenSlug(expanded ? null : person.slug)}
                      >
                        {expanded ? "Hide the account" : "Read the account"}
                      </button>
                    ) : null}
                    {person.website ? (
                      <a href={person.website} target="_blank" rel="noreferrer" className="text-link">
                        {person.website.replace(/^https?:\/\//, "")}
                      </a>
                    ) : null}
                  </div>
                </div>
                {hasStory ? (
                  <div
                    id={`story-${person.slug}`}
                    className="directory-story"
                    hidden={!expanded}
                  >
                    {person.story.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
