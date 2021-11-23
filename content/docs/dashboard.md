---
title: Dashboard
slug: dashboard
description: null
date: '2021-08-30T16:13:00.546Z'
lastmod: '2021-11-22T09:08:12.205Z'
weight: 3
---

# Dashboard

## Overview

Managing your Markdown pages/media has never been easier in VS Code. With the Front Matter dashboard, you will be able to view all your pages and media.

On the contents view, you can **search**, **filter**, **sort** your pages and much more.

![Dashboard - Contents view](https://res.cloudinary.com/estruyf/image/upload/w_1256/v1631520508/frontmatter/dashboard.png)

On the media view, you can quickly glance all the available media files in your project and perform quick actions like copying the relative path.

![Dashboard - Media view](https://res.cloudinary.com/estruyf/image/upload/w_1256/v1631520508/frontmatter/media.png)

In order to start using the dashboard, you will have to let the extension know in which folder(s) it can find your pages. Be sure to follow our [getting started](/docs/getting-started) guide.

> **Important**: If your preview images are not loading, it might be that you need to configure the `publicFolder` where the extension can find them. For instance, in Hugo, this is the static folder. You can configure this by updating the `frontMatter.content.publicFolder` setting.

## Contents view

### Draft status navigation

By default, the contents view will show all your pages, and will you will be able to filter by **draft** and **published** pages.

![Draft filters](/releases/v5.3.0/draft-status-original.png)

If you want to use other statuses, you can do so by specifying your own draft field and value.

> **Info**: [Set a custom draft field](/docs/content-types#custom-draft-field).

![Draft filters](/releases/v5.3.0/draft-status.png)

### Supported filters

- Tag filter
- Category filter
- Content folder (when you have multiple registered)

### Supported sorting

- Last modified
- Filename (asc/desc)

> **Info**: You can define custom sorting options by specifying these within the [frontMatter.content.sorting](/docs/settings#frontMatter.content.sorting) setting.

You are also able to define your default sorting options by setting the `frontMatter.content.defaultSorting` setting for the content view, and the `frontMatter.media.defaultSorting` setting for the media view.

## Media view

The media view has been created to make it easier to look at all media files available for your articles. When you click on an image, it will show a lightbox, so that it is easier to glance at small images.

![Dashboard - Media view - Lightbox](/assets/lightbox.png)

### Media actions

On the image card, there are actions like setting metadata, copying the relative path, and deleting the media file.

**Setting metadata**

Setting metadata got introduced so that you can set the description and alt tag of your images. This functionality makes it easier to insert your images to your content.

![Dashboard - Setting metadata](/releases/v5.0.0/metadata-media.png)

> **Info**: Check the [Insert images section](/docs/markdown#insert-images) for more information.

> **Important**: Data is stored in a local JSON file which you can find under: `<project>/.frontmatter/content/mediaDb.json`. Please do not remove this file, or you will lose your metadata.

**Deleting a media file**

![Dashboard - Delete media file](/assets/delete-media.png)

**Custom media actions**

In version `5.6.0` of the extension, you can now define your own media actions. This extensibility option is very useful for adding your own optimizations, functionality, or anything else you want.

For instance, you can use it to optimize the image(s) size.

Custom actions for media files can be defined on two levels:

- File level: Single file action
- Folder level: Multiple files action

> **Info**: Check out [creating media scripts](/docs/custom-actions#creating-a-media-script) for more information.

### Drag and Drop

On the media view, we enabled drag and drop for your media files. You can easily drop any image from your explorer/finder window into one of your folders.

![Dashboard - Upload media file](/assets/upload-media.png)

## Show on startup

If you want, you can check on the `Open on startup?` checkbox. This setting will allow the dashboard to automatically open when you launch the project in VS Code. It will only apply to the current project, not for all of them.
