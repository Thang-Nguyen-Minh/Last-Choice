import { useState } from 'react'

export function SmartCounter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount((current) => current + 1)
  const decrement = () => setCount((current) => Math.max(0, current - 1))
  const reset = () => setCount(0)

  return (
    <article className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase text-emerald-700">Bài 9 - TDD Smart Counter</p>
      <h3 className="mt-2 text-xl font-bold text-slate-950">Bộ đếm thông minh</h3>

      <h1 className="mt-8 text-6xl font-bold text-sky-700" data-testid="counter-value">
        {count}
      </h1>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={decrement}
          className="rounded-lg bg-rose-700 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-800"
        >
          Giảm
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={increment}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Tăng
        </button>
      </div>

      <aside className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-left text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">TDD Implementation</h4>
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
          <li>Test trước: hiển thị ban đầu là 0.</li>
          <li>Test trước: bấm Tăng lên 1.</li>
          <li>Test trước: bấm Giảm tại 0 vẫn là 0.</li>
          <li>Code dùng `Math.max(0, current - 1)` để chặn số âm.</li>
        </ul>
      </aside>
    </article>
  )
}

export default SmartCounter
