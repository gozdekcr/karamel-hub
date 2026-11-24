import { describe, expect, it } from 'vitest'
import { pickLanguage } from './language'

describe('pickLanguage', () => {
  it('picks Turkish for a Turkish browser', () => {
    expect(pickLanguage(['tr-TR', 'en-US'])).toBe('tr')
  })

  it('picks English for an English browser', () => {
    expect(pickLanguage(['en-GB'])).toBe('en')
  })

  it('uses the first supported language in the list', () => {
    expect(pickLanguage(['de-DE', 'tr', 'en'])).toBe('tr')
  })

  it('falls back to English', () => {
    expect(pickLanguage(['de-DE', 'fr'])).toBe('en')
    expect(pickLanguage([])).toBe('en')
  })
})
