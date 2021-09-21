const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

(async () => {
  const production = process.env.VERCEL_ENV === "production";

  const changelogUrl = `https://raw.githubusercontent.com/estruyf/vscode-front-matter/${production ? "main" : "dev"}/CHANGELOG.md`;

  const response = await fetch(changelogUrl);
  if (!response.ok) {
      return;
  }

  let changelog = await response.text();
  fs.writeFileSync(path.resolve(__dirname, '../content/changelog/CHANGELOG.md'), changelog, 'utf8');
})();