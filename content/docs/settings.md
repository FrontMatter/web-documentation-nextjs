---
title: Settings
slug: settings
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2022-03-07T10:06:37.081Z
weight: 12
---

# Settings

## Overview

Most of Front Matter is configurable to your needs. In this part of the documentation all settings are explained.

## Team settings and local settings

Since version 4 of Front Matter, Team settings got introduced. Teams settings allow you to have all settings on the project/solution level. You will be able to override them on user/local level (`.vscode/settings.json`).

The purpose of team settings is to share the global configuration of your CMS configuration. This way, your whole team can use the same tags/categories but apply their changes locally.

As you do not typically share your `.vscode/settings.json` configuration, we went for a `frontmatter.json` file on the root of your project/solution. The settings you provide in this JSON file are the same as you can configure on a local level. This allows you to easily copy, move settings from team to local level and vice versa.

## Migrate local settings to team settings

To allow you to easily migrate already defined settings, you can run the `Promote settings from local to team level` command. The very first time, it will also ask you if there are settings that can be promoted.

![On startup, Front Matter checks if settings can be promoted](/releases/v5.0.0/ask-to-promote-settings.png)

## Available settings

### frontMatter.content.autoUpdateDate

Specify if you want to automatically update the modified date of your article/page.

- Type: `boolean`
- Default: `false`

### frontMatter.content.defaultFileType

Specify the default file type for the content to create.

- Type: `emum`
- Default: `md`

Options:

- `md`
- `mdx`

> For more information how and when this is used, check [content creation](/docs/content-types#before-you-start)

### frontMatter.content.defaultSorting

Specify the default sorting option for the content dashboard. You can use one of the values from the enum or define your own ID.

- Type: `string` 
- Default: `""`

Options:

- LastModifiedAsc
- LastModifiedDesc
- FileNameAsc
- FileNameDesc
- `ID of your custom sorting option`

### frontMatter.content.draftField

Define the draft field you want to use to manage your content.

- Type: `object` 
  - name: Define the type of field
  - type: `boolean` or `choice`
  - choices: Define the choices of the draft field `string[]` 

- Default: 

```json
{
  "name": "draft",
  "type": "boolean"
}
```

### frontMatter.content.fmHighlight

Specify if you want to highlight the Front Matter in the Markdown file.

- Type: `boolean`
- Default: `true`

### frontMatter.content.pageFolders

This array of folders defines where the extension can find your content and create new content by running the create article command.

- Type: `object[]`
- Default: `[]`

Properties:

- `title`: Give a title for the content folder path
- `path`: The path to the content folder, important is to use the `[[workspace]]` placeholder
- `excludeSubdir`: Optional, specify if you want to exclude subdirectories from the content folder. Default: `false`.

> **Important**: `[[workspace]]` is a placeholder that the extension uses to replace the workspace path. The reason why we choose to use this, is because some do not keep the original folder name.

Sample:

```json
{
  "frontMatter.content.pageFolders": [
    {
      "title": "Pages",
      "path": "[[workspace]]/content",
      "excludeSubdir": true
    },
    {
      "title": "Blog posts",
      "path": "[[workspace]]/content/posts"
    }
  ]
}
```

### frontMatter.content.placeholders

Allows you to specify custom placeholders to use in your content creation process.

- Type: `object[]`
- Default: `[]`

Properties:

- `id`: The id of the placeholder
- `value`: The value of the placeholder

> More information on how you can use it can be found here: [placeholders](/docs/content-types#placeholders).

### frontMatter.content.publicFolder

Specify the folder name where all your assets are located. For instance in Hugo this is the `static` folder.

- Type: `string`
- Default: `""`

### frontMatter.content.sorting

Define the sorting options for your dashboard content.

- Type: `object[]`
- Default: `[]`

Properties:

- `title`: The title of the sorting option
- `name`: The name of the field to sort by (needs to be present in your content its front matter)
- `order`: The order of the sorting (ascending or descending). Option values to use: `asc` or `desc`.
- `type`: The type of field value. Option values to use: `string`, `date`.

Sample:

```json
{
  "frontMatter.content.sorting": [
    {
      "title": "Date (asc)",
      "name": "date",
      "order": "asc",
      "type": "date"
    },
    {
      "title": "Date (desc)",
      "name": "date",
      "order": "desc",
      "type": "date"
    }
  ]
}
```

### frontMatter.content.supportedFileTypes

Specify the file types that you want to use in Front Matter.

- Type: `array` 
- Default: `[md, mdx, markdown]`

### frontMatter.content.wysiwyg

Specifies if you want to enable/disable the What You See, Is What You Get (WYSIWYG) markdown controls.

- Type: `boolean`
- Default: `true`

### frontMatter.custom.scripts

Specify the path to a Node.js script to execute. The current file path will be provided as an argument.

- Type: `object[]`
- Default: `[]`

Sample:

```json
{
  "frontMatter.custom.scripts": [{
    "title": "Generate social image",
    "script": "./scripts/social-img.js",
    "nodeBin": "~/.nvm/versions/node/v14.15.5/bin/node"
  }]
}
```

> **Info**: Check the [create your own custom scripts](/docs/custom-actions) section for more information.

### frontMatter.dashboard.mediaSnippet

Specify the a snippet for your custom media insert markup.

```json
"frontMatter.dashboard.mediaSnippet": [
  "{{< caption \"{mediaUrl}\" \"Description\" >}}"
]
```

> **Important**: Use the `{mediaUrl}`, `{caption}`, `{alt}`, `{filename}`, `{mediaHeight}`, and `{mediaWidth}` placeholders in your snippet to automatically insert the media information. Check [placeholders](/docs/markdown#placeholders) for more information.

### frontMatter.dashboard.openOnStart

Specify if you want to open the dashboard when you start VS Code.

- Type: `boolean | null`
- Default: `null`

### frontMatter.data.files

Specify the data files you want to use for your website. 

- Type: `array` 
- Default: ``

> More information on how to use it can be found in the [data files view](/docs/dashboard#data-files-view) section.

### frontMatter.data.folders

Specify the data files you want to use for your website.

- Type: `array` 
- Default: ``

> More information on how to use it can be found in the [data files view](/docs/dashboard#data-files-view) section.

### frontMatter.data.types

Specify the data types. These types can be used in for your data files.

- Type: `array` 
- Default: ``

> More information on how to use it can be found in the [data files view](/docs/dashboard#data-files-view) section.

### frontMatter.file.preserveCasing

Specify if you want to preserve the casing of your file names from the title.

- Type: `boolean` 
- Default: `false`

> More information on how to use it can be found in the [preserve the casing for your file names](docs/content-types#preserve-the-casing-for-your-file-names) section.

### frontMatter.framework.id

Specify the ID of your static site generator or framework you are using for your website.

- Type: `string`
- Default: `""`

### frontMatter.global.notifications

Specifies which type of notifications you want to see or which you want to hide.

- Type: `array<string>`
- Default: `["info", "warning", "error"]`

### frontMatter.media.defaultSorting

Specify the default sorting option for the media dashboard.

- Type: `string` 
- Default: `""`

Options:

- LastModifiedAsc
- LastModifiedDesc
- FileNameAsc
- FileNameDesc

### frontMatter.panel.freeform

Specifies if you want to allow yourself from entering unknown tags/categories in the tag picker (when enabled, you will have the option to store them afterwards).

- Type: `boolean`
- Default: `true`

### frontMatter.preview.host

Specify the host URL (example: http://localhost:1313) to be used when opening the preview.

- Type: `string`
- Default: `""`

### frontMatter.preview.pathName

Specify the path you want to add after the host and before your slug. This can be used for instance to include the year/month like: `yyyy/MM`. The date will be generated based on the article its date field value.

- Type: `string`
- Default: `""`

> **Important**: As the value will be formatted with the article's date, it will try to convert all characters you enter. In case you wan to skip some characters or all of them, you need to wrap that part between two single quotes. Example: `"'blog/'yyyy/MM"` will result in: `blog/2021/08`.

### frontMatter.site.baseURL

Specify the base URL of your site, this will be used for SEO checks.

- Type: `string`
- Default: `""`

> **Info**: Example for this site it would be: `https://frontmatter.codes`.

### frontMatter.taxonomy.alignFilename

Align the filename with the new slug when it gets generated.

- Type: `boolean`
- Default: `false`

### frontMatter.taxonomy.categories

Specifies the categories which can be used in the Front Matter.

- Type: `string[]`
- Default: `[]`

### frontMatter.taxonomy.commaSeparatedFields

Specify the fields names that Front Matter should treat as a comma-separated array.

- Type: `string[]`
- Default: `[]`

> **Info**: As some site generators expect arrays in `YAML` to be comma-separated like Pelican. You can use this setting to define which of the front matter properties should be treated as an comma-separated array.

### frontMatter.taxonomy.contentTypes

Specify the type of contents you want to use for your articles/pages/etc. Make sure the `type` is correctly set in your front matter.

- Type: `array, null` 
- Default: check [default content type](/docs/content-types#changing-the-default-content-type)


### frontMatter.taxonomy.customTaxonomy

Specify the custom taxonomy field data.

- Type: `array[object]`
- Default: `[]`

Sample:

```json
"frontMatter.taxonomy.customTaxonomy": [
    {
      "id": "customTaxonomy",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3"
      ]
    }
  ]
```

> **Info**: Check the [custom taxonomy](/docs/content-types#custom-taxonomy-field) section for more information.

### frontMatter.taxonomy.dateFormat

Specify the date format for your articles. Check [date-fns formating](https://date-fns.org/v2.0.1/docs/format) for more information.

- Type: `string`
- Default: `iso`

### frontMatter.taxonomy.fieldGroups

Define the field groups you want to use for your block fields.

- Type: `array[object]`
- Default: `[]`

> More information on how to use this setting can be found on the [block field](/docs/content-types#block) section of content creation. 

### frontMatter.taxonomy.frontMatterType

Specify which Front Matter language you want to use. The extension supports `YAML` (default), `TOML`, and `JSON`.

- Type: `enum: YAML | TOML | JSON`
- Default: `YAML`

### frontMatter.taxonomy.indentArrays

Specify if arrays in front matter of the markdown files are indented.

- Type: `boolean`
- Default: `true`

### frontMatter.taxonomy.noPropertyValueQuotes

Specify the property names of which you want to remove the quotes in the output value. Warning: only use this when you know what you are doing. If you're going to, for instance, remove the quotes from the date property, you can add the following:

```json
{
  "frontMatter.taxonomy.noPropertyValueQuotes": ["date"]
}
```

- Type: `string[]`
- Default: `[]`

### frontMatter.taxonomy.seoContentLengh

Specifies the optimal minimum length for your articles. Between 1,760 words – 2,400 is the absolute ideal article length for SEO in 2021. (set to `-1` to turn it off).

- Type: `number`
- Default: `1760`

### frontMatter.taxonomy.seoDescriptionField

Specifies the name of the SEO description field for your page.

- Type: `string`
- Default: `description`

> **Important**: if you would use another field in your content types, be sure to remap this setting.

### frontMatter.taxonomy.seoDescriptionLength

Specifies the optimal description length for SEO (set to `-1` to turn it off).

- Type: `number`
- Default: `160`

### frontMatter.taxonomy.seoSlugLength

Specifies the optimal slug length for SEO (set to `-1` to turn it off).

- Type: `number` 
- Default: `75`

### frontMatter.taxonomy.seoTitleLength

Specifies the optimal title length for SEO (set to `-1` to turn it off).

- Type: `number`
- Default: `60`

### frontMatter.taxonomy.slugPrefix

Specify a prefix for the slug.

- Type: `string`
- Default: `""`

### frontMatter.taxonomy.slugSuffix

Specify a suffix for the slug.

- Type: `string`
- Default: `""`

### frontMatter.taxonomy.tags

Specifies the tags which can be used in the Front Matter.

- Type: `string[]`
- Default: `[]`

### frontMatter.telemetry.disable

Specify if you want to disable the telemetry.

> **Important**: No user data is tracked, we only use telemetry to see what is used, and what isn't. This allows us to make accurate decisions on what to add or enhance to the extension.

- Type: `boolean`
- Default: `false`

### frontMatter.templates.folder

Specify the folder to use for your article templates.

- Type: `string`
- Default: `.frontmatter/templates`

> **Important**: In version 5 of Front Matter, we moved the default location from `.templates` to `.frontmatter/templates`.

### frontMatter.templates.prefix

Specify the prefix you want to add for your new article filenames.

- Type: `string`
- Default: `yyyy-MM-dd`


## Deprecated settings

### frontMatter.taxonomy.dateField

This setting is used to define the publishing date field of your articles.

- Type: `string`
- Default: `date`

> **Important**: Use the new `isPublishDate` datetime field setting for content types instead.

### frontMatter.taxonomy.modifiedField

This setting is used to define the modified date field of your articles.

- Type: `string`
- Default: `lastmod`

> **Important**: Use the new `isModifiedDate` datetime field setting for content types instead.

## Removed settings

### frontMatter.content.folders

This setting has been deprecated since version `3.1.0` in favor of the newly introduced `frontMatter.content.pageFolders` setting.
