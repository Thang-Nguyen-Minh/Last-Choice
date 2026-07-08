import { describe, expect, it } from 'vitest'
import { createStudents, filterStudents } from '../../src/exercises/Bai10_PerformanceMemo/studentData'

describe('Bài 10 performance helpers', () => {
  it('creates the requested number of students', () => {
    expect(createStudents(5000)).toHaveLength(5000)
  })

  it('filters students by keyword and track', () => {
    const students = createStudents(30)
    const result = filterStudents(students, 'Học viên 1', 'Frontend')

    expect(result.every((student) => student.name.includes('1') && student.track === 'Frontend')).toBe(true)
  })
})
