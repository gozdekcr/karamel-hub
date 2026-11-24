// Type-checked translation keys (ADR-0015). English is the reference language; the
// locales test checks that Turkish has the same keys.
import 'i18next'
import type common from '@/locales/en/common.json'
import type home from '@/locales/en/home.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof common
      home: typeof home
    }
  }
}
