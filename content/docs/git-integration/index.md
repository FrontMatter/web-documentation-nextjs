---
title: Git integration
slug: git-integration
description: null
date: 2022-09-22T09:31:04.413Z
lastmod: 2023-04-01T13:50:42.582Z
weight: 450
---

# GIT Integration

If you are using git to manage your content, Front Matter can be used to sync your changes from and
to your git repository.

![Sync your changes with GIT][01]

## Enable GIT integration

To enable this feature, you will need to set the `frontMatter.git.enabled` setting to `true`.

## Change the commit message

The commit message can be customized via the `frontMatter.git.commitMessage` setting (default is
`Synced by Front Matter`).

> **Info**: You can make use of the placeholders available in Front Matter for
> your commit messages. For example: `Synced by Front Matter {{hour24}}:{{minute}}`.

## Git submodules

If you are using git submodules for managing your content, you have more control over them via the
following settings:

| Setting | Description | Default |
| --- | --- | --- |
| `frontMatter.git.submodule.push` | Whether to push the submodule changes to the remote repository. | `false` |
| `frontMatter.git.submodule.pull` | Whether to pull the submodule changes from the remote repository. | `false` |
| `frontMatter.git.submodule.branch` | The branch to use for the submodule. | `` |
| `frontMatter.git.submodule.folder` | The folder where the submodule is located. | `` |

<!-- Link References -->
[01]: /releases/v8.1.0/git-integration.png
