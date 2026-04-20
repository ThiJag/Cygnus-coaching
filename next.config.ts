import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Strict CSP for all public pages
const cspMain = [
  "default-src 'self'",
  // unsafe-eval is required by React in dev mode for call-stack reconstruction; never used in production
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self'",
  "connect-src 'self' https://api.emailjs.com https://*.api.sanity.io https://*.sanity.io wss://*.sanity.io",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.emailjs.com",
].join("; ");

// Sanity Studio requires unsafe-eval and broader connect permissions
const cspStudio = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src * data: blob:",
  "font-src 'self' data:",
  "connect-src * wss:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
].join("; ");

const baseHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [...baseHeaders, { key: "Content-Security-Policy", value: cspMain }],
      },
      {
        // Override CSP for Sanity Studio (needs unsafe-eval)
        source: "/studio/(.*)",
        headers: [{ key: "Content-Security-Policy", value: cspStudio }],
      },
    ];
  },
};

export default nextConfig;
