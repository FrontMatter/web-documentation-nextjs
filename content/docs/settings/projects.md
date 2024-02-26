---
title: Projects
slug: settings/projects
description: Projects are useful when managing multiple sites or when you want to separate your content into different environments.
date: 2023-04-01T12:41:24.675Z
lastmod: 2024-02-26T17:54:08.454Z
weight: 1000.1
---

# Projects

Projects are useful when managing multiple sites or when you want to separate your content
into different environments. For instance, when you are using Front Matter in a monorepo with
multiple sites, you can use projects to define the settings per site.

## Overview

For instance, you have the following structure:

```bash
├── websites
│   ├── blog
│   ├── portfolio
└── frontmatter.json
```

In this case, there are two sites to be managed, one for the `blog`
and one for the `portfolio` site. When you would not have the projects feature,
both of the sites would share the same settings. This is not always desirable,
as that can lead to issues for instance with the media paths.

That is why you can use projects to define the settings per site.

## Project configuration

The way our project configuration works is that each project inherits the settings
which are globally defined and per project you can override the settings.

For instance, if you have the following configuration:

```json
{
  "frontMatter.projects": [
    {
      "name": "blog",
      "default": true,
      "configuration": {
        "frontMatter.content.pageFolders": [{
          "title": "Blog posts",
          "path": "[[workspace]]/websites/blog/posts"
        }],
        "frontMatter.content.publicFolder": "[[workspace]]/websites/blog/public"
      }
    },
    {
      "name": "portfolio",
      "configuration": {
        "frontMatter.content.pageFolders": [{
          "title": "Portfolio",
          "path": "[[workspace]]/websites/portfolio/content"
        }],
        "frontMatter.content.publicFolder": "[[workspace]]/websites/portfolio/public"
      }
    }
  ]
}
```

You can only have one project as the default project. This is the project will be loaded
when you open the Front Matter CMS - dashboard. When you switch between projects, all
the settings will be reloaded, but also the last used project will be remembered.

> **Important**: In the `configuration` object, you can use all of the Front Matter CMS - settings.
Be aware that it overrides what has been defined on global level. It will not merge the settings.

## Switching projects

You can switch between projects by using the **Front Matter: Switch project** command, using the
panel project switch action, or the project dropdown on the dashboard.

![Project switching](/releases/v8.4.0/project-support.png)
