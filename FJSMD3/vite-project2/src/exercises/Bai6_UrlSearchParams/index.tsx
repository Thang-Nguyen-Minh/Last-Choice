import { useSearchParams } from 'react-router-dom'
import { filterCourses } from './courseData'

function Bai6UrlSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('q') ?? ''
  const visibleCourses = filterCourses(keyword)

  function handleKeywordChange(value: string) {
    const nextKeyword = value.trimStart()

    if (nextKeyword.trim() === '') {
      setSearchParams({})
      return
    }

    setSearchParams({ q: nextKeyword })
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 6 - useSearchParams</p>
        <h3 className="mt-2 text-2xl font-bold text-neutral-950">Danh sách khóa học chia sẻ được qua URL</h3>
        <label className="mt-6 grid gap-2 text-sm font-semibold text-neutral-800">
          Tìm kiếm khóa học
          <input
            aria-label="Tìm kiếm khóa học"
            value={keyword}
            onChange={(event) => handleKeywordChange(event.target.value)}
            placeholder="Ví dụ: React"
            className="rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <ul className="mt-5 grid gap-3">
          {visibleCourses.map((course) => (
            <li key={course.id} className="rounded-lg border border-neutral-200 bg-[#f6f7f2] p-3">
              <p className="font-semibold text-neutral-950">{course.title}</p>
              <p className="text-sm text-neutral-600">{course.category}</p>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Luồng đồng bộ</h4>
        <p className="mt-2">Input onChange cập nhật query param q bằng setSearchParams.</p>
        <p className="mt-3">Reload với URL có ?q=... sẽ khôi phục value từ useSearchParams.</p>
        <p className="mt-3">Khi input rỗng, setSearchParams({}) xóa hẳn query rác khỏi URL.</p>
      </aside>
    </section>
  )
}

export default Bai6UrlSearchParams
