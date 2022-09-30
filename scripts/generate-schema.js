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
    const mainSchemaName = "frontmatter.schema.json";
    const schema = {
      "$schema": "http://json-schema.org/draft-07/schema",
      "$id": `${baseUrl}/${mainSchemaName}`,
      "description": "Defines the settings for Front Matter",
      "lastModified": new Date().toISOString(),
      "type": "object",
      ...pkgJson.contributes.configuration,
      "title": "Front Matter - Team Settings"
    }
    
    fs.writeFileSync(path.join(path.resolve('.'), `/public/${mainSchemaName}`), JSON.stringify(schema, null, 2));

    /**
     * Create the schema for each setting that is supported to be splitted
     */
    const configFolderPath = path.join(path.resolve('.'), "/public/config");
    if (!fs.existsSync(configFolderPath)) {
      fs.mkdirSync(configFolderPath);
    }

    // Sub-schema's filenames
    const ctSchemaName = "taxonomy.contenttype.schema.json";
    const snippetSchemaName = "content.snippets.schema.json";

    // Create the content type schema
    const contentTypeObject = pkgJson.contributes.configuration.properties[`frontMatter.taxonomy.contentTypes`];
    if (contentTypeObject) {
      const contentTypeSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${ctSchemaName}`,
        "description": "Defines the settings for Front Matter content types",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Content Type",
        "properties": {
          ...contentTypeObject.items.properties
        }
      }
      fs.writeFileSync(path.join(configFolderPath, ctSchemaName), JSON.stringify(contentTypeSchema, null, 2));
    }
    

    // Create the snippet schema
    const snippetObject = pkgJson.contributes.configuration.properties[`frontMatter.content.snippets`];
    if (snippetObject) {
      const snippetSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${snippetSchemaName}`,
        "description": "Defines the settings for Front Matter snippets",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Snippet",
        ...snippetObject.additionalProperties
      }

      const snippetString = JSON.stringify(snippetSchema, null, 2);
      // Replace the #contenttypefield reference
      const snippetStringReplaced = snippetString.replace(/#contenttypefield/g, `${baseUrl}/config/${ctSchemaName}#/properties/fields`);

      fs.writeFileSync(path.join(configFolderPath, snippetSchemaName), snippetStringReplaced);
    }
  }
})();