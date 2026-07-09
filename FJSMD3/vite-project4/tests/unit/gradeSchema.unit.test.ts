import { describe, expect, it } from 'vitest'
import { buildScoreRows, gradeSchema } from '../../src/exercises/Bai10_GradeKiosk/schema'

describe('Bài 10 grade schema', () => {
  it('builds score rows from student count', () => {
    expect(buildScoreRows(3)).toHaveLength(3)
    expect(buildScoreRows(-1)).toHaveLength(0)
  })

  it('rejects invalid count and score', async () => {
    await expect(gradeSchema.validate({ courseCode: 'MATH1', studentCount: 0, scores: [] })).rejects.toThrow('Sĩ số không hợp lệ')
    await expect(gradeSchema.validate({ courseCode: 'MATH1', studentCount: 1, scores: [{ value: 11 }] })).rejects.toThrow(
      'Điểm phải từ 0.0 đến 10.0',
    )
  })
})
