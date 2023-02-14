---
title: Content view
slug: content-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2022-11-28T14:55:04.221Z
weight: 300.1
---

# Contents view

## Card tags

The tags underneath the content abstract/description is changable. By default, the card will show
the value of the `tags` field, but you can update the field by specifying the value in the
`frontMatter.dashboard.content.cardTags` setting.

![Card tags][01]

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
setting the `frontMatter.dashboard.content.pagination` setting to `false`. In case you want to change the number of items per page, you can specify a number in the same setting.

<!-- Link References -->
[01]: /releases/v7.1.0/card-tags.png
[02]: /releases/v7.1.0/draft-filters.png
[03]: /docs/content-creation/fields#draft
[04]: /releases/v5.3.0/draft-status.png
[05]: /docs/settings#frontmatter.content.sorting