---
title: Site preview
slug: site-preview
description: null
date: 2021-08-31T08:24:02.613Z
lastmod: 2024-09-16T12:12:27.295Z
weight: 700
---

# Site preview

## Overview

The Markdown preview is not consistently delivering the same result as the one you will see on your
site. The Front Matter CMS extension provides you a way to show the actual site instead.

![Site preview][01]

> **Info**: Once a preview is opened, you will be able to manually change the URL. Something to note
> is that the URL will not be updated when navigating to other pages.

## Configuration

To use the site preview, you will first have to set the `frontMatter.preview.host` setting which
you can define in the `frontmatter.json` file.

For example, with Hugo SSG, the local server spins up on `http://localhost:1313`.
When you set this URL as the value of the `frontMatter.preview.host` setting.
You can click on the open preview button and the site preview will be shown.

### Configuration levels

To support as many Static-Site Generators and frameworks as possible, the configuration can be set
on different levels:

#### Globally

On the global level, you have the following settings available:

```json {{ "title": "Global settings" }}
{
  "frontMatter.preview.host": "http://localhost:1313",
  "frontMatter.preview.pathName": "",
  "frontMatter.preview.trailingSlash": false
}
```

##### frontMatter.preview.host

The `frontMatter.preview.host` setting is used to specify the host of your website. This setting is
required to open the preview.

##### frontMatter.preview.pathName

The `frontMatter.preview.pathName` setting is used to specify the path that you want to add after the
`frontMatter.preview.host` setting value and before your slug.

This setting can be used for instance to include include a global prefix: `/docs`.

```json {{ "title": "Path name example" }}
{
  "frontMatter.preview.pathName": "docs"
}
```

When you open the preview, the URL will be: `<preview host URL>/docs/<slug>`.

##### frontMatter.preview.trailingSlash

The `frontMatter.preview.trailingSlash` setting is used to specify if you want to add a trailing
slash to the preview URL.

```json {{ "title": "Trailing slash example" }}
{
  "frontMatter.preview.trailingSlash": true
}
```

When you open the preview, the URL will be: `<preview host URL>/<slug>/`.

#### Page folder

On the page folder level, you have the following related preview settings:

```json {{ "title": "Page folder preview settings" }}
{
  "frontMatter.content.pageFolders": [
    {
      "title": "blog",
      "path": "[[workspace]]/src/content/blog",
      "previewPath": "/blog",
      "trailingSlash": false
    }
  ]
}
```

##### previewPath on page folder

The `previewPath` property on the `frontMatter.content.pageFolders` setting, will override what is
defined globally and can be used to specify a preview path per page folder. It works the same as the
`frontMatter.preview.pathName` setting.

##### trailingSlash on page folder

The `trailingSlash` property on the `frontMatter.content.pageFolders` setting, will override what is
defined globally and can be used to specify if you want to add a trailing slash to the preview URL.

#### Content type

On the content type level, you have the following related preview settings:

```json {{ "title": "Content type preview settings" }}
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "doc",
    "pageBundle": false,
    "previewPath": "/docs",
    "trailingSlash": true,
    "fields": []
  }
]
```

##### previewPath on content type

Similar to the `previewPath` on the page folder level, the `previewPath` property on the content
type level will override what is defined on page folder level and globally.

##### trailingSlash on content type

Similar to the `trailingSlash` on the page folder level, the `trailingSlash` property on the content
type level will override what is defined on page folder level and globally.

## Placeholder support

Since version `8.3.0`, the you can use placeholders in the `previewPath` property and there are a
couple of additional placeholders available which can be used for your preview paths.

> **Info**: You can find these placeholders in the [placeholders section](/docs/content-creation/placeholders#preview-path-placeholders).

### Examples

#### Usage of front matter field and path values

```json {{ "title": "Example 1: Usage of front matter field and path values" }}
"frontMatter.content.pageFolders": [
  {
    "title": "post",
    "path": "[[workspace]]/content/{{year}}/{{month}}",
    "previewPath": "/{{fm.type}}/{{pathToken.3}}/{{pathToken.4}}",
    "trailingSlash": true,
    "contentTypes": ["post"]
  }
]
```

The preview path will generate the following path: `/post/2024/06/<slug>/`.

#### Use the publishing date in your preview path

```json {{ "title": "Example 2: Use the publishing date in your preview path" }}
"frontMatter.content.pageFolders": [
  {
    "title": "blog",
    "path": "[[workspace]]/src/content/blog",
    "previewPath": "/{{fm.type}}/{{date|yyyy}}",
    "trailingSlash": true,
    "contentTypes": ["blog"]
  }
]
```

The preview path will generate the following path: `/blog/2024/<slug>/`.

> **Info**: When using the `{{date|<format>}}` placeholder in the `previewPath` property,
> it looks for a field with the name `date` in the front matter, or for a `date` field where the
> `isPublishDate` property is set to `true`.

#### Use the locale in your preview path

```json {{ "title": "Example 3: Use the locale in your preview path" }}
"frontMatter.content.pageFolders": [
  {
    "title": "blog",
    "path": "[[workspace]]/src/content/blog",
    "previewPath": "/{{locale|ignore:en}}",
    "trailingSlash": true,
    "contentTypes": ["blog"]
  }
]
```

The preview path will generate the following path for English content: `/<slug>/`. For other locales,
the preview path will generate the following path: `/<locale>/<slug>/` (e.g. `/nl/<slug>/`).

> **Info**: The `{{locale}}` placeholder will return the locale of the page when you have
> a [multi-language setup](/docs/content-creation/multilingual).

## Open on the website

With the `frontMatter.website.host` setting, you can specify the host of your website. Once the
setting is configured, you can click on the `Open on website` button to open the current page on
your website.

> **Info**: The `frontMatter.website.host` setting can be configured in the `frontmatter.json` file.

## Support for Browse Lite extension

In case you have the [Browse Lite](https://marketplace.visualstudio.com/items?itemName=antfu.browse-lite)
extension installed, Front Matter will use this extension to open the preview. The advantage of this
extension is that it uses a real browser in the background to render the preview. For frameworks
like Nuxt, this allows you to see the updates immediately.

![Browse Lite extension support](/releases/v9.3.0/browse-lite-support.png)

<!-- Link References -->

[01]: /releases/v8.3.0/site-preview.png
