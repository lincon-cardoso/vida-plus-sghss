import "@/styles/globals.scss";
import { getNonce } from "@/lib/nonce";
import type { Metadata, Viewport } from "next";

// ─── Metadados SEO e Open Graph ───────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://vidaplus.com"), // Substitua pela URL real
  title: {
    default: "VidaPlus - Sistema de Gestão Hospitalar",
    template: "%s | VidaPlus",
  },
  description:
    "Sistema de Gestão Hospitalar e Serviços de Saúde (SGHSS) - Plataforma moderna e segura para gestão de serviços de saúde, telemedicina e atendimento ao paciente.",
  keywords: [
    "hospital",
    "saúde",
    "telemedicina",
    "gestão hospitalar",
    "prontuário eletrônico",
    "agendamento médico",
    "SGHSS",
    "VidaPlus",
  ],
  authors: [{ name: "VidaPlus" }],
  creator: "VidaPlus",
  publisher: "VidaPlus",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "VidaPlus",
    title: "VidaPlus - Sistema de Gestão Hospitalar",
    description:
      "Plataforma moderna e segura para gestão de serviços de saúde, telemedicina e atendimento ao paciente.",
    images: [
      {
        url: "/icons/icons.png", // Imagem Open Graph
        width: 1200,
        height: 630,
        alt: "VidaPlus - Sistema de Gestão Hospitalar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VidaPlus - Sistema de Gestão Hospitalar",
    description:
      "Plataforma moderna e segura para gestão de serviços de saúde.",
    images: ["/icons/icons.png"],
  },
  alternates: {
    canonical: "/", // Caminho relativo
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VidaPlus",
      description: "Sistema de Gestão Hospitalar e Serviços de Saúde (SGHSS)",
      url: "https://vidaplus.com",
      logo: "/icons/icons.png",
      sameAs: [
        // Adicione URLs de redes sociais se houver
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-11-9999-9999", // Substitua pelo telefone real
        contactType: "customer service",
      },
      medicalSpecialty: "Healthcare",
      foundingDate: "2023", // Substitua pela data real
    }),
  },
};

// ─── Viewport e Theme Color ───────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = await getNonce();

  return (
    <html lang="pt-BR">
      <head>
        {/* Nonce disponível para scripts inline se necessário */}
        <meta name="csp-nonce" content={nonce} />
      </head>
      <body className="app-root">{children}</body>
    </html>
  );
}
