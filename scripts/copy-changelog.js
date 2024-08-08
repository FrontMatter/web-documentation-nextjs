const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

(async () => {
  try {
    const production = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

    const changelogUrl = `https://raw.githubusercontent.com/estruyf/vscode-front-matter/${production ? "main" : "beta"
      }/CHANGELOG.md`;

    const response = await fetch(changelogUrl);
    if (!response.ok) {
      return;
    }

    let changelog = await response.text();

    if (production) {
      changelog = changelog.replace(
        /beta.frontmatter.codes/g,
        "frontmatter.codes"
      );
    }

    fs.writeFileSync(
      path.resolve(__dirname, "../content/changelog/CHANGELOG.md"),
      changelog,
      "utf8"
    );
  } catch (e) {
    // We'll just ignore this
  }
})();
