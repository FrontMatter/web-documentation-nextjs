---
title: Site preview
slug: site-preview
description: null
date: 2021-08-31T08:24:02.613Z
lastmod: 2023-02-12T15:48:22.708Z
weight: 700
---

# Site preview

## Overview

The Markdown preview is not consistently delivering the same result as the one you will see on your
site. The Front Matter extension provides you a way to show the actual site instead.

![Site preview][01]

> **Info**: Once a preview is opened, you will be able to manually change the URL. Something to note
> is that the URL will not be updated when navigating to other pages.

## Configuration

In order to use the site preview, you will first have to set the `frontMatter.preview.host` setting.
You can set it via the `Global Settings` section in the Front Matter panel or in your
`frontmatter.json` file.

For example, with Hugo, the local server spins up on `http://localhost:1313`. When you set this URL
as the value of the `frontMatter.preview.host` setting. You can click on the open preview button and
the site preview will be shown.

### Prefix or section configuration

As Front Matter tries to support as many Static-Site Generators as possible, we made the choice to
use settings that can be changed on various levels: global, per page folder, and per content type.

When you want to show the live site/page previews in Visual Studio Code, you can specify a custom
preview path/prefix. For instance, if you create blog articles, and you want to prefix it with
`blog/2021/11`, you can set this with the `previewPath` property.

> **Important**: The value used for the preview will be formatted with the article's date. This
> means that the engine will try to convert all characters you enter to a date formatted string. In
> case you wan to skip some characters or all of them to be converted, you need to wrap that part
> between **two single quotes**. Example: `"'blog/'yyyy/MM"` will result in: `blog/2021/11`.

### Usage of placeholders

Since version `8.3.0`, the you can use placeholders in the `previewPath` property and there are a
couple of additional placeholders available which can be used for your preview paths.

> **Info**: You can find these placeholders in the [placeholders section](/docs/content-creation/placeholders#special-placeholders).

#### Usage of a placeholder

```json
"frontMatter.content.pageFolders": [
  {
    "title": "post",
    "filePrefix": null,
    "previewPath": "/{{fm.type}}/{{pathToken.3}}/{{pathToken.4}}",
    "path": "[[workspace]]/content/{{year}}/{{month}}",
    "contentTypes": ["post"]
  }
]
```

The preview path will generate the following path: `/post/2023/02/<slug>`.

#### Usage of a placeholder with the publishing date

```json
"frontMatter.content.pageFolders": [
  {
    "title": "post",
    "filePrefix": null,
    "previewPath": "'/{{fm.type}}/'yyyy",
    "contentTypes": ["post"]
  }
]
```

The preview path will generate the following path: `/post/2023/<slug>`.

### Configuration levels

#### Globally

On the global level, you can use the `frontMatter.preview.pathName` setting to specify the global
path that you want to add after the `frontMatter.preview.host` setting value and before your slug.

This setting can be used for instance to include the year/month like: `yyyy/MM`. The date will be
generated based on the article its date field value.

```json
{
  "frontMatter.preview.pathName": "'blog/'yyyy/MM"
}
```

#### Page folder

The `previewPath` property on the `frontMatter.content.pageFolders` setting, will override what is
defined globally and can be used to specify a preview path per page folder.

```json
{
  "frontMatter.content.pageFolders": [
    {
      "title": "post",
      "path": "[[workspace]]/content/post",
      "previewPath": "'blog/'yyyy/MM"
    }
  ]
}
```

> **Info**: The `previewPath` property can contain

#### Content type

Similar to the `previewPath` on the page folder level, the `previewPath` property on the content
type level will override what is defined on page folder level and globally.

```json
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "default",
    "previewPath": "'blog/'yyyy/MM",
    "pageBundle": false,
    "fields": [
      ...
    ]
  }
]
```

<!-- Link References -->

[01]: /releases/v8.3.0/site-preview.png
