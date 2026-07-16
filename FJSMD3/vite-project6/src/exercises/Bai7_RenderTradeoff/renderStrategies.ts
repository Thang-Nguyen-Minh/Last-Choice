export type RenderMeasurement = {
  strategy: 'shallow' | 'mount'
  title: string
  chartCount: number
  inspectedNodes: number
  executionMs: number
}

export function measureShallowTitle(title: string): RenderMeasurement {
  const startedAt = performance.now()

  return {
    strategy: 'shallow',
    title,
    chartCount: 0,
    inspectedNodes: 1,
    executionMs: performance.now() - startedAt,
  }
}

export function measureMountedDashboard(title: string, chartCount: number, pointsPerChart: number): RenderMeasurement {
  const startedAt = performance.now()
  const headerNodes = 2
  const chartNodes = chartCount * (3 + pointsPerChart)

  return {
    strategy: 'mount',
    title,
    chartCount,
    inspectedNodes: headerNodes + chartNodes,
    executionMs: performance.now() - startedAt,
  }
}
