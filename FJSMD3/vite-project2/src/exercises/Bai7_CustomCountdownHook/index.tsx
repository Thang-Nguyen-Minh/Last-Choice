import { formatCountdown, useCountdown } from '../../hooks/useCountdown'

function CountdownPanel({ title, initialSeconds }: { title: string; initialSeconds: number }) {
  const timer = useCountdown(initialSeconds)

  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <h4 className="font-bold text-neutral-950">{title}</h4>
      <p aria-label={`${title} còn lại`} className="mt-4 font-mono text-4xl font-bold text-emerald-700">
        {formatCountdown(timer.secondsLeft)}
      </p>
      <p className="mt-2 text-sm text-neutral-600">Status: {timer.status}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={timer.start} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
          Start
        </button>
        <button type="button" onClick={timer.pause} className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-neutral-950">
          Pause
        </button>
        <button type="button" onClick={timer.reset} className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold">
          Reset
        </button>
      </div>
    </article>
  )
}

function Bai7CustomCountdownHook() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="grid gap-4">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 7 - Custom Hook</p>
        <h3 className="text-2xl font-bold text-neutral-950">useCountdown tái sử dụng cho nhiều phân hệ</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <CountdownPanel title="Bài kiểm tra trắc nghiệm" initialSeconds={8} />
          <CountdownPanel title="Sự kiện Flash Sale" initialSeconds={12} />
        </div>
      </div>

      <aside className="rounded-lg border border-neutral-200 bg-white p-5 text-sm leading-6 text-neutral-700 shadow-sm">
        <h4 className="font-bold text-neutral-950">So sánh API trả về</h4>
        <table className="mt-3 w-full text-left text-xs">
          <thead>
            <tr className="border-b">
              <th className="py-2">Kiểu</th>
              <th className="py-2">Linh hoạt</th>
              <th className="py-2">Type-Safety</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Object</td>
              <td className="py-2">Cao, gọi theo tên</td>
              <td className="py-2">Rõ key, dễ mở rộng</td>
            </tr>
            <tr>
              <td className="py-2">Tuple const</td>
              <td className="py-2">Gọn</td>
              <td className="py-2">Phụ thuộc thứ tự</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 font-semibold text-emerald-700">Lựa chọn: Object để dễ đọc và an toàn khi hook có nhiều controls.</p>
      </aside>
    </section>
  )
}

export default Bai7CustomCountdownHook
