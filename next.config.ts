// next.config.ts
// Configuração principal do Next.js para build, segurança e performance.
// Última atualização: Janeiro 2026

import type { NextConfig } from "next";

// Constantes de cache para reutilização
const CACHE_IMMUTABLE = "public, max-age=31536000, immutable";
const CACHE_STATIC = "public, max-age=86400, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  // === Build & Deploy ===
  output: "standalone", // Facilita deploy em containers (Docker/Kubernetes)
  reactStrictMode: true, // Detecta problemas em dev (double render intencional)
  poweredByHeader: false, // Remove header X-Powered-By (segurança)
  productionBrowserSourceMaps: false, // Não expõe source maps em prod
  compress: true, // Habilita gzip/brotli (melhora TTFB)
  trailingSlash: false, // URLs consistentes sem trailing slash

  // === Experimental (estáveis em Next.js 15+) ===
  experimental: {
    optimizeCss: true, // Deduplica CSS em builds grandes
  },

  // === Otimização de Imagens ===
  images: {
    formats: ["image/avif", "image/webp"], // Formatos modernos com melhor compressão
    minimumCacheTTL: 14400, // 4 horas (novo padrão Next.js 16 para reduzir revalidações)
    remotePatterns: [
      // Desenvolvimento local
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
      // Produção
      {
        protocol: "https",
        hostname: "vidaplus.devlincon.com.br",
      },
      // Adicione outros domínios conforme necessário (CDN, avatars, etc.)
      // Exemplo:
      // {
      //   protocol: "https",
      //   hostname: "cdn.vidaplus.com.br",
      //   pathname: "/images/**",
      // },
    ],
    // Segurança para SVGs (se habilitado no futuro)
    dangerouslyAllowSVG: false,
  },

  // === Headers HTTP ===
  // Nota: Headers de segurança (CSP, HSTS, etc.) são aplicados via proxy.ts
  // Aqui definimos apenas headers de cache para assets estáticos.
  // Motivo: CSP e headers dinâmicos (ex.: nonce por request) precisam ser gerados
  // por request no middleware/proxy, não em config estática (ver regras do repo:
  // "CSP/nonce por request em src/proxy.ts"). Headers de cache são estáticos e
  // otimizam performance sem conflitos.
  async headers() {
    return [
      // Assets versionados do Next.js (cache permanente)
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_IMMUTABLE }],
      },
      // Imagens otimizadas (cache permanente)
      {
        source: "/_next/image/:path*",
        headers: [{ key: "Cache-Control", value: CACHE_IMMUTABLE }],
      },
      // Arquivos estáticos públicos (cache de 1 dia)
      {
        source:
          "/(.*)\\.(ico|svg|png|jpg|jpeg|gif|webp|avif|woff|woff2|ttf|eot|otf)$",
        headers: [{ key: "Cache-Control", value: CACHE_STATIC }],
      },
      // Manifest PWA (cache curto para atualizações)
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      // Service Worker (cache curto para atualizações)
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=0, must-revalidate, stale-while-revalidate=60",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
      // === CORS para API Routes ===
      // Permite chamadas Cross-Origin para endpoints de API a partir de origens confiáveis.
      // Controlado via variável de ambiente ALLOWED_API_ORIGINS (ex.: https://vidaplus.devlincon.com.br).
      // Se ALLOWED_API_ORIGINS estiver vazio, por segurança usamos a origem do site (NEXT_PUBLIC_SITE_URL) como default.
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.ALLOWED_API_ORIGINS ||
              process.env.NEXT_PUBLIC_SITE_URL ||
              "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
    ];
  },

  // === Overrides para Desenvolvimento ===
  ...(process.env.NODE_ENV === "development" && {
    compress: false, // Desabilita compressão para logs mais claros
  }),
};

export default nextConfig;
