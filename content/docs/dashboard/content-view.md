---
title: Content view
slug: content-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2024-02-22T10:46:27.387Z
weight: 300.1
---

# Contents view

The contents view is the default view when you open the dashboard. It will show you all the pages in
your project, and allow you to filter and sort them.

## Card configuration

### Card field configuration

If you want to change the fields/values that are shown on the content card, you can do so by using
the following settings:

<!-- markdownlint-disable MD013 -->
| Setting | Description | Default |
| --- | --- | --- |
| `frontMatter.dashboard.content.card.fields.title` | The field name to use for the title. | `""` |
| `frontMatter.dashboard.content.card.fields.description` | The field name to use for the description. | `""` |
| `frontMatter.dashboard.content.card.fields.state` | Show/hide the state/draft status. Set to `false` to hide it. | `true` |
| `frontMatter.dashboard.content.card.fields.date` | Show/hide the date. Set to `false` to hide it. | `true` |
<!-- markdownlint-enable MD013 -->

### Card tags

The tags underneath the content abstract/description is changable. By default, the card will show
the value of the `tags` field, but you can update the field by specifying the value in the
`frontMatter.dashboard.content.cardTags` setting.

![Card tags][01]

### Card UI extensibility

In case you want to take more control over the card UI, you can add your own custom code by using
our extensibility library. More information about this can be found in the [UI extensibility][06]
section.

## Draft status navigation

By default, the contents view will show all your pages, and will you will be able to filter by
**draft** and **published** pages.

![Draft filters][02]

If you want to use other statuses, you can do so by specifying your own draft field and value.

> **Info**: [Set a custom draft field][03].

![Draft filters][04]

## Filters

By default, the content view will show all your pages, but you can filter them by using the following
filter:

- Content folder (when you have multiple registered)
- Tag filter
- Category filter

You can change the default filters, or configure your own by updating the `frontMatter.content.filters`
setting.

### Configure filters

The default filter configuration is as follows:

```json {{ "title": "Default content filters configuration" }}
{
  "frontMatter.content.filters": [
    "contentFolders", 
    "tags", 
    "categories",
  ]
}
```

You can change the default filters, or configure your own by updating the `frontMatter.content.filters`
setting as follows:

```json {{ "title": "Example of adding custom filters" }}
{
  "frontMatter.content.filters": [
    "contentFolders",
    "tags",
    {
      "title": "My custom filter",
      "name": "field-name",
    }
  ]
}
```

> **Info**: The `name` property should be the name of the front matter field you want to filter by.

## Sorting

By default, the content is sorted by the following options:

- Last modified
- Filename (asc/desc)

You can change the sorting options by specifying the `frontMatter.content.sorting` setting. This
setting allows you to define the sorting options for the content view.

### Configure sorting options

| Property | Description | Default |
| --- | --- | --- |
| `title` | The title of the sorting option | `""` |
| `name` | The name of the field to sort by (needs to be present in your content its front matter) | `""` |
| `order` | The order of the sorting (ascending or descending). Option values to use: `asc` or `desc`. | `""` |
| `type` | The type of field value. Option values to use: `string`, `date`, and `number`. | `""` |

```json {{ "title": "Example of adding custom sorting options" }}
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

### Default sorting

To define your default sorting options by setting the
`frontMatter.content.defaultSorting` setting for the content view, and the
`frontMatter.media.defaultSorting` setting for the media view.

## Show on startup

If you want, you can check on the `Open on startup?` checkbox. This setting will allow the dashboard
to automatically open when you launch the project in VS Code. It will only apply to the current
project, not for all of them.

## Content pagination

By default, the content is paginated by 16 items. If you want, you can disable the pagination by
setting the `frontMatter.dashboard.content.pagination` setting to `false`.
In case you want to change the number of items per page, you can specify a number in the same setting.

## Content pinning

In case you have content which you want to highlight, or use frequently. You can pin it to the top
of the content view. This will allow you to quickly access.

![Pin content to your dashboard](/releases/v9.3.0/content-pinning-light.png)

<!-- Link References -->

[01]: /releases/v7.1.0/card-tags.png
[02]: /releases/v7.1.0/draft-filters.png
[03]: /docs/content-creation/fields#draft
[04]: /releases/v5.3.0/draft-status.png
[06]: /docs/experimental/ui-extensibility#registering-a-custom-ui-extension
