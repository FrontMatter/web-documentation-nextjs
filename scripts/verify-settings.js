const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { exit } = require('process');
const core = require('@actions/core');

(async () => {
  const branch = process.argv[process.argv.length-1];
  const production = branch.toLowerCase() === "main";

  console.log(`Checking settings for branch: ${branch}`)

  const pkgUrl = `https://raw.githubusercontent.com/estruyf/vscode-front-matter/${production ? "main" : "dev"}/package.json`;

  const response = await fetch(pkgUrl);
  if (!response.ok) {
      return;
  }

  let contents = await response.text();

  if (!contents) {
    console.log("No contents found");
    exit(1);
  }

  const pkg = JSON.parse(contents);
  const settings = pkg.contributes.configuration.properties;
  const settingKeys = Object.keys(settings);

  const settingsPath = path.resolve(__dirname, '../content/docs/settings/available-settings.md');
  const settingsFile = fs.readFileSync(settingsPath, 'utf8');

  const missingSettings = [];

  for (const key of settingKeys) {
    const setting = settings[key];
    if (!settingsFile.includes(key) && !setting.deprecationMessage && !setting.markdownDeprecationMessage) {
      missingSettings.push(key);
    }
  }

  if (missingSettings.length > 0) {
    core.summary
      .addHeading(`Missing settings`)
      .addRaw(`\n ${missingSettings.map(s => `- ${s}\n`).join("")}`)
      .write();

    core.error(`Missing settings: ${missingSettings.join(", ")}`);
  }
})();