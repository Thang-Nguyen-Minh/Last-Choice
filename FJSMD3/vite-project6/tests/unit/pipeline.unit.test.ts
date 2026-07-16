import { describe, expect, it } from 'vitest'
import { shouldDeploy, vercelBuildCommand } from '../../src/exercises/Bai10_CICD/pipeline'

describe('Bài 10 - CI/CD pipeline rules', () => {
  it('deploys only when all pipeline steps pass', () => {
    expect(shouldDeploy([true, true, true, true, true])).toBe(true)
    expect(shouldDeploy([true, false, true, true, true])).toBe(false)
  })

  it('forces tests before production build on Vercel', () => {
    expect(vercelBuildCommand).toBe('npm run test && npm run build')
  })
})
