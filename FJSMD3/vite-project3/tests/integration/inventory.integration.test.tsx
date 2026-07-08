import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { resetMockApi } from '../../src/api/mockApi'
import Bai10InventoryModule from '../../src/exercises/Bai10_InventoryModule'
import { useInventoryUiStore } from '../../src/stores/inventoryUiStore'
import { renderWithQueryClient } from './testUtils'

describe('Bài 10 inventory integration', () => {
  beforeEach(() => {
    resetMockApi()
    useInventoryUiStore.getState().reset()
  })

  it('blocks negative quantities and keeps sidebar open', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<Bai10InventoryModule />)

    await screen.findByText('Tai nghe học online')
    await user.click(screen.getAllByRole('button', { name: 'Sửa số lượng' })[0])
    await user.clear(screen.getByLabelText('Số lượng mới'))
    await user.type(screen.getByLabelText('Số lượng mới'), '-1')
    await user.click(screen.getByRole('button', { name: 'Lưu' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Số lượng không được âm')
  })
})
