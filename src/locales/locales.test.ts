import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Every namespace exists in TR and EN with exactly the same keys (ADR-0010).
const localesDir = join(import.meta.dirname, '.')
const languages = ['tr', 'en'] as const

function keysOf(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null) return [prefix]
  return Object.entries(value).flatMap(([key, child]) =>
    keysOf(child, prefix ? `${prefix}.${key}` : key),
  )
}

function read(language: string, file: string): unknown {
  return JSON.parse(readFileSync(join(localesDir, language, file), 'utf8'))
}

const namespaces = new Set(languages.flatMap((lang) => readdirSync(join(localesDir, lang))))

describe('locales', () => {
  it.each([...namespaces])('%s exists in TR and EN with the same keys', (file) => {
    const [tr, en] = languages.map((lang) => keysOf(read(lang, file)).sort())
    expect(tr).toEqual(en)
  })

  it('has no empty translations', () => {
    for (const lang of languages) {
      for (const file of namespaces) {
        const text = JSON.stringify(read(lang, file))
        expect(text, `${lang}/${file}`).not.toContain('""')
      }
    }
  })
})
