const HONORIFICS = new Set(["dr", "dr.", "rabbi", "pastor", "ambassador", "colonel", "chaplain", "knesset", "member", "the", "mr", "mr.", "mrs", "mrs.", "ms", "ms."]);
export function initialsFor(name) {
  const words = name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((word) => word && word.toLowerCase() !== "and" && !HONORIFICS.has(word.toLowerCase()));
  if (words.length === 0) return "";
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function PersonMark({ person, size = "sm" }) {
  const className = `mark mark-${size}`;
  if (person.photo) {
    return (
      <span className={`${className} mark-photo`}>
        <img
          src={person.photo}
          alt={person.photoAlt ?? ""}
          loading="lazy"
          decoding="async"
          style={person.photoPosition ? { objectPosition: person.photoPosition } : undefined}
        />
      </span>
    );
  }
  return (
    <span className={`${className} mark-tone`} aria-hidden="true">
      <span className="mark-initials">{initialsFor(person.name)}</span>
    </span>
  );
}
