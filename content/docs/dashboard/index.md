---
title: Dashboard
slug: dashboard
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2024-06-20T08:21:12.684Z
weight: 300
---

# Dashboard

## Overview

Managing your Markdown pages/media has never been easier in VS Code. With the Front Matter
dashboard, you will be able to view all your pages and media.

On the contents view, you can **search**, **filter**, **sort** your pages and much more.

![Dashboard - Contents view][01]

On the media view, you can quickly glance all the available media files in your project and perform
quick actions like copying the relative path.

![Dashboard - Media view][02]

In order to start using the dashboard, you will have to let the extension know in which folder(s) it
can find your pages. Be sure to follow our [getting started][03] guide.

> **Important**: If your preview images are not loading, it might be that you need to configure the
> `publicFolder` where the extension can find them. For instance, in Hugo, this is the static
> folder. You can configure this by updating the `frontMatter.content.publicFolder` setting.

## Types of dashboards

There are the following commands to open the dashboards:

| Command title                           | Command id                       | Description                                 |
| --------------------------------------- | -------------------------------- | ------------------------------------------- |
| Front matter: Open dashboard            | `frontMatter.dashboard`          | Opens the dashboard on the contents view.   |
| Front matter: Open media dashboard      | `frontMatter.dashboard.media`    | Opens the dashboard on the media view.      |
| Front matter: Open snippets dashboard   | `frontMatter.dashboard.snippets` | Opens the dashboard on the snippets view.   |
| Front matter: Open data dashboard       | `frontMatter.dashboard.data`     | Opens the dashboard on the data view.       |
| Front matter: Open taxonomies dashboard | `frontMatter.dashboard.taxonomy` | Opens the dashboard on the taxonomies view. |

<!-- Link References -->
[01]: /releases/v7.1.0/dashboard-7.1.0.png
[02]: /releases/v7.1.0/dashboard-media.png
[03]: /docs/getting-started


