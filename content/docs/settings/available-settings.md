---
title: Settings overview
slug: settings/overview
description: null
date: 2023-02-13T16:44:09.618Z
lastmod: 2024-08-13T11:22:00.716Z
weight: 1000.2
---

# Settings overview

Here you can find an overview of all available settings.

## Available settings

### frontMatter.logging

Specify the logging level you want to use for the extension.

- Type: `string`
- Default: `info`

Options:

- `verbose`
- `info`
- `warning`
- `error`

> **Info**: More information on how to use it can be found in the
> [troubleshooting - logging](/docs/troubleshooting#logging) section.

### frontMatter.config.dynamicFilePath

Allows you to specify a dynamic config file path which will be used during the initialization of
the extension. You can, for instance, use it to dynamically set the path of the preview host.

- Type: `string`
- Default: `""`

> **Info**: More information on how to use it can be found in the
> [extending settings with code][20] section.

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

> For more information how and when this is used, check [content creation][04]

### frontMatter.content.defaultSorting

Specify the default sorting option for the content dashboard. You can use one of the values from the
enum or define your own ID.

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

  - **name**: Define the type of field
  - **type**: `boolean` or `choice`
  - **invert**: `true` if you want to invert the value. This inversion is only applied if the field
    is a boolean field and can be used to change the draft to published content behaviou.
  - **choices**: Define the choices of the draft field `string[]`

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

### frontMatter.content.hideFm

Specify if you want to hide the Front Matter in the Markdown file.

- Type: `boolean`
- Default: `false`

### frontMatter.content.hideFmMessage

Specify the message to display when the Front Matter is hidden.

- Type: `string`
- Default: `""`

![Hide front matter from the content][05]

### frontMatter.content.i18n

Specify the locales for the entire workspace.

- Type: `object[]`
- Default: `[]`

> **Info**: More information on how to use it can be found in the [multilingual][21] section.

### frontMatter.content.pageFolders

This array of folders defines where the extension can find your content and create new content by
running the create article command.

- Type: `object[]`
- Default: `[]`

> **Info**: More information on how to use it can be found in the [content folders][06] section.

### frontMatter.content.placeholders

Allows you to specify custom placeholders to use in your content creation process.

- Type: `object[]`
- Default: `[]`

Properties:

- `id`: The id of the placeholder
- `value`: The value of the placeholder

> **Info**: More information on how you can use it can be found here: [placeholders][07].

### frontMatter.content.publicFolder

Specify the folder name where all your assets are located. For instance in Hugo this is the `static`
folder.

- Type: `string` or `object`
- Default: `""`

> **Info**: More information on how to use it can be found in the [media dashboard][25] section.

### frontMatter.content.filters

Specify the filters you want to use for your content dashboard.

- Type: `object[]`
- Default: `["contentFolders", "tags", "categories"]`

> **Info**: More information on how to use it can be found in the [Content View - Filters][23] section.

### frontMatter.content.sorting

Define the sorting options for your dashboard content.

- Type: `object[]`
- Default: `[]`

> **Info**: More information on how to use it can be found in the [Content View - Sorting][22] section.

### frontMatter.content.supportedFileTypes

Specify the file types that you want to use in Front Matter.

- Type: `array`
- Default: `[md, mdx, markdown]`

### frontMatter.content.wysiwyg

Specifies if you want to enable/disable the What You See, Is What You Get (WYSIWYG) markdown
controls.

- Type: `boolean`
- Default: `true`

### frontMatter.custom.scripts

Specify the path to a Node.js script to execute. The current file path will be provided as an
argument.

- Type: `object[]`
- Default: `[]`

Sample:

```json
{
  "frontMatter.custom.scripts": [
    {
      "title": "Generate social image",
      "script": "./scripts/social-img.js",
      "nodeBin": "~/.nvm/versions/node/v14.15.5/bin/node"
    }
  ]
}
```

> **Info**: Check the [create your own custom scripts][08] section for more information.

### frontMatter.copilot.family

Specify the family of the GitHub Copilot AI model you want to use for your project.

- Type: `string`
- Default: `gpt-3.5-turbo`
- Options: `gpt-3.5-turbo`, `gpt-4-turbo`

> **Info**: More information on how to use it can be found in the [AI features][27] section.

### frontMatter.dashboard.content.cardTags

Specify the name of the metadata field that will be used to show the tags on the content card. When
empty or null, it will hide the tags from the card.

- Type: `string`
- Default: `tags`

> **Info**: Check the [card tags][09] section for more information.

### frontMatter.dashboard.content.card.fields.date

Specify if you want to show the date on the content card view.

- Type: `boolean`
- Default: `true`

### frontMatter.dashboard.content.card.fields.description

Specify the name of the metadata field that will be used to show the description on the content card.
When empty or null, it uses the `description` field.

- Type: `string`
- Default: `""`

### frontMatter.dashboard.content.card.fields.state

Specify if you want to show the state on the content card view.

- Type: `boolean`
- Default: `true`

### frontMatter.dashboard.content.card.fields.title

Specify the name of the metadata field that will be used to show the title on the content card. When
empty or null, it uses the `title` field.

- Type: `string`
- Default: `""`

### frontMatter.dashboard.content.pagination

Specify if you want to enable/disable pagination for your content.

- Type: `boolean` or `number`
- Default: `true`
- Maximum: `52`

### frontMatter.dashboard.openOnStart

Specify if you want to open the dashboard when you start VS Code.

- Type: `boolean | null`
- Default: `null`

### frontMatter.data.files

Specify the data files you want to use for your website.

- Type: `array`
- Default: ``

> More information on how to use it can be found in the
> [data files view][10] section.

### frontMatter.data.folders

Specify the data files you want to use for your website.

- Type: `array`
- Default: ``

> More information on how to use it can be found in the
> [data files view][10] section.

### frontMatter.data.types

Specify the data types. These types can be used in for your data files.

- Type: `array`
- Default: ``

> More information on how to use it can be found in the
> [data files view][10] section.

### frontMatter.extensibility.scripts

Specify the list of scripts to load in the Front Matter CMS.

- Type: `array<string>`
- Default: `[]`

> **Info**: More information on how to use it can be found in the
[UI extensibility](/docs/experimental/ui-extensibility) section.

### frontMatter.experimental

Specify if you want to enable the experimental features.

- Type: `boolean`
- Default: `false`

> **Info**: More information on how to use it can be found in the [experimental features][02] section.

### frontMatter.extends

Specify the list of paths/URLs to extend the Front Matter CMS config.

- Type: `array<string>`
- Default: `[]`

> **Info**: More information on how to use it can be found in the [extending settings][01] section.

### frontMatter.file.preserveCasing

Specify if you want to preserve the casing of your file names from the title.

- Type: `boolean`
- Default: `false`

> **Info**: More information on how to use it can be found in the
> [preserve the casing for your file names][11] section.

### frontMatter.framework.id

Specify the ID of your static site generator or framework you are using for your website.

- Type: `string`
- Default: `""`

### frontMatter.framework.startCommand

Specify the command you want to use to start your static site generator or framework.

- Type: `string`
- Default: `null` (when using a known framework, it will be set automatically)

### frontMatter.git.enabled

Specify if you want to use the Git actions for your website.

- Type: `boolean`
- Default: `false`

### frontMatter.git.commitMessage

Specify the commit message you want to use for the sync.

- Type: `string`
- Default: `Synced by Front Matter`

### frontMatter.git.disableOnBranches

Specify the branches on which you want to disable the Git actions.

- Type: `array`
- Default: `[]`

### frontMatter.git.requiresCommitMessage

Specify the branches on which you want to require a commit message.

- Type: `array`
- Default: `[]`

### frontMatter.git.submodule.push

Specify if you want to push the submodule changes to the remote repository.

- Type: `boolean`
- Default: `false`

### frontMatter.git.submodule.pull

Specify if you want to pull the submodule changes from the remote repository.

- Type: `boolean`
- Default: `false`

### frontMatter.git.submodule.branch

Specify the branch to use for the submodule. This will be the branch Front Matter CMS will try to
checkout and sync.

- Type: `string`
- Default: `""`

### frontMatter.git.submodule.folder

Specify the folder where the submodule is located. This is handy when you have multiple submodules.

- Type: `string`
- Default: `""`

### frontMatter.global.activeMode

Specify the activated mode of Front Matter.

- Type: `string, null`

> **Info**: Check the [view mode][12] documentation section for more
> information.

### frontMatter.global.modes

Specify the modes you want to use for Front Matter.

- Type: `array`
- Default: ``

> **Info**: Check the [view mode][12] documentation section for more
> information.

### frontMatter.global.disabledNotifications

This is an array with the notifications types that can be disabled for Front Matter CMS.

- Type: `array<string>`
- Default: `[]`
- Options:
  - `requiredFieldValidation`

### frontMatter.global.notifications

Specifies which type of notifications you want to see or which you want to hide.

- Type: `array<string>`
- Default: `["info", "warning", "error"]`

### frontMatter.media.contentTypes

Specify the content types you want to use for your media files.

- Type: `array`
- Default: ``

> **Info**: More information on how to use it can be found in the [media content types][24] section.

### frontMatter.media.defaultSorting

Specify the default sorting option for the media dashboard.

- Type: `string`
- Default: `""`

Options:

- LastModifiedAsc
- LastModifiedDesc
- FileNameAsc
- FileNameDesc

### frontMatter.media.supportedMimeTypes

Specify the mime types to support for the media files.

- Type: `array`
- Default: `image/*, video/*, audio/*`

### frontMatter.panel.actions.disabled

Specify the actions you want to disable in the panel.

- Type: `array<string>`
- Default: `[]`

Options:

- `openDashboard`
- `createContent`
- `optimizeSlug`
- `preview`
- `openOnWebsite`
- `startStopServer`
- `customActions`

### frontMatter.panel.freeform

Specifies if you want to allow yourself from entering unknown tags/categories in the tag picker
(when enabled, you will have the option to store them afterwards).

- Type: `boolean`
- Default: `true`

### frontMatter.preview.host

Specify the host URL (example: `http://localhost:1313`) to be used when opening the preview.

- Type: `string`
- Default: `""`

### frontMatter.preview.pathName

Specify the path you want to add after the host and before your slug. This can be used for instance
to include the year/month like: `{{date\|yyyy-MM}}`. The date will be generated based on the article
its date field value.

- Type: `string`
- Default: `""`

### frontMatter.preview.trailingSlash

Specify if you want to add a trailing slash to the preview URL.

- Type: `boolean`
- Default: `false`

### frontMatter.projects

Allows you to specify a list of projects you want to manage with Front Matter CMS. Each project
can override the global configuration.

- Type: `array<project>`
- Default: `[]`

> **Info**: More information on how to use it can be found in the [projects][18] section.

### frontMatter.site.baseURL

Specify the base URL of your site, this will be used for SEO checks.

- Type: `string`
- Default: `""`

> **Info**: Example for this site it would be: `https://frontmatter.codes`.

### frontMatter.snippets.wrapper.enabled

Specify if you want to enable/disable the snippet wrapper functionality.

- Type: `boolean`
- Default: `true`

> **Info**: More information on how to use it can be found in the [snippet wrapper][19] section.

### frontMatter.sponsors.ai.enabled

Specify if you want to enable the AI suggestions for your project. This is a sponsor only feature.

- Type: `boolean`
- Default: `false`

> **Info**: More information on how to use it can be found on our [Front Matter AI][17] section.

### frontMatter.taxonomy.alignFilename

Align the filename with the new slug when it gets generated.

- Type: `boolean`
- Default: `false`

### frontMatter.taxonomy.categories

Specifies the categories which can be used in the Front Matter.

- Type: `string[]`
- Default: `[]`

> **Important**: Tags and categories are now moved to a separate database file
> (`.frontmatter/database/taxonomyDb.json`).
> The setting can still be used to predefine the categories.
> Once the project gets initialized, the tags will be moved to the database file.

### frontMatter.taxonomy.commaSeparatedFields

Specify the fields names that Front Matter should treat as a comma-separated array.

- Type: `string[]`
- Default: `[]`
- Example: `["tags", "categories"]`

> **Info**: As some site generators expect arrays in `YAML` to be comma-separated like Pelican. You
> can use this setting to define which of the front matter properties should be treated as an
> comma-separated array.

### frontMatter.taxonomy.contentTypes

Specify the type of contents you want to use for your articles/pages/etc. Make sure the `type` is
correctly set in your front matter.

- Type: `array, null`
- Default: check [default content type][13]

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

> **Info**: Check the [custom taxonomy][14] section for more information.

### frontMatter.taxonomy.dateFormat

Specify the date format for your articles. Check [date-fns formating][15] for more information.

- Type: `string`
- Default: `iso`

### frontMatter.taxonomy.fieldGroups

Define the field groups you want to use for your block fields.

- Type: `array[object]`
- Default: `[]`

> More information on how to use this setting can be found on the [block field][16] section of
> content creation.

### frontMatter.taxonomy.frontMatterType

Specify which Front Matter language you want to use. The extension supports `YAML` (default),
`TOML`, and `JSON`.

- Type: `enum: YAML | TOML | JSON`
- Default: `YAML`

### frontMatter.taxonomy.indentArrays

Specify if arrays in front matter of the markdown files are indented.

- Type: `boolean`
- Default: `true`

### frontMatter.taxonomy.noPropertyValueQuotes

Specify the property names of which you want to remove the quotes in the output value. Warning: only
use this when you know what you are doing. If you're going to, for instance, remove the quotes from
the date property, you can add the following:

```json
{
  "frontMatter.taxonomy.noPropertyValueQuotes": ["date"]
}
```

- Type: `string[]`
- Default: `[]`

### frontMatter.taxonomy.seoContentLengh

Specifies the optimal minimum length for your articles. Between 1,760 words – 2,400 is the absolute
ideal article length for SEO in 2021. (set to `-1` to turn it off).

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

### frontMatter.taxonomy.seoTitleField

Specifies the name of the SEO title field for your page.

- Type: `string`
- Default: `title`

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

### frontMatter.taxonomy.slugTemplate

Specify the template for the slug.

- Type: `string`
- Default: ``

> **Info**: More information on how to use it can be found in the [slug][26] section.

### frontMatter.taxonomy.tags

Specifies the tags which can be used in the Front Matter.

- Type: `string[]`
- Default: `[]`

> **Important**: Tags and categories are now moved to a separate database file
> (`.frontmatter/database/taxonomyDb.json`). The setting can still be used to predefine the tags.
> Once the project gets initialized, the tags will be moved to the database file.

### frontMatter.taxonomy.quoteStringValues

Specify if you always want to wrap string values in quotes.

- Type: `boolean`
- Default: `false`

### frontMatter.telemetry.disable

Specify if you want to disable the telemetry.

> **Important**: No user data is tracked, we only use telemetry to see what is used, and what isn't.
> This allows us to make accurate decisions on what to add or enhance to the extension.

- Type: `boolean`
- Default: `false`

### frontMatter.templates.enabled

Specify if you want to use templates functionality.

- Type: `boolean`
- Default: `false`

### frontMatter.templates.folder

Specify the folder to use for your article templates.

- Type: `string`
- Default: `.frontmatter/templates`

> **Important**: In version 5 of Front Matter, we moved the default location from `.templates` to
> `.frontmatter/templates`.

### frontMatter.templates.prefix

Specify the prefix you want to add for your new article filenames.

- Type: `string`
- Default: `yyyy-MM-dd`

### frontMatter.website.host

Specify the host URL of your website.

- Type: `string`
- Default: `""`

## Deprecated settings

---

## Removed settings

### frontMatter.content.folders

This setting has been deprecated since version `3.1.0` in favour of the newly introduced
`frontMatter.content.pageFolders` setting.

### frontMatter.dashboard.mediaSnippet

This setting is deprecated in version 7.3.0 and and will be removed in the next major version.
Please define your media snippet in the `frontMatter.content.snippets` setting.

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

<!-- Link References -->
[01]: /docs/settings#extending-settings
[02]: /docs/experimental
[04]: /docs/content-creation#before-you-start
[05]: /releases/v8.1.0/hide-fm.png
[06]: /docs/content-creation/content-folders
[07]: /docs/content-creation/placeholders
[08]: /docs/custom-actions
[09]: /docs/dashboard/content-view#card-tags
[10]: /docs/dashboard/content-view#data-files-view
[11]: /docs/content-creation/additional-config#preserve-casing-of-file-names
[12]: /docs/panel#define-view-modes
[13]: /docs/content-creation/content-types#changing-the-default-content-type
[14]: /docs/content-creation/fields#taxonomy
[15]: https://date-fns.org/v2.0.1/docs/format
[16]: /docs/content-creation/fields#block
[17]: /docs/sponsor-features#front-matter-ai
[18]: /docs/settings/projects
[19]: /docs/snippets#snippet-wrapper
[20]: /docs/settings#extending-with-code
[21]: /docs/content-creation/multilingual
[22]: /docs/dashboard/content-view#sorting
[23]: /docs/dashboard/content-view#filters
[24]: /docs/dashboard/media-view#metadata
[25]: /docs/dashboard/media-view#define-the-media-folder
[26]: /docs/content-creation/slug
[27]: /docs/ai-features
