import { describe, expect, it } from 'vitest'
import { cartReducer, addToCart, clearCart } from '../../src/features/cart/cartSlice'
import { searchReducer, setKeyword, normalizeKeyword } from '../../src/features/search/searchSlice'

describe('Redux slices', () => {
  it('trims search keyword before RTK Query receives it', () => {
    expect(normalizeKeyword('  Laptop  ')).toBe('Laptop')
    expect(searchReducer(undefined, setKeyword('   '))).toEqual({ keyword: '' })
  })

  it('merges duplicated cart items and clears cart', () => {
    const first = cartReducer(undefined, addToCart({ productId: 'p1', name: 'Laptop', price: 100 }))
    const second = cartReducer(first, addToCart({ productId: 'p1', name: 'Laptop', price: 100 }))

    expect(second.items).toEqual([{ productId: 'p1', name: 'Laptop', price: 100, quantity: 2 }])
    expect(cartReducer(second, clearCart()).items).toHaveLength(0)
  })
})
