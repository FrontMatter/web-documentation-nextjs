---
title: Getting started
slug: getting-started
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2024-06-20T08:19:27.260Z
weight: 100
---

# Getting started

## Overview

To get you started, you first need to install the extension in Visual Studio Code.

<!-- markdownlint-disable MD013 MD033 -->
<div class="iframe__wrapper">
  <iframe src="https://www.youtube.com/embed/xb6pZiier_E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<!-- markdownlint-enable MD013 MD033 -->

## Installation

You can get the extension via:

<!-- markdownlint-disable MD033 MD013 MD028 -->

- The VS Code marketplace: [VS Code Marketplace - Front Matter][01].
- The extension CLI: `ext install eliostruyf.vscode-front-matter`
- Or by clicking on the following link: <a href="" title="open extension in VS Code" data-vscode="vscode:extension/eliostruyf.vscode-front-matter">open extension in VS Code</a>

### Beta version

If you have the courage to test out the beta features, we made available a beta version as well. You
can install this via:

- The VS Code marketplace: [VS Code Marketplace - Front Matter BETA][02].
- The extension CLI: `ext install eliostruyf.vscode-front-matter-beta`
- Or by clicking on the following link: <a href="" title="open extension in VS Code" data-vscode="vscode:extension/eliostruyf.vscode-front-matter-beta">open extension in VS Code</a>

> **Info**: The BETA docs can be found on [beta.frontmatter.codes][03].

> **Important**: As there can only be one version running of the extension, you will need to
> either disable or uninstall the main version before installing the beta version. Disable
> both extensions globally and select "Enable (Workspace)" will enable the extension only in
> the currently loaded workspace. This way you can test the BETA version on some of your
> projects/workspaces and keep the main version installed and activated in other projects.

## Welcome screen

Once installed, Front Matter will open the **welcome screen** the first time Visual Studio Code gets
reloaded.

![Welcome screen to configure your website][04]

> **Info**: The welcome screen will also be shown when Front Matter is not yet fully configured.

<!-- FM:Snippet:Start data:{"id":"Open in VS Code","fields":[{"name":"title","value":"Open dashboard in VS Code"},{"name":"command","value":"frontMatter.dashboard"},{"name":"title","value":"Open dashboard in VS Code"}]} -->
<a class="open_vscode" title="Open dashboard in VS Code" href='vscode://eliostruyf.execcommand?command=frontMatter.dashboard'>
  Open dashboard in VS Code
</a>
<!-- FM:Snippet:End -->

## Required configuration

On the welcome screen, there are two tasks to complete before you can take full advantage of Front Matter.

### Step 1: Initialize the project

In this step, you will need to initialize the project. This will create a
`frontmatter.json` file and a `.frontmatter` folder in the root of your
project in which the media database and templates will be stored.

### Step 2: Configure the site-generator or framework you use

In this step, you will need to configure the site-generator or framework you use. If your
static-site generator is known by Front Matter, it will automatically set some configuration
options.

If your static-site generator or framework is not in the list, you will still be
able to configure the settings manually. You can continue by selecting
`other` from the dropdown.

### Step 2.1 (optional): Use a template

For some of the static-site generators, Front Matter CMS has created some templates to get you
started. You can select one of the templates from the list of available templates.

![Front Matter CMS - Starter Templates][13]

> **Info**: The templates are stored in the
> [Front Matter CMS - Starter Templates][12] repository.

### Step 2.2 (optional): Generate content types from Astro Content Collection(s)

As in Astro you need to define the type of content you create with Content Collections, we have
added a feature to generate the content types based on the Astro Content Collection(s) you have
defined.

During the initialization of Front Matter CMS, when you select Astro as your site generator, you
will be able to select the Astro Content Collection(s) you want to use.

![Astro Content Collection][14]

> **Info**: When you select the Astro Content Collection(s), the CMS will automatically add the
> corresponding folder to the `frontmatter.content.pageFolders` configuration setting.

### Step 3: Register content folder(s)

As Front Matter is created to support many (or all) static-site generator, you will
need to specify where your Markdown/content lives.

From the moment you register a folder, it will be used on the dashboard to show
an overview of all files.

Registering a folder can be done from the list of folders Front Matter has
found that already contains supported files.

![Content folders][05]

If one of your folders is not shown, you can register it by right-clicking on a folder name in the
explorer panel from Visual Studio Code and selecting **Front Matter: Register folder**.

![Register a folder][06]

> **Info**: By default, the extension will include content from the current folder and its
> sub-folders. If you wish to exclude the sub-folders, you can do this by updating the
> [frontMatter.content.pageFolders][07] configuration setting and specifying the `excludeSubDir`
> property with the value as `true`.

Since version `8.3.0` you can use [placeholders](/docs/content-creation/placeholders) in the folder
path. This functionality allows you to generate dynamic content paths based for example on the
current date.

## Workspaces with multiple folders

If you are using workspaces with multiple folders in Visual Studio Code. Front Matter will try to
figure out for which folder it needs to be activated. It does this by searching for the
`frontmatter.json` file in the workspace folders.

When Front Matter cannot find a `frontmatter.json` file in any of your folders (means that it is not
initiated yet), it will ask you to pick the folder.

![Select your workspace folder for Front Matter][08]

Once you selected the folder, it will create the `frontmatter.json` file and reload the workspace.

## Backers & sponsors

If you are one of the Front Matter supporters/backers, you can hide the support links from the UI.
We know it is not much, but we want to give something small back, and what is better than a bit of
space? 🤓

By default, you'll see the following support links:

![Support links shown by default][09]

When you log in via GitHub, you'll see the following:

![Hidden support links][10]

Simply start by clicking on the **Accounts** button, and select **Sign in with GitHub to use Front
Matter** or launch the same flow by using the `Front Matter: Authenticate` command.

![Sign in with GitHub for Front Matter][11]

Follow the proposed steps from Visual Studio Code.

## Front Matter AI Assistant

If you have a question on how you can configure Front Matter CMS, you can use the AI Assistant to
get some help. The AI Assistant is available via the
`Front Matter: Ask the Front Matter AI for help` command or via the chatbot icon in the
Front Matter CMS panel or when the `frontmatter.json` file is opened.

![Front Matter AI Assistent](/releases/v8.4.0/front-matter-ai-assisten.png)

When you run the command, or click on the chatbot icon, the AI Assistant will open and you can
start typing your question.

![Front Matter AI Assistent](/releases/v8.4.0/front-matter-ai-assistent.png)

## Enjoy using Front Matter

<!-- Link References -->

[01]: https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter
[02]: https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter-beta
[03]: https://beta.frontmatter.codes
[04]: /releases/v7.2.0/welcome-screen-7.2.0.png
[05]: /releases/v9.3.0/register-content-folders.png
[06]: /assets/register-folder.png
[07]: /docs/settings/overview#frontmatter.content.pagefolders
[08]: /releases/v5.0.0/workspace-folder.png
[09]: /releases/v6.0.0/support-links.png
[10]: /releases/v6.0.0/support-links-hidden.png
[11]: /releases/v6.0.0/signin-github.png
[12]: https://github.com/frontmatter/templates
[13]: /releases/v9.3.0/templates.png
[14]: /releases/v9.3.0/astro-content-collections-light.png
