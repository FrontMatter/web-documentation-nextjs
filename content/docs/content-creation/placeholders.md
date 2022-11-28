---
title: Placeholders
slug: content-creation/placeholders
description: null
date: 2022-03-14T08:42:21.626Z
lastmod: 2022-09-22T07:08:36.014Z
weight: 200.3
---

# Placeholders

Placeholders can be used in content type fields or templates. The placeholders allow you to
automatically fill in values when creating a new content.

There are known placeholders from Front Matter:

- `{{title}}`: Title of the page
- `{{slug}}`: Slug of the page
- `{{now}}`: Current date formatted with the value defined in `frontMatter.taxonomy.dateFormat` or
  ISO string
- `{{year}}`: Current year
- `{{month}}`: Current month
- `{{day}}`: Current day
- `{{hour12}}`: Current hour in 12-hour format
- `{{hour24}}`: Current hour in 24-hour format
- `{{ampm}}`: Show AM/PM
- `{{minute}}`: Current minute

## Custom placeholders

You can define you own placeholders within the `frontMatter.content.placeholders` setting. There are
two types of placeholders you can create:

- `static`: A static placeholder that will be replaced with a static value (you can use another
  placeholder in the value)
- `dynamic`: A dynamic placeholder that will use a script to generate the value

### Static placeholders

Here is an example of a static `permalink` placeholder:

```json
"frontMatter.content.placeholders": [
  {
    "id": "permalink",
    "value": "/blog/{{slug}}.html"
  }
]
```

> **Info**: The static placeholder's value is adding some text and it will also include the slug of
> the page. There is no extra logic that is executed to generate the value.

To use the `permalink` placeholder, you need to define the `{{permalink}}` value in your content
type or template.

```json
{
  "title": "Permalink",
  "name": "permalink",
  "type": "string",
  "default": "{{permalink}}"
}
```

### Dynamic placeholders

Dynamic placeholders allow you to use custom scripts to generate the value. The difference with the
static placeholder is that instead of specifying a value, you need to specify a `script` and
`command` property.

#### Placeholder definition

Here is an example of a dynamic `uniqueId` placeholder:

```json
"frontMatter.content.placeholders": [
  {
    "id": "uniqueId",
    "script": "./scripts/uniqueId.js",
    "command": "~/.nvm/versions/node/v16.13.1/bin/node"
  }
]
```

#### Placeholder script

The base script looks like this:

```javascript
const arguments = process.argv;

if (arguments && arguments.length > 0) {
  const workspaceArg = arguments[2]; // The workspace path
  const filePath = arguments[3]; // The path of the file
  const title = arguments[4]; // Title of the page

  console.log(Math.random().toString(36).substring(2, 15));
}
```

> **Info**: Like the other content scripts, you can use other types of scripts like Python, Bash,
> and more.

The base script for a dynamic placeholder similar to the [content script][01]. The difference is
that instead of retrieving the whole front matter object, you will receive the title. The reason is
that the file is still not completely processed, and not all front matter fields are available.

> **Important**: In case you need to retrieve the whole front matter object, you can make use of the
> `postScript` property on your content type in combination with a [content script][01].

#### Placeholder usage

To use the `ogImage` placeholder, you need to define the `{{ogImage}}` value in your field as
follows:

```json
{
  "title": "Unique ID",
  "name": "uniqueId",
  "type": "string",
  "default": "{{uniqueId}}"
}
```

<!-- Link References -->
[01]: /docs/custom-actions/#content-script
