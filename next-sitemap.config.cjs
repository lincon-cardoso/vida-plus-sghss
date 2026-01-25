/** @type {import('next-sitemap').IConfig} */
const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://vidaplus.devlincon.com.br");

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/api/*", "/roles/*", "/_not-found"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/roles/*/dashboard/"],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
};
