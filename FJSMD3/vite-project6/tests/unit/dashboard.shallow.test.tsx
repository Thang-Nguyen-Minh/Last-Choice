import { describe, expect, it } from 'vitest'
import { measureShallowTitle } from '../../src/exercises/Bai7_RenderTradeoff/renderStrategies'

describe('Bài 7 - shallow render strategy', () => {
  it('checks the Dashboard title without rendering child charts', () => {
    const result = measureShallowTitle('Dashboard Phân tích')

    expect(result.title).toBe('Dashboard Phân tích')
    expect(result.chartCount).toBe(0)
    expect(result.inspectedNodes).toBe(1)
    expect(result.strategy).toBe('shallow')
  })
})
