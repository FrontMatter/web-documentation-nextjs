---
title: Placeholders
slug: content-creation/placeholders
description: null
date: 2022-03-14T08:42:21.626Z
lastmod: 2022-03-14T15:45:56.755Z
weight: 200.3
---

# Placeholders

Placeholders can be used in content type fields or templates. The placeholders allow you to automatically fill in values when creating a new content.

There are known placeholders from Front Matter:

- `{{title}}`: Title of the page
- `{{slug}}`: Slug of the page
- `{{now}}`: Current date formatted with the value defined in `frontMatter.taxonomy.dateFormat` or ISO string
- `{{year}}`: Current year
- `{{month}}`: Current month
- `{{day}}`: Current day

You can define you own placeholders within the `frontMatter.content.placeholders` setting.

For instance, you can define a custom `permalink` placeholder as follows:

```json
"frontMatter.content.placeholders": [
  {
    "id": "permalink",
    "value": "/blog/{{slug}}.html"
  }
]
```

To use the `permalink` placeholder, you need to define the `{{permalink}}` value in your content type or template.

```json
{
  "title": "Permalink",
  "name": "permalink",
  "type": "string",
  "default": "{{permalink}}"
}
```

> In the custom placeholders, you can also use the known placeholders from Front Matter, so that they are more dynamic to your content.