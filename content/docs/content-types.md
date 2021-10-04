---
title: Content Types
slug: content-types
description: null
date: '2021-09-17T07:36:26.654Z'
lastmod: '2019-08-22T15:20:28.000Z'
weight: 3
---

# Content Types

## Overview

As each website is different, we allow you to define your types of content to use with Front Matter. Front Matter will adapt the metadata fields to show in its editor panel depending on the type of content.

Front Matter comes with a default content type definition which you can adapt to your needs or add your types next to it.

## How it works

Behind the scenes, Front Matter uses the `frontMatter.taxonomy.contentTypes` setting to understand which type of content you'll use for your website.

Our default content type consists of the following fields:

- title: `string`
- description: `string`
- date: `datetime`
- preview: `image`
- draft: `boolean`
- tags: `tags`
- categories: `categories`

We'll use the default one when you start writing your markdown content, and no other content type is defined.

![Default content type fields](/assets/default-contenttype.png)

## Changing the default content type

If you want to change the default content type, open your `.vscode/settings.json` and write an entry for the `frontMatter.taxonomy.contentTypes` setting. Visual Studio Code will automatically autocomplete it with the default content type fields.

If in some case it wouldn't do this, here is the default content type structure:

```json
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "default",
    "fields": [
      {
        "title": "Title",
        "name": "title",
        "type": "string"
      },
      {
        "title": "Description",
        "name": "description",
        "type": "string"
      },
      {
        "title": "Publishing date",
        "name": "date",
        "type": "datetime"
      },
      {
        "title": "Article preview",
        "name": "preview",
        "type": "image"
      },
      {
        "title": "Is in draft",
        "name": "draft",
        "type": "boolean"
      },
      {
        "title": "Tags",
        "name": "tags",
        "type": "tags"
      },
      {
        "title": "Categories",
        "name": "categories",
        "type": "categories"
      }
    ]
  }
]
```

Adapt the fields to your needs. For our documentation it looks as follows:

```json
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "default",
    "fields": [
      {
        "title": "Title",
        "name": "title",
        "type": "string"
      },
      {
        "title": "Description",
        "name": "description",
        "type": "string"
      },
      {
        "title": "Publishing date",
        "name": "date",
        "type": "datetime"
      },
      {
        "title": "Last modified date",
        "name": "lastmod",
        "type": "datetime"
      },
      {
        "title": "Navigation weight",
        "name": "weight",
        "type": "number"
      }
    ]
  }
]
```

The metadata section on the editor panel will render the following fields:

![Adapted default content type fields](/assets/adapted-default-ct.png)

## Define your own type

In most cases, you'll work with multiple types of content where each type will have its defined set of fields. If this is the case for your website, you'll need to add another content type to the `frontMatter.taxonomy.contentTypes` setting.

Instead of overriding the default content type, you can also define a new content type. It requires you to specify the `name` and `fields`.

> **Important**: The `name` property value needs to be equal to the `type` value you set in your Markdown front matter. You best define it via a template so that it's always defined. A default template will be available when initializing Front Matter in your project in the `.templates` folder.

Sample:

```json
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "default",
    "fields": [
      ...
    ]
  },
  {
    "name": "documentation",
    "fields": [
      ...
    ]
  }
]
```

In the sample, `documentation` is used as the content type name. This means that in your article, you'll need to add the `type: documentation` to your front matter to let the editor panel understand which fields to show.

```markdown
---
title: Content Types
slug: content-types
description: null
date: '2021-09-17T07:36:26.654Z'
lastmod: '2019-08-22T15:20:28.000Z'
weight: 4
type: documentation
---
```

## Supported field types

Front Matter its metadata section supports the following fields:

- `string`
- `number`
- `datetime`
- `boolean`
- `image`
- `choice`
- `tags`: mapped to the tags defined in your settings.
- `categories`: mapped to the categories defined in your settings.

### Field properties

A field consists out of the following properties:

- `title (string)`: The title to show in the metadata section (optional);
- `name (string)`: The name of your field, will be used to set in the front matter of your Markdown file;
- `type (field type - string)`: One of the above supported types.

#### Additional properties

**String fields**

- `single (boolean)`: When you picked the `string` field type, you can specify if it is a single line. By default it will render as a multiline field (optional).

**Image fields**

- `isPreviewImage (boolean)`: Allows you to specify a custom preview image for your article. When you set this to `true` for an image field in your content type, it will be adopted in the dashboard.
- `multiple (boolean)`: Define if you want to allow to select multiple images. By default this is `false`.

> **Important**: You can only set this on one image field per content type.

**Choice fields**

- `choices (string[] | { id: string; title: string; })`: When you picked the `choice` field type, you need to return an array of choices.
- `multiple (boolean)`: Define if you want to allow multiple choice selection. By default this is `false`.

Example of using an array of string values:

```json
{
  "title": "Choice",
  "name": "choice",
  "type": "choice",
  "choices": [
    "",
    "Choice 1",
    "Choice 2",
    "Choice 3"
  ]
}
```

Example of using an array of { id: string; title: string; } objects:

```json
{
  "title": "Choice",
  "name": "choice",
  "type": "choice",
  "choices": [
    { "id": "1", "title": "Choice 1" },
    { "id": "2", "title": "Choice 2" },
    { "id": "3", "title": "Choice 3" }
  ]
}
```

## Creating a template

To make sure that your type of content is already defined when creating a new Markdown file. It will be easier to set the type of content within a template.

You can create Markdown templates in your project's `.templates` folder (or defined differently).

```markdown
---
title: 
slug: 
description: 
date: 2019-08-22T15:20:28.000Z
lastmod: 2019-08-22T15:20:28.000Z
weight: 1
type: documentation
---
```

If you already have an existing page, you can automatically create a template from it by running the `Front Matter: Create a template from the current file` command.

The create template command will ask you the template's name and if you want to include the content. The front matter data is included by default.