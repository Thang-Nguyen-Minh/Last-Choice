import FaqList from './FaqList'

function Bai10FaqAccordion() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-700">Bài 10 - Lifting State Up</p>
        <h3 className="mt-2 text-2xl font-bold text-zinc-950">Hệ thống Câu hỏi thường gặp</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Chỉ một câu hỏi được mở tại một thời điểm. Click lại câu đang mở sẽ đóng toàn bộ.
        </p>
        <div className="mt-6">
          <FaqList />
        </div>
      </div>

      <aside className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-sm leading-6 text-rose-950">
        <h4 className="font-bold">Sơ đồ kiến trúc</h4>
        <div className="mt-3 rounded-lg bg-white p-4 font-mono text-xs leading-6 text-zinc-800">
          FaqList
          <br />
          activeIndex
          <br />
          setActiveIndex
          <br />
          | props: isOpen, onToggle
          <br />
          FaqItem 1..5
        </div>
        <p className="mt-3">
          State đặt ở component cha để các item chia sẻ cùng một nguồn dữ liệu, nhờ đó item mới mở sẽ tự đóng item cũ.
        </p>
      </aside>
    </section>
  )
}

export default Bai10FaqAccordion
