---
title: Custom actions
slug: custom-actions
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2022-09-22T07:41:47.344Z
weight: 500
---

# Custom actions

## Overview

Not every website is the same. That is why we want to give you the ability to extend Front Matter and you can do this by adding your custom actions to the Front Matter panel. A custom action is nothing more than a Node.js script which is referenced from within your project.

![Custom action](/assets/custom-action.png)

> **Sample**: [Generate open graph preview image in Code with Front Matter](https://www.eliostruyf.com/generate-open-graph-preview-image-code-front-matter/)

> **Important**: You can add custom actions for your content and media files.

## The custom action setting

The content and media custom actions can be defined by using the `frontMatter.custom.scripts` setting.

Custom actions can be configured with the following properties:

- `id`: The id of the custom action/script
- `title`: The title of the custom action
- `script`: The path to the script to execute
- `command`: The command to execute. Example: `node`, `path to your node executable`, `bash`, `python`, ... (default: `node` - optional).
- `type`: The type for which the script will be used. Can be `content`, `mediaFile`, or `mediaFolder`. (default: `content` - optional).
- `bulk`: Run the script for one file or multiple files. .
- `output`: Specifies the output type (default: `notification` - optional). Available values are:
  - `notification`: The output will be passed as a notification.
  - `editor`: The output will be passed to the editor.
- `outputType`: Specifies the output type (default: `text` - optional). Available values the editor values from VS Code like:
  - `text`: The output will be passed as a text file.
  - `html`: The output will be passed as an HTML file.
  - `markdown`: The output will be passed as an Markdown file.
- `hidden`: Hide the action from the UI. This is mostly used when creating a content script that will be used to post process new content (default: `false` - optional).

> **Important**: Previously, you could define the `nodeBin` property to define the path to your node executable. This path was needed when you are working with for instance `nvm` and have multiple versions of node installed. You can now use the `command` property instead.

## Creating a content script

Create a folder in your project where you want to store all your custom scripts, and create a new JavaScript file. The sample content of this file looks like this:

```javascript
const arguments = process.argv;

if (arguments && arguments.length > 0) {
  const workspaceArg = arguments[2]; // The workspace path
  const fileArg = arguments[3]; // The file path
  const frontMatterArg = arguments[4]; // Front matter data

  console.log(`The content returned for your notification.`);
}
```

> **Info**: The sample script can be found here [sample-script.js](https://github.com/estruyf/vscode-front-matter/blob/HEAD/sample/script-sample.js)

The current workspace-, file-path, and front matter data will be passed as a arguments. Like you can see in the above sample script, you can fetch these argument values as follows:

- `arguments[2]`: The workspace path
- `arguments[3]`: The file path (Markdown file)
- `arguments[4]`: The front matter data as object

In order to use this functionality, you will need to configure the `frontMatter.custom.scripts` setting for your project as follows:

```json
{
  "frontMatter.custom.scripts": [{
    "title": "Generate social image",
    "script": "./scripts/social-img.js",
    "command": "~/.nvm/versions/node/v14.15.5/bin/node"
  }]
}
```

> **Important**: When the command execution would fail when it cannot find the node command. You are able to specify your path to the node app. Command execution might for instance fail when using `nvm`. You can use the `command` property to specify the path to your node executable (*this is optional*).

Once a custom action has been configured, it will appear on the Front Matter panel. The output of the script will be passed as a notification in VS Code. This output allows you to copy the output, useful when you generate additional content.

![Custom action output](/assets/custom-action-output.png)

### Updating the front matter

By default, once a custom action executed, it will show the output in a notification. In case you want to update the front matter of your content, you need to provide the data in the following JSON format.

```json
{ "frontmatter": { "<field name>": "field value" }}
```

Example:

```javascript
(async () => {
    // Your script logic

    // Finally, update the front matter of your content by passing the data in the following format
    const output = JSON.stringify({
      "frontmatter": {
        "title": "My new title"
      }
    });

    console.log(output);
  }
})();
```

When data is passed in the above format, it will automatically get parse the JSON data and the file its front matter gets updated accordingly.

## Bulk script execution

If you want, you can run a script for multiple files at once. This is useful when you want to generate a social image for all your markdown files or perform any other bulk operation.

To enable bulk script execution, you need to configure the `frontMatter.custom.scripts` setting for your project as follows:

```json
{
  "frontMatter.custom.scripts": [{
    "title": "Generate social image",
    "script": "./scripts/social-img.js",
    "command": "~/.nvm/versions/node/v16.13.0/bin/node",
    "bulk": true,
    "output": "editor"
  }]
}
```

> **Important**: The `bulk` property is what specifies if it is a script that should be executed for multiple files.

## Creating a media script

Creating a media script is similar to creating a content script. The only difference is that you need to specify the `type` property. You can use the `mediaFile` or `mediaFolder` as the value for the `type` property.

Like the name suggests, the `mediaFile` type will be used for scripts that should be executed for a single media file. The `mediaFolder` type will be used for scripts that should be executed for all media files in a folder.

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

When you defined a media file script, you will be able to execute it for a single media file from its menu.

![Custom action for a media file](/releases/v5.6.0/media-file-custom-script.png)

### Media folder script

When you defined a media folder script, you will be able to execute it for all media files in the menu next to the **create new folder** button.

![Custom action for a media folder](/releases/v5.6.0/media-folder-custom-script.png)

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
const path = require('path');

const arguments = process.argv;

(async () => {
  if (arguments && arguments.length > 0) {
    const imagemin = (await import('imagemin')).default;
    const imageminJpegtran = (await import('imagemin-jpegtran')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;
    
    const fileArg = arguments[3]; // The file path
  
    await imagemin([fileArg], {
      destination: path.dirname(fileArg),
      glob: false,
      plugins: [
        imageminJpegtran(),
        imageminPngquant()
      ]
    });

    console.log(`Optimized image ${path.basename(fileArg)}`)
  }
})();
```

**Prerequisites**:

- `npm i imagemin imagemin-jpegtran imagemin-pngquant`

### Optimize images in the current folder (media folder script)

```javascript
const path = require('path');

const arguments = process.argv;

(async () => {
  if (arguments && arguments.length > 0) {
    const imagemin = (await import('imagemin')).default;
    const imageminJpegtran = (await import('imagemin-jpegtran')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;

    const workspaceArg = arguments[2]; // The workspace path
    const folderArg = arguments[3]; // The folder path
  
    const files = await imagemin([path.join(folderArg, '*.{jpg,png}')], {
      destination: folderArg,
      glob: true,
      plugins: [
        imageminJpegtran(),
        imageminPngquant()
      ]
    });

    console.log(`Optimized images: ${files.length}`)
  }
})();
```

**Prerequisites**:

- `npm i imagemin imagemin-jpegtran imagemin-pngquant`
