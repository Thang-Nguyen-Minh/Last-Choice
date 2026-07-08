import { memo, useCallback, useMemo, useState } from 'react'
import { createStudents, filterStudents } from './studentData'

const StudentRows = memo(function StudentRows({
  students,
  onSelect,
}: {
  students: ReturnType<typeof createStudents>
  onSelect: (id: number) => void
}) {
  return (
    <tbody>
      {students.slice(0, 12).map((student) => (
        <tr key={student.id} className="border-t border-neutral-200">
          <td className="px-3 py-2">{student.name}</td>
          <td className="px-3 py-2">{student.track}</td>
          <td className="px-3 py-2">{student.score}</td>
          <td className="px-3 py-2">
            <button type="button" onClick={() => onSelect(student.id)} className="font-semibold text-sky-700">
              Chọn
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  )
})

function Bai10PerformanceMemo() {
  const students = useMemo(() => createStudents(5000), [])
  const [keyword, setKeyword] = useState('')
  const [track, setTrack] = useState('all')
  const [checked, setChecked] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filteredStudents = useMemo(() => {
    return filterStudents(students, keyword, track)
  }, [students, keyword, track])

  const filterDependencyKey = useMemo(() => `${keyword || 'empty'}:${track}`, [keyword, track])

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id)
  }, [])

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 10 - useMemo & useCallback</p>
        <h3 className="mt-2 text-2xl font-bold text-neutral-950">Bảng điều khiển 5.000 học viên</h3>

        <div className="mt-5 flex flex-wrap gap-3">
          <input
            aria-label="Tìm học viên"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Nhập tên học viên"
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-700"
          />
          <select
            aria-label="Lọc track"
            value={track}
            onChange={(event) => setTrack(event.target.value)}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-700"
          >
            <option value="all">Tất cả</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
          <button
            type="button"
            onClick={() => setChecked((current) => !current)}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold"
          >
            {checked ? 'Đã kiểm tra' : 'Chưa kiểm tra'}
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f6f7f2]">
              <tr>
                <th className="px-3 py-2">Tên</th>
                <th className="px-3 py-2">Track</th>
                <th className="px-3 py-2">Điểm</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <StudentRows students={filteredStudents} onSelect={handleSelect} />
          </table>
        </div>

        <p className="mt-4 text-sm text-neutral-600">
          Kết quả: {filteredStudents.length}. Dependency key: <span data-testid="filter-runs">{filterDependencyKey}</span>.
          Học viên chọn: {selectedId ?? 'Chưa chọn'}.
        </p>
      </div>

      <aside className="rounded-lg border border-neutral-200 bg-white p-5 text-sm leading-6 text-neutral-700 shadow-sm">
        <h4 className="font-bold text-neutral-950">Báo cáo hiệu năng</h4>
        <p className="mt-2">Re-render xảy ra khi state tiêu đề như checked đổi, nhưng useMemo bỏ qua filter vì students, keyword, track không đổi.</p>
        <p className="mt-3">useCallback giữ stable reference cho onSelect, giúp component hàng memoized không nhận hàm mới vô ích.</p>
        <p className="mt-3 font-semibold text-emerald-700">Dependencies dùng strict equality: [students, keyword, track].</p>
      </aside>
    </section>
  )
}

export default Bai10PerformanceMemo
