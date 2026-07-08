import { useState } from 'react'
import { getWelcomeMessage } from './conditionalRendering'

function WelcomeBanner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-teal-700">Bài 7 - Conditional Rendering</p>
        <h3 className="mt-2 text-2xl font-bold text-zinc-950">WelcomeBanner</h3>

        <div className="mt-6 rounded-lg border border-zinc-200 bg-[#f7f5ef] p-5 text-center">
          <p className="text-3xl font-bold text-zinc-950">{getWelcomeMessage(isLoggedIn)}</p>
          <button
            type="button"
            onClick={() => setIsLoggedIn((current) => !current)}
            className="mt-5 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            {isLoggedIn ? 'Đăng xuất' : 'Đổi sang đã đăng nhập'}
          </button>
        </div>
      </div>

      <aside className="rounded-lg border border-zinc-200 bg-white p-5 text-sm leading-6 text-zinc-700 shadow-sm">
        <h4 className="font-bold text-zinc-950">Phân tích đa giải pháp</h4>
        <p className="mt-3">
          Giải pháp 1: dùng if/else trước return, dễ đọc khi UI có nhiều nhánh hoặc mỗi nhánh dài.
        </p>
        <p className="mt-3">
          Giải pháp 2: dùng toán tử ba ngôi trong JSX, ngắn gọn khi chỉ có hai trạng thái đơn giản.
        </p>
        <p className="mt-3 font-semibold text-teal-700">
          Lựa chọn: toán tử ba ngôi/helper message vì case này nhỏ, rõ ràng và ít lặp JSX.
        </p>
      </aside>
    </section>
  )
}

export default WelcomeBanner
