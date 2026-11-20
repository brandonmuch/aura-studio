# Aura Studio: regulatory and control map

**Document owner:** Aura Studio management  
**Status:** Working control design, not legal sign-off  
**Last reviewed:** 20 November 2026  
**Applies to:** Website, online catalogue, transfers enquiries, spa enquiries, customer communications, checkout and supporting service providers

## 1. Purpose and limits

Aura Studio is being developed as a South Africa-based merchant with three service lines: transfers, clothing and spa. This document gives the build a practical baseline for privacy, security, consumer transparency and accessibility.

There is no single policy or certification that makes a business compliant worldwide. Legal duties depend on the operating entity, where Aura is established, where customers are located, which markets are actively targeted, the products and services sold and the data processing that actually occurs. A global baseline must therefore be supported by market-specific legal addenda and operational evidence.

The site is currently a development preview. Forms, newsletter capture, product ordering, bookings, analytics, marketing tags and PayFast processing are not live. A control marked **designed** is not evidence that the control is implemented or operating.

## 2. Regulatory baseline and applicability triggers

| Market or standard | Why it matters to Aura | Implementation consequence |
|---|---|---|
| South Africa: Protection of Personal Information Act 4 of 2013 (POPIA) | Primary privacy framework for processing connected with the South African business. | Identify the responsible party and Information Officer where required; document purposes, lawful grounds, notices, security safeguards, operator arrangements, data subject requests, retention and cross-border transfers. |
| South Africa: Electronic Communications and Transactions Act 25 of 2002 (ECTA), Chapter VII | E-commerce disclosures, transaction review and certain cooling-off rules can apply to electronic transactions. | Publish supplier identity and contact details, product/service characteristics, full prices and fees, payment method, terms, delivery/service timing, return and refund information, privacy and security information. Let customers review and correct an order before final submission. Assess statutory exclusions and rights per transaction. |
| South Africa: Consumer Protection Act 68 of 2008 | Consumer-facing goods and services may be subject to fair marketing, quality, disclosure and redress requirements. | Do not use blanket exclusions that purport to remove mandatory consumer rights. Review product, service, cancellation and remedy wording. |
| Zimbabwe: Cyber and Data Protection Act [Chapter 12:07] | Potentially relevant when Aura processes personal information in Zimbabwe or falls within the Act's territorial rules. | Assess licencing/registration and representative requirements where relevant; map processing, security, data subject rights and transborder flows with Zimbabwean advice. |
| Zimbabwe: Consumer Protection Act 2019 [Chapter 14:44] | Contains electronic transaction disclosure and consumer protection provisions. | Review supplier identity, full price and costs, transaction record, dispatch/delivery or service timing, returns/refunds, privacy/security and pre-order correction processes. Check cooling-off rules and transaction-specific exclusions before setting policy text. |
| EU: General Data Protection Regulation (GDPR) | Can apply to a non-EU business where processing relates to offering goods/services to people in the EU or monitoring behaviour there. | If EU markets are targeted, assess territorial scope, representative requirements, lawful bases, notices, rights, processors, international transfers and any other applicable GDPR duties. |
| United Kingdom: UK GDPR and Data Protection Act 2018 | Can apply to a UK-established business, and may also affect a non-UK business targeting or monitoring people in the UK. Restricted international transfers must be assessed where UK GDPR applies. | If UK customers are targeted, assess scope, notices, rights, controller/processor terms and transfer mechanism before launch. |
| PCI DSS | Payment security standard relevant to organisations that store, process or transmit payment account data, and to systems that can affect the cardholder-data environment. | Use a provider-hosted payment page. Confirm the exact integration, PCI validation method and residual merchant obligations with the acquirer/provider. Do not assume hosted checkout removes all merchant duties. |
| WCAG 2.2 | International web accessibility standard and a useful technical target; local accessibility laws may reference different or additional requirements. | Build toward WCAG 2.2 AA, then test with automated and manual methods. A target is not a certification or conformance claim. |

### Source register

- South Africa POPIA: https://www.gov.za/documents/protection-personal-information-act
- South Africa ECTA: https://www.gov.za/sites/default/files/gcis_document/201409/a25-02.pdf
- South Africa Consumer Protection Act: https://www.gov.za/documents/consumer-protection-act
- Zimbabwe Cyber and Data Protection Act: https://zimlii.org/akn/zw/act/2021/5/eng%402022-03-11
- Zimbabwe Consumer Protection Act: https://zimlii.org/akn/zw/act/2019/5/eng%402019-12-10
- EU GDPR, Article 3 territorial scope: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/
- UK ICO, international transfers: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/a-brief-guide-to-international-transfers/
- PCI Security Standards Council: https://www.pcisecuritystandards.org/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

This register is a starting point, not a complete worldwide legal survey. Before opening a new country, record the country, customer segment, marketing activity, order fulfilment route, payment flow, data locations and legal review outcome.

## 3. Website and operational control set

| ID | Control | Minimum implementation / evidence | Priority | Status |
|---|---|---|---|---|
| GOV-01 | Legal entity disclosure | Approved legal name, legal status, registration number, jurisdiction, physical/business address and contact channels in the footer and terms. | Launch blocker | Not supplied |
| GOV-02 | Market scope register | List each country served, targeted and excluded; record legal review and owner before enabling checkout or bookings. | Launch blocker | Not started |
| PRI-01 | Processing inventory | Data map covering contact forms, booking records, customer accounts (if added), orders, payment references, support, logs, analytics and marketing. | Launch blocker | Not started |
| PRI-02 | Privacy notice | Identify controller/responsible party, contact, data categories, purposes, lawful grounds, sharing, transfer locations, retention, rights and complaint route. | Launch blocker | Draft route created |
| PRI-03 | Data minimisation | Collect only information necessary for the selected product, transfer or treatment. Avoid collecting health details in a general web form. | Launch blocker | Design principle |
| PRI-04 | Sensitive information | If spa suitability or health information is genuinely needed, define a separate purpose, lawful ground, restricted access, retention and secure collection route. | Launch blocker before spa health data | Not implemented |
| PRI-05 | Data subject request workflow | Provide a monitored contact channel and process to verify, log, respond to and track access, correction, deletion, objection and consent withdrawal requests as applicable. | Launch blocker | Not started |
| PRI-06 | Retention and deletion | Retention schedule by record type, legal basis, retention trigger, owner and secure deletion method. | Launch blocker | Not started |
| PRI-07 | Supplier and processor governance | Vendor register and contracts for hosting, payments, email, analytics, CRM, courier, scheduling and customer-support services. | Launch blocker | Not started |
| PRI-08 | Cross-border transfers | Map where data is stored or remotely accessed; document the applicable transfer mechanism and contractual safeguards. | Launch blocker | Not started |
| PRI-09 | Marketing permission | Separate optional marketing choice from service/order processing; store evidence of permission and provide unsubscribe. | Before marketing | UI preview only |
| COOK-01 | Cookie and tracking controls | Inventory each cookie, SDK, pixel and tag; categorise by purpose; block optional technologies until valid choice where required; persist and honour changes. | Before non-essential tags | Preference UI only |
| SEC-01 | TLS and headers | Force HTTPS; set secure headers and a restrictive Content Security Policy after all required assets and services are known. | Launch blocker | Not configured |
| SEC-02 | Identity and access | MFA for administrative accounts, least privilege, unique accounts, periodic access review and prompt offboarding. | Launch blocker | Operational control required |
| SEC-03 | Secrets management | Store payment and service credentials as Cloudflare secrets; never expose them in browser code, logs or Git history. | Launch blocker | No secrets present |
| SEC-04 | Application security | Validate input server-side, rate-limit public endpoints, protect against CSRF where relevant, use safe output handling and keep dependencies patched. | Launch blocker | API not built |
| SEC-05 | Logging and monitoring | Log security-relevant events without unnecessary personal/payment data; define alerting, access and retention. | Launch blocker | Health endpoint only |
| SEC-06 | Backup and recovery | Define backup frequency, recovery objectives, restoration tests and responsibility for any database and object storage. | Before production | Not configured |
| SEC-07 | Incident response | Assign incident owner, escalation contacts, evidence preservation, containment steps and legal notification assessment process. | Launch blocker | Not started |
| PAY-01 | Hosted card entry | Card details collected only on provider-hosted checkout; Aura receives provider identifiers/status, not full card data or CVV. | Launch blocker for online payment | Not integrated |
| PAY-02 | Server-side payment verification | Verify provider signature/ITN, merchant identity, amount, reference, currency, status and replay/idempotency; mark paid only after trusted verification. | Launch blocker for online payment | Not integrated |
| PAY-03 | Payment reconciliation | Reconcile provider settlement reports to internal order records and handle failed, delayed, duplicate and refunded transactions. | Before production | Not started |
| CON-01 | Product and service disclosure | Accurate item/service descriptions, availability, material/size details where relevant, exclusions and any limitations. | Launch blocker | Preview content only |
| CON-02 | Full price disclosure | Show price, tax, delivery/travel fees and other mandatory or known charges before customer commits. | Launch blocker | No catalogue prices |
| CON-03 | Review and correction | Provide a clear final summary and a way to correct errors before an order or booking is submitted. | Launch blocker | Checkout not built |
| CON-04 | Returns and refunds | Country-specific policy and operational workflow covering statutory rights, faulty goods, cancellations, return method, costs and refund timing. | Launch blocker for product sales | Draft route created |
| CON-05 | Delivery | Publish fulfilment destinations, costs, duties/taxes handling, dispatch estimates, tracking and failed-delivery process. | Launch blocker for shipping | Draft route created |
| CON-06 | Transfers booking | Confirm route, pick-up, time, passenger/luggage limits, fare, waiting and change/cancellation conditions in writing. | Launch blocker for transfer bookings | Draft route created |
| CON-07 | Spa booking | Confirm service details, duration, location, price, suitability requirements and cancellation terms; keep any necessary health information separate and restricted. | Launch blocker for spa bookings | Draft route created |
| CON-08 | Complaints and redress | Publish a working support channel, complaint record process, response owner and escalation route. | Launch blocker | Contact details missing |
| ACC-01 | Accessibility | Target WCAG 2.2 AA, with automated scans plus keyboard, zoom, screen reader, contrast, mobile and reduced-motion manual testing. | Launch blocker | Initial patterns only |
| ACC-02 | Accessible documents and media | Ensure policy pages are structured and readable; provide useful alternatives for meaningful imagery and captions/transcripts for media. | Before publication | In progress |
| GOV-03 | Change and release governance | Review legal copy, consent, third-party scripts, payment code and market changes before release; keep evidence and approval history. | Before production | Not started |

## 4. Division-specific controls

### Aura Transfers
- Confirm exact service area and whether cross-border or airport routes are offered.
- Capture only necessary booking details: customer contact, itinerary, service time, passenger count and relevant logistics.
- Document vehicle capacity, luggage limits, waiting time, late arrival, route changes, weather/disruption, cancellation and refund rules.
- Confirm required vehicle, operator, driver, licensing and insurance arrangements for every operating location.
- Do not promise a transfer until availability and fare are confirmed.

### Aura Clothing
- Do not publish placeholder images as if they accurately depict live products.
- Before sales, populate product names, SKUs, materials, size information, accurate imagery, prices, tax treatment, stock and delivery eligibility.
- Provide clear returns, faulty-item and refund routes that preserve mandatory local rights.
- Keep customer order and shipping information separate from optional marketing profiles.

### Aura Spa
- Confirm actual treatments, practitioner qualifications (where relevant), premises, prices, durations and service eligibility.
- Do not collect health information through the general contact form.
- Where treatment suitability information is necessary, use a separate secure workflow with restricted access and defined retention.
- Make cancellation, no-show, deposit and rescheduling terms visible before booking.

## 5. PayFast hosted-checkout design requirements

The current intended payment design is a South African merchant using PayFast hosted checkout, subject to final merchant onboarding and provider confirmation.

1. The React storefront sends a cart or booking reference to Aura's backend.
2. The backend loads the saved order, confirms availability and calculates the authoritative total and currency.
3. The backend creates a pending payment record and a provider request using server-side secrets.
4. The browser is redirected to PayFast's hosted payment page for card entry.
5. The provider sends a server notification to Aura's backend.
6. The backend validates the notification signature and source, reconciles merchant ID, payment reference, amount, currency and payment status, and makes the handler idempotent.
7. Aura marks the order/booking as paid only after verified confirmation, then sends a receipt/confirmation through the configured service.
8. A browser return URL is a user-experience signal only. It is not proof of payment.

Multi-currency pricing shown to customers must not be confused with Aura receiving settlement in that currency. Confirm settlement currency and conversion costs with PayFast before advertising USD settlement.

## 6. Global baseline versus country addenda

Maintain one global baseline for privacy, security, honest disclosures, accessibility and vendor governance. Add a market schedule for every country Aura actively serves.

Each schedule should record:
- legal entity and local registrations or licences;
- privacy law and any regulator registrations/representative requirements;
- consumer and e-commerce disclosure rules;
- cooling-off, cancellation, return and refund requirements and exceptions;
- tax, duties, invoicing and currency disclosures;
- payment methods and local financial-services requirements;
- service licensing, transport, spa or health-related rules;
- marketing and electronic communications requirements;
- accessibility obligations;
- cross-border data-transfer mechanism;
- local complaint, dispute-resolution and regulator contacts;
- date and identity of legal reviewer and next review date.

Do not silently apply South African wording to Zimbabwean, UK, EU or other customers where mandatory law differs.

## 7. Production readiness checklist

- [ ] Confirm Aura's legal entity, registration details, country of establishment and business address.
- [ ] Confirm countries actually served and targeted.
- [ ] Complete local legal review for South Africa and Zimbabwe before taking orders in either market.
- [ ] Decide if EU, UK or other markets are targeted and commission any required addenda.
- [ ] Identify the privacy lead/Information Officer or equivalent and publish verified contact details.
- [ ] Complete the data inventory, vendor register, retention schedule and transfer map.
- [ ] Finalise privacy, cookies, terms, shipping, returns and booking policies.
- [ ] Replace template preview images and placeholder catalogue records with approved Aura-owned assets and accurate products.
- [ ] Connect forms through protected backend endpoints and test spam/rate-limit controls.
- [ ] Configure Cloudflare D1/R2, secrets, security headers, backups and monitoring as required.
- [ ] Complete PayFast onboarding, hosted checkout and server-side notification verification.
- [ ] Perform test transactions, refunds and settlement reconciliation, including a Zimbabwe-issued Visa test if such cards are a target.
- [ ] Complete accessibility audit and remediate significant barriers.
- [ ] Run privacy, security, consumer checkout and operational tests and retain evidence.
- [ ] Obtain jurisdiction-specific legal review and management approval before production launch.

## 8. Review cadence and evidence

Review this map at least annually and whenever Aura adds a country, a new division/service, a new payment method, a new tracking technology or a materially new service provider. Keep evidence such as approvals, notices, consent records, data maps, vendor agreements, test reports, incident logs, access reviews and reconciliation records.

**Status vocabulary:** Not started · Designed · Implemented · Evidence collected · Reviewed/approved.

A feature is not production-ready solely because its page or component exists in the codebase.
