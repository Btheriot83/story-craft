import Link from "next/link";
import { getGenres } from "@/lib/content";
const steps = [
  ["01", "Learn", "Build the evidence before the sentence.", "/cross-cutting"],
  ["02", "Plan", "Find the relationship that changes everything.", "/#lenses"],
  [
    "03",
    "Write",
    "Turn verified moments into spoken narrative.",
    "/examples/love",
  ],
  ["04", "Grade", "Make every claim—and the ending—hold.", "/train"],
];
export default function HomePage() {
  return (
    <div className="desk-home">
      <section className="hero">
        <div>
          <p className="eyebrow">Love. Betrayal. Evidence. Consequence.</p>
          <h1>
            Make the truth
            <br />
            hold its <em>audience.</em>
          </h1>
          <p className="hero-copy">
            A training desk for exceptional short crime stories. Build a
            miniature murder movie through human choices, clear narration and
            facts that can withstand scrutiny.
          </p>
          <div className="hero-actions">
            <Link className="primary-link" href="/cross-cutting">
              Start the curriculum <span>↗</span>
            </Link>
            <Link className="quiet-link" href="/examples/love">
              Read a complete example →
            </Link>
          </div>
          <p className="hero-note">
            For writers & agents · Relationship-led factual crime · Five minutes
            or less
          </p>
        </div>
        <aside className="case-card">
          <p className="eyebrow">The central question</p>
          <div className="case-line" />
          <p className="case-question">
            What did they choose.
            <br />
            What can we prove.
            <br />
            <em>Who lived with it.</em>
          </p>
          <div className="case-bottom">
            <span>A working principle</span>
            <p>
              Suspense comes from the record.
              <br />
              Never from an invented fact.
            </p>
          </div>
        </aside>
      </section>
      <section className="learning-path" aria-label="Learning path">
        {steps.map(([n, title, copy, href]) => (
          <Link href={href} key={n}>
            <span className="step-number">{n}</span>
            <h2>
              {title}
              <span>↗</span>
            </h2>
            <p>{copy}</p>
          </Link>
        ))}
      </section>
      <section id="lenses" className="lenses-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose a lens, not a formula</p>
            <h2>Follow the human pressure.</h2>
          </div>
          <p>
            These lenses overlap. Let the evidence choose the shape; never force
            an affair, a motive or a solved mystery.
          </p>
        </div>
        <div className="lens-grid">
          {getGenres().map((g, i) => (
            <Link href={"/genres/" + g.slug} key={g.slug} className="lens-card">
              <span className="eyebrow">FIELD NOTES / 0{i + 1}</span>
              <h3>{g.display_name}</h3>
              <p>{g.short_definition}</p>
              <span className="lens-link">
                Study the lens <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="feature-story">
        <div>
          <p className="eyebrow">The annotated case · fictional exercise</p>
          <h2>The letter that outlived the verdict.</h2>
          <p>
            A marriage. A decision to leave. A poisoning allegation. A
            conviction overturned. Follow one complete draft from its practice
            evidence packet to its final unresolved question.
          </p>
          <Link className="quiet-link" href="/examples/love">
            Open the worked story →
          </Link>
        </div>
        <div className="feature-quote">
          <span>THE REPAIR</span>
          <del>“Justice finally prevailed.”</del>
          <p>
            What did the ruling actually change—and what could it never give
            back?
          </p>
          <small>Specific consequence beats an abstract moral.</small>
        </div>
      </section>
      <section className="standard-strip">
        <div>
          <p className="eyebrow">The editorial standard</p>
          <h2>Brief. Never thin.</h2>
        </div>
        <p>
          <strong>570–610 words</strong>
          <span>Calibration target, not padding.</span>
        </p>
        <p>
          <strong>Over 3:00 → about 4:30</strong>
          <span>Time the read. Hard ceiling: 5:00.</span>
        </p>
        <Link href="/checklists/universal">See the gates →</Link>
      </section>
    </div>
  );
}
