import { Link } from "react-router-dom";
import { useSite } from "../data/siteData";

export function T({ path, as: Tag = "span", className, children, ...rest }) {
  const { get } = useSite();
  const value = get(path);
  if (value === undefined && children === undefined) return null;
  return (
    <Tag data-json={path} className={className} {...rest}>
      {value ?? children}
    </Tag>
  );
}

export function Paragraphs({ path, className }) {
  const { get } = useSite();
  const list = get(path);
  if (!Array.isArray(list)) return null;
  return list.map((text, index) => (
    <p key={index} data-json={`${path}.${index}`} className={className}>
      {text}
    </p>
  ));
}

export function Img({ path, altPath, className, ...rest }) {
  const { get } = useSite();
  const src = get(path);
  const alt = altPath ? get(altPath) : "";
  if (!src) return null;
  return <img data-json={path} src={src} alt={alt ?? ""} className={className} {...rest} />;
}

export function CtaLink({ path, className = "btn" }) {
  const { get } = useSite();
  const cta = get(path);
  if (!cta) return null;
  if (cta.href) {
    return (
      <a data-json={path} className={className} href={cta.href} target="_blank" rel="noreferrer">
        {cta.label}
      </a>
    );
  }
  return (
    <Link data-json={path} className={className} to={cta.to}>
      {cta.label}
    </Link>
  );
}
