import { beforeEach, describe, expect, it } from 'vitest'
import { useOrderFilterStore } from '../../src/stores/orderFilterStore'

describe('Bài 5 order filter store', () => {
  beforeEach(() => {
    useOrderFilterStore.getState().reset()
  })

  it('trims search text before it reaches query key', () => {
    useOrderFilterStore.getState().setSearch('  ORD-101  ')

    expect(useOrderFilterStore.getState().search).toBe('ORD-101')
  })
})
