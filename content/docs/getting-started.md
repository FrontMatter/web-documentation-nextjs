---
title: Getting started
slug: getting-started
description: null
date: 2021-08-30T16:13:00.546Z
lastmod: 2022-05-02T16:49:38.065Z
weight: 100
---

# Getting started

## Overview

To get you started, you first need to install the extension in Visual Studio Code.

## Installation

You can get the extension via:

<!-- markdownlint-disable MD033 MD013 MD028 -->

- The VS Code marketplace: [VS Code Marketplace - Front Matter](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter).
- The extension CLI: `ext install eliostruyf.vscode-front-matter`
- Or by clicking on the following link: <a href="" title="open extension in VS Code" data-vscode="vscode:extension/eliostruyf.vscode-front-matter">open extension in VS Code</a>

### Beta version

If you have the courage to test out the beta features, we made available a beta version as well. You
can install this via:

- The VS Code marketplace: [VS Code Marketplace - Front Matter BETA](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-front-matter-beta).
- The extension CLI: `ext install eliostruyf.vscode-front-matter-beta`
- Or by clicking on the following link: <a href="" title="open extension in VS Code" data-vscode="vscode:extension/eliostruyf.vscode-front-matter-beta">open extension in VS Code</a>

> **Info**: The BETA docs can be found on [beta.frontmatter.codes](https://beta.frontmatter.codes).

> **Important**: As there can only be one version running of the extension, you will need to
> uninstall the main version before installing the beta version.

## Welcome screen

Once installed, Front Matter will open the **welcome screen** the first time Visual Studio Code gets
reloaded.

![Welcome screen to configure your website](/releases/v7.2.0/welcome-screen-7.2.0.png)

> **Important**: Front Matter supports light and dark mode. It will be automatically detected based
> on the theme you are using.

> **Info**: The welcome screen will also be shown when Front Matter is not yet fully configured.

## Required configuration

On the welcome screen, there are two tasks to complete before you can take full advantage of Front Matter.

### Step 1: Initialize the project

In this step, a `.frontmatter/templates` folder and `article.md` file template will be created in
the current project.

The `.frontmatter/templates` folder, is a folder that can be used to place all sort of Markdown
templates. It will be used when you want to let Front Matter generate new pages/articles/...

### Step 2: Configure the site-generator or framework you use

In this step, you will need to configure the site-generator or framework you use. If your
static-site-generator is known by Front Matter, it will automatically set some configuration
options. If not, you will need to configure these settings manually. You can continue by selecting
`other` from the dropdown.

### Step 3: Register content folder(s)

As Front Matter is created to support many (or all) static site generator, you will need to specify
where your Markdown/content lives. From the moment you register a folder, it will be used on the
dashboard to show an overview of all files.

Registering a folder can be done from the list of folders Front Matter has found that already
contains supported files.

![Content folders](/releases/v7.2.0/content-list.png)

If one of your folders is not shown, you can register it by right-clicking on a folder name in the
explorer panel from Visual Studio Code and selecting **Front Matter: Register folder**.

![Register a folder](/assets/register-folder.png)

> **Info**: Be default, the extension will include content from the current folder and its
> sub-folders. If you wish to exclude the sub-folders, you can do this by updating the
> [frontMatter.content.pageFolders](/docs/settings#frontmatter.content.pagefolders) configuration
> setting and specifying the `excludeSubDir` property with the value as `true`.

## Workspaces with multiple folders

If you are using workspaces with multiple folders in Visual Studio Code. Front Matter will try to
figure out for which folder it needs to be activated. It does this by searching for the
`frontmatter.json` file in the workspace folders.

When Front Matter cannot find a `frontmatter.json` file in any of your folders (means that it is not
initiated yet), it will ask you to pick the folder.

![Select your workspace folder for Front Matter](/releases/v5.0.0/workspace-folder.png)

Once you selected the folder, it will create the `frontmatter.json` file and reload the workspace.

## Backers & supporters

If you are one of the Front Matter supporters/backers, you can hide the support links from the UI.
We know it is not much, but we want to give something small back, and what is better than a bit of
space? 🤓

By default, you'll see the following support links:

![Support links shown by default](/releases/v6.0.0/support-links.png)

When you log in via GitHub, you'll see the following:

![Hidden support links](/releases/v6.0.0/support-links-hidden.png)

Simply start by clicking on the **Accounts** button, and select **Sign in with GitHub to use Front
Matter** or launch the same flow by using the `Front Matter: Authenticate` command.

![Sign in with GitHub for Front Matter](/releases/v6.0.0/signin-github.png)

Follow the proposed steps from Visual Studio Code.

## Enjoy using Front Matter

<iframe src="https://player.vimeo.com/video/630150787?h=9988cff4f0&amp;title=0&amp;byline=0&amp;portrait=0&amp;speed=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=56727" width="100%" height="450" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Front Matter - Installation"></iframe>
