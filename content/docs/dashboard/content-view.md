---
title: Content view
slug: content-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2023-10-06T13:36:12.765Z
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

## Supported filters

- Tag filter
- Category filter
- Content folder (when you have multiple registered)

## Supported sorting

- Last modified
- Filename (asc/desc)

> **Info**: You can define custom sorting options by specifying these within the
> [frontMatter.content.sorting][05] setting.

You are also able to define your default sorting options by setting the
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
[05]: /docs/settings/overview#frontmatter.content.sorting
[06]: /docs/experimental/ui-extensibility#registering-a-custom-ui-extension
