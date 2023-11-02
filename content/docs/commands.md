---
title: Commands
slug: commands
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2023-09-11T07:58:42.087Z
weight: 900
---
<!-- markdownlint-disable MD013 MD033 -->
# Commands

## Overview

Front Matter actions can also be done using commands. This section of the documentation will
provide an explanation of all the available commands.

<img src="/assets/commands-v6.1.0.png" alt="Commands" style="max-width: 60%" />

Some of the commands do also have a default keyboard binding for quick access.

## Keyboard bindings

| Command                     | Description                           | Windows                                           | Mac                                              | Linux                                             |
| --------------------------- | ------------------------------------- | ------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| `frontMatter.dashboard`     | Open the Front Matter dashboard       | <kbd>alt</kbd> + d                                | <kbd>option</kbd> + d                            | <kbd>alt</kbd> + d                                |
| `frontMatter.insertMedia`   | Insert a media file into your content | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>i</kbd> | <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>i</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>i</kbd> |
| `frontMatter.insertSnippet` | Insert a snippet into your content    | <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>v</kbd>  | <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>v</kbd> | <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>v</kbd>  |

## Using commands

- Start by opening the command prompt:
  - Linux & Windows: <kbd>shift</kbd> + <kbd>ctrl</kbd> + <kbd>P</kbd>
  - Mac: <kbd>shift</kbd> + <kbd>cmd</kbd> + <kbd>P</kbd>
- Use one of the following commands

## Available commands

### Initialize project

This command will initialize the project with a template folder and an article template. It makes it
easier to get you started with the extension and creating your content.

ID: `frontMatter.init`

### Open dashboard

Opens the dashboard with your Markdown pages overview. If you did not yet initialize your project,
the welcome screen will be shown.

ID: `frontMatter.dashboard`

### Diagnostic logging

Opens a virtual Markdown document with detailed information about your Front Matter configuration.

ID: `frontMatter.diagnostics`

### Insert media into your content

Allows you to quickly insert an media reference in the Markdown file.

ID: `frontMatter.insertMedia`

### Insert snippet into your content

Allows you to quickly insert a snippet in the Markdown file.

ID: `frontMatter.insertSnippet`

### Create category

Creates a new category and allows you to include it into your post automatically.

ID: `frontMatter.createCategory`

### Create tag

Creates a new tag and allows you to include it into your post automatically.

ID: `frontMatter.createTag`

### Insert categories

Inserts a selected categories into the front matter of your article/post/... - When using this
command, the Front Matter panel opens and focuses on the specified type.

ID: `frontMatter.insertCategories`

### Insert tags

Inserts a selected tags into the front matter of your article/post/... - When using this command,
the Front Matter panel opens and focuses on the specified type.

ID: `frontMatter.insertTags`

### Export all tags & categories to your settings

Export all the already used tags & categories in your articles/posts/... to your user settings.

ID: `frontMatter.exportTaxonomy`

### Remap or remove tag/category in all articles

This command helps you quickly update/remap or delete a tag or category in your markdown files. The
extension will ask you to select the taxonomy type (tag or category), the old taxonomy value, and
the new one (leave the input field blank to remove the tag/category).

> **Info**: Once the remapping/deleting process completes, your VS Code settings update with all new
> taxonomy tags/categories.

ID: `frontMatter.remap`

### Create a template from current file

This command allows you to create a new template from the current open Markdown file. It will ask
you for the name of the template and if you want to keep the current file its content in the
template.

ID: `frontMatter.createTemplate`

### Create new content from defined content type or template

With this command, you can easily create content in your project from the defined content types or
templates.

> **Info**: The command will use the `frontMatter.templates.prefix` setting in order to add a prefix
> (default: `yyyy-MM-dd`) on the filename.

ID: `frontMatter.createContent`

### Generate slug based on content title

This command generates a clean slug for your content. It removes known stop words, punctuations, and
special characters.

Example:

```yaml
---
title: Just a sample page with a title
slug: sample-page-title
---
```

You can also specify a prefix and suffix, which can be added to the slug if you want. Use the
following settings to do this: `frontMatter.taxonomy.slugPrefix` and
`frontMatter.taxonomy.slugSuffix`.

By default, both prefix and suffix settings are not provided, which mean it would not add anything
extra to the slug.

Another setting is to allow you to sync the filename with the generated slug. The setting you need
to turn on enable for this is `frontMatter.taxonomy.alignFilename`.

> **Info**: At the moment, the extension only supports English stopwords.

ID: `frontMatter.generateSlug`

### Set lastmod date

Sets/updates the current modified date in your Markdown file.

ID: `frontMatter.setLastModifiedDate`

### Preview content

Open the site preview of your content in VS Code.

ID: `frontMatter.preview`

### Promote settings from local to team level

This command allows you to promote all local settings from within your `.vscode/settings.json` file
to be promoted to the projects team configuration `frontmatter.json` file.

ID: `frontMatter.promoteSettings`

### Refresh the settings

This command allows you to refresh the settings from the `frontmatter.json` file. This is useful
when you have updated the settings manually and want to reload them.

ID: `frontMatter.settings.refresh`

## Removed commands

### Set current date

This command has been removed, as it became obsolete since the introduction of Content Types.

ID: `frontMatter.setDate`

<!-- markdownlint-enable MD013 MD033 -->