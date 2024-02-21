---
title: Content folders
slug: content-creation/content-folders
description: null
date: 2024-02-21T09:10:16.640Z
lastmod: 2024-02-21T09:43:59.593Z
weight: 200.11
---

# Content Folders

Content folders are a way to organize your pages/files. Most of the time,
this location is defined by the Static Site Generator (SSG) you are using.

To make sure that Front Matter CMS can find your content, and create the
content in the correct place, you need to register the content/page folders.

## Registering content folders

The registration of the page folders is normally done during the setup of
the CMS: [Step 3: Register content folder(s)][01].

Content folders are stored in the [frontMatter.content.pageFolders][02] setting.

```json {{ "title": "Example of the content folders configuration" }}
{
  "frontMatter.content.pageFolders": [
    {
      "title": "Pages",
      "path": "[[workspace]]/content",
      "excludeSubdir": true,
      "previewPath": "post" // Prefixes all files with "/post/" for the page preview
    },
    {
      "title": "Blog posts",
      "path": "[[workspace]]/content/posts"
    },
    {
      "title": "docs",
      "path": "[[workspace]]/docs",
      "filePrefix": "",
      "contentTypes": ["doc"]
    },
    {
      "title": "archive",
      "path": "[[workspace]]/archive",
      "filePrefix": "",
      "disableCreation": true // Disables the creation of new content in this folder
    },
    {
      "title": "Multilingual",
      "path": "[[workspace]]/docs/en",
      "filePrefix": "",
      "defaultLocale": "en",
      "locales": [
        {
          "title": "English",
          "locale": "en"
        },
        {
          "title": "German",
          "locale": "de",
          "path": "../de"
        },
        {
          "title": "Nederlands",
          "locale": "nl",
          "path": "../nl"
        }
      ]
    }
  ]
}
```

Once the content folders are registered, you can start creating content with Front Matter CMS.

## Properties

| Title             | Type       | Description                                                                                                                                          | Default | Required / Optional |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------- |
| `title`           | `string`   | A title for the content folder path                                                                                                                  | `""`    | Optional            |
| `path`            | `string`   | The path to the content folder, important is to use the `[[workspace]]` placeholder. You can also make use of placeholder to generate dynamic paths. | `""`    | Required            |
| `excludeSubdir`   | `boolean`  | Exclude subdirectories from the content folder                                                                                                       |         | Optional            |
| `previewPath`     | `string`   | Allows you to set a prefix path for the page preview. Check the [preview path configuration][03] section to learn more.                              |         | Optional            |
| `filePrefix`      | `string`   | Defines a prefix for the file name.                                                                                                                  |         | Optional            |
| `contentTypes`    | `string[]` | An array of content types to use for this folder. If not specified, all content types are used.                                                      |         | Optional            |
| `disableCreation` | `boolean`  | Disables the creation of new content in this folder.                                                                                                 | `false` | Optional            |
| `defaultLocale`   | `string`   | Set the default locale ID for the page folder. More information can be found in the [Multilingual][04] section.                              |         | Optional            |
| `locales`         | `array`    | Multilingual configuration on page folder level. More information can be found in the [Multilingual][04] section.                            |         | Optional            |

> **Important**: `[[workspace]]` is a placeholder that the extension uses to replace the workspace
> path. The reason why we choose to use this, is because some do not keep the original folder name.

<!-- Links -->

[01]: "/docs/getting-started#step-3:-register-content-folder(s)"
[02]: /docs/settings/overview#frontmatter.content.pagefolders
[03]: /docs/site-preview#configuration
[04]: /docs/content-creation/multilingual
