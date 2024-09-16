---
title: Placeholders
slug: content-creation/placeholders
description: Learn how to use placeholders in Front Matter CMS
date: 2022-03-14T08:42:21.626Z
lastmod: 2024-09-16T12:13:56.139Z
weight: 200.51
---

# Placeholders

Placeholders can be used in fields, slug templates, preview paths, and file prefix settings.
These placeholders allow you to generate dynamic values based on the front matter fields or other
values.

## Default placeholders

The following placeholders can be used in the fields `default` property,
`slugTemplate`, `previewPath`, and `filePrefix`:

| Placeholder  | Description                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `{{title}}`  | Title of the page                                                                                |
| `{{slug}}`   | Slug of the page                                                                                 |
| `{{now}}`    | Current date formatted with the value defined in `frontMatter.taxonomy.dateFormat` or ISO string |
| `{{year}}`   | Current year                                                                                     |
| `{{month}}`  | Current month                                                                                    |
| `{{day}}`    | Current day                                                                                      |
| `{{hour12}}` | Current hour in 12-hour format                                                                   |
| `{{hour24}}` | Current hour in 24-hour format                                                                   |
| `{{ampm}}`   | Show AM/PM                                                                                       |
| `{{minute}}` | Current minute                                                                                   |

## Slug placeholders

The slug placeholders are used to generate a slug based on the title of the page. The following
placeholders can be used in the `slugTemplate` property:

| Placeholder | Description |
| --- | --- |
| `{{seoTitle}}`          | This creates a SEO friendly slug from the title. More info can be found in the [slug][02] section. |
| `{{date\|<format>}}`    | Use the publishing date of your article in the preview URL. Example: `{{date\|yyyy-MM}}` |
| `{{fm.<field name>}}`   | The value of the field in the front matter |
| `{{pathToken.<index>}}` | The value of the path token at the index |
| `{{pathToken.relPath}}` | The relative value path staring from the page folder' path |

## Preview path placeholders

The preview path placeholders are used to generate a dynamic preview path based on the front matter
fields or other values. The following placeholders can be used in the `previewPath` property:

| Placeholder | Description |
| --- | --- |
| `{{date\|<format>}}`    | Use the publishing date of your article in the preview URL. Example: `/blog/{{date\|yyyy-MM}}` |
| `{{locale}}`            | The locale of the page. |
| `{{fm.<field name>}}`   | The value of the field in the front matter |
| `{{pathToken.<index>}}` | The value of the path token at the index |
| `{{pathToken.relPath}}` | The relative value path staring from the page folder' path |

## File prefix placeholders

The file prefix placeholders are used to generate a dynamic file prefix. The following placeholders
can be used in the `filePrefix` property:

| Placeholder | Description |
| --- | --- |
| `{{filePrefix.index\|<zeros:nr>}}` | The index number of the file in the folder |
| `{{date\|<format>}}` | Use the publishing date of your article in the preview URL. Example: `{{date\|yyyy-MM}}` |
| `{{locale}}` | The locale of the page. |

## Using placeholders

### Example 1: general usage

Example of how you can use the placeholders in the `previewPath` and `path` property:

```json {{ "title": "Using the special placeholders", "description": "" }}
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

When you create a new content item, the path will be generated based on the `path` property. In this
case, it will be: `[[workspace]]/content/2024/09`.

The preview path will generate the following path: `/post/2024/09/<slug>`.

### Example 2: using the relative path placeholder

Example of how you can use the `{{pathToken.relPath}}` placeholder:

```json {{ "title": "Using the relative path token", "description": "" }}
"frontMatter.content.pageFolders": [
  {
    "title": "post",
    "filePrefix": null,
    "previewPath": "/{{pathToken.relPath}}/",
    "path": "[[workspace]]/content"
  }
]
```

If a file would exist in: `./content/docs/settings.md`. The preview path will generate the following
path: `/docs/settings/`.

### Example 3: using field formatting

In case of using the `{{fm.<field name>}}` placeholder, you can also use field formatting. Here is
an example of how you can use field formatting:

```json {{ "title": "Using field formatting", "description": "" }}
"frontMatter.content.pageFolders": [
  {
    "title": "blog",
    "filePrefix": null,
    "previewPath": "/{{fm.fmContentType}}/{{fm.date|format:dd/MM/yy}}/",
    "path": "[[workspace]]/content"
  }
]
```

The above configuration results in the following path: `/blog/16/09/24/`.

![Define the preview URL with placeholders](/releases/v10.4.0/define-preview-url.webp)

### Example 4: using the {{date\|\<format\>}} placeholder

The `{{date|<format>}}` placeholder uses the publishing date and can be used as follows:

```json {{ "title": "Using the date placeholder", "description": "" }}
"frontMatter.content.pageFolders": [
  {
    "title": "blog",
    "filePrefix": null,
    "previewPath": "/{{fm.type}}/{{date|yyyy}}",
    "path": "[[workspace]]/content"
  }
]
```

The above configuration results in the following path: `/blog/2024/`.

### Example 5: using the {{locale}} placeholder

The `{{locale}}` placeholder will return the locale of the page when you have
a [multi-language setup](/docs/content-creation/multilingual).

```json {{ "title": "Using the locale placeholder", "description": "" }}
"frontMatter.content.pageFolders": [
  {
    "title": "blog",
    "filePrefix": null,
    "defaultLocale": "en",
    "previewPath": "/{{locale}}",
    "path": "[[workspace]]/content"
  }
]
```

The above configuration results in the following path for English content: `/en/<slug>/`.

You can also ignore a specific locale by using the `ignore:<locale>` option.

```json {{ "title": "Ignoring a specific locale", "description": "" }}
"frontMatter.content.pageFolders": [
  {
    "title": "blog",
    "filePrefix": null,
    "defaultLocale": "en",
    "previewPath": "/{{locale|ignore:en}}",
    "path": "[[workspace]]/content"
  }
]
```

The above configuration results in the following path for English content: `/<slug>/`.
For other locales, the preview path will generate the following path:
`/<locale>/<slug>/` (e.g. `/nl/<slug>/`).

### Example 6: using the {{filePrefix.index}} placeholder

The `{{filePrefix.index}}` placeholder returns the index number of the file in the folder.

```json {{ "title": "Using the file prefix index placeholder" }}
{
  "frontMatter.content.pageFolders": [{
    "title": "articles",
    "path": "[[workspace]]/content/prefixes/",
    "filePrefix": "{{filePrefix.index}}"
  }]
}
```

The above configuration results in the following file names: `001-article.md`, `002-article.md`, ...

The `zeros` parameter is optional and allows you to specify the leading zeros to add before the
index number. The default value is `3`. You can change this value by adding the number of zeros you
want to add.

```json {{ "title": "Using the file prefix index placeholder with leading zeros" }}
{
  "frontMatter.content.pageFolders": [{
    "title": "articles",
    "path": "[[workspace]]/content/prefixes/",
    "filePrefix": "{{filePrefix.index|zeros:4}}"
  }]
}
```

## Custom placeholders

You can define you own placeholders within the `frontMatter.content.placeholders` setting. There are
two types of placeholders you can create:

- `static`: A static placeholder that will be replaced with a static value (you can use another
  placeholder in the value)
- `dynamic`: A dynamic placeholder that will use a script to generate the value

### Static placeholders

Here is an example of a static `permalink` placeholder:

```json
"frontMatter.content.placeholders": [
  {
    "id": "permalink",
    "value": "/blog/{{slug}}.html"
  }
]
```

> **Info**: The static placeholder's value is adding some text and it will also include the slug of
> the page. There is no extra logic that is executed to generate the value.

To use the `permalink` placeholder, you need to define the `{{permalink}}` value in your content
type or template.

```json
{
  "title": "Permalink",
  "name": "permalink",
  "type": "string",
  "default": "{{permalink}}"
}
```

### Dynamic placeholders

Dynamic placeholders allow you to use custom scripts to generate the value. The difference with the
static placeholder is that instead of specifying a value, you need to specify a `script` and
`command` property.

#### Placeholder definition

Here is an example of a dynamic `uniqueId` placeholder:

```json
"frontMatter.content.placeholders": [
  {
    "id": "uniqueId",
    "script": "./scripts/uniqueId.mjs",
    "command": "~/.nvm/versions/node/v18.17.1/bin/node"
  }
]
```

#### Placeholder script

To get started, you first need to install the
[@frontmatter/extensibility](https://www.npmjs.com/package/@frontmatter/extensibility)
dependency.

```bash
npm i @frontmatter/extensibility
```

Once installed, you can use the following example:

```javascript
import { PlaceholderScript } from "@frontmatter/extensibility";

const { workspacePath, filePath, title, answers } = PlaceholderScript.getArguments();

PlaceholderScript.done(Math.random().toString(36).substring(2, 15));
```

> **Info**: Like the other content scripts, you can use other types of scripts like Python, Bash,
> and more.

The base script for a dynamic placeholder similar to the [content script][01]. The difference is
that instead of retrieving the whole front matter object, you will receive the title. The reason is
that the file is still not completely processed, and not all front matter fields are available.

> **Important**: In case you need to retrieve the whole front matter object, you can make use of the
> `postScript` property on your content type in combination with a [content script][01].

You can also ask additional input/questions during the placeholder script execution.
For instance, if you want to pick between a category upon content creation, you can use the
`PlaceholderScript.askQuestions` method.

```javascript
import { PlaceholderScript } from "@frontmatter/extensibility";

(async () => {
  const { answers } =
    PlaceholderScript.getArguments();

  if (!answers) {
    PlaceholderScript.askQuestions([
      {
        name: "category",
        message: "What category do you want to use for this article?",
        options: [
          "Uncategorized",
          "Getting Started",
          "Configuration",
          "Customization",
          "Deployment",
          "Troubleshooting",
          "Other",
        ],
      },
    ]);
    return;
  }

  const { category } = answers;

  if (!category) {
    PlaceholderScript.done(undefined);
    return;
  }

  PlaceholderScript.done(category);
})();
```

#### Placeholder usage

To use the `ogImage` placeholder, you need to define the `{{ogImage}}` value in your field as
follows:

```json
{
  "title": "Unique ID",
  "name": "uniqueId",
  "type": "string",
  "default": "{{uniqueId}}"
}
```

<!-- Link References -->

[01]: /docs/custom-actions/#content-script
[02]: /docs/content-creation/slug
