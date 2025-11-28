import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactCompiler: true,
  reactStrictMode: true,

  // Show minimal dev indicators
  devIndicators: {},

  experimental: {
    optimizePackageImports: ["lucide-react", "zod"],
  },

  httpAgentOptions: {
    keepAlive: true,
  },

  async headers() {
    // Build connect-src from environment if provided, otherwise default to self
    const defaultConnectSrc = ["'self'"];
    const envConnect =
      process.env.NEXT_PUBLIC_CSP_CONNECT_SRC || process.env.CSP_CONNECT_SRC;
    const extraConnect = envConnect
      ? envConnect.split(/\s*,\s*/).filter(Boolean)
      : [];

    const connectSrc = [...defaultConnectSrc, ...extraConnect];

    // CSP directives - more relaxed in development for Next.js compatibility
    const scriptSrc = isProd
      ? `script-src 'self'`
      : `script-src 'self' 'unsafe-eval' 'unsafe-inline'`;

    const styleSrc = isProd
      ? `style-src 'self' https:`
      : `style-src 'self' 'unsafe-inline' https:`;

    const cspDirectives = [
      `default-src 'self'`,
      scriptSrc,
      styleSrc,
      `img-src 'self' data: https:`,
      `font-src 'self' data: https:`,
      `connect-src ${connectSrc.join(" ")}`,
      `frame-ancestors 'self'`,
      `base-uri 'self'`,
      `form-action 'self'`,
      ...(isProd ? [`upgrade-insecure-requests`] : []),
    ];

    // Optional isolation headers that can be enabled via env var
    const enableCoopCoep = process.env.ENABLE_COOP_COEP === "true";

    const baseHeaders = [
      {
        key: "Content-Security-Policy",
        // Use a joined string (no 'unsafe-inline') — prefer nonces or hashes for inline assets
        value: cspDirectives.join("; "),
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      ...(isProd
        ? [
            {
              key: "Strict-Transport-Security",
              value: "max-age=63072000; includeSubDomains; preload",
            },
          ]
        : []),
    ];

    if (enableCoopCoep) {
      baseHeaders.push({
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin",
      });
      baseHeaders.push({
        key: "Cross-Origin-Embedder-Policy",
        value: "require-corp",
      });
    }

    return [
      {
        source: "/(.*)",
        headers: baseHeaders,
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
