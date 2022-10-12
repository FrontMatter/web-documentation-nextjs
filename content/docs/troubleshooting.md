---
title: Troubleshooting
slug: troubleshooting
description: null
date: 2021-12-21T09:53:30.176Z
lastmod: 2022-03-07T10:44:47.318Z
weight: 1000
---

# Troubleshooting

## Overview

Unfortunately, sometimes you may encounter issues with the Front Matter extension. This can be due
to the fact that there are misconfigurations, issues parsing your content, or bugs. We are
constantly working to improve the extension and fix any issues you may encounter. In this section
you can read what you can do to help you troubleshoot your Front Matter configuration.

## Content and front matter parsing

One of the main issues you may encounter is that there is something wrong in your markdown its front
matter. This can be due to a typo, a missing comma, or a missing colon, ...

The extension uses a YAML or TOML parser, depending on the type of front matter you are using. If
the extension would spot an error during the content parsing, it will highlight this in the editor
and on the problems tab.

![Troubleshooting - Informing you of a parsing issue in the front matter of your article](/releases/v5.8.0/troubleshooting.png)

## Looking what is happening behind the scenes

The extension logs information, warnings, and errors into the Visual Studio Code output tab. You can
find the log stream by selecting the `vscode-front-matter` or `vscode-front-matter-beta` extension
from the output dropdown.

![Troubleshooting - Show the output of what the extension has been performing](/releases/v5.8.0/troubleshooting-output.png)

## Inspecting configuration behavior

With the [diagnostic logging](/docs/commands#diagnostic-logging) command, you can see your current
configuration and related information in a virtual Markdown document.

The document has several sections:

- **Folders** lists the entries defined in `frontMatter.content.pageFolders` by their title and the
  full path to each folder.
- **Workspace folder** notes the full path to your project's workspace.
- **Total files** notes the total file count for your workspace.
- **Folders to search files** lists the count for discovered files by type in your content folders
  and includes the search glob used.
- **Complete frontmatter.json config** shows the current configuration JSON. If you
  [split your configuration settings](/docs/settings#splitting-your-settings-in-multiple-files), it
  shows the fully composed configuration.

## Feature migrations

Sometimes it happens features get renamed or removed, under this section we will show you how to
migrate your configuration to the new version.

### Publish and modified date migration

In version 7, the `frontMatter.taxonomy.dateField` and `frontMatter.taxonomy.modifiedField` settings
have been deprecated. These settings are now replaced by two new content type field properties:

- `isPublishDate`: defines the publish date
- `isModifiedDate`: define the modified date

Follow the next steps in order to migrate your settings to the new properties:

#### No custom content type

When you use the default content type from Front Matter, you will already use the `isPublishDate`
property. In case you were using the `frontMatter.taxonomy.modifiedField`, you will need to define
your own content type and use the `isModifiedDate` property.

Check the
[change the default content type](/docs/content-creation/content-types#changing-the-default-content-type)
section for more information.

#### When using a custom content type

When you already have a custom content type defined, you can set the `isPublishDate` and
`isModifiedDate` properties for the `datetime` fields.
