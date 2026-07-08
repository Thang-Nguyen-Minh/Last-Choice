import { describe, expect, it } from 'vitest'
import { courses, filterCourses } from '../../src/exercises/Bai6_UrlSearchParams/courseData'

describe('Bài 6 course search', () => {
  it('returns all courses for an empty keyword', () => {
    expect(filterCourses('')).toHaveLength(courses.length)
  })

  it('filters courses by keyword', () => {
    expect(filterCourses('React').map((course) => course.title)).toEqual([
      'React Cơ bản',
      'React State Architecture',
      'Testing React Apps',
    ])
  })
})
