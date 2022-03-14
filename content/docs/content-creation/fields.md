---
title: Fields
slug: content-creation/fields
description: null
date: 2022-03-14T08:42:21.626Z
lastmod: 2022-03-14T08:42:22.364Z
weight: 200.2
---

# Fields overview

## Supported field types

Front Matter its metadata section supports the following fields:

- `string`
- `number`
- `datetime`
- `boolean`
- `image`
- `choice`
- `draft`: specifies the kind of draft field you want to use: `boolean` or `choice`. This field, can be configured with the [frontmatter.content.draftfield](/docs/settings#frontmatter.content.draftfield) setting.
- `tags`: mapped to the tags defined in your settings.
- `categories`: mapped to the categories defined in your settings.
- `taxonomy`: if you want to define your own custom taxonomy fields.
- `fields`: allows you to define another object and its fields.
- `block`: allows you to define a group of fields which can be used to create an list of data.

### Standard field properties

All fields share the following field properties:

- `title (string)`: The title to show in the metadata section (optional);
- `name (string)`: The name of your field, will be used to set in the front matter of your Markdown file;
- `type (field type - string)`: One of the above supported types.
- `default`: Defines the default value for the field when creating the content type. You can also use placeholders like `{{title}}`, `{{slug}}` or `{{now}}`. Check for more information under [placeholders](/docs/content-creation/placeholders).
- `hidden (boolean - optional)`: Specifies if you want to hide the field from the metadata section, but still have it available in Front Matter.



## String

The `string` field type is used to store a single-line or multiline of text. For instance, you can use if for the title, description, or any other text field.

### Properties

- `single (boolean)`: When you picked the `string` field type, you can specify if it is a single line. By default it will render as a multiline field (optional).

### Usage

```json
{
  "title": "Title",
  "name": "title",
  "type": "string",
  "single": true
}
```

### Outcome

```markdown
---
title: "My title"
---
```



## Number

The `number` field allows you to insert integer values, like for instance setting the weight of your content.

### Usage

```json
{
  "title": "Weight",
  "name": "weight",
  "type": "number"
}
```

### Outcome

```markdown
---
weight: 1
---
```



## Datetime

The `datetime` field allows you to add date fields. You can use it for publish, modified, and any other types of dates for you content.

### Properties

- `isPublishDate`: Specifies if the field is a publish date. When set to `true`, the field will be used to set the publish date for the content (this will be reflected on the content dashboard). 
- `isModifiedDate`: Specifies if the field is a modified date. When using the `frontMatter.content.autoUpdateDate` setting to automatically update the modified date of the article, this field will be used.

> The format of your date can be defined in the `frontMatter.taxonomy.dateFormat` setting. Check [date-fns formating](https://date-fns.org/v2.0.1/docs/format) for more information.

### Usage

```json
{
  "title": "Publishing date",
  "name": "date",
  "type": "datetime",
  "isPublishDate": true
},
{
  "title": "Last modified date",
  "name": "lastmod",
  "type": "datetime",
  "isModifiedDate": true
}
```

### Outcome

```markdown
---
date: 2022-03-14T08:42:21.626Z
lastmod: 2022-03-14T08:42:22.364Z
---
```


## Boolean

The `boolean` field can be used to set a value of `true` or `false` into your markdown. It will be rendered as a toggle.

### Usage

```json
{
  "title": "Published",
  "name": "isPublished",
  "type": "boolean"
}
```

### Outcome

```markdown
---
isPublished: true
---
```



## Choice

The `choice` field allows you to define a set of options.

### Properties

- `choices (string[] | { id: string; title: string; })`: When you picked the `choice` field type, you need to return an array of choices.
- `multiple (boolean)`: Define if you want to allow multiple choice selection. By default this is `false`.

### Usage

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

### Outcome

Outcome when using string values:

```markdown
---
choice: "Choice 1"
---
```

Outcome when using id/title objects:

```markdown
---
choice: "1"
---
```



## Draft

The `draft` field defines the state of your content. This is used for the content dashboard as well. By default, the draft field is a boolean. If you want to use your own status values, you can configure it via the [frontmatter.content.draftfield](/docs/settings#frontmatter.content.draftfield) setting.

When using a custom draft status, the content dashboard will make use of it as well:

![Draft filters](/releases/v5.3.0/draft-status.png)

### Usage

```json
{
  "title": "Draft",
  "name": "draft",
  "type": "draft"
}
```

If you want to use your own status values, you can define it by specifying these in the `frontMatter.content.draftField` setting:

```json
"frontMatter.content.draftField": {
  "name": "draft",
  "type": "choice",
  "choices": ["draft", "in progress", "published"]
}
```

### Outcome

Default draft field outcome:

```markdown
---
draft: true
---
```

When using your own status values:

```markdown
---
draft: "in progress"
---
```



## Image

The `image` field can be used to reference single or multiple images to your content.

### Properties

- `isPreviewImage (boolean)`: Allows you to specify a custom preview image for your article. When you set this to `true` for an image field in your content type, it will be adopted in the dashboard.
- `multiple (boolean)`: Define if you want to allow to select multiple images. By default this is `false`.

> **Important**: You can only set this on one image field per content type.

### Usage

```json
{
  "title": "Article preview",
  "name": "preview",
  "type": "image",
  "isPreviewImage": true
}
```

### Outcome

```markdown
---
preview: /social/400285cf-4928-4c07-8ca5-158f249a3bc1.png
---
```



## Tags

The `tags` field allows you to create or use tags from your `frontMatter.taxonomy.tags` setting (by default, none existing). When adding a tag which does not yet exist, you will have the option to create it. 

![Add a new tag](/assets/tag-creation.png)

When the tag is created, you will be able to re-use it for other content.

### Properties

- `taxonomyLimit`: Defines the maximum number of items that can be selected. By default set to `0` which allows unlimited items to be selected.

> **Info**: When a limit is defined, this will get reflected in the UI as well:

![Taxonomy limit](/assets/tags-limit.png)


### Usage

```json
{
  "title": "Tags",
  "name": "tags",
  "type": "tags"
}
```

### Outcome

```markdown
---
tags:
  - Development
  - GitHub
  - GraphQL
  - API
---
```



## Categories

The `categories` field is similar to the [tags](/docs/content-creation/fields#tags) field. The difference is that it uses the `frontMatter.taxonomy.categories` setting (by default, none existing).

### Properties

- `taxonomyLimit`: Defines the maximum number of items that can be selected. By default set to `0` which allows unlimited items to be selected.

### Usage

```json
{
  "title": "Categories",
  "name": "categories",
  "type": "categories"
}
```

### Outcome

```markdown
---
categories:
  - Development
---
```



## Taxonomy

The `taxonomy` is similar to the tags and categories field, but allows you to define your own taxonomy values and structure.

### Properties

- `taxonomyLimit`: Defines the maximum number of items that can be selected. By default set to `0` which allows unlimited items to be selected.
- `taxonomyId`: Set the id of your custom taxonomy definition defined in the `frontMatter.taxonomy.customTaxonomy` setting.

### Custom taxonomy

The `frontMatter.taxonomy.customTaxonomy` setting allows you to provide a list of custom taxonomy data. Each of the taxonomy data contains a `id` and an array of `options`.

Here is an example of the custom taxonomy setting definition:

```json
"frontMatter.taxonomy.customTaxonomy": [
  {
    "id": "customTaxonomy",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3"
    ]
  }
]
```

### Usage

```json
{
  "title": "Custom taxonomy",
  "name": "customTags",
  "type": "taxonomy",
  "taxonomyId": "customTaxonomy"
}
```

### Outcome

```markdown
---
customTags:
  - custom-development
---
```



## Fields

The `fields` field, allows you to create multi-dimensional content type fields (sub-fields). This is useful when you want to create a complex content type. In case you want to define a list data, you will have to use the [block](/docs/content-creation/fields#block) field.

When you specify the field type as `fields`, you need to define sub-fields within the `fields` property.

### Properties

- `fields`: Define the sub-fields of your content type. All the above types are supported.

### Usage

```json
{
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "multi-dimensional",
      "pageBundle": false,
      "fields": [
        ...
        {
          "title": "Photo",
          "type": "fields",
          "name": "photo",
          "fields": [
            {
              "title": "Title",
              "name": "title",
              "type": "string"
            },
            {
              "title": "URL",
              "name": "url",
              "type": "image"
            }
          ]
        }
      ]
    }
  ]
}
```

### Outcome

![Multi-dimensional content type fields](/releases/v6.0.0/multi-dimensional-content-type-fields.png)

```markdown
---
photo:
  title: "Photo 1"
  url: /social/400285cf-4928-4c07-8ca5-158f249a3bc1.png
---
```


## Block

The `block` field type allows you to define a group of fields which can be used to create a list of data.

![Block field type rendering](/assets/block-field-type.png)

### Prerequisites

To work with the `block` field type, you need to define a field group (a set of fields for your data) in the `frontMatter.taxonomy.fieldGroups` setting.

```json
"frontMatter.taxonomy.fieldGroups": [
  {
    "id": "author",
    "labelField": "name",
    "fields": [
      {
        "title": "Author Name",
        "name": "name",
        "type": "string",
        "single": true
      },
      {
        "title": "Social link",
        "name": "social",
        "type": "string",
        "single": true
      }
    ]
  }
]
```

> **Info**: You can use the same field types as you would use in the regular content types.

### Properties

- `fieldGroup`: Define the field group(s) that will be used to create a list of data.

### Usage

```json
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "page",
    "fields": [
      {
        "title": "Authors",
        "name": "authors",
        "type": "block",
        "fieldGroup": [
          "author"
        ]
      },
      ...
  }
]
```

> **Important**: If you want, you can also create field groupings within the field grouping. This is useful when you want to create sub-groups of data.

### Outcome

```markdown
---
authors:
  - name: Elio Struyf
    social: https://twitter.com/eliostruyf
    fieldGroup: author
---
```