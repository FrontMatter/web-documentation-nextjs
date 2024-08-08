---
title: Media view
slug: dashboard/media-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2024-08-07T12:33:01.748Z
weight: 300.2
---

# Media view

The media view has been created to make it easier to look at all media files available for your
articles. When you click on an image, it will show a lightbox, so that it is easier to glance at
small images.

<!-- FM:Snippet:Start data:{"id":"Open in VS Code","fields":[{"name":"title","value":"Open media dashboard in VS Code"},{"name":"command","value":"frontMatter.dashboard.media"},{"name":"title","value":"Open media dashboard in VS Code"}]} -->
<a class="open_vscode" title="Open media dashboard in VS Code" href='vscode://eliostruyf.vscode-front-matter?command=frontMatter.dashboard.media'>
  Open media dashboard in VS Code
</a>
<!-- FM:Snippet:End -->

![Media dashboard][01]

## Define the media folder

You can use the `frontMatter.content.publicFolder` setting to define the location of your media
files. By default, it is unset, and will show all folders and files starting from the root of your
project.

```json {{ "title": "Example of defining the media folder" }}
{
  "frontMatter.content.publicFolder": "public"
}
```

### Relative paths

In case the paths to your images need to be relative to the content file, you need to specify the
following:

```json
{
  "frontMatter.content.publicFolder": {
    "path": "src/static",
    "relative": true
  }
}
```

### Hexo support

In case you are using Hexo in combinations with the [asset folders](https://hexo.io/docs/asset-folders),
you can use the following settings:

- `source/images`: If you want to use the default image location of Hexo;
- `hexo:post_asset_folder`: If you want to use the post asset folder functionality.

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

## Metadata

The media dashboard supports metadata for images. By default, the following metadata is supported:

- Title
- Caption
- Alternate text

Since version `10.0.0`, you can define your own metadata fields by defining media content types.

### Media content types

Media content types are defined in the `frontMatter.media.contentTypes` setting. This setting allows
you to define your own metadata fields for your media files.

#### Media content type properties

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `name` | `string` | The name of the content type. | `""` |
| `fileTypes` | `string[]` | The file extensions that should be associated with this content type. | `[]` |
| `fields` | `field[]` | The fields that should be shown for this content type. | `[]` |

#### Media field properties

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `title` | `string` | The title of the field. | `""` |
| `name` | `string` | The name of the field. | `""` |
| `type` | `string` | The type of the field (`string`). | `""` |
| `single` | `boolean` | If the field is a single line value. | `true` |

```json {{ "title": "Example of defining media content types" }}
{
  "frontMatter.media.contentTypes": [{
    "name": "default",
    "fileTypes": ["png", "jpg", "jpeg", "gif"],
    "fields": [{
        "title": "Title",
        "name": "title",
        "type": "string"
      },
      {
        "title": "Author",
        "name": "author",
        "type": "string"
      },
      {
        "title": "Alt text",
        "name": "alt",
        "type": "string"
      }
    ]
  }]
}
```

## Media actions

On the image card, there are actions like setting metadata, copying the relative path, and deleting
the media file.

### Updating metadata

Setting metadata got introduced so that you can set the description and alt tag of your images. This
functionality makes it easier to insert your images to your content.

![Dashboard - Setting metadata][02]

<!-- markdownlint-disable MD028 -->
> **Info**: Check the [Insert images section][03] for more information.

> **Important**: Data is stored in a local JSON file which you can find under:
> `<project>/.frontmatter/database/mediaDb.json`. Please do not remove this file, or you will lose
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
[01]: /releases/v10.0.0/media-dashboard.png
[02]: /releases/v10.0.0/metadata-update.png
[03]: /docs/markdown#insert-images
[04]: /releases/v10.0.0/delete-media.png
[05]: /docs/custom-actions#creating-a-media-script
[06]: /releases/v10.0.0/media-upload.png
