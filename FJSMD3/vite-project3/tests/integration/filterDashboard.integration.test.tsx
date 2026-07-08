import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { apiCounters, resetMockApi } from '../../src/api/mockApi'
import Bai5FilterDashboard from '../../src/exercises/Bai5_FilterDashboard'
import { useOrderFilterStore } from '../../src/stores/orderFilterStore'
import { renderWithQueryClient } from './testUtils'

describe('Bài 5 filter dashboard integration', () => {
  beforeEach(() => {
    resetMockApi()
    useOrderFilterStore.getState().reset()
  })

  it('uses Zustand filter state in TanStack query keys', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<Bai5FilterDashboard />)

    await screen.findByText('ORD-101')
    await user.selectOptions(screen.getByLabelText('Lọc trạng thái'), 'Pending')
    await waitFor(() => expect(apiCounters.orders).toBeGreaterThanOrEqual(2))
    expect(screen.queryByText('ORD-102')).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Tìm đơn hàng'), '  ORD-104  ')
    await user.tab()
    await waitFor(() => expect(useOrderFilterStore.getState().search).toBe('ORD-104'))
    expect(await screen.findByText('Delta Edu')).toBeInTheDocument()
  })
})
