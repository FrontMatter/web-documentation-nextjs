---
title: Git integration
slug: git-integration
description: null
date: 2022-09-22T09:31:04.413Z
lastmod: 2024-02-22T09:47:58.821Z
weight: 450
---

# GIT Integration

If you are using git to manage your content, Front Matter CMS can be used to sync your changes from
and to your git repository.

![Sync your changes with GIT][01]

## Enable GIT integration

To enable this feature, you will need to set the `frontMatter.git.enabled` setting to `true`.

## Commit message

The commit message can be customized via the `frontMatter.git.commitMessage` setting (default is
`Synced by Front Matter`).

> **Info**: You can make use of the placeholders available in Front Matter for
> your commit messages. For example: `Synced by Front Matter {{hour24}}:{{minute}}`.

### Require commit message

If you want to require a commit message, you can set the `frontMatter.git.requiresCommitMessage`
setting with the branches on which you want to require a commit message.

```json {{ "title": "Example to require a commit message on the main branch" }}
{
  "frontMatter.git.requiresCommitMessage": ["main"]
}
```

When you open the Front Matter CMS panel, you will now be prompted to enter a commit message.

![Enter a commit message before syncing](/releases/v10.0.0/require-commit-message.png)

## Disable syncing on certain branches

If you want to disable syncing on certain branches,
you can set the `frontMatter.git.disabledBranches` setting with the branches on which you want to
disable syncing.

```json {{ "title": "Example to disable syncing on the main branch" }}
{
  "frontMatter.git.disabledBranches": ["main"]
}
```

![Disable the git sync action](/releases/v10.0.0/disable-git-sync.png)

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
[01]: /releases/v10.0.0/git-actions.png
