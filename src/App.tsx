import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import BlurText from "./components/BlurText";
import SpotlightCard from "./components/SpotlightCard";
import homeHeroImage from "./assets/images/clothing/aura_clothing_abstract_motion_editorial_photograph_aura_clothing_abstr.png";
import clothingLookThreeImage from "./assets/images/clothing/aura_clothing_material_detail_editorial_photograph_aura_clothing_mater.png";
import clothingCampaignAltImage from "./assets/images/clothing/aura_clothing_campaign_hero_editorial_photograph_16_9_landscape._dream.png";
import clothingPortraitImage from "./assets/images/clothing/intimate_original_editorial_fashion_portrait_for_aura_clothing._an_ele.png";
import spaInteriorImage from "./assets/images/spa/architectural_interior_transition_sanctuary_photograph_for_aura_studio.png";
import spaCeramicImage from "./assets/images/spa/aura_spa_ceramic_still_life_editorial_photograph_aura_spa_ceramic_stil.png";
import spaHeroImage from "./assets/images/spa/aura_spa_hero_sanctuary_editorial_photograph_aura_spa_hero_sanctuary..png";
import spaTreatmentImage from "./assets/images/spa/aura_spa_treatment_detail_editorial_photograph_aura_spa_treatment_deta.png";
import spaWaterImage from "./assets/images/spa/aura_spa_water_and_stone_editorial_photograph_aura_spa_water_and_stone.png";
import spaEditorialImage from "./assets/images/spa/spa_editorial_wellbeing_and_material_photograph_for_aura_studio_aura_j.png";
import transferJourneyImage from "./assets/images/transfers/aura_transfers_cape_town_journey_editorial_photograph_aura_transfers_c.png";
import transferVehicleImage from "./assets/images/transfers/aura_transfers_cape_town_private_executive_transport._a_sleek_unbrande.png";
import transferInteriorImage from "./assets/images/transfers/aura_transfers_interior_detail_editorial_photograph_aura_transfers_int.png";
import transferArrivalImage from "./assets/images/transfers/editorial_cape_town_arrival_and_travel_photograph_for_aura_studio_aura.png";
import aboutInteriorImage from "./assets/images/editorial/architectural_interior_and_material_study_for_aura_studio_aura_about.png";
import blogFashionImage from "./assets/images/editorial/candid_art_directed_fashion_editorial_for_aura_studio_aura_journal_sty.png";

type CartLine = { slug: string; quantity: number };
type CartContextValue = { items: CartLine[]; addItem: (slug: string) => void; updateQuantity: (slug: string, quantity: number) => void; removeItem: (slug: string) => void };
const CartContext = createContext<CartContextValue | null>(null);
const ANNOUNCEMENT = ""; // Add a current promotion or store update here. Leave blank to hide the bar.

function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.slug === "string"
    && Number.isSafeInteger(candidate.quantity)
    && Number(candidate.quantity) > 0;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored: unknown = JSON.parse(window.localStorage.getItem("aura-cart") || "[]");
      return Array.isArray(stored) ? stored.filter(isCartLine) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("aura-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (slug: string) => setItems((current) => current.some((item) => item.slug === slug)
    ? current.map((item) => item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item)
    : [...current, { slug, quantity: 1 }]);

  const updateQuantity = (slug: string, quantity: number) => {
    if (!Number.isFinite(quantity)) return;
    const nextQuantity = Math.floor(quantity);
    setItems((current) => nextQuantity <= 0
      ? current.filter((item) => item.slug !== slug)
      : current.map((item) => item.slug === slug ? { ...item, quantity: nextQuantity } : item));
  };

  const removeItem = (slug: string) => setItems((current) => current.filter((item) => item.slug !== slug));

  return <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem }}>{children}</CartContext.Provider>;
}
type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  note: string;
};

const ASSETS = {
  hero: homeHeroImage,
  homepageHero: clothingCampaignAltImage,
  clothingCampaign: clothingLookThreeImage,
  clothingCampaignAlt: clothingCampaignAltImage,
  dress: "https://e-commerce-clothing-women.vercel.app/ElbaDressOff-WhiteFreeTheLabel4.webp",
  miniDress: "https://e-commerce-clothing-women.vercel.app/MINI-DRESS-BEACH-0098-Edit_1400x.webp",
  shirt: "https://e-commerce-clothing-women.vercel.app/Something-Borrowed-Shirt-Black-Half_1400x.webp",
  studio: "https://e-commerce-clothing-women.vercel.app/Somethingx.webp",
  clothingPortrait: clothingPortraitImage,
  lifestyle: transferJourneyImage,
  transferHero: transferVehicleImage,
  transferDetail: transferInteriorImage,
  transferArrival: transferArrivalImage,
  sustainability: spaWaterImage,
  spaWater: spaWaterImage,
  spaHero: spaHeroImage,
  spaStill: spaCeramicImage,
  spaTreatment: spaTreatmentImage,
  spaInterior: spaInteriorImage,
  spaEditorial: spaEditorialImage,
  mobileHero: aboutInteriorImage,
  about: aboutInteriorImage,
  blogFashion: blogFashionImage,
};

const products: Product[] = [
  {
    slug: "look-01",
    name: "Look 01",
    category: "Clothing",
    image: ASSETS.dress,
    description: "An editorial preview of the Aura clothing collection.",
    note: "Editorial preview · final product photography to be confirmed",
  },
  {
    slug: "look-02",
    name: "Look 02",
    category: "Clothing",
    image: ASSETS.miniDress,
    description: "A second editorial preview of the Aura clothing direction.",
    note: "Editorial preview · final product photography to be confirmed",
  },
  {
    slug: "look-03",
    name: "Look 03",
    category: "Clothing",
    image: ASSETS.shirt,
    description: "A close study of fabric and finish from the Aura clothing direction.",
    note: "Editorial preview · final product photography to be confirmed",
  },
  {
    slug: "look-04",
    name: "Look 04",
    category: "Clothing",
    image: ASSETS.studio,
    description: "A further editorial preview from the Aura clothing direction.",
    note: "Editorial preview · final product photography to be confirmed",
  },
];

const policyContent: Record<string, { title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: "Privacy policy",
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
    intro: "These terms are a launch draft. They must be checked against the final business structure, catalogue, booking model and jurisdictions before being made binding.",
    sections: [
      { heading: "The business", body: "The supplier is [insert registered legal name], trading as Aura Studio, with registration number [number], physical address [address], telephone [telephone] and email [email]. Complete these details before taking orders." },
      { heading: "Product and service information", body: "Descriptions, sizes, availability, service locations and exclusions must be accurate and kept up to date. The editorial preview images shown on this site are not final product photography. Before sales open, product images must accurately represent each item being offered." },
      { heading: "Prices and payment", body: "The full price, applicable taxes, delivery or travel charges and any other fees must be shown before the customer commits. The order summary must allow the customer to review, correct or withdraw before submitting the order. Card payment is intended to be processed on the hosted page of the selected payment provider; Aura should not request card numbers or security codes directly." },
      { heading: "Orders and availability", body: "An order request is not accepted until Aura confirms acceptance and availability. The confirmation process, delivery estimate and any booking-specific conditions must be clearly communicated to the customer." },
      { heading: "Consumer rights and disputes", body: "Nothing in these terms is intended to exclude or limit a consumer right that cannot lawfully be excluded. Mandatory consumer protections in the customer's applicable jurisdiction take priority over inconsistent wording in these terms." },
    ],
  },
  returns: {
    title: "Returns and refunds",
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
    intro: "Transfers and spa services are appointment-based. The final cancellation, rescheduling, deposit and no-show rules must be set for each service and checked against mandatory local consumer protections.",
    sections: [
      { heading: "Booking requests", body: "A request is not a confirmed booking until Aura sends a confirmation with the service, date, time, location, price and any special conditions." },
      { heading: "Changes and cancellations", body: "The confirmation should explain how to change or cancel, the notice period, any refundable deposit or cancellation charge, and the process for delays or service disruption. Do not apply a single rule to every booking until each service has been reviewed." },
      { heading: "Transfers", body: "The airport transfer services listed on this page are available for selected journeys in Cape Town, South Africa. Confirm the exact service, route, pick-up and destination details, date and time, passenger count, luggage needs, quoted fare, waiting-time rules and any agreed extras in writing before taking payment." },
      { heading: "Spa appointments", body: "Before confirmation, disclose the treatment, duration, price, appointment location and cancellation terms. If a treatment requires health or suitability information, collect only what is necessary through a secure, purpose-specific process." },
    ],
  },
  cookies: {
    title: "Cookie and preference policy",
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
    intro: "Aura Studio is being designed against WCAG 2.1 Level AA. This is a development target, not a claim of verified conformance or independent certification.",
    sections: [
      { heading: "What we are working towards", body: "The site is being designed for keyboard operation, visible focus, meaningful structure, labelled controls, text alternatives, readable contrast, text resizing, text spacing, reflow at narrow viewport widths and reduced-motion preferences." },
      { heading: "Ongoing review", body: "Automated checks alone are not sufficient. Before launch, test key journeys with keyboard-only navigation, screen readers, zoom, mobile layouts and manual contrast checks. Document and prioritise any barriers found." },
      { heading: "Tell us about a barrier", body: "Aura will publish a verified accessibility contact channel before launch so visitors can report a barrier or request information in an alternative format." },
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
  const searchPanelRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { items } = useCart();
  const bagCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!searchOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const panel = searchPanelRef.current;
    const getFocusable = () => Array.from(panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) ?? []);
    panel?.querySelector<HTMLInputElement>("input")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !panel?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [searchOpen]);

  const results = [
    { label: "Transfers", to: "/transfers" },
    { label: "Clothing collection", to: "/clothing" },
    { label: "Spa experiences", to: "/spa" },
    { label: "About Aura", to: "/about" },
    { label: "FAQs", to: "/faq" },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      {ANNOUNCEMENT.trim() && <div className="announcement-bar" role="status">{ANNOUNCEMENT}</div>}
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Aura Studio home">
          <span className="brand-main">AURA</span><span className="brand-sub">STUDIO</span>
        </Link>
        <button className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav id="primary-navigation" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/transfers">Transfers</NavLink>
          <NavLink to="/clothing">Clothing</NavLink>
          <NavLink to="/spa">Spa</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <div className="nav-actions">
            <button className="icon-button" type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>⌕</button>
            <NavLink className="bag-link" to="/cart" aria-label="Shopping bag">Bag <span>{bagCount}</span></NavLink>
          </div>
        </nav>
      </header>
      {searchOpen && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
          <section ref={searchPanelRef} className="search-panel" role="dialog" aria-modal="true" aria-label="Search Aura Studio">
            <div className="search-panel-head"><button className="icon-button" type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">×</button></div>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" aria-label="Search query" />
            <div className="search-results">
              {results.map((result) => <Link key={result.to} to={result.to}>{result.label}</Link>)}
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
        <div className="footer-column"><span className="footer-label">Explore</span><Link to="/transfers">Transfers</Link><Link to="/clothing">Clothing</Link><Link to="/spa">Spa</Link><Link to="/about">Our story</Link><Link to="/blog">Blog</Link></div>
        <div className="footer-column"><span className="footer-label">Support</span><Link to="/faq">FAQs</Link><Link to="/contact">Contact</Link><Link to="/policies/shipping">Shipping</Link><Link to="/policies/returns">Returns</Link><Link to="/policies/bookings">Bookings</Link></div>
        <div className="footer-column footer-promise"><span className="footer-label">Our standard</span><p>Care in every interaction. Clarity in every commitment. Respect for your time, privacy and trust.</p><Link to="/trust">Trust & standards</Link></div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Aura Studio. All rights reserved.</span>
        <div className="footer-legal"><Link to="/policies/terms">Terms</Link><Link to="/policies/privacy">Privacy</Link><Link to="/policies/cookies">Cookies</Link><Link to="/policies/accessibility">Accessibility</Link><button type="button" onClick={onCookieSettings}>Cookie settings</button></div>
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
      <div><p>We use necessary storage to make the site work. Optional analytics and marketing should stay off unless you choose to enable them.</p><Link to="/policies/cookies">Read the cookie policy</Link></div>
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
  const modalRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const modal = modalRef.current;
    const getFocusable = () => Array.from(modal?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    ) ?? []);
    getFocusable()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !modal?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  if (!open) return null;
  const save = () => {
    window.localStorage.setItem("aura-cookie-choice", JSON.stringify({ necessary: true, analytics, marketing, savedAt: new Date().toISOString() }));
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={modalRef} className="preference-modal" role="dialog" aria-modal="true" aria-labelledby="preference-title">
        <button className="modal-close" onClick={onClose} aria-label="Close preferences">×</button>
        
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
  const inputId = `preference-${title.toLowerCase()}`;
  return (
    <div className="preference-row">
      <div>
        <label className="preference-title" htmlFor={inputId}><strong>{title}</strong></label>
        <p id={`${inputId}-description`}>{description}</p>
      </div>
      <div className="switch">
        <input id={inputId} type="checkbox" checked={checked} disabled={disabled} aria-describedby={`${inputId}-description`} onChange={(event) => onChange?.(event.target.checked)} />
        <label htmlFor={inputId}><span aria-hidden="true" /></label>
      </div>
    </div>
  );
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
      <CartProvider>
      <ScrollToTop />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route path="/clothing" element={<ClothingPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/spa" element={<SpaPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/journal" element={<Navigate to="/blog" replace />} />
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
      </CartProvider>
    </BrowserRouter>
  );
}

function HomePage() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { addItem, items } = useCart();
  const bagCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero">
        <picture className="home-hero-media">
          <source media="(max-width: 680px)" srcSet={ASSETS.clothingPortrait} />
          <img className="home-hero-image" src={ASSETS.homepageHero} alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
        </picture>
        <div className="home-hero-shade" />
        <div className="home-hero-content">
          <BlurText text={"Luxury, without\nannouncement."} className="hero-title" delay={75} />
          <p>Considered clothing. Thoughtful transfers. Restorative spa experiences.</p>
          <Link className="button button-cream" to="/clothing">Shop the collection</Link>
        </div>
      </section>

      <section className="division-section section-pad" aria-labelledby="division-title">
        <div className="section-head">
          <div><h2 id="division-title">Explore Aura.</h2></div>
          <p>Three considered experiences.<br />One point of view.</p>
        </div>
        <div className="division-grid">
          <SpotlightCard className="division-card division-card--clothing" to="/clothing">
            <img src={ASSETS.clothingCampaign} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div className="division-copy">
              <h3>Clothing</h3>
              <p>Considered pieces and silhouettes for a more intentional wardrobe.</p>
              <span className="division-action">Explore clothing</span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="division-card division-card--transfers" to="/transfers">
            <img src={ASSETS.transferHero} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div className="division-copy">
              <h3>Transfers</h3>
              <p>Cape Town airport transfers are available for selected journeys only.</p>
              <span className="division-action">Explore transfers</span>
            </div>
          </SpotlightCard>
          <SpotlightCard className="division-card division-card--spa" to="/spa">
            <img src={ASSETS.spaHero} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <div className="division-copy">
              <h3>Spa</h3>
              <p>Restorative experiences shaped around care and wellbeing.</p>
              <span className="division-action">Explore Aura Spa</span>
            </div>
          </SpotlightCard>
        </div>
      </section>

      <section className="shop-feature section-pad" aria-labelledby="shop-feature-title">
        <div className="shop-feature-head">
          <div>
            <h2 id="shop-feature-title">The clothing edit.</h2>
            <p>A first look at the pieces and silhouettes shaping the Aura wardrobe.</p>
          </div>
          <Link className="text-link" to="/clothing">Explore all clothing</Link>
        </div>
        <div className="shop-feature-grid">
          {products.slice(0, 4).map((product) => {
            const wasAdded = addedSlug === product.slug;
            return (
              <article className="shop-feature-card" key={product.slug}>
                <Link className="shop-feature-image" to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
                  <img src={product.image} alt={`Product preview for ${product.name}`} sizes="(max-width: 680px) 44vw, (max-width: 1000px) 45vw, 23vw" loading="lazy" decoding="async" />
                </Link>
                <div className="shop-feature-card-meta">
                  <div><h3><Link to={`/product/${product.slug}`}>{product.name}</Link></h3><p>Collection preview</p></div>
                </div>
                <div className="shop-feature-actions">
                  {wasAdded ? (
                    <div className="quick-add-confirmation" role="status">
                      <span>Added to bag</span>
                      <Link to="/cart">View bag ({bagCount})</Link>
                    </div>
                  ) : (
                    <button className="button button-dark shop-feature-add" type="button" onClick={() => { addItem(product.slug); setAddedSlug(product.slug); }}>
                      Add to bag
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <p className="shop-feature-note">Product images are from the existing preview catalogue. Final prices and options will be confirmed before orders open.</p>
      </section>

      <section className="story-split">
        <div className="story-image"><img src={ASSETS.about} alt="Architectural interior and considered natural materials" loading="lazy" decoding="async" /></div>
        <div className="story-copy"><h2>An elevated experience,<br /><em>in every detail.</em></h2><p>True luxury is not about excess. It is the feeling of being looked after, with care that is considered, consistent and quietly confident.</p><Link className="text-link" to="/about">Our story</Link></div>
      </section>

      <section className="blog-teaser section-pad">
        <div className="section-head"><div><h2>From the blog.</h2></div><Link className="text-link" to="/blog">Visit the blog</Link></div>
        <div className="blog-grid">
          <BlogCard title="The art of arriving well" image={ASSETS.transferArrival} to="/blog" />
          <BlogCard title="A wardrobe with intention" image={ASSETS.blogFashion} to="/blog" />
          <BlogCard title="Making space to reset" image={ASSETS.spaWater} to="/blog" />
        </div>
      </section>
      <Newsletter />
    </main>
  );
}

function StandardItem({ icon, title, body }: { icon: string; title: string; body: string }) {
  return <div className="standard-item"><span className="material-symbols-outlined" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{body}</p></div>;
}

function BlogCard({ title, image, to }: { title: string; image: string; to: string }) {
  return <Link className="blog-card" to={to}><div className="blog-card-image"><img src={image} alt="" loading="lazy" decoding="async" /></div><h3>{title}</h3><span className="text-link">Read on the blog</span></Link>;
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent) => { event.preventDefault(); setStatus("Newsletter sign-up will be connected before launch. Your address has not been sent or stored."); };
  return <section className="newsletter-section"><div><h2>Be the first to<br /><em>hear what's coming.</em></h2></div><form onSubmit={submit}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-control"><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" /><button type="submit">Join</button></div><p>Optional updates only. You can unsubscribe at any time. <Link to="/policies/privacy">Privacy policy</Link></p>{status && <p role="status" className="form-status">{status}</p>}</form></section>;
}

function PageHero({ title, intro, image, imageAlt = "" }: { title: ReactNode; intro: string; image?: string; imageAlt?: string }) {
  return <section className={image ? "page-hero page-hero--image page-hero--full" : "page-hero page-hero--full"}>{image && <><img src={image} alt={imageAlt} loading="eager" decoding="async" /><div className="page-hero-overlay" /></>}<div className="page-hero-copy"><h1>{title}</h1><p>{intro}</p></div></section>;
}

function TransfersPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        title={<>Arrive well.<br /><em>In Cape Town.</em></>}
        intro="Private airport transfers for selected journeys in Cape Town, South Africa, arranged with care from arrival to drop-off."
        image={ASSETS.transferHero}
        imageAlt="Private executive vehicle prepared for a transfer"
      />
      <section className="feature-text section-pad">
        <div>
          
          <h2>Good travel is felt<br /><em>before you arrive.</em></h2>
        </div>
        <div>
          <p>The airport transfer services described on this page are available for selected journeys in Cape Town, South Africa. Availability depends on the route and service requested and will be confirmed before booking. These airport transfer services are not currently offered in Zimbabwe.</p>
          <p>Share your flight and journey details so the requested pick-up can be reviewed and confirmed before you travel. Other Aura services have their own availability and locations.</p>
        </div>
      </section>
      <section className="service-detail-grid">
        <div><h3>A calmer arrival.</h3><p>Share your flight details and arrival time so your requested airport pick-up can be planned.</p></div>
        <div><h3>Leave with ease.</h3><p>Arrange a Cape Town airport drop-off with the pick-up details and timing agreed in advance.</p></div>
        <div><h3>No surprises.</h3><p>Receive written confirmation of the route, agreed fare and any conditions before payment.</p></div>
      </section>
      <EnquiryPanel kind="transfer" title="Plan your Cape Town transfer" intro="Tell us a little about your flight and journey. We will take it one step at a time." />
    </main>
  );
}
function ClothingPage() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { addItem, items } = useCart();
  const categories = ["All", "Clothing"];
  const [filter, setFilter] = useState("All");
  const visible = products.filter((product) => filter === "All" || product.category === filter);
  const bagCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title={<>Wear your ease.<br />Move with intention.</>} intro="Explore considered pieces designed for everyday wear." image={ASSETS.hero} imageAlt="Abstract fashion textile composition" />
      <section className="catalogue-section section-pad">
        <div className="catalogue-heading">
          <div><h2>Clothing</h2></div>
          <div className="catalogue-tools">
            <span>New pieces will be added as the collection is released.</span>
            <div className="filter-tabs" role="group" aria-label="Filter collection">
              {categories.map((category) => <button className={filter === category ? "is-active" : ""} onClick={() => setFilter(category)} key={category}>{category}</button>)}
            </div>
          </div>
        </div>
        <div className="product-grid">
          {visible.map((product, index) => {
            const wasAdded = addedSlug === product.slug;
            return (
              <article className="product-card" key={product.slug}>
                <Link to={`/product/${product.slug}`} className="product-image">
                  <img src={product.image} alt={`Editorial preview for ${product.name}`} loading="lazy" decoding="async" />
                  <span className="product-index">0{index + 1}</span>
                </Link>
                <div className="product-card-meta">
                  <div>
                    <h3><Link to={`/product/${product.slug}`}>{product.name}</Link></h3>
                    <p>View product details</p>
                  </div>
                </div>
                <div className="product-card-actions">
                  {wasAdded ? (
                    <div className="quick-add-confirmation" role="status">
                      <span>Added to bag</span>
                      <Link to="/cart">View bag ({bagCount}) </Link>
                    </div>
                  ) : (
                    <button
                      className="button button-dark product-card-add"
                      type="button"
                      onClick={() => { addItem(product.slug); setAddedSlug(product.slug); }}
                    >
                      Add to bag <span aria-hidden="true">+</span>
                    </button>
                  )}
                  <Link className="product-card-details" to={`/product/${product.slug}`}>View details </Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="catalogue-note">The images shown are editorial previews. Final product photography, descriptions, sizes, stock and prices will be confirmed before orders open.</p>
      </section>
    </main>
  );
}
function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const navigate = useNavigate();
  const { addItem } = useCart();
  if (!product) return <NotFoundPage />;
  return <main id="main-content" tabIndex={-1}><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/clothing">Clothing</Link><span>/</span><span>{product.name}</span></div><section className="product-detail"><div className="product-detail-image"><img src={product.image} alt={product.note} /></div><div className="product-detail-copy"><h1>{product.name}</h1><p className="product-description">{product.description}</p><div className="product-detail-rule" /><p className="product-price-pending">Price and product options will be displayed here.</p><p className="catalogue-note">This is a storefront preview. Final product details, size options, stock and prices are being prepared. Orders will open once the catalogue and secure checkout are connected.</p><button className="button button-dark" onClick={() => { addItem(product.slug); navigate("/cart"); }}>Add to bag</button></div></section></main>;
}

function SpaPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        title={<>A restorative<br /><em>destination.</em></>}
        intro="A considered collection of spa and wellbeing experiences for international guests. Discover thoughtful care, take time to reset and make space for yourself while you travel."
        image={ASSETS.spaHero}
        imageAlt="Calm spa sanctuary with natural materials"
      />
      <section className="feature-text section-pad">
        <div><h2>Time well<br /><em>taken.</em></h2></div>
        <div>
          <p>Aura Spa is being shaped for guests travelling from near and far, with a distinct treatment collection and a more considered approach to personal wellbeing.</p>
          <p>The treatment menu will present each experience with a clear description, duration, price and practical details, so international guests can plan with confidence before they arrive.</p>
        </div>
      </section>
      <section className="spa-menu-grid">
        <div className="spa-menu-image"><img src={ASSETS.spaStill} alt="Ceramic objects and natural spa materials" loading="lazy" decoding="async" /></div>
        <div className="spa-menu-copy">
          
          <h2>Thoughtful care.<br /><em>Distinct experiences.</em></h2>
          <p>Our spa collection will be presented as a curated menu rather than a generic list of local salon services. Each treatment will have its own character, with transparent details for guests arranging their visit in advance.</p>
          <Link className="text-link" to="/policies/bookings">Booking and cancellation policy</Link>
        </div>
      </section>
      <EnquiryPanel kind="spa" title="Plan your spa experience" intro="Tell us a little about your visit. We will make it easy to enquire about the right experience and preferred timing." />
    </main>
  );
}
type EnquiryValues = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  interest: string;
  message: string;
  privacyAcknowledged: boolean;
};

function EnquiryPanel({ kind, title, intro }: { kind: "transfer" | "spa"; title: string; intro: string }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<EnquiryValues>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    pickup: "",
    destination: "",
    interest: "",
    message: "",
    privacyAcknowledged: false,
  });

  const steps = kind === "transfer"
    ? ["Your name", "Contact details", "Your route", "Travel date", "A few details", "Before you finish"]
    : ["Your name", "Contact details", "Your experience", "Appointment date", "A few details", "Before you finish"];

  const update = <Key extends keyof EnquiryValues>(key: Key, value: EnquiryValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    setSubmitted(true);
  };

  const handleBack = () => setStep((current) => Math.max(0, current - 1));

  return (
    <section className="enquiry-section section-pad" aria-labelledby="enquiry-title">
      <div className="enquiry-copy">
        
        <h2 id="enquiry-title">{title}</h2>
        <p>{intro}</p>
        <p className="form-disclaimer">A few simple steps. You can go back and change your answers before finishing.</p>
      </div>

      <div className="enquiry-flow">
        {!submitted ? (
          <>
            <div className="enquiry-flow-top">
              <span>Step {step + 1} of {steps.length}</span>
              <span>{Math.round(((step + 1) / steps.length) * 100)}% complete</span>
            </div>
            <div
              className="enquiry-progress"
              role="progressbar"
              aria-label="Enquiry progress"
              aria-valuemin={0}
              aria-valuemax={steps.length}
              aria-valuenow={step + 1}
            >
              <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>

            <form className="enquiry-form enquiry-step-form" onSubmit={handleSubmit}>
              <div className="enquiry-step-content" key={step} aria-live="polite">
                
                <h3>{steps[step]}</h3>

                {step === 0 && (
                  <label htmlFor="enquiry-name">What should we call you?
                    <input id="enquiry-name" name="name" autoComplete="name" autoFocus required value={values.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
                  </label>
                )}

                {step === 1 && (
                  <>
                    <label htmlFor="enquiry-email">What's the best email address to reach you?
                      <input id="enquiry-email" name="email" type="email" autoComplete="email" autoFocus required value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" />
                    </label>
                    <label htmlFor="enquiry-phone">Phone number <span className="field-optional">Optional</span>
                      <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Your contact number" />
                    </label>
                  </>
                )}

                {step === 2 && kind === "transfer" && (
                  <div className="enquiry-step-fields">
                    <label htmlFor="enquiry-pickup">Where should we collect you?
                      <input id="enquiry-pickup" name="pickup" autoFocus required value={values.pickup} onChange={(event) => update("pickup", event.target.value)} placeholder="Pick-up location" />
                    </label>
                    <label htmlFor="enquiry-destination">Where are you heading?
                      <input id="enquiry-destination" name="destination" required value={values.destination} onChange={(event) => update("destination", event.target.value)} placeholder="Destination" />
                    </label>
                  </div>
                )}

                {step === 2 && kind === "spa" && (
                  <label htmlFor="enquiry-interest">What kind of experience are you interested in?
                    <select id="enquiry-interest" name="interest" autoFocus required value={values.interest} onChange={(event) => update("interest", event.target.value)}>
                      <option value="" disabled>Select an option</option>
                      <option>Restorative treatment</option>
                      <option>Wellbeing experience</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>
                )}

                {step === 3 && (
                  <>
                    <label htmlFor="enquiry-date">{kind === "transfer" ? "What date would you like to travel?" : "When would you like your appointment?"}
                      <input id="enquiry-date" name="date" type="date" autoFocus required={kind === "transfer"} value={values.date} onChange={(event) => update("date", event.target.value)} />
                    </label>
                    {kind === "transfer" && (
                      <label htmlFor="enquiry-time">Preferred pick-up time <span className="field-optional">Optional</span>
                        <input id="enquiry-time" name="time" type="time" value={values.time} onChange={(event) => update("time", event.target.value)} />
                      </label>
                    )}
                    {kind === "spa" && <p className="enquiry-hint">A date is helpful, but you can leave this blank if you are still deciding.</p>}
                  </>
                )}

                {step === 4 && (
                  <label htmlFor="enquiry-message">Anything else we should know? <span className="field-optional">Optional</span>
                    <textarea id="enquiry-message" rows={4} name="message" autoFocus value={values.message} onChange={(event) => update("message", event.target.value)} placeholder={kind === "transfer" ? "Flight details, number of passengers or anything that would help us plan..." : "Share anything that would help us prepare for your visit..."} />
                  </label>
                )}

                {step === 5 && (
                  <div className="enquiry-consent">
                    <p className="enquiry-consent-intro">Just one final check before you finish.</p>
                    <div className="consent-check">
                      <input
                        id="enquiry-privacy"
                        name="privacyAcknowledged"
                        type="checkbox"
                        required
                        checked={values.privacyAcknowledged}
                        onChange={(event) => update("privacyAcknowledged", event.target.checked)}
                      />
                      <label htmlFor="enquiry-privacy">I have read the Privacy Policy and understand how my details will be used to respond to this enquiry.</label>
                    </div>
                    <p className="enquiry-terms-note">
                      Please read our <Link to="/policies/privacy">Privacy Policy</Link>. Sending an enquiry does not confirm a booking or lock in a price. Any confirmed booking will be subject to Aura's <Link to="/policies/terms">Terms and Conditions</Link> and the agreed fare, which will be shared with you before confirmation.
                    </p>
                    <p className="enquiry-hint">We ask you to acknowledge the Privacy Policy here. The booking terms are provided for your review before you accept a confirmed booking.</p>
                  </div>
                )}
              </div>

              <div className="enquiry-step-actions">
                <button className="enquiry-back" type="button" onClick={handleBack} disabled={step === 0}>Back</button>
                <button className="button button-dark" type="submit">{step === steps.length - 1 ? "Complete enquiry preview" : "Continue"}</button>
              </div>
            </form>
          </>
        ) : (
          <div className="enquiry-complete" role="status">
            
            <h3>Your details are ready.</h3>
            <p>This is a design preview and is not connected to a live inbox. Your information has not been sent or stored.</p>
            <button className="enquiry-back" type="button" onClick={() => { setSubmitted(false); setStep(0); }}>Start again</button>
          </div>
        )}
      </div>
    </section>
  );
}

function AboutPage() {
  return <main id="main-content" tabIndex={-1}><PageHero title={<>A more thoughtful<br /><em>kind of luxury.</em></>} intro="Aura Studio brings together travel, personal style and wellbeing under one considered point of view." image={ASSETS.about} imageAlt="Architectural interior and considered natural materials" /><section className="feature-text section-pad"><div><h2>It is the feeling<br /><em>of being looked after.</em></h2></div><div><p>We believe quality is as much about how something makes you feel as it is about how it looks. That belief shapes every part of Aura Studio.</p><p>Each division has its own purpose, but they share the same standard: clarity, care and thoughtful attention to detail.</p></div></section><section className="values-grid"><StandardItem icon="01" title="Consideration" body="Every choice begins with the person on the other side of it." /><StandardItem icon="02" title="Consistency" body="A premium experience should feel considered at every touchpoint." /><StandardItem icon="03" title="Integrity" body="Clear promises, honest information and accountability." /><StandardItem icon="04" title="Respect" body="Your time, choices, privacy and wellbeing matter." /></section></main>;
}

function BlogPage() {
  const entries = [
    { category: "Travel", title: "The art of arriving well", body: "A few thoughts on calmer journeys and thoughtful details.", image: ASSETS.lifestyle },
    { category: "Style", title: "A wardrobe with intention", body: "An introduction to a more considered approach to everyday dressing.", image: ASSETS.dress },
    { category: "Wellbeing", title: "Making space to reset", body: "Why rest deserves a place in the rhythm of everyday life.", image: ASSETS.sustainability },
  ];
  return <main id="main-content" tabIndex={-1}><PageHero title={<>Notes on living<br /><em>well.</em></>} intro="Stories, observations and small reminders to move through life with a little more intention." /><section className="section-pad"><div className="blog-grid blog-grid-large">{entries.map((entry) => <article className="blog-card blog-card-static" key={entry.category}><div className="blog-card-image"><img src={entry.image} alt="" loading="lazy" /></div><h3>{entry.title}</h3><p>{entry.body}</p></article>)}</div><p className="catalogue-note">Blog articles are editorial placeholders and will be written and reviewed before publication.</p></section></main>;
}

type ContactValues = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  privacyAcknowledged: boolean;
};

function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero title={<>Let's begin<br /><em>with a conversation.</em></>} intro="Whether you are planning a journey, exploring the collection or looking for a moment to reset, we would be glad to hear from you." />
      <section className="contact-layout section-pad">
        <div>
          
          <h2>Tell us what<br /><em>you have in mind.</em></h2>
          <p>Share a little about what you need. We will take it one step at a time, and you can go back to make changes before finishing.</p>
          <p className="contact-placeholder">Official contact details will be added once Aura's business email, telephone and service locations are confirmed.</p>
        </div>
        <ContactFlow />
      </section>
    </main>
  );
}

function ContactFlow() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    privacyAcknowledged: false,
  });
  const steps = ["Your name", "Contact details", "What brings you here?", "Your message", "Before you finish"];

  const update = <Key extends keyof ContactValues>(key: Key, value: ContactValues[Key]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="enquiry-flow contact-flow">
      {!submitted ? (
        <>
          <div className="enquiry-flow-top">
            <span>Step {step + 1} of {steps.length}</span>
            <span>{Math.round(((step + 1) / steps.length) * 100)}% complete</span>
          </div>
          <div
            className="enquiry-progress"
            role="progressbar"
            aria-label="Contact form progress"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={step + 1}
          >
            <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <form className="enquiry-form enquiry-step-form" onSubmit={handleSubmit}>
            <div className="enquiry-step-content" key={step} aria-live="polite">
              
              <h3>{steps[step]}</h3>

              {step === 0 && (
                <label htmlFor="contact-name">What should we call you?
                  <input id="contact-name" name="name" autoComplete="name" autoFocus required value={values.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
                </label>
              )}

              {step === 1 && (
                <>
                  <label htmlFor="contact-email">What's the best email address to reach you?
                    <input id="contact-email" name="email" type="email" autoComplete="email" autoFocus required value={values.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" />
                  </label>
                  <label htmlFor="contact-phone">Phone number <span className="field-optional">Optional</span>
                    <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Your contact number" />
                  </label>
                </>
              )}

              {step === 2 && (
                <label htmlFor="contact-interest">What are you getting in touch about?
                  <select id="contact-interest" name="interest" autoFocus required value={values.interest} onChange={(event) => update("interest", event.target.value)}>
                    <option value="" disabled>Choose a topic</option>
                    <option>Transfers</option>
                    <option>Clothing</option>
                    <option>Spa</option>
                    <option>Something else</option>
                  </select>
                </label>
              )}

              {step === 3 && (
                <label htmlFor="contact-message">How can we help?
                  <textarea id="contact-message" rows={5} name="message" autoFocus required value={values.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us a little about what you have in mind..." />
                </label>
              )}

              {step === 4 && (
                <div className="enquiry-consent">
                  <p className="enquiry-consent-intro">One last thing before you finish.</p>
                  <div className="consent-check">
                    <input
                      id="contact-privacy"
                      name="privacyAcknowledged"
                      type="checkbox"
                      required
                      checked={values.privacyAcknowledged}
                      onChange={(event) => update("privacyAcknowledged", event.target.checked)}
                    />
                    <label htmlFor="contact-privacy">I have read the Privacy Policy and understand how my details will be used to respond to this message.</label>
                  </div>
                  <p className="enquiry-terms-note">
                    Please read our <Link to="/policies/privacy">Privacy Policy</Link>. Any booking or purchase will be subject to the relevant <Link to="/policies/terms">Terms and Conditions</Link>, which will be provided before you commit.
                  </p>
                </div>
              )}
            </div>
            <div className="enquiry-step-actions">
              <button className="enquiry-back" type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>Back</button>
              <button className="button button-dark" type="submit">{step === steps.length - 1 ? "Complete message preview" : "Continue"}</button>
            </div>
          </form>
        </>
      ) : (
        <div className="enquiry-complete" role="status">
          
          <h3>Your message is ready.</h3>
          <p>This is a design preview. Your message has not been sent or stored. A secure contact route will be connected before launch.</p>
          <button className="enquiry-back" type="button" onClick={() => { setSubmitted(false); setStep(0); }}>Start again</button>
        </div>
      )}
    </div>
  );
}
function FaqPage() {
  const faqs = [
    ["How do I book a transfer?", "Send a transfer enquiry with your route and preferred travel date. A booking is only confirmed once Aura has provided written confirmation."],
    ["Can I shop the clothing collection now?", "The clothing section is currently a visual preview. Product names, sizes, prices, stock and fulfilment information will be added before sales open."],
    ["How do I book a spa appointment?", "Use the spa enquiry form to share what you are looking for. The service menu and appointment availability will be confirmed before bookings open."],
    ["Where are airport transfers available?", "The airport transfer services listed on this site are available for selected journeys in Cape Town, South Africa. Availability is confirmed for the requested route and service. Clothing and spa availability are separate."],
    ["How are card payments handled?", "The intended setup is a hosted payment page from the selected payment provider. Aura will not ask customers to send card details by email, phone or message."],
    ["How do I change my privacy choices?", "Use Cookie settings in the footer to reopen the preference panel. You can also read the privacy and cookie policies for more information."],
  ];
  return <main id="main-content" tabIndex={-1}><PageHero title={<>Good to know.<br /><em>Before you begin.</em></>} intro="A few answers to help you understand how Aura Studio works." /><section className="faq-list section-pad">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</section></main>;
}

function TrustPage() {
  return <main id="main-content" tabIndex={-1}><PageHero title={<>Care is a practice.<br /><em>Not a promise.</em></>} intro="Aura is being designed around privacy, secure operations, accessible journeys and clear consumer information. These are build commitments, not claims of certification." /><section className="trust-grid section-pad"><TrustCard title="Privacy by design" copy="Collect only the information needed for the service, explain why it is needed, limit access and define retention." items={["Clear privacy notice","Purpose-limited collection","Optional consent controls","Documented retention and deletion"]} /><TrustCard title="Secure payment hand-off" copy="Use a hosted payment provider for card entry and verify payment confirmations server-side before marking an order as paid." items={["No card data stored by Aura","Hosted checkout","Server-side payment verification","Restricted secrets and access"]} /><TrustCard title="Consumer clarity" copy="Give customers the information needed to decide, review and correct an order before committing." items={["Full prices and charges","Clear delivery and booking details","Returns and cancellations","Support and complaint route"]} /><TrustCard title="Accessible experience" copy="Build towards WCAG 2.1 AA with accessible structure, focus states, keyboard use and reduced-motion support." items={["Semantic page structure","Visible keyboard focus","Form labels and error messages","Responsive, readable layouts"]} /></section><section className="trust-footnote"><p>Standards and laws are not interchangeable. Legal applicability depends on the markets served and the business's actual operations. The final policies, technical controls and supplier contracts must be reviewed before launch.</p><Link to="/policies/privacy" className="text-link">Read the privacy policy</Link></section></main>;
}

function TrustCard({ title, copy, items }: { title: string; copy: string; items: string[] }) {
  return <article className="trust-card"><h2>{title}</h2><p>{copy}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const cartProducts = items
    .map((line) => ({ ...line, product: products.find((product) => product.slug === line.slug) }))
    .filter((line) => line.product);
  const itemCount = cartProducts.reduce((total, line) => total + line.quantity, 0);

  if (cartProducts.length === 0) {
    return <main id="main-content" tabIndex={-1} className="empty-state section-pad"><h1>Your bag is empty.</h1><p>Explore the clothing collection and add pieces to your bag.</p><Link className="button button-dark" to="/clothing">Shop clothing</Link></main>;
  }

  return (
    <main id="main-content" tabIndex={-1} className="cart-page section-pad">
      <div className="cart-heading"><h1>Shopping bag</h1></div>
      <div className="cart-lines">
        {cartProducts.map((line) => (
          <article className="cart-line" key={line.slug}>
            <img src={line.product!.image} alt={line.product!.name} />
            <div className="cart-line-copy">
              <h2>{line.product!.name}</h2>
              <p className="cart-line-label">Quantity</p>
              <div className="cart-quantity" role="group" aria-label={`${line.product!.name} quantity`}>
                <button type="button" aria-label={`Decrease quantity of ${line.product!.name}`} onClick={() => updateQuantity(line.slug, line.quantity - 1)}>−</button>
                <output className="cart-quantity-value" aria-live="polite">{line.quantity}</output>
                <button type="button" aria-label={`Increase quantity of ${line.product!.name}`} onClick={() => updateQuantity(line.slug, line.quantity + 1)}>+</button>
              </div>
              <p className="product-price-pending">Price to be confirmed</p>
              <button className="text-link cart-remove" type="button" aria-label={`Remove ${line.product!.name} from bag`} onClick={() => removeItem(line.slug)}>Remove</button>
            </div>
          </article>
        ))}
      </div>
      <div className="cart-summary">
        <div>
          <strong>{itemCount} {itemCount === 1 ? "item" : "items"} in your bag</strong>
          <p>Final prices, delivery and taxes will be shown before payment.</p>
        </div>
        <Link className="button button-dark" to="/checkout">Continue to checkout</Link>
      </div>
    </main>
  );
}

function CheckoutPage() {
  return <main id="main-content" tabIndex={-1} className="empty-state section-pad"><h1>Checkout is being prepared.</h1><p>Peach Payments will power the hosted card payment journey. Live checkout will be enabled once product prices, stock, delivery rules and server-side payment verification are configured.</p><Link className="button button-dark" to="/cart">Return to your bag</Link></main>;
}

function PolicyPage() {
  const { policy } = useParams();
  const data = policy ? policyContent[policy] : undefined;
  if (!data) return <NotFoundPage />;
  return <main id="main-content" tabIndex={-1}><section className="policy-hero"><h1>{data.title}</h1><p>{data.intro}</p><span className="policy-draft-label">Draft for launch review · Last updated 20 November 2026</span></section><article className="policy-content">{data.sections.map((section, index) => <section key={section.heading}><span className="policy-number">0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></section>)}<aside className="policy-note"><strong>Important</strong><p>This page is a working website draft, not legal advice and not a representation that Aura Studio is compliant in every country. Confirm the operating entity, markets, providers and service rules, then obtain jurisdiction-specific legal review before launch.</p></aside></article></main>;
}

function NotFoundPage() {
  return <main id="main-content" tabIndex={-1} className="empty-state section-pad"><h1>Not this<br /><em>way.</em></h1><p>The page you are looking for may have moved.</p><Link className="button button-dark" to="/">Back to Aura</Link></main>;
}

function App() {
  return <AppShell />;
}

export default App;
