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
    const baseUrl = `https://${production ? "" : "beta."}frontmatter.codes`;
    
    // Create the main schema
    const fileName = "frontmatter.schema.json";
    const schema = {
      "$schema": "http://json-schema.org/draft-07/schema",
      "$id": `${baseUrl}/${fileName}`,
      "description": "Defines the settings for Front Matter",
      "lastModified": new Date().toISOString(),
      "type": "object",
      ...pkgJson.contributes.configuration,
      "title": "Front Matter - Team Settings"
    }
    
    fs.writeFileSync(path.join(path.resolve('.'), `/public/${fileName}`), JSON.stringify(schema, null, 2));

    const configFolderPath = path.join(path.resolve('.'), "/public/config");
    if (!fs.existsSync(configFolderPath)) {
      fs.mkdirSync(configFolderPath);
    }

    // Create the content type schema
    const contentTypeObject = pkgJson.contributes.configuration.properties[`frontMatter.taxonomy.contentTypes`];
    if (contentTypeObject) {
      const fileName = "taxonomy.contenttype.schema.json";
      const contentTypeSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${fileName}`,
        "description": "Defines the settings for Front Matter content types",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Content Type",
        "properties": {
          ...contentTypeObject.items.properties
        }
      }
      fs.writeFileSync(path.join(configFolderPath, fileName), JSON.stringify(contentTypeSchema, null, 2));
    }
  }
})();