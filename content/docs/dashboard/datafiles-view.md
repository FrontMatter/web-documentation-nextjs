---
title: Data files view
slug: datafiles-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2023-04-01T09:56:59.435Z
weight: 300.3
---

# Data files view

Data files/folders are pieces of content that do not belong to any markdown content, but live on
their own. Most of the time, these data files are used to store additional information about your
project/blog/website that will be used to render the content.

For example: navigation, social media links, contacts, etc.

The data files dashboard allows you to quickly manage your data files.

![Data files dashboard][01]

## Configuration

In order to use the data files dashboard, you will need to configure the extension with the
following settings:

- `frontMatter.data.types`: This only defines the object and its fields. Use this setting, if you
  want to re-use a data type in various files/folders.
- `frontMatter.data.files`: Defines how a single data file.
- `frontMatter.data.folders`: Defines that all files of a folder need to be treated the same.

## Creating a data file

To create a data file, you can use the `frontMatter.data.files` setting.

```json
"frontMatter.data.files": [
  {
    "id": "sponsors",
    "title": "Sponsors",
    "file": "[[workspace]]/data/sponsors.json",
    "fileType": "json",
    "labelField": "name",
    "singleEntry": false,
    "schema": {
      "title": "Sponsors",
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
  }
]
```

> **Info**: The `singleEntry` setting is used to define if the data file is a single entry or a not.

The above sample can be used to create a sponsor data file which contains an array of sponsor object
with url, name, and description as properties.

![Data dashboard - Sponsor example][02]

<!-- markdownlint-disable MD028 -->
> **Info**: Use the `[[workspace]]` placeholder to define the workspace folder. The extension will
> automatically replace this with the workspace folder path.
<!-- markdownlint-enable MD028 -->

### Defining a data schema

The `schema` property is used to define the structure of the data file. The schema is defined using
the [JSON Schema][03] standard.

The following example shows a schema for a sponsor object:

```json
{
  "title": "Sponsors",
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
      "title": "Description",
      "multiline": true
    }
  }
}
```

#### Field types

The following field types are supported:

- `string`
- `number`
- `boolean`
- `array`
- `object`

When you are using the `string` type, you can use the `multiline` property to define if the field is
a multiline field.

## Re-using a data type for files or folders

In some cases, you might want to re-use a data type for files or folders. You can do so by using the
`frontMatter.data.types` setting in combination with the `frontMatter.data.files` and/or
`frontMatter.data.folders` settings.

First the data type, this is an object containing the `id` and `schema` properties.

```json
"frontMatter.data.types": [
  {
    "id": "sponsors",
    "schema": {
      "title": "Sponsors",
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
  }
]
```

In the `frontMatter.data.files` and/or `frontMatter.data.folders` settings, instead of defining the
`schema` property, you can use the `type` property to reference the data type.

```json
"frontMatter.data.files": [
  {
    "title": "All sponsors",
    "id": "all-sponsors",
    "file": "[[workspace]]/data/sponsors",
    "labelField": "name",
    "type": "sponsors"
  }
]
```

> **Important**: when using data folders, the extension searches for `yml`, `yaml`, and `json` files
> in the folder.

<!-- Link References -->
[01]: /releases/v6.0.0/data-files-dashboard.png
[02]: /releases/v6.0.0/data-dashboard-sample.png
[03]: https://json-schema.org/
