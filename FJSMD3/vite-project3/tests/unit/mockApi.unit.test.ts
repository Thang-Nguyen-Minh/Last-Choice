import { beforeEach, describe, expect, it } from 'vitest'
import { fetchOrders, resetMockApi, updateInventoryQuantity } from '../../src/api/mockApi'

describe('mock API behavior', () => {
  beforeEach(() => resetMockApi())

  it('filters orders by status and search', async () => {
    const result = await fetchOrders('Pending', 'ORD-104')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('ORD-104')
  })

  it('rejects inventory quantities over the daily limit', async () => {
    await expect(updateInventoryQuantity('SKU-01', 501)).rejects.toThrow('Đã hết hạn mức cập nhật trong ngày')
  })
})
