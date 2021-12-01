---
title: Markdown
slug: markdown
description: null
date: '2021-08-31T05:59:58.852Z'
lastmod: '2021-12-01T14:21:23.114Z'
weight: 6
---

# Markdown features

## Overview

The Front Matter extension tries to make it easy to manage your Markdown pages/content. Within a Markdown page, we allow you to fold the file's Front Matter to be less distracting when writing. Also, do we highlight the Front Matter content to create a visual difference between content and metadata.

## Insert images

Inserting images was never easier with the `insert image into article` command, which can also be triggered with the image icon in the editor title bar (Markdown files only).

![Insert images](/releases/v4_0_0/insert-images.gif)

> **Important**: If you want, you can add your own media snippet to allow you to use your shortcodes/markdown/... In order to specify the snippet, use the `frontMatter.dashboard.mediaSnippet` setting.

## WYSIWYG

To help out content editors write their content in Markdown. Front Matter provides a couple of helpful, what you see is what you get (WYSIWYG), controls while working in a Markdown file.

All the controls can be found on the top right of the opened file title bar.

![WYSIWYG controls](/releases/v5.7.0/wysiwyg_controls.png)

If you want, you can disable these controls with the following setting `frontMatter.content.wysiwyg`. By default, this is set to `true`. When changed to `false`, these controls will disappear.

## Insert your own media snippet

The `frontMatter.dashboard.mediaSnippet` setting is used similarly like the default VS Code snippets. You need to define an array of strings for multiline snippets.

The example used in the GIF above looks as follows:

```json
"frontMatter.dashboard.mediaSnippet": [
  "{{< imgShortCode \"{mediaUrl}\" \"{caption}\" >}}"
]
```

### Placeholders

For your snippet, you can use the following placeholders:

- `{mediaUrl}`: Use this to insert the relative path to the media file.
- `{caption}`: Use this placeholder where you want to insert the caption.
- `{alt}`: Use this placeholder where you want to insert the alt attribute value.
- `{filename}`: Name of the file.

> **Info**: All three placeholders are optional, so you can leave out the placeholders you do not want to use from your snippet.

## Front Matter folding

If you want to focus on the content of your page, you have the ability to fold the Front Matter section of your page.

![Folding range](/assets/folding.png)

## Front Matter highlighting

The extension will automatically highlight the Front Matter of you document to create a visual difference between metadata and content.

![Highlighting](/assets/fm-highlight.png)

> **Info**: If you do not want this feature, you can disable it in the extension settings -> `Highlight Front Matter` or by setting the `frontMatter.content.fmHighlight` setting to `false`.
