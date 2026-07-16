import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { chartsData } from '../../src/exercises/Bai7_RenderTradeoff/chartData'
import { Dashboard } from '../../src/exercises/Bai7_RenderTradeoff/Dashboard'
import { measureMountedDashboard } from '../../src/exercises/Bai7_RenderTradeoff/renderStrategies'

describe('Bài 7 - mount render strategy', () => {
  it('renders title and all child charts in the DOM', () => {
    render(<Dashboard title="Dashboard Phân tích" />)

    expect(screen.getByRole('heading', { level: 1, name: 'Dashboard Phân tích' })).toBeInTheDocument()
    expect(screen.getAllByText(/Chart #/)).toHaveLength(10)
  })

  it('measures that mount inspects a deeper tree than shallow', () => {
    const result = measureMountedDashboard('Dashboard Phân tích', chartsData.length, chartsData[0].data.length)

    expect(result.strategy).toBe('mount')
    expect(result.chartCount).toBe(10)
    expect(result.inspectedNodes).toBeGreaterThan(100)
  })
})
