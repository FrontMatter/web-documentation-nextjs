---
title: Multilingual
slug: content-creation/multilingual
description: null
date: 2024-02-21T09:10:16.640Z
lastmod: 2024-02-21T20:44:17.229Z
weight: 200.71
---

# Multilingual content

Front Matter CMS supports multilingual content. This means that you can create
content in multiple languages and manage them in the same workspace.

![Multilingual content](/releases/v10.0.0/multilingual-content.png)

## Configuration

To enable multilingual content, you need to define the default locale per content folder
and define which locales which you want to support.

### Define the default locale per content folder

To define the default locale per content folder, you need to use the `defaultLocale`
property on the `frontMatter.content.pageFolders` setting.

```json {{ "title": "Example of the default locale configuration" }}
{
  "frontMatter.content.pageFolders": [
    {
      "title": "Multilingual",
      "path": "[[workspace]]/docs/en",
      "filePrefix": "",
      "defaultLocale": "en" // This value needs to map to the locale defined in the i18n setting
    }
  ]
}
```

### Define the locales

You can define the locales on two levels:

- **Global level**: When using the `frontMatter.content.i18n` setting, you define
  the locales for the entire workspace. This means that any content folder which
  is multilingual enabled, it will use the locales defined in the global setting.
- **Content folder level**: When using the `locales` property on the
  `frontMatter.content.pageFolders` setting, you can define the locales for a
  specific content folder.

#### Properties

| Property | Description | Required |
| --- | --- | --- |
| `title` | The title of the locale | No |
| `locale` | The locale code | Yes |
| `path` | The path to the locale and relative to the path of the content folder. | No |

#### Global level

To define the locales on the global level, you need to use the `frontMatter.content.i18n`
setting.

```json {{ "title": "Example of the global i18n configuration" }}
{
  "frontMatter.content.i18n": [
    {
      "title": "English",
      "locale": "en"
    },
    {
      "title": "German",
      "locale": "de",
      "path": "../de"
    },
    {
      "title": "Nederlands",
      "locale": "nl",
      "path": "../nl"
    }
  ]
}
```

> **Important**: The default locale (like the **English** locale) does not
> require to define a `path` as it is defined by the content folder configuration.

#### Content folder level

You can also define the locales on the content folder level. This allows you to
override the global locales for a specific content folder.

```json {{ "title": "Example of the content folder i18n configuration" }}
{
  "frontMatter.content.pageFolders": [
    {
      "title": "Multilingual",
      "path": "[[workspace]]/docs/en",
      "filePrefix": "",
      "defaultLocale": "en",
      "locales": [
        {
          "title": "English",
          "locale": "en"
        },
        {
          "title": "Nederlands",
          "locale": "nl",
          "path": "../nl"
        }
      ]
    }
  ]
}
```

## Create a translation

Once the multilingual settings are configured, you can create content in multiple
languages with Front Matter CMS.

You can create content translations by starting from the default locale content and
then you can use any of the following methods to create a new translation:

- Use the `Front Matter: Create new translation` command from the command palette
- Use the `Create new translation` button in the content editor toolbar

![Create translation action](/releases/v10.0.0/create-translation.png)

- On the content dashboard, you can use the `create translation` action from the
  content item menu

![Create translation on content card](/releases/v10.0.0/card-create-translation-action.png)

## Automatic language translation

By default, the multilingual feature does not include automatic language translation of
content. However, you can make use of [DeepL](https://www.deepl.com/) for automatic
language translation.

To enable automatic language translation, you need to provide your authentication key
from DeepL.

### Configure DeepL

Follow the next steps in order to configure the DeepL authentication key:

- Go to the [DeepL Account Summary](https://www.deepl.com/your-account/summary) page
- Copy the `Authentication Key for DeepL API`
- Back in Visual Studio Code, open the Front Matter CMS dashboard
- Click on the gear icon in the top right corner to open the settings view
- Click on the `Integration` tab
- Paste the `Authentication Key for DeepL API` in the `Authentication key` field

![DeepL Authentication Key](/releases/v10.0.0/deepl-authentication-key.png)

Once you provided the authentication key, when you create a new translation, the
content will be automatically translated to the target language.
