export type Course = {
  id: string
  title: string
  category: string
}

export const courses: Course[] = [
  { id: 'react-basic', title: 'React Cơ bản', category: 'Frontend' },
  { id: 'react-state', title: 'React State Architecture', category: 'Frontend' },
  { id: 'node-api', title: 'Node API thực chiến', category: 'Backend' },
  { id: 'typescript', title: 'TypeScript an toàn kiểu', category: 'Language' },
  { id: 'testing', title: 'Testing React Apps', category: 'Quality' },
]

export function filterCourses(keyword: string, source: Course[] = courses): Course[] {
  const normalizedKeyword = keyword.trim().toLocaleLowerCase('vi-VN')

  if (!normalizedKeyword) {
    return source
  }

  return source.filter((course) => course.title.toLocaleLowerCase('vi-VN').includes(normalizedKeyword))
}
