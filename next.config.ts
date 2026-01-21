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
      // TODO: Adicionar domínios de produção aqui
      // Exemplos para produção (descomente e ajuste conforme necessário):
      // {
      //   protocol: "https",
      //   hostname: "cdn.vidaplus.com.br",
      //   pathname: "/images/**", // Opcional: restringir path
      // },
      // {
      //   protocol: "https",
      //   hostname: "avatars.githubusercontent.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "**.cloudinary.com", // Wildcard para subdomínios
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
    ];
  },

  // === Overrides para Desenvolvimento ===
  ...(process.env.NODE_ENV === "development" && {
    compress: false, // Desabilita compressão para logs mais claros
  }),
};

export default nextConfig;
