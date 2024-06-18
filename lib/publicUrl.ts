import { CONFIG } from "../constants";

export function publicUrl() {
  if (CONFIG.environment === "production") {
    return `https://frontmatter.codes`;
  } else if (CONFIG.environment === "preview") {
    return `https://beta.frontmatter.codes`;
  } else {
    return `http://localhost:3000`;
  }
}
