# Aura Studio

A responsive React storefront for Aura Studio's three divisions: transfers, clothing and spa.

**Visual direction:** understated editorial luxury, using Cormorant Garamond for display typography, DM Sans for interface and body copy, and a palette of black, forest green, deep olive, warm cream and taupe.

## Current experience

- Home page with division entry points, brand story, values, journal preview and newsletter preview
- Aura Transfers service page and enquiry preview
- Aura Clothing catalogue preview and individual product preview pages
- Aura Spa service page and enquiry preview
- About, Journal, Contact and FAQ pages
- Trust and standards overview
- Draft Privacy, Terms, Returns, Shipping, Booking/Cancellation, Cookie and Accessibility pages
- Responsive navigation, search overlay, saved-item preview, cookie preferences and reduced-motion support

## Technology

- React 19 + TypeScript
- Vite
- React Router
- Motion for the restrained text reveal inspired by React Bits BlurText
- Cloudflare Vite plugin and Wrangler for deployment to Cloudflare Workers

## Temporary design images

The site currently uses public preview images from the Modimal template implementation as temporary layout references. They are **not Aura Studio product photography** and must be replaced with Aura-approved Stitch exports before production. All image references are centralised in the `ASSETS` object in `src/App.tsx`.

The template's image URLs are temporary references only. Confirm ownership, licence and final asset hosting before public launch.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Build and type-check

```bash
npm run typecheck
npm run build
```

## Cloudflare

```bash
npm run deploy
```

The Worker currently exposes only `GET /api/health` and serves the built application assets. D1, R2, production domains, secrets and operational bindings are not configured.

## Preview-only functionality

Forms, newsletter, bookings, cart, checkout, analytics and marketing are not connected to live services. Form submissions display an explicit preview notice and are not transmitted or stored. The cookie panel stores the visitor's preference locally, but no analytics or marketing tags are installed. The product catalogue contains no live prices, SKUs, stock or delivery options.

Do not accept live orders or bookings until backend endpoints, server-side validation, order records, fulfilment workflows, privacy controls and support operations are in place.

## Payments

The intended first-launch architecture is a South African Aura merchant using a PayFast-hosted card payment page, subject to final merchant onboarding and confirmation. Aura's backend must calculate order totals, create pending records and validate PayFast server notifications before treating an order as paid. Card numbers and CVVs must never be collected by the Aura storefront.

There is no live PayFast integration or payment credential in this repository.

## Compliance and governance

See the internal [regulatory and control map](compliance/REGULATORY-CONTROL-MAP.md), [country addendum template](compliance/MARKET-ADDENDUM-TEMPLATE.md), [data processing inventory](compliance/DATA-PROCESSING-INVENTORY.md) and [supplier register](compliance/SUPPLIER-REGISTER.md) for the legal and operational controls, applicability triggers, evidence requirements and launch checklist.

The policy pages are working drafts, not legal advice and not a declaration of worldwide compliance. Final legal disclosures require Aura's verified entity details, actual service rules, vendor list, customer markets and country-specific legal review. South Africa and Zimbabwe are the initial markets considered in the control map; other markets require additional assessment.

Accessibility is being designed toward WCAG 2.2 AA, but no accessibility audit or conformance certification has been completed.

## Release gate

Before production launch:

1. Replace all temporary template images and placeholder product/service content.
2. Confirm legal entity and operating markets.
3. Complete privacy data mapping, supplier contracts, retention and cross-border transfer review.
4. Finalise country-specific consumer, shipping, returns, cancellation and booking rules.
5. Configure Cloudflare production resources, secrets, security headers, logging and recovery controls.
6. Implement and test enquiry/booking/order APIs and hosted payment verification.
7. Complete security, payment, privacy and accessibility testing.
8. Obtain management approval and jurisdiction-specific legal review.
