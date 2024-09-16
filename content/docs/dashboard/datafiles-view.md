---
title: Data files/folders view
slug: dashboard/datafiles-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2024-09-16T11:37:34.243Z
weight: 300.4
---

# Data files view

Data files/folders are pieces of content that do not belong to any markdown content, but live on
their own. Most of the time, these data files are used to store additional information about your
project/blog/website that will be used to render the content.

For example:

- navigation
- social media links
- contacts
- etc.

The data files dashboard allows you to quickly manage your data files.

<!-- FM:Snippet:Start data:{"id":"Open in VS Code","fields":[{"name":"title","value":"Open data dashboard in VS Code"},{"name":"command","value":"frontMatter.dashboard.data"},{"name":"title","value":"Open data dashboard in VS Code"}]} -->
<a class="open_vscode" title="Open data dashboard in VS Code" href='vscode://eliostruyf.vscode-front-matter?command=frontMatter.dashboard.data'>
  Open data dashboard in VS Code
</a>
<!-- FM:Snippet:End -->

![Data files dashboard][01]

## Settings

To use the data files dashboard, you need to configure the extension with the
following settings:

- `frontMatter.data.files`: Defines how a single data file.
- `frontMatter.data.folders`: Defines that all files of a folder need to be treated the same.
  It can also be used to create new data files.
- `frontMatter.data.types`: This only defines the object and its fields. Use this setting, if you
  want to re-use a data type in various files/folders.

### frontMatter.data.files settings

The `frontMatter.data.files` setting is used to define how a single data file should be treated.

The following properties can be defined:

| Property | Description | Required | Default |
| --- | --- | --- | --- |
| `id` | Unique identifier for the data file | Yes | |
| `title` | Title of the data file | Yes | |
| `file` | Path to the data file | Yes | |
| `labelField` | Field that should be used as the label | No | |
| `fileType` | Type of the file (json, yaml, yml) | No | `json` |
| `singleEntry` | Defines if the file contains a single entry | No | `false` |
| `schema` | JSON schema definition for the data file | Yes | |
| `type` | ID of the data type to use (re-usable schema) | No | |

### frontMatter.data.folders settings

The `frontMatter.data.folders` setting is used to define how a folder with data files should be treated.

The following properties can be defined:

| Property | Description | Required | Default |
| --- | --- | --- | --- |
| `id` | Unique identifier for the data folder | Yes | |
| `path` | Path to the data folder | Yes | |
| `labelField` | Field that should be used as the label | No | |
| `singleEntry` | Defines if the files in the folder contain a single entry | No | `false` |
| `enableFileCreation` | Defines if new data files can be created | No | `false` |
| `fileType` | Type of the files (json, yaml, yml) | No | `json` |
| `schema` | JSON schema definition for the data files | Yes | |
| `type` | ID of the data type to use (re-usable schema) | No | |

### frontMatter.data.types settings

The `frontMatter.data.types` setting is used to define re-usable data types.

The following properties can be defined:

| Property | Description | Required | Default |
| --- | --- | --- | --- |
| `id` | Unique identifier for the data type | Yes | |
| `schema` | JSON schema definition for the data type | Yes | |

## Data fields schema

Each setting requires a schema definition. The schema is defined using the [JSON Schema][03] standard.

The following field types are supported:

- `string`
- `number`
- `boolean`
- `array`
- `object`

When you are using the `string` type, you can use the `multiline` property to define if the field is
a multiline field.

## Registering data files

When you have a data file in which you hold information like for example a list of authors
(`authors.json`), you can register this file in the `frontMatter.data.files` setting as follows:

```json {{ "title": "Registering a data file" }}
{
  "frontMatter.data.files": [{
    "id": "authors",
    "title": "Authors",
    "file": "[[workspace]]/data/authors.json",
    "labelField": "name",
    "singleEntry": false,
    "schema": {
      "title": "Authors",
      "type": "object",
      "required": [
        "name",
        "url"
      ],
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "url": {
          "type": "string",
          "title": "URL"
        },
        "description": {
          "type": "string",
          "title": "Description"
        }
      }
    }
  }]
}
```

> **Important**: The `singleEntry` setting is used to define
> if the data file is a single entry or a not.

The above sample can be used to manage author data in the `authors.json` file.
Each author record contains a url, name, and description as properties.

```json {{ "title": "Author data example" }}
[
  {
    "name": "Elio Struyf",
    "url": "https://www.eliostruyf.com",
    "description": "Elio is a Microsoft MVP, GitHub Star, and a Google Developer Expert."
  }
]
```

![Data dashboard - Sponsor example][02]

<!-- markdownlint-disable MD028 -->
> **Info**: Use the `[[workspace]]` placeholder to define the workspace folder. The extension will
> automatically replace this with the workspace folder path.
<!-- markdownlint-enable MD028 -->

## Registering data folders

When you have a folder with multiple data files of the same type, you can register this folder
in the `frontMatter.data.folders` setting as follows:

```json {{ "title": "Registering a data folder" }}
{
  "frontMatter.data.folders": [{
    "id": "authors",
    "path": "[[workspace]]/data/authors",
    "singleEntry": true,
    "enableFileCreation": true,
    "fileType": "json",
    "schema": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "url": {
          "type": "string",
          "title": "URL"
        },
        "description": {
          "type": "string",
          "title": "Description"
        }
      }
    }
  }]
}
```

> **Important**: when using data folders, the extension searches for `yml`, `yaml`, and `json` files
> in the folder.

As the `singleEntry` setting is set to `true`. Each data file contains a single entry.

```json {{ "title": "Single entry data example" }}
{
  "name": "Elio Struyf",
  "url": "https://eliostruyf.com",
  "description": "Elio is a Microsoft MVP, GitHub Star, and a Google Developer Expert."
}
```

### Data file creation support

When you have the `enableFileCreation` property set to `true` on the folder,
you can create new data files directly from the data dashboard. When you open the data dashboard,
you will be prompted to create a new data file (if no files are available yet).

![Data dashboard - Create new data file][04]

Once the file is created, you can start managing the data.

![Data dashboard - Add new data file content][05]

On the main data view, you can see all the data files that are available in the folder.

![Data dashboard - Data files view][06]

## Re-usable data types

In the above examples, you could see that the data schema is defined in both the file and folder
settings. If you want to re-use the schema, you can define the schema in the `frontMatter.data.types`
setting.

You can define the data type as follows:

```json {{ "title": "Defining a data type" }}
{
  "frontMatter.data.types": [{
    "id": "author",
    "schema": {
      "title": "Author",
      "type": "object",
      "required": [
        "name",
        "url"
      ],
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "url": {
          "type": "string",
          "title": "URL"
        },
        "description": {
          "type": "string",
          "title": "Description"
        }
      }
    }
  }]
}
```

The ID of the data type can be used in the `frontMatter.data.files` and `frontMatter.data.folders`
settings by defining it as the `type` property.

### Cofiguring the data file

```json {{ "title": "Configuring the data file" }}
{
  "frontMatter.data.files": [{
    "id": "authors",
    "title": "Authors",
    "file": "[[workspace]]/data/authors.json",
    "labelField": "name",
    "singleEntry": false,
    "type": "author"
  }]
}
```

### Configuring the data folder

```json
{
  "frontMatter.data.folders": [{
    "id": "authors",
    "path": "[[workspace]]/data/authors",
    "singleEntry": true,
    "enableFileCreation": true,
    "fileType": "json",
    "type": "author"
  }]
}
```

<!-- Link References -->
[01]: /releases/v10.4.0/data-dashboard.webp
[02]: /releases/v10.4.0/data-edit-record.webp
[03]: https://json-schema.org/
[04]: /releases/v10.4.0/empty-data-dashboard.webp
[05]: /releases/v10.4.0/add-new-data-file-content.webp
[06]: /releases/v10.4.0/data-file-overview.png
