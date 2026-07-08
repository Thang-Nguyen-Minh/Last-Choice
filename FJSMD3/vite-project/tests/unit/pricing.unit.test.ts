import { describe, expect, it } from 'vitest'
import { formatPlanPrice } from '../../src/exercises/Bai5_PricingTable/pricingUtils'

describe('Bài 5 pricing utils', () => {
  it('formats valid VND prices', () => {
    expect(formatPlanPrice(150000)).toContain('150.000')
  })

  it('shows contact label for invalid prices', () => {
    expect(formatPlanPrice(0)).toBe('Liên hệ')
    expect(formatPlanPrice(-1)).toBe('Liên hệ')
    expect(formatPlanPrice(Number.NaN)).toBe('Liên hệ')
  })
})
