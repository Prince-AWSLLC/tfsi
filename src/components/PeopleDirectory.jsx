import { useDeferredValue, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSite } from "../data/siteData";
import { Field } from "./Field";
import GuestGrid from "./GuestGrid";

export default function PeopleDirectory() {
  const { get } = useSite();
  const people = get("about.people.list") ?? [];
  const tags = get("about.people.tags") ?? ["All"];
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const tag = tags.includes(searchParams.get("tag")) ? searchParams.get("tag") : "All";
  const deferredQuery = useDeferredValue(query);

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  };

  const rows = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return people.filter((person) => {
      if (tag !== "All" && !person.tags.includes(tag)) return false;
      if (!needle) return true;
      const haystack = `${person.name} ${person.affiliation ?? ""} ${person.summary ?? ""}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [people, deferredQuery, tag]);

  return (
    <div className="directory">
      <div className="directory-tools">
        <Field
          id="people-search"
          label="Search by name or organization"
          type="search"
          value={query}
          onChange={(event) => update("q", event.target.value, "")}
          autoComplete="off"
        />
        <div className="chips" role="group" aria-label="Filter guests">
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${item === tag ? " is-active" : ""}`}
              aria-pressed={item === tag}
              onClick={() => update("tag", item, "All")}
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
        <GuestGrid people={rows} reveal={false} />
      )}
    </div>
  );
}
