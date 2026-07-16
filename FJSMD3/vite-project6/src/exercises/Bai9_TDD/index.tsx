import SmartCounter from './SmartCounter'

function Bai9TDD() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <SmartCounter />
      <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">Yêu cầu Bài 9 (TDD)</h4>
        <ol className="mt-3 list-inside list-decimal space-y-2">
          <li>Viết test mô tả hành vi trước khi code component.</li>
          <li>Chạy test để thấy fail khi component chưa tồn tại.</li>
          <li>Viết `SmartCounter` vừa đủ để pass: ban đầu 0, tăng lên 1, giảm không âm, reset về 0.</li>
        </ol>
      </aside>
    </section>
  )
}

export default Bai9TDD
