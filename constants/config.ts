export const CONFIG = {
  urls: {
    api: process.env.NEXT_PUBLIC_API_URL,
    production: "https://frontmatter.codes",
    preview: "https://cloudflare.front-matter-docs.pages.dev",
    local: "http://localhost:3000",
  },
  api: {
    sponsors: "/sponsors",
    stats: "/stats",
    stars: "/stars",
  },
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  github: {
    token: process.env.GITHUB_AUTH,
  },
  sponsors: process.env.BACKERS,
  agolia: {
    apiKey: process.env.NEXT_PUBLIC_AGOLIA_APIKEY,
    index: process.env.NEXT_PUBLIC_AGOLIA_INDEX,
    appId: process.env.NEXT_PUBLIC_AGOLIA_APPID,
  },
  giscus: {
    theme: process.env.NEXT_PUBLIC_GISCUS_THEME,
  },
  mendable: {
    key: process.env.MENDABLE_ANON_KEY,
  },
};
