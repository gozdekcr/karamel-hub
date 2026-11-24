export const SUPPORTED_LANGUAGES = ['tr', 'en'] as const
export type Language = (typeof SUPPORTED_LANGUAGES)[number]

/**
 * Picks the UI language from the browser's preferred languages (e.g. `navigator.languages`).
 * The first supported one wins; English is the fallback. A saved user setting replaces
 * this later (CURRENT_STATE "Timezone and language", P1-13).
 */
export function pickLanguage(preferred: readonly string[]): Language {
  for (const tag of preferred) {
    const base = tag.toLowerCase().split('-')[0]
    const match = SUPPORTED_LANGUAGES.find((lang) => lang === base)
    if (match) return match
  }
  return 'en'
}
