---
title: Content scripts
slug: custom-actions/content-scripts
description: null
date: 2024-08-12T14:42:34.817Z
lastmod: 2024-08-13T07:40:16.340Z
weight: 500.1
---

# Content scripts

A content script is a script that can be executed on a single or multiple content files.
You can use this to generate additional content, update the front matter, or perform any other
operation you want.

Start by creating a new folder in your project where you want to store all your custom scripts.
In this folder, you can create a new script file.

> **Info**: You can also use languages like JavaScript, Python, Bash, ... for your script. Examples are
> provided at the end of this page.

## Creating a new script

> **Important**: When using JavaScript, you can make use of the `@frontmatter/extensibility` library.
> More information to install it can be found in the
> [Extensibility library][02] section.

With the `@frontmatter/extensibility` package, you can create a script as follows:

```javascript {{ "title": "Example content script" }}
import { ContentScript } from "@frontmatter/extensibility";

const { workspacePath, filePath, frontMatter, answers } = ContentScript.getArguments();

ContentScript.done("The content returned for your notification.");
```

At the end of the script, you can call the `ContentScript.done` method to return a notification to the
user or use any of the other methods provided by the `ContentScript` class.

| Method | Description |
| --- | --- |
| `ContentScript.done(message)` | Returns a notification to the user. |
| `ContentScript.updateFrontMatter(data)` | Updates the front matter of the content file. |

## Configure the script

To use this functionality, you will need to configure the `frontMatter.custom.scripts`
setting for your project as follows:

```json {{ "title": "Custom action configuration" }}
{
  "frontMatter.custom.scripts": [
    {
      "title": "Generate social image",
      "script": "./scripts/social-img.mjs",
      "command": "~/.nvm/versions/node/v18.17.1/bin/node"
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

![Custom action output][01]

## Update the front matter

By default, once a custom action executed, it will show the output in a notification.

In case you want to update the front matter of your content, you can use the `ContentScript.updateFrontMatter`
method.

```javascript {{ "title": "Update with the extensibility dependency" }}
import { ContentScript } from "@frontmatter/extensibility";

ContentScript.updateFrontMatter({ title: "My new title" })
```

When data is passed in the above format, it will automatically get parse the JSON data and the file
its front matter gets updated accordingly.

<!-- Link References -->

[01]: /assets/custom-action-output.png
[02]: /docs/custom-actions#extensibility-library
