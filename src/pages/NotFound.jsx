import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1>Page not found</h1>
        <p>
          That address is not on this site.{" "}
          <Link to="/">Go to the home page</Link>.
        </p>
      </div>
    </section>
  );
}
