import * as shiki from "shiki";

export class ShikiService {
  public static highlighter: shiki.Highlighter | undefined = undefined;

  public static async getHighlighter(): Promise<shiki.Highlighter> {
    if (!ShikiService.highlighter) {
      shiki.setCDN(`../../`);

      ShikiService.highlighter = await shiki.getHighlighter({
        theme: `the-unnamed`,
        langs: ["yaml", "json", "markdown", "bash", "js", "javascript", "go"],
      });
    }
    return ShikiService.highlighter;
  }
}
