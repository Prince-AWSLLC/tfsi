import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PersonMark from "../components/PersonMark";
import Typed from "../components/Typed";
import { useSite } from "../data/siteData";
import NotFound from "./NotFound";

const URL_PATTERN = /(https?:\/\/[^\s]+[^\s.,;:!?)])/g;

function linkify(text) {
  return text.split(URL_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <a key={index} href={part} target="_blank" rel="noreferrer" className="text-link">
        {part.replace(/^https?:\/\/(www\.)?/, "")}
      </a>
    ) : (
      part
    )
  );
}

function BackButton() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const label = state?.from?.startsWith("/people") ? "Back to the directory" : "Back";

  if (state?.from) {
    return (
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        <span aria-hidden="true">←</span> {label}
      </button>
    );
  }
  return (
    <Link className="back-link" to="/people">
      <span aria-hidden="true">←</span> Back to the directory
    </Link>
  );
}

export default function Person() {
  const { slug } = useParams();
  const { get } = useSite();
  const people = get("about.people.list") ?? [];
  const person = people.find((item) => item.slug === slug);
  if (!person) return <NotFound />;

  const story = Array.isArray(person.story) ? person.story : [];

  return (
    <section className="section person-page">
      <div className="wrap">
        <BackButton />
        <article className="person">
          <div className="person-mark">
            <PersonMark person={person} size="lg" />
          </div>
          <div className="person-body">
            {person.affiliation ? <p className="kicker">{person.affiliation}</p> : null}
            <Typed text={person.name} className="person-name" />
            {person.tags.length > 0 ? <p className="person-tags">{person.tags.join(" · ")}</p> : null}
            {person.summary ? <p className="lead person-summary">{person.summary}</p> : null}
            {story.length > 0 ? (
              <div className="prose person-story">
                {story.map((paragraph, index) => (
                  <p key={index}>{linkify(paragraph)}</p>
                ))}
              </div>
            ) : null}
            {!person.summary && story.length === 0 ? (
              <p className="person-empty">A longer account for this guest has not been added yet.</p>
            ) : null}
            {person.website ? (
              <p className="person-website">
                <a href={person.website} target="_blank" rel="noreferrer" className="text-link">
                  {person.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </p>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}
