const HONORIFICS = new Set(["dr", "dr.", "rabbi", "pastor", "ambassador", "colonel", "mr", "mr.", "mrs", "mrs.", "ms", "ms."]);
const VARIANTS = 3;

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

function variantFor(slug) {
  let sum = 0;
  for (let i = 0; i < slug.length; i += 1) sum += slug.charCodeAt(i);
  return sum % VARIANTS;
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
    <span className={`${className} mark-${variantFor(person.slug)}`} aria-hidden="true">
      <span className="mark-initials">{initialsFor(person.name)}</span>
    </span>
  );
}
