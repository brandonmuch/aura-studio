# Aura Studio

A premium multi-division storefront for Aura Studio, built for Cloudflare Workers.

## Brand system

- Display type: Cormorant Garamond
- Interface and body type: DM Sans
- Palette: black, deep olive, forest green, warm cream and taupe
- Direction: understated luxury, editorial composition, generous whitespace

## Divisions

- Transfers
- Clothing
- Spa

## Stack

- React + TypeScript + Vite
- Cloudflare Workers and the Cloudflare Vite plugin
- Cloudflare D1 for application data (to be bound in a later deployment step)
- Cloudflare R2 for managed media (to be bound in a later deployment step)
- PayFast hosted checkout for card payments (integration is a later milestone)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Cloudflare account setup, D1/R2 bindings, secrets and the production domain will be configured before the first production deployment. Never commit payment credentials or API secrets.

## Project status

Initial storefront scaffold. Product, booking, order and PayFast flows are not yet connected.
