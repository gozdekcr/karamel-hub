import i18n from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'
import { pickLanguage, SUPPORTED_LANGUAGES } from './language'

// One JSON file per feature namespace per language, loaded only when a screen needs it
// (ADR-0010, ADR-0015). Keys are type-checked through i18next.d.ts.
export function initI18n() {
  const lng = pickLanguage(navigator.languages)

  i18n.on('languageChanged', (language) => {
    document.documentElement.lang = language
  })

  void i18n
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng,
      fallbackLng: 'en',
      supportedLngs: SUPPORTED_LANGUAGES,
      defaultNS: 'common',
      ns: ['common'],
      interpolation: { escapeValue: false }, // React already escapes output
    })
}
