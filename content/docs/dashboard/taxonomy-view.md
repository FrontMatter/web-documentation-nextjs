---
title: Taxonomy view
slug: taxonomy-view
description: null
date: 2022-11-28T14:55:04.221Z
lastmod: 2024-02-22T10:00:42.445Z
weight: 300.4
---

# Taxonomies view

The taxonomies view is a powerful way to manage your taxonomy like categories, tags, or any other
taxonomy.

On the taxonomies view, you can create, edit, delete, and move taxonomy terms from one type to
another.

![Taxonomies view][01]

## Actions

![Taxonomy actions][02]

You can perform the following actions on the taxonomies view:

- **Add**: If a taxonomy value is not yet stored in your settings, the `+` add action is shown to
  allow you a quick way to store the value;
- **Tag content**: Tag content with a taxonomy value. This will update the front matter of the file
  with the taxonomy value;
- **Edit**: Edit the taxonomy value in the settings + all the files where it is used;
- **Merge**: Merge two taxonomy values into one. For instance, if you have `dev` and `development`
  you can merge `dev` into `development` and it will update all the files where it is used;
- **Move**: Move a taxonomy value to another type. For instance, if you want to move a tag to a
  category;
- **Delete**: Delete a taxonomy value.

### Tag content

When you click on the **tag content** action, you will get a view with all your content
where you can tag/untag the content with the taxonomy value.

![Tag your taxonomy][03]

<!-- Link References -->
[01]: /releases/v10.0.0/taxonomy-dashboard.webp
[02]: /releases/v10.0.0/taxonomy-actions.png
[03]: /releases/v10.0.0/taxonomy-tagging.webp
