import { describe, expect, it } from 'vitest'
import { ScoreBoard } from '../../src/exercises/Bai8_ScoreBoard/ScoreBoard'

describe('Bài 8 ScoreBoard lifecycle', () => {
  it('skips render when score does not change', () => {
    const scoreBoard = new ScoreBoard({ score: 10 })

    expect(scoreBoard.shouldComponentUpdate({ score: 10 })).toBe(false)
  })

  it('allows render when score changes', () => {
    const scoreBoard = new ScoreBoard({ score: 10 })

    expect(scoreBoard.shouldComponentUpdate({ score: 15 })).toBe(true)
  })
})
