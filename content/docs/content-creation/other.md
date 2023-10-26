---
title: Additional configuration
slug: content-creation/additional-config
description: null
date: 2022-03-14T08:42:21.626Z
lastmod: 2023-10-06T13:30:33.717Z
weight: 200.5
---

# Additional configuration

## Preview path

For more information on how to use the preview path, see the
[preview configuration](/docs/site-preview#configuration) section.

## File prefixes

By default, Front Matter will use the `yyyy-MM-dd` date format for the file prefix.
You can change this per page folder or per content-type.

### Page folder level

To change the file prefix for a specific page folder, you can add the `filePrefix` property to your
page folder in the `frontMatter.content.pageFolders` setting.

```json
{
  "frontMatter.content.pageFolders": [
    {
      "title": "Blog",
      "path": "[[workspace]]/content/blog",
      "filePrefix": "yyyy"
    }
  ]
}
```

### Content-type level

Similarly, you can change the file prefix for a specific content type by adding the `filePrefix`
property to your content type in the `frontMatter.taxonomy.contentTypes` setting.

> **Important**: The `filePrefix` from the content-type will override the `filePrefix` property
from the page folder.

```json
{
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "default",
      "filePrefix": "yyyy-MM",
      "fields": [
        ...
      ]
    }
  ]
}
```

## Page and leaf bundles

The page or leaf bundles, are a way to group your pages and resources together in a single folder.

```markdown
content/
├── about
│ ├── index.md
├── posts
│ ├── leaf-bundle
│ │ ├── image1.jpg
│ │ ├── image2.png
│ │ └── index.md
│ └── leaf-bundle
│ └── index.md
│
└── another-section
├── ..
└── leaf-bundle
└── index.md
```

In the above section you can see the `leaf-bundle` folders. These bundles consist of a `index.md`
file and possibly also the resouces related to it like images.

By default, Front Matter will create individual Markdown files, but you can also create a leaf
bundle. In order to do so, you need to set the `pageBundle` property in your content type to `true`.

Here is an example of configuring the page bundles for the `default` content type:

```json
"frontMatter.taxonomy.contentTypes": [
  {
    "name": "default",
    "pageBundle": true,
    "fields": [
      ...
    ]
  }
]
```

## Creating a template

To make sure that your type of content is already defined when creating a new Markdown file. It will
be easier to set the type of content within a template.

You can create Markdown templates in your project's `.frontmatter/templates` folder (or defined
differently).

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

If you already have an existing page, you can automatically create a template from it by running the
`Front Matter: Create a template from the current file` command.

The create template command will ask you the template's name and if you want to include the content.
The front matter data is included by default.

## Preserve casing of file names

When you create a new page, the file name will be created based on the sanitized `title` property.
During the sanitization, the `title` property will be converted to lowercase and all spaces will be
replaced with dashes.

If you want to preserve the casing of the file name, you can set the
`frontMatter.file.preserveCasing` setting to `true`.

```json
{
  "frontMatter.file.preserveCasing": true
}
```

## Disable creation in specific folders

If you want to disable the creation of new files in specific folders, you can do this by adding the
`disableCreation` property to the page folder. Once this is added, the CMS will only use the folder
to show the files.

```json
{
  "frontMatter.content.pageFolders": [
    {
      "title": "Blog",
      "path": "[[workspace]]/content/blog",
      "disableCreation": true
    }
  ]
}
```
