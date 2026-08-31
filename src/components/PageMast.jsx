export default function PageMast({
  kicker,
  title,
  lead,
  image,
  imageAlt,
  children,
}) {
  const copy = (
    <div className="wrap mast-copy">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </div>
  );

  if (image) {
    return (
      <section className="mast mast-photo">
        <img className="mast-img" src={image} alt={imageAlt} />
        <div className="mast-bar">{copy}</div>
      </section>
    );
  }

  return <section className="mast mast-plain">{copy}</section>;
}
