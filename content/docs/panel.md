---
title: Editor panel
slug: panel
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2023-07-22T23:05:06.251Z
weight: 400
---

# Editor panel

## Overview

The Front Matter panel allows you to perform most of the extension actions by just a click on the
button, and it shows the SEO statuses of your title, description, and more.

> **Info**: Initially, this panel was created to add tags and categories easily to your articles, as
> currently, VS Code multi-select is not optimal to use when having a lot of tags/categories.

To leverage most of the capabilities of the extension. SEO information and everyday actions like
slug optimization, updating the date, and publish/drafting the article.

## Using the panel

Once you installed the extension, you will notice a Front Matter icon on the activity bar (by
default on the left side). Clicking this icon will open the Front Matter panel.

![Activity bar action][01]

## SEO status

Search Engine Optimization or simply SEO is very important to any site. The extension shows you more
information about how well your article is written.

Supports the following:

- Title and description length validation
- Article length recommendation
- Keyword validation on title, description, slug, and content
- More content details

![SEO][03]

### Settings

In case you want to change the SEO settings, you can use the following settings:

| Setting                                     | Description                                                                                                                                                             | Default       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `frontMatter.taxonomy.seoContentLengh`      | Specifies the optimal minimum length for your articles. Between 1,760 words – 2,400 is the absolute ideal article length for SEO in 2021. (set to `-1` to turn it off). | `1760`        |
| `frontMatter.taxonomy.seoDescriptionField`  | Specifies the name of the SEO description field for your page.                                                                                                          | `description` |
| `frontMatter.taxonomy.seoDescriptionLength` | Specifies the optimal description length for SEO (set to `-1` to turn it off).                                                                                          | `160`         |
| `frontMatter.taxonomy.seoSlugLength`        | Specifies the optimal title length for SEO (set to `-1` to turn it off).                                                                                                | `75`          |
| `frontMatter.taxonomy.seoTitleField`        | Specifies the name of the title field for your page                                                                                                                     | `title`       |
| `frontMatter.taxonomy.seoTitleLength`       | Specifies the optimal title length for SEO (set to `-1` to turn it off).                                                                                                | `60`          |

To discover your internal links, you can specify your base URL with the `frontMatter.site.baseURL`
setting.

## Actions

When writing articles, there are always a couple of actions you need/want to perform. In this
section, we provide you the most used/requested actions like:

- Optimizing the slug
- Setting the publishing date
- Setting the modified date
- Publish or revert to draft

![Actions][04]

> **Important**: You are able to add your own actions, more information about this you can read in
> our [custom actions][05] section.

> **Info**: In version `3.2.0` a couple of actions were moved to the metadata section like changing
> the draft state and date time properties.

### Settings

The following settings are related to these actions:

- `frontMatter.preview.host`: Specify the host URL (example: `http://localhost:1313`) to be used
  when opening the preview.
- `frontMatter.taxonomy.slugPrefix`: Specify a prefix for the slug.
- `frontMatter.taxonomy.slugSuffix`: Specify a suffix for the slug.
- `frontMatter.taxonomy.alignFilename`: Align the filename with the new slug when it gets generated.

## Metadata

In the metadata section, you can manage the front matter of your Markdown file. This section is
fully customizable to your needs with our `content type` support.

![Metadata section][06]

> **Info**: More information about content creation/content types/fields can be read at
> [content creation section][07].

The tags and categories inputs allow you to insert known and unknown tags/categories. When an
unknown tag/category gets added, it will show a `+` sign that allows you to add it to your
configuration so that it will appear in the known tags/categories next time.

### Content type actions

When Front Matter notices a difference between your content and the content type defined, it will
show you a list of actions.

![Content type actions][08]

- **Create content type**: This will generate a new content type based on the fields in your front
  matter.
- **Update missing fields**: Adds the fields that are missing in your content type.
- **Set content type**: Allows you to set a content type (which you already defined) for your
  content.

### Settings

- `frontMatter.panel.freeform`: Specifies if you want to allow yourself from entering unknown
  tags/categories in the tag picker (when enabled, you will have the option to store them
  afterwards). Default: `true`.
- `frontMatter.taxonomy.frontMatterType`: Specify which Front Matter language you want to use. The
  extension supports `YAML` (default), `TOML`, and `JSON`. 
  
## Recently modified

Navigate quickly to a recently modified file. In the recently modified section, the latest 10
modified files get shown.

![Recently modified][09]

> **Important**: In order to use this functionality, a registered content folder needs to be
> present. More information in our [getting started][10] section.

> **Info**: The recently modified section will also be shown when you have the panel open on other
> types of files.

## Other actions

This section provides a couple of other useful actions, like opening the current project in your
explorer/finder.

![Other actions][11]

> **Info**: The `writing settings enabled / enable write settings` action allows you to make
> Markdown specific changes to optimize the writing of your articles. It will change settings like
> the `fontSize`, `lineHeight`, `wordWrap`, `lineNumbers` and more.

> **Info**: The other actions section will also be shown when you have the panel open on other types
> of files.

## Global settings

In this section of the panel, you can modify a couple of the useful settings to have close to hand.

![Global settings][02]

<!-- markdownlint-disable MD028 -->

> **Important**: By default, the global settings section is hidden, you need to create a view mode 
> which holds the `panel.globalSettings` panel ID to show it.

> **Info**: The global settings section will also be shown when you have the panel open on other
> types of files.

> **Local server command**: If you already defined your framework or SSG via the
> `frontMatter.framework.id` setting, we provide a default start command for you. You can override
> this by providing your own start command. You can also change the start command in the 
> [frontMatter.framework.startCommand][14] setting.

## View modes

By default, Front Matter will show all its potential and functionalities to the end-user. As you do
not always require all functionality, Front Matter allows you to create view modes.

You can define what functionality you want to show and use in a view mode.

The creation of a view mode can be done in the `frontMatter.global.modes` setting and the by default
activated mode, can be set in the `frontMatter.global.activeMode` setting.

You define a mode with an `id` and a set of features. The allowed features are the following:

### Panel

- `panel.globalSettings`: Show the global settings section.
- `panel.seo`: Show the SEO status section.
- `panel.actions`: Show the actions section.
- `panel.metadata`: Show the metadata section.
- `panel.contentType`: Show the content type create, update, and set actions underneath the metadata
  panel section.
- `panel.recentlyModified`: Show the recently modified files section.
- `panel.otherActions`: Show the other actions section.

### Dashboards

- `dashboard.snippets.view`: Show the snippets dashboard.
- `dashboard.snippets.manage`: Show the snippets management actions.
- `dashboard.data.view`: Show the data dashboard.
- `dashboard.taxonomy.view`: Show the taxonomy dashboard.

Here is an example of a custom view mode:

```json
"frontMatter.global.activeMode": "",
"frontMatter.global.modes": [
  {
    "id": "minimal",
    "features": [
      "panel.metadata",
      "panel.seo",
      "dashboard.data.view",
      "dashboard.snippets.view"
    ]
  }
]
```

Once you created a new view mode, you can change between the default and custom ones. You find the
mode switch in the panel:

![Switch view mode][12]

Or in the status bar:

![Status bar mode switch][13]

<!-- Link References -->

[01]: /assets/activitybar-action.png
[02]: /releases/v6.0.0/local-server.png
[03]: /releases/v5.3.0/seo-status.png
[04]: /releases/v6.0.0/local-server-start.png
[05]: /docs/custom-actions
[06]: /assets/metadata.png
[07]: /docs/content-creation
[08]: /releases/v7.2.0/content-type-actions.png
[09]: /assets/recent-files.png
[10]: /docs/getting-started
[11]: /assets/other-actions.png
[12]: /releases/v7.1.0/panel-mode-switch-updated.png
[13]: /releases/v7.1.0/status-bar-mode-switch.png
[14]: /docs/settings/overview#frontmatter.framework.startcommand
