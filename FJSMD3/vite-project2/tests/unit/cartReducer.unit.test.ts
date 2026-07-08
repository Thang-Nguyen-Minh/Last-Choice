import { describe, expect, it } from 'vitest'
import { availableCourses, cartReducer, initialCartState } from '../../src/exercises/Bai8_CartReducer/cartReducer'

describe('Bài 8 cartReducer', () => {
  it('adds and removes courses', () => {
    const withCourse = cartReducer(initialCartState, { type: 'ADD_COURSE', payload: availableCourses[0] })
    expect(withCourse.items).toHaveLength(1)

    const removed = cartReducer(withCourse, { type: 'REMOVE_COURSE', payload: { id: availableCourses[0].id } })
    expect(removed.items).toHaveLength(0)
  })

  it('rejects duplicate courses without changing state reference', () => {
    const withCourse = cartReducer(initialCartState, { type: 'ADD_COURSE', payload: availableCourses[0] })
    const duplicate = cartReducer(withCourse, { type: 'ADD_COURSE', payload: availableCourses[0] })

    expect(duplicate).toBe(withCourse)
  })

  it('applies valid coupon codes', () => {
    const withCourse = cartReducer(initialCartState, { type: 'ADD_COURSE', payload: availableCourses[0] })
    const discounted = cartReducer(withCourse, { type: 'APPLY_COUPON', payload: { code: 'SAVE10' } })

    expect(discounted.discountRate).toBe(0.1)
    expect(discounted.total).toBe(availableCourses[0].price * 0.9)
  })
})
