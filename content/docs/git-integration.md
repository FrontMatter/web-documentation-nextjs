---
title: Git integration
slug: git-integration
description: null
date: 2022-09-22T09:31:04.413Z
lastmod: 2022-09-22T09:31:04.413Z
weight: 450
---

# GIT Integration

If you are using git to manage your content, Front Matter can be used to sync your changes from and to your git repository.

![Sync your changes with GIT](/releases/v8.1.0/git-integration.png)

## Enable GIT integration

To enable this feature, you will need to set the `frontMatter.git.enabled` setting to `true`. 

## Change the commit message

The commit message can be customized via the `frontMatter.git.commitMessage` setting (default is `Synced by Front Matter`).