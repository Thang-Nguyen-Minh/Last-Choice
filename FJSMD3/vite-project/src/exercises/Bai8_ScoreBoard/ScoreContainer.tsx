import { useEffect, useState } from 'react'
import { ScoreBoard } from './ScoreBoard'

function ScoreContainer() {
  const [score, setScore] = useState(10)
  const [parentTicks, setParentTicks] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setParentTicks((currentTick) => {
        const nextTick = currentTick + 1

        if (nextTick % 3 === 0) {
          setScore((currentScore) => currentScore + 5)
        }

        return nextTick
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-700">Bài 8 - shouldComponentUpdate</p>
          <h3 className="mt-2 text-2xl font-bold text-zinc-950">Tối ưu hiệu năng Lifecycle</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Component cha cập nhật mỗi giây. ScoreBoard là class component và chặn re-render khi điểm số mới bằng điểm số cũ.
          </p>
        </div>

        <ScoreBoard score={score} />

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
            Parent ticks: {parentTicks}
          </span>
          <button
            type="button"
            onClick={() => setScore((currentScore) => currentScore + 5)}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            Tăng điểm thủ công
          </button>
        </div>
      </div>

      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        <h4 className="font-bold">So sánh hướng tiếp cận</h4>
        <p className="mt-2">Hướng 1: để mặc định, render chạy lại theo parent tick dù score không đổi.</p>
        <p className="mt-3">Hướng 2: dùng shouldComponentUpdate để chỉ return true khi nextProps.score khác props hiện tại.</p>
      </aside>
    </section>
  )
}

export default ScoreContainer
