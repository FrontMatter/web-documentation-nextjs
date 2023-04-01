---
title: Fields
slug: content-creation/fields
description: null
date: 2022-03-14T08:42:21.626Z
lastmod: 2023-04-01T13:38:44.449Z
weight: 200.2
---

# Fields overview

## Supported field types

Front Matter supports the following fields to be used in the content-types:

- [string](#string)
- [number](#number)
- [datetime](#datetime)
- [boolean](#boolean)
- [image](#image)
- [file](#file)
- [choice](#choice)
- [list](#list)
- [draft](#draft)
- [tags](#tags)
- [categories](#categories)
- [taxonomy](#taxonomy)
- [fields](#fields)
- [block](#block)
- [dataFile](#data-file)
- [slug](#slug)

There are also the following section fields:

- [divider](#divider)
- [heading](#heading)

### Standard field properties

All fields share the following field properties:

| Property      | Type      | Description                                                                                                                                                                                                                   | Optional / Required |
| ------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `name`        | `string`  | The name of your field, will be used to set in the front matter of your Markdown file.                                                                                                                                        | **Required**        |
| `type`        | `string`  | The type of the field. Use one of the supported field types.                                                                                                                                                                  | **Required**        |
| `title`       | `string`  | The title to show in the metadata section                                                                                                                                                                                     | _Optional_          |
| `description` | `string`  | The description to show underneath the field                                                                                                                                                                                  | _Optional_          |
| `default`     | `string`  | Defines the default value for the field when creating the content type. You can also use placeholders like `{{title}}`, `{{slug}}` or `{{now}}`. Check for more information under [placeholders][01].                         | _Optional_          |
| `required`    | `boolean` | Defines if the field is required or not. If set to true, and the user does not define a value, a notification will appear. You can disable this notification with the [frontMatter.global.disabledNotifications][02] setting. | _Optional_          |
| `hidden`      | `boolean` | Specifies if you want to hide the field from the metadata section, but still have it available in Front Matter.                                                                                                               | _Optional_          |

## String

The `string` field type is used to store a single-line or multiline of text. For instance, you can
use if for the title, description, or any other text field.

### Properties

- `single (boolean)`: When you picked the `string` field type, you can specify if it is a single
  line. By default it will render as a multiline field (optional).
- `wysiwyg (boolean)`: When you set this value to `true`, the field will be rendered as a WYSIWYG
  editor. The output of the WYSIWYG editor will be HTML.

![WYSIWYG controls][03]

```json {{ "title": "Usage" }}
{
  "title": "Title",
  "name": "title",
  "type": "string",
  "single": true
}
```

```yaml {{ "title": "Outcome" }}
---
title: "My title"
---
```

## Number

The `number` field allows you to insert integer values, like for instance setting the weight of your
content.

### Properties

The number field allows you to set the following properties:

- `min (number)`: The minimum value for the field.
- `max (number)`: The maximum value for the field.
- `step (number)`: The step value for the field.
- `isDecimal (boolean)`: When set to `true`, the field will allow decimal/floating values.

### Example 1

```json {{ "title": "Usage", "description": "Define number field without any special configuration" }}
{
  "title": "Weight",
  "name": "weight",
  "type": "number"
}
```

```yaml {{ "title": "Outcome" }}
---
weight: 1
---
```

### Example 2

```json {{ "title": "Usage", "description": "Define number field with a minimum, maximum, and step value" }}
{
  "title": "Weight",
  "name": "weight",
  "type": "number",
  "min": 1,
  "max": 10,
  "step": 1
}
```

```yaml {{ "title": "Outcome" }}
---
weight: 1
---
```

### Example 3

```json {{ "title": "Usage", "description": "Define number field with decimal values" }}
{
  "title": "Weight",
  "name": "weight",
  "type": "number",
  "isDecimal": true
}
```

```yaml {{ "title": "Outcome" }}
---
weight: 1.5
---
```

## Datetime

The `datetime` field allows you to add date fields. You can use it for publish, modified, and any
other types of dates for you content.

### Properties

- `isPublishDate`: Specifies if the field is a publish date. When set to `true`, the field will be
  used to set the publish date for the content (this will be reflected on the content dashboard).
- `isModifiedDate`: Specifies if the field is a modified date. When using the
  `frontMatter.content.autoUpdateDate` setting to automatically update the modified date of the
  article, this field will be used.

> The format of your date can be defined in the `frontMatter.taxonomy.dateFormat` setting. Check
> [date-fns formating][04] for more information.

```json {{ "title": "Usage" }}
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

```yaml {{ "title": "Outcome" }}
---
date: 2022-03-14T08:42:21.626Z
lastmod: 2022-03-14T08:42:22.364Z
---
```

## Boolean

The `boolean` field can be used to set a value of `true` or `false` into your markdown. It will be
rendered as a toggle.

```json {{ "title": "Usage" }}
{
  "title": "Published",
  "name": "isPublished",
  "type": "boolean"
}
```

```yaml {{ "title": "Outcome" }}
---
isPublished: true
---
```

## Choice

The `choice` field allows you to define a set of options.

### Properties

- `choices (string[] | { id: string; title: string; })`: When you picked the `choice` field type,
  you need to return an array of choices.
- `multiple (boolean)`: Define if you want to allow multiple choice selection. By default this is
  `false`.

#### Example 1

```json {{ "title": "Usage", "description": "Example of using an array of string values" }}
{
  "title": "Choice",
  "name": "choice",
  "type": "choice",
  "choices": ["", "Choice 1", "Choice 2", "Choice 3"]
}
```

```yaml {{ "title": "Outcome", "description": "Outcome when using string values" }}
---
choice: "Choice 1"
---
```

#### Example 2

```json {{ "title": "Usage", "description": "Example of using an array of { id: string; title: string; } objects" }}
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

```yaml {{ "title": "Outcome", "description": "Outcome when using id/title objects" }}
---
choice: "1"
---
```

## List

The `list` field allows you to add multiple text values.

```json {{ "title": "Usage", "description": "Example of using the list field" }}
{
  "title": "Alias",
  "name": "alias",
  "type": "list"
}
```

```yaml {{ "title": "Outcome" }}
---
alias:
  - release-notes-v8
  - changelog-v8
---
```

## Draft

The `draft` field defines the state of your content. This is used for the content dashboard as well.
By default, the draft field is a boolean. If you want to use your own status values, you can
configure it via the [frontmatter.content.draftfield][05] setting.

When using a custom draft status, the content dashboard will make use of it as well:

![Draft filters][06]

> **Important**: If you use Jekyll, you do not have to use the draft field, as Front Matter supports
> the `_drafts`, `_posts` folders and collections from Jekyll. If you use Jekyll, make sure to set
> the `frontMatter.framework.id` setting to `jekyll`.

### Example 1

```json {{ "title": "Usage", "description": "Using the default draft experience" }}
{
  "title": "Draft",
  "name": "draft",
  "type": "draft"
}
```

```yaml {{ "title": "Outcome", "description": "Default draft field outcome" }}
---
draft: true
---
```

### Example 2

In case you want to use a published field, instead of a draft field. You can invert the logic by
setting the `invert` property to `true`:

```json {{ "title": "Draft field setting", "description": "Example of how to invert the field value" }}
"frontMatter.content.draftField": {
  "name": "published",
  "type": "boolean",
  "invert": true
}
```

```json {{ "title": "Usage", "description": "Draft field configuration" }}
{
  "title": "Published",
  "name": "published",
  "type": "draft"
}
```

```yaml {{ "title": "Outcome", "description": "Outcome of using a inverted field value" }}
---
published: false
---
```

### Example 3

If you want to use your own status values, you can define it by specifying these in the
`frontMatter.content.draftField` setting:

```json {{ "title": "Draft field setting", "description": "Change the field type to a choice list" }}
"frontMatter.content.draftField": {
  "name": "draft",
  "type": "choice",
  "choices": ["draft", "in progress", "published"]
}
```

```json {{ "title": "Usage", "description": "The field definition" }}
{
  "title": "Draft",
  "name": "draft",
  "type": "draft"
}
```

```yaml {{ "title": "Outcome", "description": "Outcome of using your own status values" }}
---
draft: "in progress"
---
```

## Image

The `image` field can be used to reference single or multiple images to your content.

### Properties

- `isPreviewImage (boolean)`: Allows you to specify a custom preview image for your article. When
  you set this to `true` for an image field in your content type, it will be adopted in the
  dashboard.
- `multiple (boolean)`: Define if you want to allow to select multiple images. By default this is
  `false`.

> **Important**: You can only set this on one image field per content type.

```json {{ "title": "Usage" }}
{
  "title": "Article preview",
  "name": "preview",
  "type": "image",
  "isPreviewImage": true
}
```

```yaml {{ "title": "Outcome" }}
---
preview: /social/400285cf-4928-4c07-8ca5-158f249a3bc1.png
---
```

## File

The `file` field can be used to reference single or multiple files to your content.

### Properties

- `multiple (boolean)`: Define if you want to allow to select multiple files. By default this is
  `false`.
- `fileExtensions (string array)`: Define the file extensions that are allowed to be selected. By
  default this is an empty array `[]`.

```json {{ "title": "Usage" }}
{
  "title": "Attachments",
  "name": "attachments",
  "type": "file",
  "multiple": true,
  "fileExtensions": ["pdf", "mp4", "wav"]
}
```

```yaml {{ "title": "Outcome" }}
---
attachments:
  - /uploads/file1.pdf
  - /uploads/file2.mp4
---
```

## Tags

The `tags` field allows you to create or use tags from your `frontMatter.taxonomy.tags` setting (by
default, none existing). When adding a tag which does not yet exist, you will have the option to
create it.

![Add a new tag][07]

When the tag is created, you will be able to re-use it for other content.

> **Info**: You can add multiple tags at once by entering them as **comma-separated** values and
> pressing the **ENTER** key.

### Properties

- `taxonomyLimit`: Defines the maximum number of items that can be selected. By default set to `0`
  which allows unlimited items to be selected.

> **Info**: When a limit is defined, this will get reflected in the UI as well:

![Taxonomy limit][08]

```json {{ "title": "Usage" }}
{
  "title": "Tags",
  "name": "tags",
  "type": "tags"
}
```

```yaml {{ "title": "Outcome" }}
---
tags:
  - Development
  - GitHub
  - GraphQL
  - API
---
```

## Categories

The `categories` field is similar to the [tags][09] field. The difference is that it uses the
`frontMatter.taxonomy.categories` setting (by default, none existing).

### Properties

- `taxonomyLimit`: Defines the maximum number of items that can be selected. By default set to `0`
  which allows unlimited items to be selected.

```json {{ "title": "Usage" }}
{
  "title": "Categories",
  "name": "categories",
  "type": "categories"
}
```

```yaml {{ "title": "Outcome" }}
---
categories:
  - Development
---
```

## Taxonomy

The `taxonomy` is similar to the tags and categories field, but allows you to define your own
taxonomy values and structure.

### Properties

- `taxonomyLimit`: Defines the maximum number of items that can be selected. By default set to `0`
  which allows unlimited items to be selected.
- `taxonomyId`: Set the id of your custom taxonomy definition defined in the
  `frontMatter.taxonomy.customTaxonomy` setting.

### Custom taxonomy

The `frontMatter.taxonomy.customTaxonomy` setting allows you to provide a list of custom taxonomy
data. Each of the taxonomy data contains a `id` and an array of `options`.

Here is an example of the custom taxonomy setting definition:

```json {{ "title": "Custom taxonomy", "description": "Define your custom taxonomy options" }}
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

```json {{ "title": "Usage", "description": "Custom taxonomy field definition" }}
{
  "title": "Custom taxonomy",
  "name": "customTags",
  "type": "taxonomy",
  "taxonomyId": "customTaxonomy"
}
```

```yaml {{ "title": "Outcome" }}
---
customTags:
  - custom-development
---
```

## Fields

The `fields` field, allows you to create multi-dimensional content type fields (sub-fields). This is
useful when you want to create a complex content type. In case you want to define a list data, you
will have to use the [block][10] field.

When you specify the field type as `fields`, you need to define sub-fields within the `fields`
property.

### Properties

- `fields`: Define the sub-fields of your content type. All the above types are supported.

```json {{ "title": "Usage" }}
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

![Multi-dimensional content type fields][11]

```yaml {{ "title": "Outcome" }}
---
photo:
  title: "Photo 1"
  url: /social/400285cf-4928-4c07-8ca5-158f249a3bc1.png
---
```

## Block

The `block` field type allows you to define a group of fields which can be used to create a list of data.

![Block field type rendering][12]

### Prerequisites

To work with the `block` field type, you need to define a field group (a set of fields for your
data) in the `frontMatter.taxonomy.fieldGroups` setting.

```json {{ "title": "Field group definition" }}
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

```json {{ "title": "Usage" }}
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

> **Important**: If you want, you can also create field groupings within the field grouping. This is
> useful when you want to create sub-groups of data.

```yaml {{ "title": "Outcome" }}
---
authors:
  - name: Elio Struyf
    social: https://twitter.com/eliostruyf
    fieldGroup: author
---
```

## Data file

The `dataFile` field type allows you to use a data file to populate the field with a list of
options. For instance, if you have a data file with all the authors of your site, you can use the
`dataFile` field type to populate the `authors` field with the data from the authors data file.

![dataFile field][13]

### Prerequisites

To use the `dataFile` field type, you need to have a definition for a data file in place. Here is an
example of the authors sample:

```json {{ "title": "Data file definition" }}
{
  "frontMatter.data.files": [
    {
      "id": "authors",
      "title": "Authors",
      "file": "[[workspace]]/data/authors.json", // Adapt to your needs
      "schema": {
        "title": "Author",
        "type": "object",
        "required": ["name", "url"],
        "properties": {
          "slug": {
            "title": "slug",
            "type": "string"
          },
          "name": {
            "title": "name",
            "type": "string"
          },
          "url": {
            "title": "url",
            "type": "string"
          }
        }
      }
    }
  ]
}
```

### Properties

- `dataFileId`: Specify the ID of the data file to use for this field (required).
- `dataFileKey`: Specify the key of the data file to use for this field (required).
- `dataFileValue`: Specify the property name that will be used to show the value for the field
  (optional).
- `multiple`: Specify if you want to select one or multiple records (optional).

```json {{ "title": "Usage" }}
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "page",
    "fields": [
      {
        "title": "Author",
        "name": "author",
        "type": "dataFile",
        "dataFileId": "authors",
        "dataFileKey": "slug",
        "dataFileValue": "name",
        "multiple": true
      },
      ...
  }
]
```

```yaml {{ "title": "Outcome" }}
---
author:
  - dorothy-parker
---
```

## Slug

The `slug` field allows you to create/update the slug of the current page.

![Slug field][14]

### Properties

- `editable`: Specify if you allow manual changes, or if the slug is generated automatically
  (optional - default: `true`).

```json {{ "title": "Usage" }}
{
  "title": "Slug",
  "name": "slug",
  "type": "slug",
  "editable": true,
  "default": "{{slug}}"
}
```

```yaml {{ "title": "Outcome" }}
---
slug: version-8-0-0-release-notes
---
```

> **Info**: The slug is generated based on the title of the page. More information about it can be
> found in the [generate slug][15] command section.

## Divider

The `divider` field type allows you to add a divider to your content type. This is useful when you
want to group fields together.

### Properties

You only need to specify the `type` property and name:

```json {{ "title": "Usage" }}
{
  "name": "divider",
  "type": "divider"
}
```

### Outcome

![Section divider field][16]

## Heading

The `heading` field type allows you to add a heading to your content type. This is useful when you
want to group fields together.

```json {{ "title": "Usage" }}
{
  "title": "Section title",
  "name": "sectionTitleWithDescription",
  "description": "This is just a dummy description to test out the field description",
  "type": "heading"
},
{
  "title": "Section title without description",
  "name": "sectionTitleWithoutDescription",
  "type": "heading"
}
```

### Outcome

![Section heading field][17]

<!-- Link References -->

[01]: /docs/content-creation/placeholders
[02]: /docs/settings/overview#frontmatter.global.disablednotifications
[03]: /releases/v7.2.0/wysiwyg-controls.png
[04]: https://date-fns.org/v2.0.1/docs/format
[05]: /docs/settings/overview#frontmatter.content.draftfield
[06]: /releases/v5.3.0/draft-status.png
[07]: /assets/tag-creation.png
[08]: /assets/tags-limit.png
[09]: /docs/content-creation/fields#tags
[10]: /docs/content-creation/fields#block
[11]: /releases/v6.0.0/multi-dimensional-content-type-fields.png
[12]: /assets/block-field-type.png
[13]: /releases/v7.3.0/datafile-field.png
[14]: /releases/v8.0.0/slug-field.png
[15]: /docs/commands#generate-slug-based-on-content-title
[16]: /releases/v8.1.0/section-divider.png
[17]: /releases/v8.1.0/section-heading.png
