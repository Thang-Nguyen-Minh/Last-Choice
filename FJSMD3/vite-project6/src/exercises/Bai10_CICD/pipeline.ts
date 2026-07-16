export type PipelineStep = {
  name: string
  command: string
  blocksNextStep: boolean
}

export const pipelineSteps: PipelineStep[] = [
  { name: 'Install', command: 'npm ci', blocksNextStep: true },
  { name: 'Unit tests', command: 'npm run test:unit', blocksNextStep: true },
  { name: 'Integration tests', command: 'npm run test:integration', blocksNextStep: true },
  { name: 'System tests', command: 'npm run test:system', blocksNextStep: true },
  { name: 'Production build', command: 'npm run build', blocksNextStep: true },
]

export function shouldDeploy(results: boolean[]) {
  return results.length === pipelineSteps.length && results.every(Boolean)
}

export const vercelBuildCommand = 'npm run test && npm run build'
