import { useSite } from "../data/siteData";

export default function Typed({ path, text, as: Tag = "h1", className }) {
  const { get } = useSite();
  const value = path ? get(path) : text;
  if (typeof value !== "string") return null;

  let count = 0;
  const words = value.split(" ").map((word) => {
    const chars = Array.from(word).map((char) => {
      count += 1;
      return { char, i: count };
    });
    count += 1;
    return chars;
  });

  return (
    <Tag className={className ? `typed ${className}` : "typed"} data-json={path} aria-label={value}>
      {words.map((chars, w) => (
        <span key={w} aria-hidden="true">
          <span className="typed-word">
            {chars.map(({ char, i }) => (
              <span key={i} className="typed-char" style={{ "--c": i }}>
                {char}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
