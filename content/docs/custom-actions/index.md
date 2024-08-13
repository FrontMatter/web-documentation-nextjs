---
title: Custom actions/scripts
slug: custom-actions
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2024-08-13T10:00:03.598Z
weight: 500
---

# Custom actions and scripts

## Overview

<!-- markdownlint-disable MD013 MD033 -->
<div class="iframe__wrapper">
  <iframe src="https://www.youtube.com/embed/wvH9Tn5LQ2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<!-- markdownlint-enable MD013 MD033 -->

Not every website is the same. That is why we want to give you the ability to extend Front Matter
and you can do this by adding your custom actions to the Front Matter panel. A custom action is
nothing more than a script which is referenced from within your project.

![Custom action][01]

## Settings

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

```json {{ "title": "Custom action configuration" }}
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

## Extensibility library

The [@frontmatter/extensibility](https://www.npmjs.com/package/@frontmatter/extensibility) library
provides you with the necessary methods to interact with the Front Matter CMS.

You can use the library for your custom actions to update the front matter of your content or media files.

### Installing the extensibility library

When using JavaScript, you can make use of the
[@frontmatter/extensibility](https://www.npmjs.com/package/@frontmatter/extensibility) package.

```bash {{ "title": "Install the extensibility package" }}
npm i @frontmatter/extensibility
```

With this `@frontmatter/extensibility` dependency,
you can easily get the arguments and ask questions to the user.

<!-- Link References -->

[01]: /releases/v10.3.0/custom-action.png
