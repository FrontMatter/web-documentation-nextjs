---
title: Next.js Configuration
slug: ssg-and-frameworks/nextjs-configuration
description: ""
date: 2023-07-10T08:34:06.858Z
lastmod: 2023-07-10T09:13:22.369Z
weight: 600.3
---
<!-- markdownlint-disable MD013 -->
# Next.js Configuration

## Creating the Next.js project

For the Next.js project configuration, the documentation makes use of the official
[blog starter kit](https://vercel.com/templates/next.js/blog-starter-kit).

If you want to start by creating a new blog, you can use the following command:

```bash
npx create-next-app --example blog-starter <your-project-name>
```

> **Info**: In case you already have a Next.js project, you can follow the steps below
> to configure Front Matter CMS.

## Installing Front Matter

You can get the extension from the [Visual Studio Code Marketplace - Front Matter](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter)
or by clicking on the following link: [open Front Matter CMS extension in VS Code](vscode:extension/eliostruyf.vscode-front-matter).

## Initializing Front Matter

Once Front Matter CMS is installed, you will get a new icon in the Activity Bar.
When you click on it, it will open the Front Matter CMS panel in the primary sidebar.
Follow the next steps to initialize your project:

- Click on the Initialize project button in the Front Matter panel
- The welcome screen will open, and you can start initializing the project
- Click on the first step to **Initialize project**
- As Next.js is one of the supported frameworks, it will be selected by default
- Register the content folder by clicking on the `_posts` folder
  - Front Matter will ask you for the collection name, which can be renamed to `posts`
- If you have articles with tags and/or categories, you can click on the import action
- Once the initialization is completed, you can click on the **Open Dashboard** button to open the dashboard

![Content dashboard of the Next.js project](/nextjs-configuration/nextjs-dashboard.png)

## Project configuration

Once the project is initialized, you will get a `frontmatter.json` configuration file
and a `.frontmatter` folder in the root of your project.

```bash
| _posts/
| .frontmatter/
| - database
| -- taxonomyDb.json
| ...
| frontmatter.json
| package.json
```

## Content-type configuration

> **Important**: The following steps are only required if you want to use the blog starter kit is
> structure and metadata. If you want to use your own structure, you can skip this step or configure
> it to your needs.

Start by opening one of the markdown files shown on the dashboard. Once opened, you can see the
SEO status, actions, and metadata of the content.

In the **metadata** section, you will notice that the content type has some missing fields.
Follow the next steps to fix this:

- Click on the **create content-type** button

![Create content-type button](/nextjs-configuration/create-content-type.png)

- Select **yes** to overwrite the existing content-type. Once completed, you can see an update to
the metadata section.

![Content-type configuration](/nextjs-configuration/content-type-configuration.png)

- Sometimes, more configuration might be required. In that case, you can manually open the
`frontmatter.json` file and update the configuration. Which we will do for the image
field in the `author` and `ogImage` fields.
- In the `frontmatter.json` file, you can find the `frontMatter.taxonomy.contentTypes`, which has
a **default** content-type configured with the fields of the blog starter kit.
- Add the `isPreviewImage` property to the `coverImage` field and set its value to `true`
- Update the `picture` field of the `author` from `string` to `image`
- Update the `ogImage` field from `string` to `image`

Once you have updated the configuration, you can go back to the markdown file and see the changes
in the metadata section.

![Updated content-type configuration](/nextjs-configuration/updated-content-type-configuration.png)

Here you can see the updated configuration:

```json
{
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "default",
      "pageBundle": false,
      "previewPath": null,
      "fields": [
        {
          "title": "title",
          "name": "title",
          "type": "string"
        },
        {
          "title": "excerpt",
          "name": "excerpt",
          "type": "string"
        },
        {
          "title": "coverImage",
          "name": "coverImage",
          "type": "image",
          "isPreviewImage": true
        },
        {
          "title": "date",
          "name": "date",
          "type": "datetime"
        },
        {
          "title": "author",
          "name": "author",
          "type": "fields",
          "fields": [
            {
              "title": "name",
              "name": "name",
              "type": "string"
            },
            {
              "title": "picture",
              "name": "picture",
              "type": "image"
            }
          ]
        },
        {
          "title": "ogImage",
          "name": "ogImage",
          "type": "fields",
          "fields": [
            {
              "title": "url",
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

When the configuration is completed, you can see the cover images being used on the content
dashboard of Front Matter.

![Content dashboard with cover images](/nextjs-configuration/content-dashboard-with-cover-images.png)

> **Info**: If the cover images are not showing up, you can try to clear the cache of Front Matter
> by running the `Front Matter: Clear cache` command.

## You are all set

You have successfully configured Front Matter CMS for your Next.js project. You can now start
creating content and managing your website via Front Matter CMS.
<!-- markdownlint-enable MD013 -->