const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

(async () => {
    const production = process.env.VERCEL_ENV === "production";

    const pkgUrl = `https://raw.githubusercontent.com/estruyf/vscode-front-matter/${production ? "main" : "dev"}/package.json`;

    const pkg = await fetch(pkgUrl);
    if (!pkg.ok) {
        return;
    }

    let pkgJson = await pkg.text();
    if (typeof pkgJson === "string") {
        pkgJson = JSON.parse(pkgJson);
    }

    if (pkgJson?.contributes?.configuration) {
        const idUrl = production ? "https://frontmatter.codes/frontmatter.schema.json" : "https://beta.frontmatter.codes/frontmatter.schema.json";

        const schema = {
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "$id": idUrl,
            ...pkgJson.contributes.configuration,
            "title": "Front Matter - Team Settings"
        }

        fs.writeFileSync(path.join(path.resolve('.'), '/public/frontmatter.schema.json'), JSON.stringify(schema, null, 2));
    }
})();