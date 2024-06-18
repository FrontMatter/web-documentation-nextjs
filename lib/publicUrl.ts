import { CONFIG } from "../constants";

export function publicUrl() {
  if (CONFIG.environment === "production") {
    return CONFIG.urls.production;
  } else if (CONFIG.environment === "preview") {
    return CONFIG.urls.preview;
  } else {
    return CONFIG.urls.local;
  }
}
