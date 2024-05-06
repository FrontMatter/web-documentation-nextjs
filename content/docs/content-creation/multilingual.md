---
title: Multilingual
slug: content-creation/multilingual
description: Learn how to use multilingual content in Front Matter CMS
date: 2024-02-21T09:10:16.640Z
lastmod: 2024-02-22T17:35:19.585Z
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
      "path": "[[workspace]]/docs",
      "filePrefix": "",
      "defaultLocale": "en" // This value needs to map to the locale defined in the i18n setting
    }
  ]
}
```

> **Important**: The path for the default locale is defined by the content folder path
> and the i18n locale path. For example, if the content folder path is `[[workspace]]/docs` and
> the i18n locale path is `en`, the default locale path will be `[[workspace]]/docs/en`.

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
| `path` | The path to for the locale. This path value is used in combination with the content folder's path. | Yes |

#### Global level

To define the locales on the global level, you need to use the `frontMatter.content.i18n`
setting.

```json {{ "title": "Example of the global i18n configuration" }}
{
  "frontMatter.content.i18n": [
    {
      "title": "English",
      "locale": "en",
      "path": "en"
    },
    {
      "title": "German",
      "locale": "de",
      "path": "de"
    },
    {
      "title": "Dutch",
      "locale": "nl",
      "path": "nl"
    }
  ]
}
```

In combination with the above content folder configuration, the contents will be
stored in the following paths:

- English: `[[workspace]]/docs/en`
- German: `[[workspace]]/docs/de`
- Dutch: `[[workspace]]/docs/nl`

If you want, you can also create the default content in the root of the content folder.
You can use use the `.` value for the `path` property.

```json {{ "title": "Example of the global i18n configuration with default content in the root" }}
{
  "frontMatter.content.i18n": [
    {
      "title": "English",
      "locale": "en",
      "path": "."
    },
    {
      "title": "German",
      "locale": "de",
      "path": "de"
    },
    {
      "title": "Dutch",
      "locale": "nl",
      "path": "nl"
    }
  ]
}
```

In combination with the above content folder configuration, the contents will be
stored in the following paths:

- English: `[[workspace]]/docs`
- German: `[[workspace]]/docs/de`
- Dutch: `[[workspace]]/docs/nl`

#### Content folder level

You can also define the locales on the content folder level. This allows you to
override the global locales for a specific content folder.

```json {{ "title": "Example of the content folder i18n configuration" }}
{
  "frontMatter.content.pageFolders": [
    {
      "title": "Multilingual",
      "path": "[[workspace]]/docs",
      "filePrefix": "",
      "defaultLocale": "en",
      "locales": [
        {
          "title": "English",
          "locale": "en",
          "path": "en"
        },
        {
          "title": "Nederlands",
          "locale": "nl",
          "path": "nl"
        }
      ]
    }
  ]
}
```

## Create a translation

Once the multilingual settings are configured, you can create content in multiple
languages with Front Matter CMS.

You can create content translations by starting from the locale content and
then you can use any of the following methods to create a new translation:

- Use the `Front Matter: Create new translation` command from the command palette
- Use the `Create new translation` button in the content editor toolbar

![Create translation action](/releases/v10.0.0/create-translation.png)

- On the content dashboard, you can use the `create translation` action from the
  content item menu

![Create translation on content card](/releases/v10.0.0/card-create-translation-action.png)

## Automatic language translation

By default, the multilingual feature does not include automatic language translation of
content. However, you can make use of [DeepL](https://www.deepl.com/) or
[Azure AI Translator](https://azure.microsoft.com/en-us/products/ai-services/ai-translator)
for automatic language translation.

To enable automatic language translation, you need to configure the authentication
settings for the translation service.

### Configure Azure AI Translator

Follow the next steps in order to configure the Azure AI Translator authentication key:

- Go to the [Azure Portal](https://portal.azure.com/)
- Go to your `Azure AI Translator` resource
- Click on the `Keys and Endpoint` menu item
- Copy the `Key 1` or `Key 2` and the `Region` values
- Back in Visual Studio Code, open the Front Matter CMS dashboard
- Click on the gear icon in the top right corner to open the settings view
- Click on the `Integration` tab
- Paste the `Key 1` or `Key 2` in the `Subscription key` field
- Paste the `Region` in the `Region` field

![Azure AI Translator Configuration](/releases/v10.0.0/azure-translator-config.png)

- Save the settings and start creating translations

### Configure DeepL

Follow the next steps in order to configure the DeepL authentication key:

- Go to the [DeepL Account Summary](https://www.deepl.com/your-account/summary) page
- Copy the `Authentication Key for DeepL API`
- Back in Visual Studio Code, open the Front Matter CMS dashboard
- Click on the gear icon in the top right corner to open the settings view
- Click on the `Integration` tab
- Paste the `Authentication Key for DeepL API` in the `Authentication key` field

![DeepL Authentication Key Configuration](/releases/v10.0.0/deepl-authentication-config.png)

- Save the settings and start creating translations

### Start translating

Once you configured Deepl or Azure AI Translator, when you [create a new translation](/docs/content-creation/multilingual#create-a-translation),
the CMS will automatically submit the article title, description, and content to the
translation service.

> **Important**: If anything goes wrong with the translation. The CMS will show an error message
> and create a copy of the original content in the target locale folder.
