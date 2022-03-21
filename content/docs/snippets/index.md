---
title: Snippets
slug: snippets
description: null
date: 2022-03-04T14:40:10.952Z
lastmod: 2022-03-04T14:40:11.495Z
weight: 850
---

# Snippets

## Overview

Snippets are a pre-defined chunk of code/text that can be used to insert in your content. It provides the editor an easy way to add various elements to the content that is defined for your project/website.

All snippets can be found on the snippets dashboard.

![Snippet dashboard](/releases/v7.0.0/snippet-dashboard.png)

## Create a snippet

Follow the next steps in order to create a snippet:

- Open the Front Matter dashboard, and navigate to the Snippets tab;
- Click on the **Create new snippet** button;
- Fill in the required fields;
- Click on the **Save** button.

Once you clicked on the **Save** button, the snippet is added to the `frontMatter.content.snippets` setting. All your placeholders will be automatically extracted and added to the `fields` property.

The snippet definition contains the following fields:

```json
"<snippet title>": {
  "description": "Description",
  "body": [],
  "fields": [],
  "openingTags": "[[",
  "closingTags": "]]"
}
```

- `description`: A short description of the snippet (optional);
- `body`: The snippet body, each string defined in the array is a new line;
- `fields`: The snippet fields;
- `openingTags`: The opening tags for the snippet (optional);
- `closingTags`: The closing tags for the snippet (optional).

## Placeholders

In your snippets, you will be able to use placeholders to insert content from the Front Matter dashboard. To use a placeholder, you will need to add them via the following notation: `[[placeholder_name]]`.

Internally we use the `[[` as opening tags and `]]` as closing tags. These tags can be defined per snippet. In case of conflicts, you can define your own opening and closing tags on the snippet definition.

**Example:**

```html
{{< highlight [[type]] \"linenos=table,noclasses=false\" >}}
  [[selection]]
{{< / highlight >}}
```

In the above example, we the `type` and `selection` are the defined placeholders.

> **Important**: All variables are HTML-excaped by default, if you want to add unescaped HTML content, you need to add an `&` before your variable name. Example: `[[&selection]]`.

## Fields

Each placeholder defined, will have a corresponding field definition. If no field definition is defined for a placeholder, it will be shown as a input field when inserting the snippet.

The field definition is the same as the one we use for our content types (more information at [defining your own content type](/docs/content-creation/content-types#define-your-own-type)).

At this moment, we only support the following field types:

- `string`
- `choice`

To prepopulate a field, you can use the following special placeholders in the `default` property of your field:

- Standard placeholders are available like `{{year}}`, `{{month}}`, ... (see [Placeholders](/docs/content-creation/placeholders))
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

- Open one of your content files;
- Select your text (optional);
- Click on the **Insert snippet** button (or use the **Front Matter: Insert snippet into your content** command);

![Insert a snippet](/releases/v7.0.0/insert-snippet.png)

- Select the snippet you want to use;
- Fill in the fields;

![Fill in the snippet form](/releases/v7.0.0/insert-snippet-form.png)

- Click on insert.

The following steps generate the following outcome in the content (based on the above snippet example):

```markdown
{{< highlight typescript "linenos=table,noclasses=false" >}}
  Selected text from content
{{< / highlight >}}
```