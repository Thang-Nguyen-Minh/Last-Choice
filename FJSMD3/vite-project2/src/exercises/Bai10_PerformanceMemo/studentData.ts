export type Student = {
  id: number
  name: string
  track: 'Frontend' | 'Backend' | 'Fullstack'
  score: number
}

export function createStudents(count = 5000): Student[] {
  const tracks: Student['track'][] = ['Frontend', 'Backend', 'Fullstack']

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Học viên ${index + 1}`,
    track: tracks[index % tracks.length],
    score: 60 + (index % 41),
  }))
}

export function filterStudents(students: Student[], keyword: string, track: string): Student[] {
  const normalizedKeyword = keyword.trim().toLocaleLowerCase('vi-VN')

  return students.filter((student) => {
    const matchesKeyword = normalizedKeyword === '' || student.name.toLocaleLowerCase('vi-VN').includes(normalizedKeyword)
    const matchesTrack = track === 'all' || student.track === track
    return matchesKeyword && matchesTrack
  })
}
