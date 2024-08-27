import app from '@adonisjs/core/services/app'
import { defineConfig, formatters, loaders } from '@adonisjs/i18n'

const i18nConfig = defineConfig({
    formatter: formatters.icu(),
    defaultLocale: 'fr',
    supportedLocales: ['fr', 'en'],
    fallbackLocales: {
        'fr': 'en',
        'en': 'fr',
    },

    loaders: [
        loaders.fs({
            location: app.languageFilesPath()
        })
    ],
})

export default i18nConfig
