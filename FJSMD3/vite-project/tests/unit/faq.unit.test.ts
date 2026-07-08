import { describe, expect, it } from 'vitest'
import { getNextActiveIndex } from '../../src/exercises/Bai10_FaqAccordion/faqLogic'

describe('Bài 10 FAQ lifting state logic', () => {
  it('opens the clicked item when no item is active', () => {
    expect(getNextActiveIndex(null, 2)).toBe(2)
  })

  it('switches from one active item to another', () => {
    expect(getNextActiveIndex(1, 3)).toBe(3)
  })

  it('closes the active item when clicked again', () => {
    expect(getNextActiveIndex(2, 2)).toBeNull()
  })
})
