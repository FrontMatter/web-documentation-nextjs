// @ts-check
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

/**
 * 
 * @param {any} vscodeProps 
 * @param {string} baseUrl 
 * @param {string} configFolder 
 * @param {string} schemaName 
 * @param {string} settingName 
 * @param {string} propertyName 
 * @param {{ value: string, ref: string } | undefined} reference 
 */
 const generateSchemaForArray = (vscodeProps, baseUrl, configFolder, schemaName, settingName, propertyName, reference) => {
  const schemaObject = vscodeProps[settingName];
  if (schemaObject) {
    const schema = {
      "$schema": "http://json-schema.org/draft-07/schema",
      "$id": `${baseUrl}/config/${schemaName}`,
      "description": `Defines the settings for Front Matter ${propertyName}`,
      "lastModified": new Date().toISOString(),
      "type": "object",
      "title": `Front Matter - ${propertyName}`,
      properties: {
        ...schemaObject.items.properties
      }
    }

    if (schemaObject.items.additionalProperties) {
      schema.additionalProperties = schemaObject.items.additionalProperties;
    }

    if (schemaObject.items.required) {
      schema.required = schemaObject.items.required;
    }

    if (reference) {
      let schemaString = JSON.stringify(schema, null, 2);
      // Replace the #scriptCommand reference
      schemaString = schemaString.replace(reference.value, reference.ref);
      fs.writeFileSync(path.join(configFolder, schemaName), schemaString);
    } else {
      fs.writeFileSync(path.join(configFolder, schemaName), JSON.stringify(schema, null, 2));
    } 
  }
}

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
    const dataFilesSchemaName = "data.files.schema.json";
    const dataFoldersSchemaName = "data.folders.schema.json";
    const dataTypesSchemaName = "data.types.schema.json";

    // Create the content type schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, ctSchemaName, "frontMatter.taxonomy.contentTypes", "content type", undefined);
    
    // Create the custom script schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, customScriptsSchemaName, "frontMatter.custom.scripts", "custom script", undefined);

    // Create the page folders schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, pageFoldersSchemaName, "frontMatter.content.pageFolders", "page folder", undefined);
    
    // Create the placeholder schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, placeholderSchemaName, "frontMatter.content.placeholders", "placeholder", { value: "#scriptCommand", ref: `${baseUrl}/config/${customScriptsSchemaName}#/properties/command` });

    // Create the data schemas
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, dataFilesSchemaName, "frontMatter.data.files", "data file", undefined);
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, dataFoldersSchemaName, "frontMatter.data.folders", "data folder", { value: "#dataFileSchema", ref: `${baseUrl}/config/${dataFilesSchemaName}#/properties/schema` });
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, dataTypesSchemaName, "frontMatter.data.types", "data type", { value: "#dataFileSchema", ref: `${baseUrl}/config/${dataFilesSchemaName}#/properties/schema` });

    // Create the snippet schema
    const snippetObject = pkgJson.contributes.configuration.properties[`frontMatter.content.snippets`];
    if (snippetObject) {
      const snippetSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${snippetSchemaName}`,
        "description": "Defines the settings for Front Matter snippet",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - snippet",
        ...snippetObject.additionalProperties
      }

      let schemaString = JSON.stringify(snippetSchema, null, 2);
      // Replace the #contenttypefield reference
      schemaString = schemaString.replace(/#contenttypefield/g, `${baseUrl}/config/${ctSchemaName}#/properties/fields`);

      fs.writeFileSync(path.join(configFolderPath, snippetSchemaName), schemaString);
    }
  }
})();
