export const CONFIG = {
  apiUrl: "https://fontmatter-fncs.azurewebsites.net",
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  openAi: {
    token: process.env.OPENAI_TOKEN,
  },
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
