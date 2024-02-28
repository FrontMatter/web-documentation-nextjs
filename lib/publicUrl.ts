export function publicUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return `https://frontmatter.codes`;
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    return `https://beta.frontmatter.codes`;
  } else {
    return `http://localhost:3000`;
  }
}
