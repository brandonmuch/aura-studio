import { useState } from "react";

const divisions = [
  {
    number: "01",
    name: "Transfers",
    descriptor: "Arrive well.",
    detail: "Private journeys, thoughtfully handled.",
    href: "#transfers",
    className: "division-card--transfers",
  },
  {
    number: "02",
    name: "Clothing",
    descriptor: "Wear your ease.",
    detail: "Considered pieces for everyday movement.",
    href: "#clothing",
    className: "division-card--clothing",
  },
  {
    number: "03",
    name: "Spa",
    descriptor: "Make room to reset.",
    detail: "A quieter kind of restoration.",
    href: "#spa",
    className: "division-card--spa",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="announcement">
        <span>Considered experiences. Thoughtfully delivered.</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Aura Studio home" onClick={closeMenu}>
          aura<span>.</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <a href="#transfers" onClick={closeMenu}>Transfers</a>
          <a href="#clothing" onClick={closeMenu}>Clothing</a>
          <a href="#spa" onClick={closeMenu}>Spa</a>
          <a className="nav-contact" href="mailto:hello@aurastudio.co.za" onClick={closeMenu}>Get in touch <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">The Aura experience</p>
          <h1 id="hero-title">A little more<br /><em>considered.</em></h1>
          <div className="hero-bottom">
            <p className="hero-intro">A collection of experiences shaped around how you move, what you wear and how you feel.</p>
            <a className="text-link" href="#the-world-of-aura">Discover Aura <span>↘</span></a>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract olive and warm neutral composition">
          <div className="hero-art__panel hero-art__panel--dark" />
          <div className="hero-art__panel hero-art__panel--light" />
          <div className="hero-art__circle" />
          <span className="hero-art__caption">AURA STUDIO · EST. 2026</span>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line" /><span>03</span></div>
      </section>

      <section className="intro-section" id="the-world-of-aura">
        <p className="eyebrow">The world of Aura</p>
        <div className="intro-grid">
          <h2>Life, with<br /><em>more intention.</em></h2>
          <div className="intro-copy">
            <p>Some things are better when they are thought through. The journey, the pieces you reach for, the pause you give yourself.</p>
            <p>Aura brings these moments together through three distinct experiences, connected by one simple belief: you deserve to feel looked after.</p>
          </div>
        </div>
      </section>

      <section className="divisions-section" aria-labelledby="divisions-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore Aura</p>
            <h2 id="divisions-title">Three ways to<br /><em>feel the difference.</em></h2>
          </div>
          <p className="section-note">Distinct in purpose.<br />Connected by care.</p>
        </div>

        <div className="division-grid">
          {divisions.map((division) => (
            <a className={`division-card ${division.className}`} href={division.href} key={division.number}>
              <div className="division-card__visual">
                <span className="division-card__number">{division.number}</span>
                <span className="division-card__mark" aria-hidden="true">{division.number === "01" ? "A" : division.number === "02" ? "É" : "O"}</span>
                <span className="division-card__explore">Explore <span>↗</span></span>
              </div>
              <div className="division-card__meta">
                <div>
                  <h3>{division.name}</h3>
                  <p>{division.detail}</p>
                </div>
                <span className="division-card__arrow">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="statement-section">
        <p className="eyebrow">The Aura standard</p>
        <p className="statement">It is not about doing more.<br />It is about <em>feeling more.</em></p>
        <span className="statement-ornament" aria-hidden="true">A</span>
      </section>

      <section className="service-links" aria-label="Aura Studio divisions">
        <a id="transfers" href="mailto:hello@aurastudio.co.za?subject=Aura%20Transfers">
          <span className="eyebrow">01 / Transfers</span>
          <span className="service-title">Arrive well.</span>
          <span className="service-action">Enquire about a journey ↗</span>
        </a>
        <a id="clothing" href="mailto:hello@aurastudio.co.za?subject=Aura%20Clothing">
          <span className="eyebrow">02 / Clothing</span>
          <span className="service-title">Wear your ease.</span>
          <span className="service-action">Discover the collection ↗</span>
        </a>
        <a id="spa" href="mailto:hello@aurastudio.co.za?subject=Aura%20Spa">
          <span className="eyebrow">03 / Spa</span>
          <span className="service-title">Make room to reset.</span>
          <span className="service-action">Explore spa experiences ↗</span>
        </a>
      </section>

      <footer className="site-footer">
        <a className="wordmark wordmark--footer" href="#">aura<span>.</span></a>
        <p>Thoughtfully considered. Always.</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Aura Studio</span>
          <a href="mailto:hello@aurastudio.co.za">Contact ↗</a>
          <span>South Africa</span>
        </div>
      </footer>
    </main>
  );
}

export default App;
