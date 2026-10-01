import { useSite } from "../data/siteData";

export default function Faq({ path }) {
  const { get } = useSite();
  const items = get(path);
  if (!Array.isArray(items)) return null;

  return (
    <div className="faq" data-json={path}>
      {items.map((item, index) => (
        <details key={item.q} className="faq-item" open={index === 0}>
          <summary>
            <span>{item.q}</span>
            <span className="faq-mark" aria-hidden="true" />
          </summary>
          <div className="faq-body">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
