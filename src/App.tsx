import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import BlurText from "./components/BlurText";

type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  note: string;
};

const ASSETS = {
  // Temporary Modimal template-preview images. Replace these paths with Aura's approved Stitch exports.
  hero: "https://e-commerce-clothing-women.vercel.app/Frame-header-collection.png",
  lifestyle: "https://e-commerce-clothing-women.vercel.app/Lifestyle.webp",
  sustainability: "https://e-commerce-clothing-women.vercel.app/Sustainability.png",
  mobileHero: "https://e-commerce-clothing-women.vercel.app/Hero-mobile.png",
  dress: "https://e-commerce-clothing-women.vercel.app/ElbaDressOff-WhiteFreeTheLabel4.webp",
  miniDress: "https://e-commerce-clothing-women.vercel.app/MINI-DRESS-BEACH-0098-Edit_1400x.webp",
  shirt: "https://e-commerce-clothing-women.vercel.app/Something-Borrowed-Shirt-Black-Half_1400x.webp",
  studio: "https://e-commerce-clothing-women.vercel.app/Somethingx.webp",
};

const products: Product[] = [
  {
    slug: "look-01",
    name: "Look 01",
    category: "Clothing",
    image: ASSETS.dress,
    description: "A preview of the visual direction for the Aura clothing collection.",
    note: "Template image · awaiting Aura product photography",
  },
  {
    slug: "look-02",
    name: "Look 02",
    category: "Clothing",
    image: ASSETS.miniDress,
    description: "A second editorial preview for the upcoming collection.",
    note: "Template image · awaiting Aura product photography",
  },
  {
    slug: "look-03",
    name: "Look 03",
    category: "Clothing",
    image: ASSETS.shirt,
    description: "A third preview image to establish the collection layout.",
    note: "Template image · awaiting Aura product photography",
  },
  {
    slug: "look-04",
    name: "Look 04",
    category: "Clothing",
    image: ASSETS.studio,
    description: "A fourth preview image for the clothing catalogue.",
    note: "Template image · awaiting Aura product photography",
  },
];

const policyContent: Record<string, { title: string; eyebrow: string; intro: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: "Privacy policy",
    eyebrow: "Your information",
    intro: "This draft explains the privacy principles Aura Studio intends to follow. It must be completed with the operating entity, actual systems, retention periods and contact details before the site accepts personal information.",
    sections: [
      { heading: "Who is responsible", body: "The responsible business is [insert registered legal name], trading as Aura Studio, registered in [country] under number [registration number]. Its registered or principal business address is [insert address]. Privacy enquiries should be directed to [insert privacy contact]." },
      { heading: "Information we may collect", body: "Depending on the service you use, this may include contact details, delivery information, order records, booking details, correspondence, and basic technical information such as device and log data. Do not submit medical or other sensitive information through a general enquiry form. Any treatment-related health information would require a separate, clearly explained collection process and stronger safeguards." },
      { heading: "Why we use it", body: "Information should be used only for stated purposes such as responding to enquiries, fulfilling orders, arranging transfers or spa appointments, handling payments through the chosen payment provider, customer support, security and legal record-keeping. Marketing communications require a separate, optional choice." },
      { heading: "Lawful basis and choice", body: "The applicable legal basis depends on the customer, location and activity. Where consent is relied upon, it must be specific, informed and withdrawable. Where processing is needed to provide a requested service or meet a legal obligation, the notice should explain that purpose and the relevant information." },
      { heading: "Service providers and international transfers", body: "Aura may use hosting, payment, delivery, booking, analytics or communication providers. Before launch, list the actual providers, their roles, locations and the safeguards used for international data transfers. Do not publish this draft as complete until that vendor map has been verified." },
      { heading: "Retention and your rights", body: "Personal information should be retained only for as long as necessary for the stated purpose or a lawful retention requirement, then securely deleted or anonymised. Depending on the law that applies, individuals may have rights to access, correct, delete, object to or restrict certain processing, withdraw consent, and complain to a regulator." },
      { heading: "Security and incidents", body: "Aura should use access controls, encryption in transit, secure configuration, limited staff access, backups and a documented incident response process. If a personal information incident occurs, notification and cooperation duties will be assessed under the law that applies." },
    ],
  },
  terms: {
    title: "Terms and conditions",
    eyebrow: "Using Aura Studio",
    intro: "These terms are a launch draft. They must be checked against the final business structure, catalogue, booking model and jurisdictions before being made binding.",
    sections: [
      { heading: "The business", body: "The supplier is [insert registered legal name], trading as Aura Studio, with registration number [number], physical address [address], telephone [telephone] and email [email]. Complete these details before taking orders." },
      { heading: "Product and service information", body: "Descriptions, sizes, availability, service locations and exclusions must be accurate and kept up to date. Any product images used for the final catalogue must represent the product being offered. Temporary template images must be replaced before real products are sold." },
      { heading: "Prices and payment", body: "The full price, applicable taxes, delivery or travel charges and any other fees must be shown before the customer commits. The order summary must allow the customer to review, correct or withdraw before submitting the order. Card payment is intended to be processed on the hosted page of the selected payment provider; Aura should not request card numbers or security codes directly." },
      { heading: "Orders and availability", body: "An order request is not accepted until Aura confirms acceptance and availability. The confirmation process, delivery estimate and any booking-specific conditions must be clearly communicated to the customer." },
      { heading: "Consumer rights and disputes", body: "Nothing in these terms is intended to exclude or limit a consumer right that cannot lawfully be excluded. Mandatory consumer protections in the customer's applicable jurisdiction take priority over inconsistent wording in these terms." },
    ],
  },
  returns: {
    title: "Returns and refunds",
    eyebrow: "Clothing orders",
    intro: "Aura's final returns rules depend on the product range, fulfilment location and law applicable to the transaction. This page is deliberately written as a framework rather than inventing a universal return period.",
    sections: [
      { heading: "Before launch", body: "Publish the final return address, request method, time limits, condition requirements, return-shipping responsibility, refund method and expected processing time. Make sure those rules preserve all non-waivable statutory rights." },
      { heading: "Faulty, damaged or incorrect items", body: "Customers must have a clear way to report an item that is faulty, damaged, not as described or incorrectly supplied. The remedy and any inspection process must follow the applicable consumer law." },
      { heading: "Change-of-mind returns", body: "Change-of-mind rights differ by country and by product type. Exceptions may apply to personalised, perishable, hygiene-sensitive or other specified goods. Do not apply a blanket 'no returns' rule without a jurisdiction-specific legal review." },
      { heading: "Refunds", body: "Where a refund is due, explain how it will be issued, whether original delivery charges are included, and what happens if the original payment method is unavailable. Any statutory refund deadline overrides a longer estimate shown here." },
    ],
  },
  shipping: {
    title: "Shipping and delivery",
    eyebrow: "Getting your order",
    intro: "Delivery destinations, courier partners, costs and dispatch timelines have not yet been confirmed. This page identifies what Aura must disclose at checkout.",
    sections: [
      { heading: "Delivery destinations", body: "List each country or region where orders can be delivered, and block checkout for unsupported destinations rather than accepting an order that cannot be fulfilled." },
      { heading: "Costs and taxes", body: "Display the full delivery cost, applicable taxes, duties and any other known charges before the customer submits an order. Explain separately where an import charge may be collected by a carrier or local authority." },
      { heading: "Dispatch and tracking", body: "State the dispatch timeframe, estimated delivery window, tracking method and process for delayed, lost or damaged parcels. Do not present carrier estimates as guaranteed delivery dates." },
      { heading: "Collection or failed delivery", body: "Where collection, re-delivery or return-to-sender charges may apply, disclose the conditions and costs before the order is placed." },
    ],
  },
  bookings: {
    title: "Booking and cancellation policy",
    eyebrow: "Transfers and spa",
    intro: "Transfers and spa services are appointment-based. The final cancellation, rescheduling, deposit and no-show rules must be set for each service and checked against mandatory local consumer protections.",
    sections: [
      { heading: "Booking requests", body: "A request is not a confirmed booking until Aura sends a confirmation with the service, date, time, location, price and any special conditions." },
      { heading: "Changes and cancellations", body: "The confirmation should explain how to change or cancel, the notice period, any refundable deposit or cancellation charge, and the process for delays or service disruption. Do not apply a single rule to every booking until each service has been reviewed." },
      { heading: "Transfers", body: "Before confirmation, capture the agreed pick-up and destination details, date and time, passenger count, luggage needs, quoted fare, waiting-time rules and any agreed extras. Confirm any location or passenger limits in writing." },
      { heading: "Spa appointments", body: "Before confirmation, disclose the treatment, duration, price, appointment location and cancellation terms. If a treatment requires health or suitability information, collect only what is necessary through a secure, purpose-specific process." },
    ],
  },
  cookies: {
    title: "Cookie and preference policy",
    eyebrow: "Your choices",
    intro: "Aura should use strictly necessary storage for core site functions and keep optional analytics or marketing technologies off until the visitor has made an informed choice where consent is required.",
    sections: [
      { heading: "Necessary storage", body: "Necessary storage supports functions requested by the visitor, such as keeping a shopping bag, remembering a privacy preference or maintaining security. These tools should not be repurposed for advertising." },
      { heading: "Analytics", body: "Analytics should remain disabled until enabled through the preference panel where consent is required. Before launch, identify the vendor, exact technologies, data collected, retention and any international data transfers." },
      { heading: "Marketing", body: "Marketing tags, pixels and personalised advertising should remain disabled unless the visitor has made the required choice. A marketing newsletter sign-up must be separate from an order or booking request." },
      { heading: "Change your choice", body: "You can reopen the cookie settings from the footer. The final implementation must honour your choice across the relevant pages and must not load optional tools before consent." },
    ],
  },
  accessibility: {
    title: "Accessibility statement",
    eyebrow: "Access for everyone",
    intro: "Aura's development target is WCAG 2.2 Level AA. This is a design and testing target, not a claim of certified or independently audited conformance.",
    sections: [
      { heading: "What we are working towards", body: "The site is being designed for keyboard use, visible focus, meaningful heading structure, labelled form controls, text alternatives for meaningful images, sufficient contrast, reduced-motion preferences and responsive reflow." },
      { heading: "Ongoing review", body: "Automated checks alone are not sufficient. Before launch, test key journeys with keyboard-only navigation, screen readers, zoom, mobile layouts and manual contrast checks. Document and prioritise any barriers found." },
      { heading: "Tell us about a barrier", body: "Add a verified accessibility contact channel before launch. A visitor should be able to report an issue and request information in an alternative format." },
    ],
  },
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [pathname]);
  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname]);

  const results = [
    { label: "Transfers", to: "/transfers" },
    { label: "Clothing collection", to: "/clothing" },
    { label: "Spa experiences", to: "/spa" },
    { label: "About Aura", to: "/about" },
    { label: "FAQs", to: "/faq" },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="announcement-bar">A considered experience, from the first detail to the last.</div>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Aura Studio home">
          <span className="brand-main">AURA</span><span className="brand-sub">STUDIO</span>
        </Link>
        <button className="mobile-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
          <NavLink to="/transfers">Transfers</NavLink>
          <NavLink to="/clothing">Clothing</NavLink>
          <NavLink to="/spa">Spa</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <div className="nav-actions">
            <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}>⌕</button>
            <NavLink className="bag-link" to="/cart" aria-label="Shopping bag">Bag <span>↗</span></NavLink>
          </div>
        </nav>
      </header>
      {searchOpen && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
          <section className="search-panel" role="dialog" aria-modal="true" aria-label="Search Aura Studio">
            <div className="search-panel-head"><span className="eyebrow">Search Aura</span><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search">×</button></div>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" aria-label="Search query" />
            <div className="search-results">
              {results.map((result) => <Link key={result.to} to={result.to}>{result.label}<span>↗</span></Link>)}
              {results.length === 0 && <p>No matching sections. Try transfers, clothing or spa.</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function Footer({ onCookieSettings }: { onCookieSettings: () => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/"><span className="brand-main">AURA</span><span className="brand-sub">STUDIO</span></Link>
          <p>Luxury, without announcement.</p>
        </div>
        <div className="footer-column"><span className="footer-label">Explore</span><Link to="/transfers">Transfers</Link><Link to="/clothing">Clothing</Link><Link to="/spa">Spa</Link><Link to="/about">Our story</Link><Link to="/journal">Journal</Link></div>
        <div className="footer-column"><span className="footer-label">Support</span><Link to="/faq">FAQs</Link><Link to="/contact">Contact</Link><Link to="/policies/shipping">Shipping</Link><Link to="/policies/returns">Returns</Link><Link to="/policies/bookings">Bookings</Link></div>
        <div className="footer-column footer-promise"><span className="footer-label">Our standard</span><p>Care in every interaction. Clarity in every commitment. Respect for your time, privacy and trust.</p><Link to="/trust">Trust & standards <span>↗</span></Link></div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Aura Studio. All rights reserved.</span>
        <div className="footer-legal"><Link to="/policies/terms">Terms</Link><Link to="/policies/privacy">Privacy</Link><Link to="/policies/cookies">Cookies</Link><Link to="/policies/accessibility">Accessibility</Link><button onClick={onCookieSettings}>Cookie settings</button></div>
        <span>South Africa</span>
      </div>
    </footer>
  );
}

function CookieConsent({ onManage }: { onManage: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("aura-cookie-choice");
    if (!stored) setVisible(true);
  }, []);

  const save = (choice: { necessary: true; analytics: boolean; marketing: boolean }) => {
    window.localStorage.setItem("aura-cookie-choice", JSON.stringify({ ...choice, savedAt: new Date().toISOString() }));
    setVisible(false);
  };

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("aura:cookie-settings", handler);
    return () => window.removeEventListener("aura:cookie-settings", handler);
  }, []);

  if (!visible) return null;
  return (
    <aside className="cookie-banner" aria-label="Cookie preferences">
      <div><span className="eyebrow">Your privacy matters</span><p>We use necessary storage to make the site work. Optional analytics and marketing should stay off unless you choose to enable them.</p><Link to="/policies/cookies">Read the cookie policy</Link></div>
      <div className="cookie-actions">
        <button className="button button-outline button-small" onClick={onManage}>Manage</button>
        <button className="button button-outline button-small" onClick={() => save({ necessary: true, analytics: false, marketing: false })}>Necessary only</button>
        <button className="button button-dark button-small" onClick={() => save({ necessary: true, analytics: true, marketing: true })}>Accept all</button>
      </div>
    </aside>
  );
}

function CookiePreferences({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!open) return;
    const saved = window.localStorage.getItem("aura-cookie-choice");
    if (saved) {
      try {
        const choice = JSON.parse(saved);
        setAnalytics(Boolean(choice.analytics));
        setMarketing(Boolean(choice.marketing));
      } catch { setAnalytics(false); setMarketing(false); }
    }
  }, [open]);

  if (!open) return null;
  const save = () => {
    window.localStorage.setItem("aura-cookie-choice", JSON.stringify({ necessary: true, analytics, marketing, savedAt: new Date().toISOString() }));
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="preference-modal" role="dialog" aria-modal="true" aria-labelledby="preference-title">
        <button className="modal-close" onClick={onClose} aria-label="Close preferences">×</button>
        <span className="eyebrow">Privacy controls</span>
        <h2 id="preference-title">Your preferences.</h2>
        <p>Necessary storage is always active because it supports core site functions. Optional categories remain off unless you choose otherwise.</p>
        <PreferenceRow title="Necessary" description="Security, site functionality and saving this preference." checked disabled />
        <PreferenceRow title="Analytics" description="Helps us understand how the site is used." checked={analytics} onChange={setAnalytics} />
        <PreferenceRow title="Marketing" description="Supports advertising and campaign measurement." checked={marketing} onChange={setMarketing} />
        <div className="modal-actions"><button className="button button-outline" onClick={() => { setAnalytics(false); setMarketing(false); window.localStorage.setItem("aura-cookie-choice", JSON.stringify({ necessary: true, analytics: false, marketing: false, savedAt: new Date().toISOString() })); onClose(); }}>Necessary only</button><button className="button button-dark" onClick={save}>Save preferences</button></div>
      </section>
    </div>
  );
}

function PreferenceRow({ title, description, checked, onChange, disabled = false }: { title: string; description: string; checked: boolean; onChange?: (value: boolean) => void; disabled?: boolean }) {
  return <div className="preference-row"><div><strong>{title}</strong><p>{description}</p></div><label className="switch"><input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span /></label></div>;
}

function AppShell() {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const openPreferences = () => setPreferencesOpen(true);

  useEffect(() => {
    const handler = () => setPreferencesOpen(true);
    window.addEventListener("aura:cookie-settings", handler);
    return () => window.removeEventListener("aura:cookie-settings", handler);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route path="/clothing" element={<ClothingPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/spa" element={<SpaPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/trust" element={<TrustPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/policies/:policy" element={<PolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer onCookieSettings={openPreferences} />
      <CookieConsent onManage={openPreferences} />
      <CookiePreferences open={preferencesOpen} onClose={() => setPreferencesOpen(false)} />
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <img className="home-hero-image" src={ASSETS.hero} alt="Editorial collection image from the website design template" />
        <div className="home-hero-shade" />
        <div className="home-hero-content">
          <span className="eyebrow">Aura Studio</span>
          <BlurText text="Luxury, without announcement." className="hero-title" delay={75} />
          <p>Private transfers. Considered clothing. Restorative spa experiences.</p>
          <Link className="button button-cream" to="/about">Explore the experience <span>↗</span></Link>
        </div>
        <div className="hero-caption"><span>01 / 03</span><span>Thoughtfully considered</span></div>
      </section>

      <section className="division-section section-pad">
        <div className="section-head">
          <div><span className="eyebrow">The Aura experience</span><h2>Three ways to<br /><em>feel the difference.</em></h2></div>
          <p>Distinct in purpose. Connected by care.</p>
        </div>
        <div className="division-grid">
          <DivisionCard number="01" title="Aura Transfers" description="Arrive well. Private journeys, thoughtfully handled." action="Explore transfers" to="/transfers" image={ASSETS.lifestyle} theme="dark" />
          <DivisionCard number="02" title="Aura Clothing" description="Wear your ease. A considered approach to everyday style." action="Explore clothing" to="/clothing" image={ASSETS.dress} theme="light" />
          <DivisionCard number="03" title="Aura Spa" description="Make room to reset. Restorative moments, made personal." action="Explore spa" to="/spa" image={ASSETS.sustainability} theme="spa" />
        </div>
      </section>

      <section className="story-split">
        <div className="story-image"><img src={ASSETS.mobileHero} alt="Editorial image from the website design template" loading="lazy" /></div>
        <div className="story-copy"><span className="eyebrow">The Aura standard</span><h2>An elevated experience,<br /><em>in every detail.</em></h2><p>True luxury is not about excess. It is the feeling of being looked after, with care that is considered, consistent and quietly confident.</p><Link className="text-link" to="/about">Our story <span>↗</span></Link></div>
        <div className="standards-grid">
          <StandardItem icon="◈" title="Privacy first" body="Clear choices and respectful handling of personal information." />
          <StandardItem icon="◎" title="Secure payments" body="A hosted payment journey through a dedicated payment provider." />
          <StandardItem icon="✳" title="Clear commitments" body="Transparent terms, pricing and booking information." />
          <StandardItem icon="⌁" title="Considered design" body="An accessible, responsive experience across devices." />
        </div>
      </section>

      <section className="journal-teaser section-pad">
        <div className="section-head"><div><span className="eyebrow">The Journal</span><h2>Notes on living<br /><em>well.</em></h2></div><Link className="text-link" to="/journal">Read the journal <span>↗</span></Link></div>
        <div className="journal-grid">
          <JournalCard category="Travel" title="The art of arriving well" image={ASSETS.lifestyle} to="/journal" />
          <JournalCard category="Style" title="A wardrobe with intention" image={ASSETS.dress} to="/journal" />
          <JournalCard category="Wellbeing" title="Making space to reset" image={ASSETS.sustainability} to="/journal" />
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

function DivisionCard({ number, title, description, action, to, image, theme }: { number: string; title: string; description: string; action: string; to: string; image: string; theme: string }) {
  return (
    <Link className={`division-card division-card--${theme}`} to={to}>
      <img src={image} alt="" loading="lazy" />
      <span className="division-number">{number} / AURA STUDIO</span>
      <div className="division-copy"><h3>{title}</h3><p>{description}</p><span className="division-action">{action} <b>↗</b></span></div>
    </Link>
  );
}

function StandardItem({ icon, title, body }: { icon: string; title: string; body: string }) {
  return <div className="standard-item"><span>{icon}</span><h3>{title}</h3><p>{body}</p></div>;
}

function JournalCard({ category, title, image, to }: { category: string; title: string; image: string; to: string }) {
  return <Link className="journal-card" to={to}><div className="journal-card-image"><img src={image} alt="" loading="lazy" /></div><span className="eyebrow">{category}</span><h3>{title}</h3><span className="text-link">Coming to the journal <span>↗</span></span></Link>;
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); setStatus("Newsletter sign-up will be connected before launch. Your address has not been sent or stored."); };
  return <section className="newsletter-section"><div><span className="eyebrow">A note from Aura</span><h2>Be the first to<br /><em>hear what's coming.</em></h2></div><form onSubmit={submit}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-control"><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" /><button aria-label="Join newsletter" type="submit">↗</button></div><p>Optional updates only. You can unsubscribe at any time. <Link to="/policies/privacy">Privacy policy</Link></p>{status && <p role="status" className="form-status">{status}</p>}</form></section>;
}

function PageHero({ eyebrow, title, intro, image, imageAlt = "" }: { eyebrow: string; title: string; intro: string; image?: string; imageAlt?: string }) {
  return <section className={image ? "page-hero page-hero--image" : "page-hero"}>{image && <><img src={image} alt={imageAlt} /><div className="page-hero-overlay" /></>}<div className="page-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div></section>;
}

function TransfersPage() {
  return <main><PageHero eyebrow="Aura Transfers" title={<>Arrive well.<br /><em>Every time.</em></>} intro="Private journeys shaped around your time, your route and the way you want to travel." image={ASSETS.lifestyle} imageAlt="Editorial lifestyle photograph from the temporary template image set" /><section className="feature-text section-pad"><div><span className="eyebrow">A more considered journey</span><h2>Good travel is felt<br /><em>before you arrive.</em></h2></div><div><p>From the first enquiry to the final drop-off, Aura Transfers is designed around thoughtful service, clear communication and a smooth experience.</p><p>Share your travel details and the team can confirm availability, vehicle suitability and a quote before anything is booked.</p></div></section><section className="service-detail-grid"><div><span className="eyebrow">01 / Private journeys</span><h3>Travel on your terms.</h3><p>Tell us where you are going, when you need to be there and anything the journey should account for.</p></div><div><span className="eyebrow">02 / Airport transfers</span><h3>A calmer arrival.</h3><p>Share your flight and pick-up details so the journey can be planned with the right information.</p></div><div><span className="eyebrow">03 / Clear confirmation</span><h3>No surprises.</h3><p>Receive a written confirmation of the route, agreed fare and any conditions before payment.</p></div></section><EnquiryPanel kind="transfer" title="Plan your journey" intro="Send the details of your trip. This preview form is not connected to a live inbox yet." /></main>;
}

function ClothingPage() {
  const [saved, setSaved] = useState<string[]>([]);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Clothing"];
  const visible = products.filter((product) => filter === "All" || product.category === filter);
  return <main><PageHero eyebrow="Aura Clothing" title={<>Wear your ease.<br /><em>Move with intention.</em></>} intro="A quieter approach to style. Thoughtful silhouettes and considered everyday pieces." image={ASSETS.hero} imageAlt="Editorial clothing image from the temporary template set" /><section className="catalogue-section section-pad"><div className="catalogue-heading"><div><span className="eyebrow">The collection</span><h2>Preview the<br /><em>visual direction.</em></h2></div><div className="catalogue-tools"><span>Collection launch details to follow</span><div className="filter-tabs" role="group" aria-label="Filter collection">{categories.map((category) => <button className={filter === category ? "is-active" : ""} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div></div></div><div className="product-grid">{visible.map((product, index) => <article className="product-card" key={product.slug}><Link to={`/product/${product.slug}`} className="product-image"><img src={product.image} alt={product.note} loading="lazy" /><span className="product-index">0{index + 1}</span></Link><div className="product-card-meta"><div><h3><Link to={`/product/${product.slug}`}>{product.name}</Link></h3><p>Preview image · product details coming soon</p></div><button className={saved.includes(product.slug) ? "save-button is-saved" : "save-button"} onClick={() => setSaved((items) => items.includes(product.slug) ? items.filter((item) => item !== product.slug) : [...items, product.slug])} aria-label={saved.includes(product.slug) ? "Remove from saved items" : "Save item"}>{saved.includes(product.slug) ? "♥" : "♡"}</button></div></article>)}</div><p className="catalogue-note">These are temporary template images for layout review only. Aura product photography, names, sizes, stock and pricing must be added before shopping is enabled.</p></section></main>;
}

function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const navigate = useNavigate();
  if (!product) return <NotFoundPage />;
  return <main><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/clothing">Clothing</Link><span>/</span><span>{product.name}</span></div><section className="product-detail"><div className="product-detail-image"><img src={product.image} alt={product.note} /></div><div className="product-detail-copy"><span className="eyebrow">Aura Clothing · Preview item</span><h1>{product.name}</h1><p className="product-description">{product.description}</p><p className="catalogue-note">{product.note}</p><div className="product-detail-rule" /><p>Product information, available sizes, materials, stock and pricing will be published once the Aura collection is approved.</p><button className="button button-dark" onClick={() => navigate("/contact")}>Enquire about the collection <span>↗</span></button></div></section></main>;
}

function SpaPage() {
  return <main><PageHero eyebrow="Aura Spa" title={<>Make room<br /><em>to reset.</em></>} intro="A restorative pause. Thoughtful treatments and wellbeing experiences designed around how you want to feel." image={ASSETS.sustainability} imageAlt="Calm natural texture from the temporary template image set" /><section className="feature-text section-pad"><div><span className="eyebrow">A moment for yourself</span><h2>Return to a place<br /><em>of balance.</em></h2></div><div><p>Aura Spa is a space for slowing down, restoring and being cared for with intention.</p><p>Treatment names, availability, location, practitioner details and prices will be published once the service menu is confirmed.</p></div></section><section className="spa-menu-grid"><div className="spa-menu-image"><img src={ASSETS.lifestyle} alt="Lifestyle image from the temporary design template" loading="lazy" /></div><div className="spa-menu-copy"><span className="eyebrow">The spa experience</span><h2>Care that meets<br /><em>you where you are.</em></h2><p>Every appointment should be clear before it is confirmed: what the experience includes, how long it takes, what it costs and how to prepare.</p><Link className="text-link" to="/policies/bookings">Booking and cancellation policy <span>↗</span></Link></div></section><EnquiryPanel kind="spa" title="Find your time to reset" intro="Tell us what you are looking for. This preview form is not connected to a live inbox yet." /></main>;
}

function EnquiryPanel({ kind, title, intro }: { kind: "transfer" | "spa"; title: string; intro: string }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); setSubmitted(true); };
  return <section className="enquiry-section section-pad"><div className="enquiry-copy"><span className="eyebrow">{kind === "transfer" ? "Transfer enquiry" : "Spa enquiry"}</span><h2>{title}</h2><p>{intro}</p><p className="form-disclaimer">No information is transmitted or stored by this preview form.</p></div><form className="enquiry-form" onSubmit={handleSubmit}><div className="form-row"><label>Your name<input required name="name" autoComplete="name" /></label><label>Email address<input required name="email" type="email" autoComplete="email" /></label></div><div className="form-row"><label>Phone number<input name="phone" type="tel" autoComplete="tel" /></label><label>{kind === "transfer" ? "Preferred date" : "Preferred appointment date"}<input name="date" type="date" /></label></div>{kind === "transfer" && <div className="form-row"><label>Pick-up location<input name="pickup" /></label><label>Destination<input name="destination" /></label></div>}{kind === "spa" && <label>What kind of experience are you interested in?<select name="interest" defaultValue=""><option value="" disabled>Select an option</option><option>Restorative treatment</option><option>Wellbeing experience</option><option>Not sure yet</option></select></label>}<label>Anything else we should know?<textarea rows={4} name="message" /></label><button className="button button-dark" type="submit">Preview enquiry <span>↗</span></button>{submitted && <p className="form-status" role="status">This is a design preview. The enquiry has not been sent. A secure submission route will be connected before launch.</p>}</form></section>;
}

function AboutPage() {
  return <main><PageHero eyebrow="Our story" title={<>A more thoughtful<br /><em>kind of luxury.</em></>} intro="Aura Studio brings together travel, personal style and wellbeing under one considered point of view." image={ASSETS.hero} imageAlt="Editorial template image" /><section className="feature-text section-pad"><div><span className="eyebrow">What connects us</span><h2>It is the feeling<br /><em>of being looked after.</em></h2></div><div><p>We believe quality is as much about how something makes you feel as it is about how it looks. That belief shapes every part of Aura Studio.</p><p>Each division has its own purpose, but they share the same standard: clarity, care and thoughtful attention to detail.</p></div></section><section className="values-grid"><StandardItem icon="01" title="Consideration" body="Every choice begins with the person on the other side of it." /><StandardItem icon="02" title="Consistency" body="A premium experience should feel considered at every touchpoint." /><StandardItem icon="03" title="Integrity" body="Clear promises, honest information and accountability." /><StandardItem icon="04" title="Respect" body="Your time, choices, privacy and wellbeing matter." /></section></main>;
}

function JournalPage() {
  const entries = [
    { category: "Travel", title: "The art of arriving well", body: "A few thoughts on calmer journeys and thoughtful details.", image: ASSETS.lifestyle },
    { category: "Style", title: "A wardrobe with intention", body: "An introduction to a more considered approach to everyday dressing.", image: ASSETS.dress },
    { category: "Wellbeing", title: "Making space to reset", body: "Why rest deserves a place in the rhythm of everyday life.", image: ASSETS.sustainability },
  ];
  return <main><PageHero eyebrow="The journal" title={<>Notes on living<br /><em>well.</em></>} intro="Stories, observations and small reminders to move through life with a little more intention." /><section className="section-pad"><div className="journal-grid journal-grid-large">{entries.map((entry) => <article className="journal-card journal-card-static" key={entry.category}><div className="journal-card-image"><img src={entry.image} alt="" loading="lazy" /></div><span className="eyebrow">{entry.category} · Coming soon</span><h3>{entry.title}</h3><p>{entry.body}</p></article>)}</div><p className="catalogue-note">Journal articles are editorial placeholders and will be written and reviewed before publication.</p></section></main>;
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return <main><PageHero eyebrow="Contact" title={<>Let's begin<br /><em>with a conversation.</em></>} intro="Whether you are planning a journey, exploring the collection or looking for a moment to reset, we would be glad to hear from you." /><section className="contact-layout section-pad"><div><span className="eyebrow">Get in touch</span><h2>Tell us what<br /><em>you have in mind.</em></h2><p>Official contact details will be added once Aura's business email, telephone and service locations are confirmed.</p><p className="contact-placeholder">Business contact details to be confirmed before launch.</p></div><form className="enquiry-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="form-row"><label>Your name<input required autoComplete="name" /></label><label>Email address<input required type="email" autoComplete="email" /></label></div><label>I'm interested in<select defaultValue=""><option value="" disabled>Choose a division</option><option>Transfers</option><option>Clothing</option><option>Spa</option><option>Something else</option></select></label><label>Your message<textarea rows={5} required /></label><button className="button button-dark" type="submit">Preview message <span>↗</span></button>{submitted && <p className="form-status" role="status">This preview form is not connected to an inbox. Your message has not been sent.</p>}</form></section></main>;
}

function FaqPage() {
  const faqs = [
    ["How do I book a transfer?", "Send a transfer enquiry with your route and preferred travel date. A booking is only confirmed once Aura has provided written confirmation."],
    ["Can I shop the clothing collection now?", "The clothing section is currently a visual preview. Product names, sizes, prices, stock and fulfilment information will be added before sales open."],
    ["How do I book a spa appointment?", "Use the spa enquiry form to share what you are looking for. The service menu and appointment availability will be confirmed before bookings open."],
    ["Which countries does Aura serve?", "Service areas and shipping destinations are being confirmed. The site will list available destinations before accepting a booking or order."],
    ["How are card payments handled?", "The intended setup is a hosted payment page from the selected payment provider. Aura will not ask customers to send card details by email, phone or message."],
    ["How do I change my privacy choices?", "Use Cookie settings in the footer to reopen the preference panel. You can also read the privacy and cookie policies for more information."],
  ];
  return <main><PageHero eyebrow="Support" title={<>Good to know.<br /><em>Before you begin.</em></>} intro="A few answers to help you understand how Aura Studio works." /><section className="faq-list section-pad">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</section></main>;
}

function TrustPage() {
  return <main><PageHero eyebrow="Trust & standards" title={<>Care is a practice.<br /><em>Not a promise.</em></>} intro="Aura is being designed around privacy, secure operations, accessible journeys and clear consumer information. These are build commitments, not claims of certification." /><section className="trust-grid section-pad"><TrustCard title="Privacy by design" copy="Collect only the information needed for the service, explain why it is needed, limit access and define retention." items={["Clear privacy notice","Purpose-limited collection","Optional consent controls","Documented retention and deletion"]} /><TrustCard title="Secure payment hand-off" copy="Use a hosted payment provider for card entry and verify payment confirmations server-side before marking an order as paid." items={["No card data stored by Aura","Hosted checkout","Server-side payment verification","Restricted secrets and access"]} /><TrustCard title="Consumer clarity" copy="Give customers the information needed to decide, review and correct an order before committing." items={["Full prices and charges","Clear delivery and booking details","Returns and cancellations","Support and complaint route"]} /><TrustCard title="Accessible experience" copy="Build towards WCAG 2.2 AA with accessible structure, focus states, keyboard use and reduced-motion support." items={["Semantic page structure","Visible keyboard focus","Form labels and error messages","Responsive, readable layouts"]} /></section><section className="trust-footnote"><p>Standards and laws are not interchangeable. Legal applicability depends on the markets served and the business's actual operations. The final policies, technical controls and supplier contracts must be reviewed before launch.</p><Link to="/policies/privacy" className="text-link">Read the privacy policy <span>↗</span></Link></section></main>;
}

function TrustCard({ title, copy, items }: { title: string; copy: string; items: string[] }) {
  return <article className="trust-card"><span className="eyebrow">Aura standard</span><h2>{title}</h2><p>{copy}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

function CartPage() {
  return <main className="empty-state section-pad"><span className="eyebrow">Your bag</span><h1>Nothing here<br /><em>just yet.</em></h1><p>The clothing collection is still in preview. Product details, prices and live stock will be added before the bag and checkout are enabled.</p><Link className="button button-dark" to="/clothing">Explore clothing <span>↗</span></Link></main>;
}

function CheckoutPage() {
  return <main className="empty-state section-pad"><span className="eyebrow">Secure checkout</span><h1>Checkout will<br /><em>open soon.</em></h1><p>Payment processing is not connected yet. The intended flow uses a hosted payment page through the chosen provider, with server-side confirmation before an order is marked as paid.</p><Link className="button button-dark" to="/clothing">Return to clothing <span>↗</span></Link></main>;
}

function PolicyPage() {
  const { policy } = useParams();
  const data = policy ? policyContent[policy] : undefined;
  if (!data) return <NotFoundPage />;
  return <main><section className="policy-hero"><span className="eyebrow">{data.eyebrow}</span><h1>{data.title}</h1><p>{data.intro}</p><span className="policy-draft-label">Draft for launch review · Last updated 20 November 2026</span></section><article className="policy-content">{data.sections.map((section, index) => <section key={section.heading}><span className="policy-number">0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></section>)}<aside className="policy-note"><strong>Important</strong><p>This page is a working website draft, not legal advice and not a representation that Aura Studio is compliant in every country. Confirm the operating entity, markets, providers and service rules, then obtain jurisdiction-specific legal review before launch.</p></aside></article></main>;
}

function NotFoundPage() {
  return <main className="empty-state section-pad"><span className="eyebrow">404 · Page not found</span><h1>Not this<br /><em>way.</em></h1><p>The page you are looking for may have moved.</p><Link className="button button-dark" to="/">Back to Aura <span>↗</span></Link></main>;
}

function App() {
  return <AppShell />;
}

export default App;
