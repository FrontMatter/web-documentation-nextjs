---
title: Media view
slug: media-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2022-11-28T14:55:04.221Z
weight: 300.2
---

# Media view

The media view has been created to make it easier to look at all media files available for your
articles. When you click on an image, it will show a lightbox, so that it is easier to glance at
small images.

![Dashboard - Media view - Lightbox][01]

## Supported files

By default, the media dashboard supports audio, image, and video files to be displayed and uploaded
(drag&drop).

If you want that the media dashboard supports additional file types, you can define these in the
`frontMatter.media.supportedMimeTypes` setting.

```json
"frontMatter.media.supportedMimeTypes": [
  "image/*",
  "video/*",
  "audio/*"
]
```

## Media actions

On the image card, there are actions like setting metadata, copying the relative path, and deleting
the media file.

### Setting metadata

Setting metadata got introduced so that you can set the description and alt tag of your images. This
functionality makes it easier to insert your images to your content.

![Dashboard - Setting metadata][02]

<!-- markdownlint-disable MD028 -->
> **Info**: Check the [Insert images section][03] for more information.

> **Important**: Data is stored in a local JSON file which you can find under:
> `<project>/.frontmatter/content/mediaDb.json`. Please do not remove this file, or you will lose
> your metadata.
<!-- markdownlint-enable MD028 -->

### Deleting a media file

![Dashboard - Delete media file][04]

### Custom media actions

In version `5.6.0` of the extension, you can now define your own media actions. This extensibility
option is very useful for adding your own optimizations, functionality, or anything else you want.

For instance, you can use it to optimize the image(s) size.

Custom actions for media files can be defined on two levels:

- File level: Single file action
- Folder level: Multiple files action

> **Info**: Check out [creating media scripts][05] for more information.

## Drag and Drop

On the media view, we enabled drag and drop for your media files. You can easily drop any image from
your explorer/finder window into one of your folders.

![Dashboard - Upload media file][06]

<!-- Link References -->
[01]: /releases/v5.9.0/media-lightbox.png
[02]: /releases/v5.0.0/metadata-media.png
[03]: /docs/markdown#insert-images
[04]: /releases/v5.9.0/media-deletion.png
[05]: /docs/custom-actions#creating-a-media-script
[06]: /releases/v5.9.0/media-upload.png