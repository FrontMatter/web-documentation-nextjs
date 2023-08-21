---
title: Sponsor features
slug: sponsor-features
description: null
date: 2023-04-01T11:23:17.352Z
lastmod: 2023-08-21T08:17:32.401Z
weight: 425
---

# Sponsor features

## Front Matter AI

As a sponsor, you can use the Front Matter AI to let an AI help you with
title and tag/categories suggestions.

As using an AI is not free, we have limited this feature to sponsors only and
also because we want to keep the default behaviour of Front Matter CMS without
any API needs.

To use the Front Matter AI as a sponsor, you will have to perform the following
steps:

1. Make sure you are logged in to Front Matter CMS with GitHub. You can find more
information about this in the [backers & sponsors][01]
section.
2. Enable the Front Matter AI in the settings. You can do this, by setting
the `frontMatter.sponsors.ai.enabled` setting to `true`.

### Title suggestions

When the Front Matter AI is enabled, on the creation of new content, you will be asked for
a title or description. Once provided, you will get a list of suggestions for the title and
you also get your own input as a suggestion as well.

![Front Matter AI - Title suggestions](/releases/v8.4.0/front-matter-ai-suggestions.png)

### Tags/categories suggestions

Similar to the title suggestions, you will also get suggestions for tags and categories.

On the tags or categories field, you will get a new icon, when you click on it, it will fetch
suggestions based on the title and description of the content.

![Front Matter AI - Tag suggestions](/releases/v8.4.0/front-matter-ai-tags.png)

### Description suggestions

When you have provided a title and content, the Front Matter AI can help you providing a description
for you article. This can be useful when you want to share your content on social media.

![AI Description Suggestion](/releases/v9.0.0/description-ai-suggestion.png)

## Becoming a sponsor

If you're not already a sponsor, now is a great time to consider supporting the project.
By becoming a sponsor, you not only gain access to exclusive features like Front Matter AI,
but also help to support the ongoing development and maintenance of the project.
You can become a sponsor by visiting the
[GitHub sponsor page][02].

## Internals of the Front Matter AI

The Front Matter AI is powered by [OpenAI](https://openai.com/) and the code for the AI is also
open source and available on [GitHub][03].

![Front Matter AI - Architecture](/releases/v8.4.0/front-matter-ai-architecture.png)

We believe in transparency and that is why we are sharing the code for the AI, so that you can see
how it works and what it does.

The GitHub user token (with only _read_ access) is used to retrieve your username,
as we need to make sure you are allowed to use the AI.

[01]: /docs/getting-started#backers-&-sponsors
[02]: https://github.com/sponsors/estruyf
[03]: https://github.com/FrontMatter/web-documentation-nextjs/blob/main/pages/api/ai
