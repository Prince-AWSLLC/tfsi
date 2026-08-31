import { Link } from "react-router-dom";
import PageMast from "../components/PageMast";
import { IMAGES } from "../data/site";

export default function About() {
  return (
    <>
      <PageMast
        kicker="About"
        title="What sets us apart"
        lead="For more than a decade the house in Granbury has hosted the pioneers of Israel — most of them from Judea and Samaria. An interested group gathers. God’s covenant people tell the story of living out biblical prophecy in the land."
      />

      <section className="section">
        <div className="wrap split">
          <div>
            <p>
              Those stories come with sacrifice, opposition, and immediate
              needs. That is the work: stand with the Jewish people, serve
              them, and take part in what is happening in the land.
            </p>
            <p>
              President Ann Stacy has hosted Orthodox Jewish guests since
              October 2011. Texans for a Safe Israel was formed as a 501(c)(3)
              in 2018–2019 so those friendships could fund security projects
              and Holocaust education — not just conversation.
            </p>
            <p>
              Mike Isley, founder of Texans for Israel, serves as vice
              president. The lodge flies Texas and Israeli flags over the
              same door for a reason.
            </p>
            <p>
              <Link className="btn btn-navy" to="/people">
                People we have hosted
              </Link>
            </p>
          </div>
          <div className="photo-frame">
            <img
              src={IMAGES.lodge}
              alt="TFSI lodge entrance with Texas and Israel flags"
            />
          </div>
        </div>
      </section>

      <section className="section section-rule">
        <div className="wrap">
          <h2>How we work in Texas</h2>
          <p className="lead">
            Education here is relationship. Most of the Christians who come
            through the house have never been to Israel and have never known
            a Jewish person. The guests change that.
          </p>
          <p>
            We believe Israel, the Jewish people, and the nations each have
            a part to play.
          </p>
          <p className="pull">
            To Jews and to Christians, why can’t we just be friends?
          </p>
        </div>
      </section>
    </>
  );
}
