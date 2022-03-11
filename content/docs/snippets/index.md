---
title: Snippets
slug: snippets
description: null
date: 2022-03-04T14:40:10.952Z
lastmod: 2022-03-04T14:40:11.495Z
weight: 9
---

# Snippets

## Overview

Snippets are a pre-defined chunk of code/text that can be used to insert in your content. It provides the editor an easy way to add various elements to the content that is defined for your project/website.

All snippets can be found on the snippets dashboard.

![Snippet dashboard](/releases/v7.0.0/snippet-dashboard.png)

## Create a snippet

*Todo*

- Setting: title, description, body
- UI: how to create

## Placeholders

In your snippets, you will be able to use placeholders to insert content from the Front Matter dashboard. To use a placeholder, you will need to add them via the following notation: `[[placeholder_name]]`.

Internally we use the `[[` as opening tags and `]]` as closing tags. These tags can be defined per snippet. In case of conflicts, you can define your own opening and closing tags.

**Example:**

```html
{{< highlight [[type]] \"linenos=table,noclasses=false\" >}}
  [[selection]]
{{< / highlight >}}
```

In the above example, we the `type` and `selection` are the defined placeholders.

## Fields

Each placeholder defined, will have a corresponding field definition. If no field definition is defined for a placeholder, it will be shown as a input field when inserting the snippet.

The field definition is the same as the one we use for our content types (more information at [defining your own content type](/docs/content-types#define-your-own-type)).

At this moment, we only support the following field types:

- `string`
- `choice`

To prepopulate a field, you can use the following special placeholders in the `default` property of your field:

- `FM_SELECTED_TEXT`: This placeholder can be used to insert the selected text from the editor.

**Example:**

```json
"frontMatter.content.snippets": {
  "Highlight": {
    "description": "Creates a code highlighting box",
    "body": [
      "{{< highlight \"[[type]]\" \"linenos=table,noclasses=false\" >}}",
      "  [[selection]]",
      "{{< / highlight >}}"
    ],
    "fields": [
      {
        "name": "type",
        "title": "Language",
        "type": "choice",
        "choices": [
          "html",
          "css",
          "typescript"
        ],
        "default": "typescript"
      },
      {
        "name": "selection",
        "title": "Selection",
        "type": "string",
        "default": "FM_SELECTED_TEXT"
      }
    ]
  }
}
```

## Using a snippet

*Todo*