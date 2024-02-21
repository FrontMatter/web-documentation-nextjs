---
title: Slug
slug: content-creation/slug
description: null
date: 2024-02-13T09:28:37.205Z
lastmod: 2024-02-21T09:12:52.450Z
weight: 200.61
---

# Slug

The slug is the part of the URL that identifies a page in a human-readable form.
It is usually derived from the title of the page, but Front Matter CMS allows
you to define a custom slug.

## Default slug

The default slug is derived from the title of the page. It is automatically
generated when you create a new page. The default slug is a URL-friendly version
of the title, with all letters in lowercase, spaces replaced with hyphens,
removes stop words, and special characters.

```yaml {{ "title": "Example of the default slug" }}
---
title: Just a sample page with a title
slug: sample-page-title
---
```

> **Info**: The extension only supports English stopwords.

## Custom slug

You can define a custom slug for your pages and it can be defined on global
level or per content type.

### Global level

You can define a custom slug template for all pages in the `frontMatter.taxonomy.slugTemplate`
setting. The template can contain [placeholders][01] that will be replaced with the
actual values when creating a new page.

```json {{ "title": "Example of the global slug template" }}
{
  "frontMatter.taxonomy.slugTemplate": "{{year}}/{{month}}/{{title}}"
}
```

> **Info**: The `{{title}}` placeholder in the slug template will be replaced with
> what you typically get from the default slug.

### Per content type

You can define a custom slug template for each content type in the
`frontMatter.taxonomy.contentTypes` setting. Similar to the global slug template,
the template can contain placeholders that will be replaced with the actual
values when creating a new page.

```json {{ "title": "Example of the content type slug template" }}
{
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "post",
      "slugTemplate": "{{year}}/{{month}}/{{title}}",
      ...
    }
  ]
}
```

## Additional settings

### Prefix and suffix

You can also specify a prefix and suffix, which can be added to the slug if you
want. Use the following settings to do this: `frontMatter.taxonomy.slugPrefix`
and `frontMatter.taxonomy.slugSuffix`.

```json {{ "title": "Example of the slug prefix and suffix" }}
{
  "frontMatter.taxonomy.slugPrefix": "/",
  "frontMatter.taxonomy.slugSuffix": "/"
}
```

```yaml {{ "title": "Example slug in combination with the prefix and suffix" }}
---
title: Just a sample page with a title
slug: /sample-page-title/
---
```

By default, both prefix and suffix settings are not provided, which mean it would
not add anything extra to the slug.

### Align filename with slug

Another setting is to allow you to sync the filename with the generated slug. The
setting you need to turn on enable for this is `frontMatter.taxonomy.alignFilename`.

```json {{ "title": "Example of the align filename with slug" }}
{
  "frontMatter.taxonomy.alignFilename": true
}
```

When you update the slug of the page, the filename will be automatically
updated to match the slug.

<!-- Link References -->

[01]: /docs/content-creation/placeholders
