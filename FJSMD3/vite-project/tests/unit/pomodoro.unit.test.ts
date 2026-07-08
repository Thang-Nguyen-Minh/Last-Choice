import { describe, expect, it } from 'vitest'
import { formatTime, getNextPomodoroTick } from '../../src/exercises/Bai9_PomodoroTimer/timerUtils'

describe('Bài 9 Pomodoro timer utils', () => {
  it('formats seconds as mm:ss', () => {
    expect(formatTime(25 * 60)).toBe('25:00')
    expect(formatTime(61)).toBe('01:01')
  })

  it('never formats negative time', () => {
    expect(formatTime(-10)).toBe('00:00')
  })

  it('finishes at zero instead of counting negative', () => {
    expect(getNextPomodoroTick(1)).toEqual({ remainingSeconds: 0, status: 'finished' })
    expect(getNextPomodoroTick(0)).toEqual({ remainingSeconds: 0, status: 'finished' })
  })
})
