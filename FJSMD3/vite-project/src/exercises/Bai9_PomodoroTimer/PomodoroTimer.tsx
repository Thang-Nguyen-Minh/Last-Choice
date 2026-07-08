import { useEffect, useState } from 'react'
import { DEFAULT_POMODORO_SECONDS, formatTime, getNextPomodoroTick, type PomodoroStatus } from './timerUtils'

type PomodoroTimerProps = {
  initialSeconds?: number
}

function PomodoroTimer({ initialSeconds = DEFAULT_POMODORO_SECONDS }: PomodoroTimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
  const [status, setStatus] = useState<PomodoroStatus>('idle')

  useEffect(() => {
    if (status !== 'running') {
      return
    }

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) => {
        const nextTick = getNextPomodoroTick(currentSeconds)
        setStatus(nextTick.status)
        return nextTick.remainingSeconds
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [status])

  function handlePlay() {
    if (remainingSeconds > 0) {
      setStatus('running')
    }
  }

  function handlePause() {
    if (status === 'running') {
      setStatus('paused')
    }
  }

  function handleReset() {
    setRemainingSeconds(initialSeconds)
    setStatus('idle')
  }

  const isFinished = status === 'finished'

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase text-teal-700">Bài 9 - Pomodoro Mini Product</p>
        <h3 className="mt-2 text-2xl font-bold text-zinc-950">Máy đếm ngược Pomodoro</h3>

        <div className="mx-auto mt-8 grid h-56 w-56 place-items-center rounded-full border-8 border-teal-700 bg-[#f7f5ef]">
          <div>
            <p aria-label="Thời gian còn lại" className="font-mono text-5xl font-bold text-zinc-950">
              {formatTime(remainingSeconds)}
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-600">
              {isFinished ? 'Hết giờ!' : `Trạng thái: ${status}`}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={handlePlay}
            disabled={status === 'running' || isFinished}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            Bắt đầu
          </button>
          <button
            type="button"
            onClick={handlePause}
            disabled={status !== 'running'}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            Tạm dừng
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-rose-500 hover:text-rose-700"
          >
            Đặt lại
          </button>
        </div>
      </div>

      <aside className="rounded-lg border border-zinc-200 bg-white p-5 text-sm leading-6 text-zinc-700 shadow-sm">
        <h4 className="font-bold text-zinc-950">Kiến trúc state</h4>
        <p className="mt-2">Input: thao tác Play, Pause, Reset và lifecycle interval.</p>
        <p className="mt-3">State: remainingSeconds và status. Output: thời gian định dạng mm:ss, trạng thái nút và thông báo Hết giờ.</p>
        <p className="mt-3 text-teal-700">Luồng chạy: status running tạo interval; pause/reset/finished sẽ clear interval qua cleanup.</p>
      </aside>
    </section>
  )
}

export default PomodoroTimer
