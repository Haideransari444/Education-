import { describe, expect, it } from 'vitest'
import { integrations } from '../integrations/registry'

const vendorFiles = import.meta.glob('/vendor/**', {
  query: '?raw',
  import: 'default',
  eager: true,
})

describe('integration registry and provenance', () => {
  it('registers the five expected integrations with unique IDs', () => {
    expect(integrations.map((item) => item.id).sort()).toEqual(
      [
        'cnn-explainer',
        'diffusion-explainer',
        'ganlab',
        'tensorflow-playground',
        'transformer-explainer',
      ].sort(),
    )
    expect(new Set(integrations.map((item) => item.id))).toHaveProperty(
      'size',
      5,
    )
  })

  it('records exact provenance and explicit category decisions', () => {
    for (const { upstream } of integrations) {
      expect(upstream.repository).toMatch(/^https:\/\/github\.com\//)
      expect(upstream.commit).toMatch(/^[0-9a-f]{40}$/)
      expect(['MIT', 'Apache-2.0']).toContain(upstream.license)
      expect(upstream.codeApproved).toBe(true)
      expect(typeof upstream.assetsApproved).toBe('boolean')
      expect(typeof upstream.dataApproved).toBe('boolean')
      expect(typeof upstream.weightsApproved).toBe('boolean')
    }
  })

  it('preserves vendor metadata, audits, licenses, and reviewed source', () => {
    for (const integration of integrations) {
      const prefix = `/vendor/${integration.id}/`
      expect(vendorFiles).toHaveProperty(`${prefix}UPSTREAM.json`)
      expect(vendorFiles).toHaveProperty(`${prefix}AUDIT.md`)
      expect(vendorFiles).toHaveProperty(`${prefix}LICENSE`)
      expect(
        Object.keys(vendorFiles).some((path) =>
          path.startsWith(`${prefix}source/`),
        ),
      ).toBe(true)
    }
  })
})

describe('runtime independence and security', () => {
  const productionSources = import.meta.glob(
    ['../integrations/**/*.{ts,tsx}', '!../integrations/registry.ts'],
    { query: '?raw', import: 'default', eager: true },
  ) as Record<string, string>

  it('contains no remote loading, executable strings, iframes, or analytics', () => {
    const combined = Object.values(productionSources).join('\n')
    expect(combined).not.toMatch(/\bfetch\s*\(/)
    expect(combined).not.toMatch(/\bXMLHttpRequest\b|\baxios\b/)
    expect(combined).not.toMatch(/\beval\s*\(|new\s+Function\s*\(/)
    expect(combined).not.toMatch(/<iframe|createElement\(['"]script/)
    expect(combined).not.toMatch(
      /google-analytics|googletagmanager|tracking pixel/i,
    )
    expect(combined).not.toMatch(
      /poloclub\.github\.io|playground\.tensorflow\.org/,
    )
  })
})
