---
title: Custom actions
slug: custom-actions
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2023-10-06T13:49:58.889Z
weight: 500
---

# Custom actions

## Overview

<div class="iframe__wrapper">
  <iframe src="https://www.youtube.com/embed/wvH9Tn5LQ2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Not every website is the same. That is why we want to give you the ability to extend Front Matter
and you can do this by adding your custom actions to the Front Matter panel. A custom action is
nothing more than a Node.js script which is referenced from within your project.

![Custom action][01]

<!-- markdownlint-disable MD028 -->

> **Sample**: [Generate open graph preview image in Code with Front Matter][02]

> **Important**: You can add custom actions for your content and media files.

<!-- markdownlint-enable MD028 -->

## The custom action setting

The content and media custom actions can be defined by using the `frontMatter.custom.scripts` setting.

Custom actions can be configured with the following properties:

| Title          | Type                                    | Description                                                                                                                                                                                                                                                                                        | Default        |
| -------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `id`           | `string`                                | The id of the custom action/script                                                                                                                                                                                                                                                                 | `""`           |
| `title`        | `string`                                | The title of the custom action                                                                                                                                                                                                                                                                     | `""`           |
| `script`       | `string`                                | The path to the script to execute                                                                                                                                                                                                                                                                  | `""`           |
| `command`      | `string`                                | The command to execute (optional). Example: `node`, `path to your node executable`, `bash`, `python`, ...                                                                                                                                                                                          | `node`         |
| `type`         | `<content \| mediaFile \| mediaFolder>` | The type for which the script will be used (optional). <br /><br /> Use one of the following types: `content`, `mediaFile`, or `mediaFolder`.                                                                                                                                                      | `content`      |
| `bulk`         | `boolean`                               | Run the script for one file or multiple files.                                                                                                                                                                                                                                                     | `false`        |
| `output`       | `<notification \| editor`               | Specifies the output type (optional). <br /><br /> Available values are: `notification` and `editor`. <br /><br /> `notification`: The output will be passed as a notification. <br /> `editor`: The output will be passed to the editor.                                                          | `notification` |
| `outputType`   | `<text \| html>`                        | Specifies the output type (optional). <br /><br /> Available values the editor values from VS Code like: <br /><br /> `text`: The output will be passed as a text file. <br /> `html`: The output will be passed as an HTML file. <br /> `markdown`: The output will be passed as a Markdown file. | `text`         |
| `hidden`       | `boolean`                               | Hide the action from the UI. This is mostly used when creating a content script that will be used to post process new content (optional).                                                                                                                                                          | `false`        |
| `environments` | `environment`                           | The environments option allows you to specify in which environments the script should be executed (optional). <br /><br /> Available values are: `macos`, `linux`, or `windows`.                                                                                                                   | `undefined`    |
| `contentTypes` | `string[]`                              | The content types for which the script will be used (optional). <br /><br /> Example: `["post"]`                                                                                                                                                                                         | `undefined`    |

> **Important**: Previously, you could define the `nodeBin` property to define the path to your node
> executable. This path was needed when you are working with for instance `nvm` and have multiple
> versions of node installed. You can now use the `command` property instead.

### Environment type

The environment option contains the following properties:

| Title     | Type                          | Description                                                                                               | Default |
| --------- | ----------------------------- | --------------------------------------------------------------------------------------------------------- | ------- |
| `type`    | `<macos \| linux \| windows>` | The environment type for the script to run at.                                                            | `""`    |
| `script`  | `string`                      | The path to the script to execute.                                                                        | `""`    |
| `command` | `string`                      | The command to execute (optional). Example: `node`, `path to your node executable`, `bash`, `python`, ... | `node`  |

#### Example of defining a custom action with an environment

```json
{
  "frontMatter.custom.scripts": [
    {
      "title": "Create image folder",
      "id": "create-image-folder",
      "script": "./.frontmatter/config/custom/scripts/create-image-folder.sh",
      "command": "bash",
      "environments": [
        {
          "type": "windows",
          "script": "./.frontmatter/config/custom/scripts/create-image-folder.ps1",
          "command": "powershell"
        }
      ]
    }
  ]
}
```

> **Info**: The above sample would execute the bash script on macOS and Linux and the PowerShell for
> Windows. In case the PowerShell script would fail, it would fallback to the bash script.

## Creating a content script

Create a folder in your project where you want to store all your custom scripts, and create a new
JavaScript file. The sample content of this file looks like this:

```javascript
const arguments = process.argv;

if (arguments && arguments.length > 0) {
  const workspaceArg = arguments[2]; // The workspace path
  const fileArg = arguments[3]; // The file path
  const frontMatterArg = arguments[4]; // Front matter data

  console.log(`The content returned for your notification.`);
}
```

> **Info**: The sample script can be found here [sample-script.js][03]

The current workspace-, file-path, and front matter data will be passed as a arguments. Like you can
see in the above sample script, you can fetch these argument values as follows:

- `arguments[2]`: The workspace path
- `arguments[3]`: The file path (Markdown file)
- `arguments[4]`: The front matter data as object

In order to use this functionality, you will need to configure the `frontMatter.custom.scripts`
setting for your project as follows:

```json
{
  "frontMatter.custom.scripts": [
    {
      "title": "Generate social image",
      "script": "./scripts/social-img.js",
      "command": "~/.nvm/versions/node/v14.15.5/bin/node"
    }
  ]
}
```

> **Important**: When the command execution would fail when it cannot find the node command. You are
> able to specify your path to the node app. Command execution might for instance fail when using
> `nvm`. You can use the `command` property to specify the path to your node executable (_this is
> optional_).

Once a custom action has been configured, it will appear on the Front Matter panel. The output of
the script will be passed as a notification in VS Code. This output allows you to copy the output,
useful when you generate additional content.

![Custom action output][04]

### Updating the front matter

By default, once a custom action executed, it will show the output in a notification. In case you
want to update the front matter of your content, you need to provide the data in the following JSON
format.

```json
{ "frontmatter": { "<field name>": "field value" } }
```

Example:

```javascript
(async () => {
    // Your script logic

    // Finally, update the front matter of your content by passing the data
    // in the following format
    const output = JSON.stringify({
      "frontmatter": {
        "title": "My new title"
      }
    });

    console.log(output);
  }
})();
```

When data is passed in the above format, it will automatically get parse the JSON data and the file
its front matter gets updated accordingly.

## Bulk script execution

If you want, you can run a script for multiple files at once. This is useful when you want to
generate a social image for all your markdown files or perform any other bulk operation.

To enable bulk script execution, you need to configure the `frontMatter.custom.scripts` setting for
your project as follows:

```json
{
  "frontMatter.custom.scripts": [
    {
      "title": "Generate social image",
      "script": "./scripts/social-img.js",
      "command": "~/.nvm/versions/node/v16.13.0/bin/node",
      "bulk": true,
      "output": "editor"
    }
  ]
}
```

> **Important**: The `bulk` property is what specifies if it is a script that should be executed for
> multiple files.

## Creating a media script

Creating a media script is similar to creating a content script. The only difference is that you
need to specify the `type` property. You can use the `mediaFile` or `mediaFolder` as the value for
the `type` property.

Like the name suggests, the `mediaFile` type will be used for scripts that should be executed for a
single media file. The `mediaFolder` type will be used for scripts that should be executed for all
media files in a folder.

Here is a sample on how you can define a media script:

```json
{
  "frontMatter.custom.scripts": [
    {
      "title": "Optimize media",
      "script": "./scripts/media.js",
      "command": "~/.nvm/versions/node/v16.13.0/bin/node",
      "type": "mediaFile"
    },
    {
      "title": "Optimize images",
      "script": "./scripts/media-all.js",
      "command": "~/.nvm/versions/node/v16.13.0/bin/node",
      "type": "mediaFolder"
    }
  ]
}
```

The current workspace-, file/folder-path will be passed as a arguments.

- `arguments[2]`: The workspace path
- `arguments[3]`: The file or folder path. This depends on the type of script.

### Media file script

When you defined a media file script, you will be able to execute it for a single media file from
its menu.

![Custom action for a media file][05]

### Media folder script

When you defined a media folder script, you will be able to execute it for all media files in the
menu next to the **create new folder** button.

![Custom action for a media folder][06]

## Sample scripts

### Bash starter

```bash
echo "workspaceArg: $1"
echo "fileArg: $2"
echo "frontMatterArg: $3"
```

### Python starter

```python
#!/usr/bin/python3

import sys

print(f'workspaceArg: {sys.argv[1]}')
print(f'fileArg: {sys.argv[2]}')
print(f'frontMatterArg: {sys.argv[3]}')
```

### Optimize image (media file script)

```javascript
const path = require("path");

const arguments = process.argv;

(async () => {
  if (arguments && arguments.length > 0) {
    const imagemin = (await import("imagemin")).default;
    const imageminJpegtran = (await import("imagemin-jpegtran")).default;
    const imageminPngquant = (await import("imagemin-pngquant")).default;

    const fileArg = arguments[3]; // The file path

    await imagemin([fileArg], {
      destination: path.dirname(fileArg),
      glob: false,
      plugins: [imageminJpegtran(), imageminPngquant()],
    });

    console.log(`Optimized image ${path.basename(fileArg)}`);
  }
})();
```

**Prerequisites**:

- `npm i imagemin imagemin-jpegtran imagemin-pngquant`

### Optimize images in the current folder (media folder script)

```javascript
const path = require("path");

const arguments = process.argv;

(async () => {
  if (arguments && arguments.length > 0) {
    const imagemin = (await import("imagemin")).default;
    const imageminJpegtran = (await import("imagemin-jpegtran")).default;
    const imageminPngquant = (await import("imagemin-pngquant")).default;

    const workspaceArg = arguments[2]; // The workspace path
    const folderArg = arguments[3]; // The folder path

    const files = await imagemin([path.join(folderArg, "*.{jpg,png}")], {
      destination: folderArg,
      glob: true,
      plugins: [imageminJpegtran(), imageminPngquant()],
    });

    console.log(`Optimized images: ${files.length}`);
  }
})();
```

**Prerequisites**:

- `npm i imagemin imagemin-jpegtran imagemin-pngquant`

<!-- Link References -->

[01]: /assets/custom-action.png
[02]: https://www.eliostruyf.com/generate-open-graph-preview-image-code-front-matter/
[03]: https://github.com/estruyf/vscode-front-matter/blob/HEAD/sample/script-sample.js
[04]: /assets/custom-action-output.png
[05]: /releases/v5.6.0/media-file-custom-script.png
[06]: /releases/v5.6.0/media-folder-custom-script.png
