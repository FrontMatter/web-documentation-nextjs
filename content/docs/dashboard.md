---
title: Dashboard
slug: dashboard
description: null
date: '2021-08-30T16:13:00.546Z'
lastmod: '2022-01-21T15:21:21.469Z'
weight: 3
---

# Dashboard

## Overview

Managing your Markdown pages/media has never been easier in VS Code. With the Front Matter dashboard, you will be able to view all your pages and media.

On the contents view, you can **search**, **filter**, **sort** your pages and much more.

![Dashboard - Contents view](https://res.cloudinary.com/estruyf/image/upload/w_1256/v1631520508/frontmatter/dashboard.png)

On the media view, you can quickly glance all the available media files in your project and perform quick actions like copying the relative path.

![Dashboard - Media view](https://res.cloudinary.com/estruyf/image/upload/v1641373114/frontmatter/media-dashboard-5.9.0.png)

In order to start using the dashboard, you will have to let the extension know in which folder(s) it can find your pages. Be sure to follow our [getting started](/docs/getting-started) guide.

> **Important**: If your preview images are not loading, it might be that you need to configure the `publicFolder` where the extension can find them. For instance, in Hugo, this is the static folder. You can configure this by updating the `frontMatter.content.publicFolder` setting.

## Commands

There are two commands to open the dashboard:

- `frontMatter.dashboard` aka `Front matter: Open dashboard` - Opens the dashboard on the contents view.
- `frontMatter.dashboard.media` aka `Front matter: Open media dashboard` - Opens the dashboard on the media view.
- `frontMatter.dashboard.data` aka `Front matter: Open data dashboard` - Opens the dashboard on the data view.

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

### Show on startup

If you want, you can check on the `Open on startup?` checkbox. This setting will allow the dashboard to automatically open when you launch the project in VS Code. It will only apply to the current project, not for all of them.

## Media view

The media view has been created to make it easier to look at all media files available for your articles. When you click on an image, it will show a lightbox, so that it is easier to glance at small images.

![Dashboard - Media view - Lightbox](/releases/v5.9.0/media-lightbox.png)

### Media actions

On the image card, there are actions like setting metadata, copying the relative path, and deleting the media file.

**Setting metadata**

Setting metadata got introduced so that you can set the description and alt tag of your images. This functionality makes it easier to insert your images to your content.

![Dashboard - Setting metadata](/releases/v5.0.0/metadata-media.png)

> **Info**: Check the [Insert images section](/docs/markdown#insert-images) for more information.

> **Important**: Data is stored in a local JSON file which you can find under: `<project>/.frontmatter/content/mediaDb.json`. Please do not remove this file, or you will lose your metadata.

**Deleting a media file**

![Dashboard - Delete media file](/releases/v5.9.0/media-deletion.png)

**Custom media actions**

In version `5.6.0` of the extension, you can now define your own media actions. This extensibility option is very useful for adding your own optimizations, functionality, or anything else you want.

For instance, you can use it to optimize the image(s) size.

Custom actions for media files can be defined on two levels:

- File level: Single file action
- Folder level: Multiple files action

> **Info**: Check out [creating media scripts](/docs/custom-actions#creating-a-media-script) for more information.

### Drag and Drop

On the media view, we enabled drag and drop for your media files. You can easily drop any image from your explorer/finder window into one of your folders.

![Dashboard - Upload media file](/releases/v5.9.0/media-upload.png)

## Data files view

Data files/folders are pieces of content that do not belong to any markdown content, but live on their own. Most of the time, these data files are used to store additional information about your project/blog/website that will be used to render the content.

For example: navigation, social media links, contacts, etc.

The data files dashboard allows you to quickly manage your data files.

![Data files dashboard](/releases/v6.0.0/data-files-dashboard.png)

### Configuration

In order to use the data files dashboard, you will need to configure the extension with the following settings:

- `frontMatter.data.types`: This only defines the object and its fields. Use this setting, if you want to re-use a data type in various files/folders.
- `frontMatter.data.files`: Defines how a single data file.
- `frontMatter.data.folders`: Defines that all files of a folder need to be treated the same.

### Creating a data file

To create a data file, you can use the `frontMatter.data.files` setting. 

```json
"frontMatter.data.files": [
  {
    "id": "sponsors",
    "title": "Sponsors",
    "file": "[[workspace]]/data/sponsors.json",
    "fileType": "json",
    "labelField": "name",
    "schema": {
      "title": "Sponsors",
      "type": "object",
      "required": [
        "name",
        "url"
      ],
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "url": {
          "type": "string",
          "title": "URL"
        },
        "description": {
          "type": "string",
          "title": "Description"
        }
      }
    }
  }
]
```

The above sample can be used to create a sponsor data file which contains an array of sponsor object with url, name, and description as properties.

![Data dashboard - Sponsor example](/releases/v6.0.0/data-dashboard-sample.png)

> **Info**: Use the `[[workspace]]` placeholder to define the workspace folder. The extension will automatically replace this with the workspace folder path.

> **Important**: In the `schema` property we use the [JSON Schema](https://json-schema.org/) standard to define the structure of the data file.

### Re-using a data type for files or folders

In some cases, you might want to re-use a data type for files or folders. You can do so by using the `frontMatter.data.types` setting in combination with the `frontMatter.data.files` and/or `frontMatter.data.folders` settings.

First the data type, this is an object containing the `id` and `schema` properties.

```json
"frontMatter.data.files": [
  {
    "id": "sponsors",
    "schema": {
      "title": "Sponsors",
      "type": "object",
      "required": [
        "name",
        "url"
      ],
      "properties": {
        "name": {
          "type": "string",
          "title": "Name"
        },
        "url": {
          "type": "string",
          "title": "URL"
        },
        "description": {
          "type": "string",
          "title": "Description"
        }
      }
    }
  }
]
```

In the `frontMatter.data.files` and/or `frontMatter.data.folders` settings, instead of defining the `schema` property, you can use the `type` property to reference the data type.

```json
"frontMatter.data.files": [
  {
    "id": "all-sponsors",
    "path": "[[workspace]]/data/sponsors",
    "labelField": "name",
    "type": "sponsors"
  }
]
```

> **Important**: when using data folders, the extension searches for `yml`, `yaml`, and `json` files in the folder.