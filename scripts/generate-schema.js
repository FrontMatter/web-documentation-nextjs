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
    const pageFoldersSchemaName = "content.pagefolders.schema.json";
    const snippetSchemaName = "content.snippets.schema.json";
    const placeholderSchemaName = "content.placeholders.schema.json";
    const customScriptsSchemaName = "custom.scripts.schema.json";

    // Create the content type schema
    const contentTypeObject = pkgJson.contributes.configuration.properties[`frontMatter.taxonomy.contentTypes`];
    if (contentTypeObject) {
      const contentTypeSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${ctSchemaName}`,
        "description": "Defines the settings for Front Matter content types",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Content-Type",
        properties: {
          ...contentTypeObject.items.properties
        }
      }
      
      if (contentTypeObject.items.additionalProperties) {
        contentTypeSchema.additionalProperties = contentTypeObject.items.additionalProperties;
      }

      if (contentTypeObject.items.required) {
        contentTypeSchema.required = contentTypeObject.items.required;
      }

      fs.writeFileSync(path.join(configFolderPath, ctSchemaName), JSON.stringify(contentTypeSchema, null, 2));
    }
    

    // Create the snippet schema
    const snippetObject = pkgJson.contributes.configuration.properties[`frontMatter.content.snippets`];
    if (snippetObject) {
      const snippetSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${snippetSchemaName}`,
        "description": "Defines the settings for Front Matter snippet",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Snippet",
        ...snippetObject.additionalProperties
      }

      let schemaString = JSON.stringify(snippetSchema, null, 2);
      // Replace the #contenttypefield reference
      schemaString = schemaString.replace(/#contenttypefield/g, `${baseUrl}/config/${ctSchemaName}#/properties/fields`);

      fs.writeFileSync(path.join(configFolderPath, snippetSchemaName), schemaString);
    }

    
    // Create the custom script schema
    const customScriptsSchemaObject = pkgJson.contributes.configuration.properties[`frontMatter.custom.scripts`];
    if (customScriptsSchemaObject) {
      const schema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${customScriptsSchemaName}`,
        "description": "Defines the settings for Front Matter custom script",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Custom Script",
        properties: {
          ...customScriptsSchemaObject.items.properties
        }
      }

      if (customScriptsSchemaObject.items.additionalProperties) {
        schema.additionalProperties = customScriptsSchemaObject.items.additionalProperties;
      }

      if (customScriptsSchemaObject.items.required) {
        schema.required = customScriptsSchemaObject.items.required;
      }

      fs.writeFileSync(path.join(configFolderPath, customScriptsSchemaName), JSON.stringify(schema, null, 2));
    }
    

    // Create the page folders schema
    const pageFoldersObject = pkgJson.contributes.configuration.properties[`frontMatter.content.pageFolders`];
    if (pageFoldersObject) {
      const schema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${pageFoldersSchemaName}`,
        "description": "Defines the settings for Front Matter page folder",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Page Folder",
        properties: {
          ...pageFoldersObject.items.properties
        }
      }

      if (pageFoldersObject.items.additionalProperties) {
        schema.additionalProperties = pageFoldersObject.items.additionalProperties;
      }

      if (pageFoldersObject.items.required) {
        schema.required = pageFoldersObject.items.required;
      }

      fs.writeFileSync(path.join(configFolderPath, pageFoldersSchemaName), JSON.stringify(schema, null, 2));
    }

    
    // Create the placeholder schema
    const placeholderObject = pkgJson.contributes.configuration.properties[`frontMatter.content.placeholders`];
    if (placeholderObject) {
      const schema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${placeholderSchemaName}`,
        "description": "Defines the settings for Front Matter placeholder",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - Placeholder",
        properties: {
          ...placeholderObject.items.properties
        }
      }

      if (placeholderObject.items.additionalProperties) {
        schema.additionalProperties = placeholderObject.items.additionalProperties;
      }

      if (placeholderObject.items.required) {
        schema.required = placeholderObject.items.required;
      }

      let schemaString = JSON.stringify(schema, null, 2);
      // Replace the #scriptCommand reference
      schemaString = schemaString.replace(/#scriptCommand/g, `${baseUrl}/config/${customScriptsSchemaName}#/properties/command`);

      fs.writeFileSync(path.join(configFolderPath, placeholderSchemaName), schemaString);
    }
  }
})();