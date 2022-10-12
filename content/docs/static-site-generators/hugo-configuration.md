---
title: Hugo Configuration
slug: ssg-and-frameworks/hugo-configuration
description: ""
date: '2022-02-22T08:43:49.364Z'
lastmod: '2022-02-22T08:43:47.731Z'
weight: 600.1
---

# Hugo Configuration

## Setting up Front Matter for your Hugo site

Start by opening your Hugo project in Visual Studio Code.

> **Info**: For this article, we made use of the [Hugo Example site][01] in combination with the
> _beautifulhugo_ theme.

![Opening your Hugo project in VS Code][02]

## Installing Front Matter

Open the extensions panel in Visual Studio Code and search for Front Matter. Once you find it, click
on the install button.

![Installing Front Matter extension][03]

The welcome dashboard appears if this is the first time you use Front Matter.

If you have already installed or used Front Matter before, you can open the dashboard by executing
the `Front Matter: Open dashboard` command. The steps to perform go as follows:

- Open the command prompt:
  - Windows `⇧+ctrl+P`
  - Mac: `⇧+⌘+P`
- Type: `Front Matter` and pick the `Front Matter: Open dashboard` command.

The welcome dashboard looks as follows:

![Welcome dashboard][04]

## Configuration of Front Matter

### Project initialization

On the welcome screen, click on the `Initialize project` action. This action creates the
`.frontmatter` folder and `frontmatter.json` file in the current project.

![Project intialization][05]

### Framework or static-site generator

Next is to let Front Matter know which framework or static-site generator you use. In this case, we
will pick **Hugo**.

![Selecting your framework or static-site generator][06]

### Content folders

Content folders are the locations where Front Matter needs to know where to create your `markdown` pages.

To configure this, you need to open the `explorer panel` and perform the following steps:

- Right-click on the folder you want to add;
- From the folder menu, click on `Front Matter: Register folder`;

![Register content folder][07]

- Front Matter will ask you what name you want to give this folder. By default, it will take the
  same name as the added folder.

![Specify a name for the content folder][08]

- Once you complete this step, Front Matter's configuration is completed and opens the content
  dashboard.

![Content dashboard][09]

> **Info**: You can perform these steps for one folder or many. For instance, if you have multiple
> content types like blogs, posts, articles, news, etc. You can register each folder the same way.

## Using Front Matter

Now that Front Matter is configured, you can start creating content or managing your content via the
Front Matter panel.

![Front Matter panel for content management][10]

## Extra configuration steps

If you want, you can further configure Front Matter to your preferences. Check more in our
documentation what you can do: [documentation][11]

<!-- Link References -->
[01]: https://github.com/gohugoio/hugoBasicExample
[02]: /hugo-configuration/hugo-configuration1.png
[03]: /hugo-configuration/hugo-configuration2.png
[04]: /hugo-configuration/hugo-configuration3.png
[05]: /hugo-configuration/hugo-configuration4.png
[06]: /hugo-configuration/hugo-configuration5.png
[07]: /hugo-configuration/hugo-configuration6.png
[08]: /hugo-configuration/hugo-configuration7.png
[09]: /hugo-configuration/hugo-configuration8.png
[10]: /hugo-configuration/hugo-configuration9.png
[11]: /docs
