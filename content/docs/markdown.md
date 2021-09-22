---
title: Markdown
slug: markdown
description: null
date: '2021-08-31T05:59:58.852Z'
lastmod: '2021-08-31T05:59:58.852Z'
weight: 6
---

# Markdown features

## Overview

The Front Matter extension tries to make it easy to manage your Markdown pages/content. Within a Markdown page, we allow you to fold the file's Front Matter to be less distracting when writing. Also, do we highlight the Front Matter content to create a visual difference between content and metadata.

## Insert images

Inserting images was never easier with the `insert image into article` command, which can also be triggered with the camera icon in the editor title bar (Markdown files only).

![Insert images](/releases/v4_0_0/insert-images.gif)

> **Important**: If you want, you can add your own media snippet to allow you to use your shortcodes/markdown/... In order to specify the snippet, use the `frontMatter.dashboard.mediaSnippet` setting.

The `frontMatter.dashboard.mediaSnippet` setting is used similarly like the default VS Code snippets. You need to define an array of strings for multiline snippets.

The example used in the GIF above looks as follows:

```json
"frontMatter.dashboard.mediaSnippet": [
  "{{< caption \"{mediaUrl}\" \"Description\" >}}"
]
```

> **Important**: Use the `{mediaUrl}` placeholder where you want the relative image path to be inserted.

## Front Matter folding

If you want to focus on the content of your page, you have the ability to fold the Front Matter section of your page.

![Folding range](/assets/folding.png)

## Front Matter highlighting

The extension will automatically highlight the Front Matter of you document to create a visual difference between metadata and content.

![Highlighting](/assets/fm-highlight.png)

> **Info**: If you do not want this feature, you can disable it in the extension settings -> `Highlight Front Matter` or by setting the `frontMatter.content.fmHighlight` setting to `false`.