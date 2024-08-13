---
title: AI features
slug: ai-features
description: null
date: 2024-08-13T07:26:50.054Z
lastmod: 2024-08-13T11:34:21.076Z
weight: 880
---

# AI features

Front Matter CMS allows you to make use of the GitHub Copilot's Large Language Model (LLM) to provide
you title, description, and taxonomy suggestions.

## GitHub Copilot integration

In the July 2024 release of Visual Studio Code, extension developers are able to make use of the GitHub
Copilot's Large Language Model (LLM). Front Matter CMS took advantage of this feature to provide you
with the ability to provide title, description, and tags suggestions.

> **Important**: This feature is only available when you have the GitHub Copilot extension installed
> and a valid license.

The AI features are available in the following places:

- Title suggestions when creating new content
- Description suggestions based on the title and content
- Taxonomy suggestions based on the title, content, and available tags

By default the `gpt-3.5-turbo` model is used to generate the suggestions. You can change the model
by updating the `frontMatter.copilot.family` setting in your `frontmatter.json` file.

```json {{ "title": "Change GitHub Copilot's AI model" }}
{
  "frontMatter.copilot.family": "gpt-4.0-turbo"
}
```

### Title suggestions

When creating new content when you have the GitHub Copilot extension installed, you will get title
suggestions based on the provided title.

![Title suggestions provided by GitHub Copilot](/releases/v10.3.0/github-copilot-title-suggestions.webp)

### Description and taxonomy suggestions

For descriptions and tags, you will get a new field action button which allows you to generate suggestions
based on the content.

![Trigger GitHub Copilot description suggestion](/releases/v10.3.0/github-copilot-description-suggestion.webp)

## Using your own AI

If you have your own AI APIs which you want to use. You make use of the `@frontmatter/extensibility`
library to integrate it with Front Matter CMS.

You have the following integration points:

- [Field actions](/docs/content-creation/field-actions)
- [Content scripts](/docs/custom-actions/content-scripts)
