---
title: Markdown
slug: markdown
description: null
date: 2021-08-31T05:59:58.852Z
lastmod: 2022-09-22T08:07:15.584Z
weight: 800
---

# Markdown features

## Overview

The Front Matter extension tries to make it easy to manage your Markdown pages/content. Within a
Markdown page, we allow you to fold the file's Front Matter to be less distracting when writing.
Also, the Front Matter content is highlighted to create a visual difference between content and
metadata.

## WYSIWYG

To help out content editors write their content in Markdown. Front Matter provides a couple of
helpful, what you see is what you get (WYSIWYG), controls while working in a Markdown file.

All the controls can be found on the top right of the opened file title bar.

![WYSIWYG controls][01]

Currently supported are:

- Headings
- Bold
- Italic
- Hyperlink
- Strikethrough
- Block quote
- Code snippet
- Code block
- Ordered list
- Unordered list
- Task list

If you want, you can disable these controls with the following setting
`frontMatter.content.wysiwyg`. By default, this is set to `true`. When changed to `false`, these
controls will disappear.

### Inserting headings

When you click on the headings in the WYSIWYG controls, you will be asked which level of heading you
want to insert.

![WYSIWYG headings][02]

### Other WYSIWYG options

When you click on the elipsis icon in the WYSIWYG controls, you will be asked which of the advanced
markup you want to insert.

![WYSIWYG options][03]

## Insert images

Inserting images was never easier with the `insert image into article` command, which can also be
triggered with the image icon in the editor title bar (Markdown files only).

![Insert images][04]

> **Info**: You can also use media snippets to insert your images. More information can be found in
> the [Media Snippets][05] section.

## Front matter folding

If you want to focus on the content of your page, you have the ability to fold the Front Matter
section of your page.

![Folding range][06]

## Front matter highlighting

The extension will automatically highlight the front matter of you document to create a visual
difference between metadata and content.

![Highlighting][07]

> **Info**: If you do not want this feature, you can disable it in the extension settings ->
> `Highlight Front Matter` or by setting the `frontMatter.content.fmHighlight` setting to `false`.

## Hiding front matter

Hiding the front matter in the editing experience can be done by the `frontMatter.content.hideFm`
setting. By default, this is set to `false`. When changed to `true`, the front matter will be hidden
in the editor.

In combination with this setting, you can also set a message to highlight that the front matter is
hidden and the Front Matter panel needs to be used to edit the metadata of your page.

### Example

<!-- markdownlint-disable MD013 -->
```json
{
  "frontMatter.content.hideFm": true,
  "frontMatter.content.hideFmMessage":"Use the editor panel to make front matter changes"
}
```
<!-- markdownlint-enable MD013 -->

### Result

![Hide front matter][08]

<!-- Link References -->
[01]: /releases/v5.7.0/wysiwyg_controls.png
[02]: /releases/v5.7.0/wysiwyg_headings.png
[03]: /releases/v5.7.0/wysiwyg_options.png
[04]: /releases/v4_0_0/insert-images.gif
[05]: /docs/snippets#media-snippets
[06]: /assets/folding.png
[07]: /assets/fm-highlight.png
[08]: /releases/v8.1.0/hide-fm.png
