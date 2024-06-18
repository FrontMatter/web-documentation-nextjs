import { CONFIG } from "../constants";

export class StarService {
  private static stars: number | undefined;
  private static starCaller: Promise<Response> | undefined;

  public static async get(): Promise<number> {
    if (StarService.stars) {
      return StarService.stars;
    }

    if (!StarService.starCaller) {
      StarService.starCaller = fetch(`${CONFIG.urls.api}/api/stars`);
    }

    const response = await StarService.starCaller;

    if (response && response.ok) {
      const data = await response.clone().json();
      if (data && data.stars) {
        StarService.stars = data.stars;
        return data.stars as number;
      }
    }

    return 0;
  }
}
