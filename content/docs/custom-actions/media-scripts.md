---
title: Media scripts
slug: custom-actions/media-scripts
description: null
date: 2024-08-12T14:42:34.817Z
lastmod: 2024-08-13T07:40:24.192Z
weight: 500.2
---

# Media scripts

Media scripts are scripts that can be executed on a single or multiple media files.
You can use these scripts to manipulate media files, copy metadata, or perform any other operation
you want.

Creating a media script is similar to creating a content script. The only difference is that you
need to specify the `type` property. You can use the `mediaFile` or `mediaFolder` as the value for
the `type` property.

## Media script types

### Media file script

When you defined a media file script, you will be able to execute it for a single media file from
its menu.

![Custom action for a media file][01]

### Media folder script

When you defined a media folder script, you will be able to execute it for all media files in the
menu next to the **create new folder** button.

![Custom action for a media folder][02]

## Creating a new script

> **Important**: When using JavaScript, you can make use of the `@frontmatter/extensibility` library.
> More information to install it can be found in the
> [Extensibility library][03] section.

The `@frontmatter/extensibility` package provides you the following arguments for your media script:

```javascript
import { MediaScript } from "@frontmatter/extensibility";

const { workspacePath, mediaPath, answers } = MediaScript.getArguments();
```

At the end of the script, you can call the `MediaScript.done` method to return a notification to the
user or use any of the other methods provided by the `MediaScript` class.

| Method | Description |
| --- | --- |
| `MediaScript.done(message)` | Returns a notification to the user. |
| `MediaScript.copyMetadata(source, destination)` | Copies the metadata from the source media file to the destination media file. |
| `MediaScript.copyMetadataAndDelete(source, destination)` | Copies the metadata from the source media file to the destination media file and deletes the source media file. |
| `MediaScript.delete(source)` | Deletes the media file. |

## Configure the script

To use this functionality, you will need to configure the `frontMatter.custom.scripts` setting for
your project. Every media script should have a `type` property defined. You can use the `mediaFile`
or `mediaFolder` as the value for the `type` property.

- The `mediaFile` type will be used for scripts that should be executed for a single media file.
- The `mediaFolder` type will be used for scripts that should be executed for all media files in a folder.

Here is a sample on how you can define a media script:

```json {{ "title": "Media scripts configuration" }}
{
  "frontMatter.custom.scripts": [
    {
      "title": "Optimize media",
      "script": "./scripts/media.mjs",
      "command": "~/.nvm/versions/node/v18.17.1/bin/node",
      "type": "mediaFile"
    },
    {
      "title": "Optimize images",
      "script": "./scripts/media-all.mjs",
      "command": "~/.nvm/versions/node/v18.17.1/bin/node",
      "type": "mediaFolder"
    }
  ]
}
```

<!-- Link References -->

[01]: /releases/v10.3.0/media-script.webp
[02]: /releases/v10.3.0/media-folder-action.webp
[03]: /docs/custom-actions#extensibility-library
