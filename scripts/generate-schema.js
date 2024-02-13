// @ts-check
const fs = require('fs');
const path = require('path');

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

const escapeQuotes = (/** @type {string} */ str) => {
  return str.replace(/"/g, '\\"');
}

(async () => {
  const production = process.env.VERCEL_ENV === "production";

  const pkgUrl = `https://raw.githubusercontent.com/estruyf/vscode-front-matter/${production ? "main" : "dev"}/package.json`;
  const pkgEnUrl = `https://raw.githubusercontent.com/estruyf/vscode-front-matter/${production ? "main" : "dev"}/package.nls.json`;

  const pkg = await fetch(pkgUrl);
  const pkgLocale = await fetch(pkgEnUrl);
  if (!pkg.ok || !pkgLocale.ok) {
    return;
  }

  let pkgJson = await pkg.text();

  let locale = await pkgLocale.text();
  if (typeof locale === "string") {
    locale = JSON.parse(locale);
  }

  // Find and replace the locale strings
  if (pkgJson) {
    for (const key of Object.keys(locale)) {
      pkgJson = pkgJson.replace(new RegExp(`%${key}%`, "g"), escapeQuotes(locale[key]));
    }
  }

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
    const schemas = {
      content: {
        pageFolders: "content.pagefolders.schema.json",
        snippets: "content.snippets.schema.json",
        placeholders: "content.placeholders.schema.json"
      },
      custom: {
        scripts: "custom.scripts.schema.json"
      },
      data: {
        files: "data.files.schema.json",
        folders: "data.folders.schema.json",
        types: "data.types.schema.json"
      },
      media: {
        contentTypes: "media.contenttypes.schema.json"
      },
      taxonomy: {
        contentTypes: "taxonomy.contenttypes.schema.json",
        fieldGroups: "taxonomy.fieldgroups.schema.json"
      },
    }

    // Create the content type schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.taxonomy.contentTypes, "frontMatter.taxonomy.contentTypes", "content type", undefined);

    // Create the field groups schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.taxonomy.fieldGroups, "frontMatter.taxonomy.fieldGroups", "field groups", {
      value: "#contenttypefield",
      ref: `${baseUrl}/config/${schemas.taxonomy.contentTypes}#/properties/fields`
    });

    // Create the media content type schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.media.contentTypes, "frontMatter.media.contentTypes", "content type", undefined);

    // Create the custom script schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.custom.scripts, "frontMatter.custom.scripts", "custom script", undefined);

    // Create the page folders schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.content.pageFolders, "frontMatter.content.pageFolders", "page folder", undefined);

    // Create the placeholder schema
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.content.placeholders, "frontMatter.content.placeholders", "placeholder", {
      value: "#scriptCommand",
      ref: `${baseUrl}/config/${schemas.custom.scripts}#/properties/command`
    });

    // Create the data schemas
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.data.files, "frontMatter.data.files", "data file", undefined);
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.data.folders, "frontMatter.data.folders", "data folder", {
      value: "#dataFileSchema",
      ref: `${baseUrl}/config/${schemas.data.files}#/properties/schema`
    });
    generateSchemaForArray(pkgJson.contributes.configuration.properties, baseUrl, configFolderPath, schemas.data.types, "frontMatter.data.types", "data type", {
      value: "#dataFileSchema",
      ref: `${baseUrl}/config/${schemas.data.files}#/properties/schema`
    });

    // Create the snippet schema
    const snippetObject = pkgJson.contributes.configuration.properties[`frontMatter.content.snippets`];
    if (snippetObject) {
      const snippetSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "$id": `${baseUrl}/config/${schemas.content.snippets}`,
        "description": "Defines the settings for Front Matter snippet",
        "lastModified": new Date().toISOString(),
        "type": "object",
        "title": "Front Matter - snippet",
        ...snippetObject.additionalProperties
      }

      let schemaString = JSON.stringify(snippetSchema, null, 2);
      // Replace the #contenttypefield reference
      schemaString = schemaString.replace(/#contenttypefield/g, `${baseUrl}/config/${schemas.media.contentTypes}#/properties/fields`);

      fs.writeFileSync(path.join(configFolderPath, schemas.content.snippets), schemaString);
    }
  }
})();