interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

/**
 * Cloudflare Worker entry point.
 *
 * Only the health endpoint is implemented at this stage. Forms, bookings,
 * orders and payment notifications must be implemented server-side before
 * they are exposed to the storefront. Never trust a browser return URL as
 * proof of payment.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        service: "aura-studio",
        environment: "cloudflare-workers",
      });
    }

    return env.ASSETS.fetch(request);
  },
};
