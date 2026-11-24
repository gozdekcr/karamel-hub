import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// .oxlintrc.json needs one override block per feature so that a feature cannot import
// another feature (ADR-0029). This test fails when a new feature folder has no block.
const root = join(import.meta.dirname, '..')

function stripComments(jsonc: string): string {
  return jsonc.replace(/^\s*\/\/.*$/gm, '')
}

const config = JSON.parse(stripComments(readFileSync(join(root, '.oxlintrc.json'), 'utf8'))) as {
  overrides: { files: string[] }[]
}

const features = readdirSync(join(root, 'src', 'features'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

describe('import rules', () => {
  it.each(features)('feature "%s" has its own lint block', (feature) => {
    const blocks = config.overrides.filter((block) =>
      block.files.includes(`src/features/${feature}/**`),
    )
    expect(blocks).toHaveLength(1)
    const text = JSON.stringify(blocks[0])
    expect(text).toContain(`"!@/features/${feature}/**"`)
  })
})
