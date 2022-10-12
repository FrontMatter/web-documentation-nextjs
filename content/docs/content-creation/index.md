---
title: Content creation
slug: content-creation
description: null
date: 2021-09-17T07:36:26.654Z
lastmod: 2022-03-14T08:35:40.836Z
weight: 200
tags:
  - documentation
---

# Content creation

## Overview

As each website is different, Front Matter allows you to create content by using content types or
templates.

When using content types or templates, Front Matter adapts the metadata fields shown in the editor
panel to the corresponding fields in your content type or template.

Front Matter comes with a default content type and template definition which you can adapt to your
needs or add your types next to it.

## Before you start

Front Matter supports both `md` and `mdx` files. If you use the templating functionality, the CMS
will automatically use the file extension of the template.

When using content types, the CMS will create the new content based on the following rules:

1. The extension checks if the content type has the `fileType` property defined. If set, the CMS
   uses the file type set in the property.
1. If the content type has no `fileType` property defined, the CMS uses the default file type
   defined in the `frontMatter.content.defaultFileType` setting. By default, the CMS uses `md`. If
   you want to use `mdx`, you need to set the `frontMatter.content.defaultFileType` setting to
   `mdx`.

## How it works

Behind the scenes, Front Matter uses the `frontMatter.taxonomy.contentTypes` setting to understand
which type of content you'll use for your website.

Our default content type consists of the following fields:

- title: `string`
- description: `string`
- date: `datetime`
- preview: `image`
- draft: `draft`
- tags: `tags`
- categories: `categories`

> **Info**: The default content type will create an individual Markdown file when creating content.
> If you want to use page bundles, make sure to specify this on the content type level.

We'll use the default one when you start writing your markdown content, and no other content type is
defined.

![Default content type fields][01]

<!-- Link References -->
[01]: /assets/default-contenttype.png
