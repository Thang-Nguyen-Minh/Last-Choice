import { describe, expect, it } from 'vitest'
import { buildCommand, explainHashedAsset } from '../../src/exercises/Bai6_BuildAnalysis/buildReport'

describe('Bài 6 - build report helpers', () => {
  it('documents the production build command', () => {
    expect(buildCommand).toBe('npm run build')
  })

  it('detects hashed production assets', () => {
    expect(explainHashedAsset('index-Bx3fK9a2.js')).toMatchObject({ hasHash: true })
    expect(explainHashedAsset('index.js')).toMatchObject({ hasHash: false })
  })
})
