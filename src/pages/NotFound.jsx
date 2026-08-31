import { Link } from "react-router-dom";
import PageMast from "../components/PageMast";

export default function NotFound() {
  return (
    <PageMast title="Page not found" lead="That address is not on this site.">
      <p>
        <Link className="btn btn-ghost" to="/">
          Go to the home page
        </Link>
      </p>
    </PageMast>
  );
}
