// next.config.ts
import type { NextConfig } from "next";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NOTA: Headers de segurança (CSP, HSTS, etc) são gerenciados pelo proxy
 * Arquivo: src/proxy.ts
 * O CSP usa nonces dinâmicos gerados por request para máxima segurança
 * ═══════════════════════════════════════════════════════════════════════════
 */

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  experimental: {
    optimizeCss: true,
  },

  async headers() {
    return [
      // ─── Assets estáticos versionados (cache longo) ──────
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ─── Imagens otimizadas do Next ─────────────────────
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // ─── Arquivos públicos estáticos ────────────────────
      {
        source: "/(.*)\\.(ico|svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
