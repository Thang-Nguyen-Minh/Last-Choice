import { useReducer, useState } from 'react'
import { availableCourses, cartReducer, formatMoney, initialCartState } from './cartReducer'

function Bai8CartReducer() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)
  const [couponInput, setCouponInput] = useState('SAVE10')

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="grid gap-4">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 8 - useReducer</p>
        <h3 className="text-2xl font-bold text-neutral-950">Điều phối trạng thái giỏ hàng phức hợp</h3>

        <div className="grid gap-3 md:grid-cols-3">
          {availableCourses.map((course) => (
            <article key={course.id} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
              <h4 className="font-bold text-neutral-950">{course.title}</h4>
              <p className="mt-2 text-sm text-neutral-600">{formatMoney(course.price)}</p>
              <button
                type="button"
                onClick={() => dispatch({ type: 'ADD_COURSE', payload: course })}
                className="mt-4 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white"
              >
                Thêm khóa học
              </button>
            </article>
          ))}
        </div>

        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <h4 className="font-bold text-neutral-950">Giỏ hàng</h4>
          {state.items.length === 0 ? <p className="mt-3 text-sm text-neutral-600">Chưa có khóa học.</p> : null}
          <ul className="mt-3 grid gap-2">
            {state.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-lg bg-[#f6f7f2] p-3 text-sm">
                <span>{item.title}</span>
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'REMOVE_COURSE', payload: { id: item.id } })}
                  className="font-semibold text-rose-700"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <input
              aria-label="Mã giảm giá"
              value={couponInput}
              onChange={(event) => setCouponInput(event.target.value)}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-emerald-700"
            />
            <button
              type="button"
              onClick={() => dispatch({ type: 'APPLY_COUPON', payload: { code: couponInput } })}
              className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-semibold text-white"
            >
              Áp dụng mã
            </button>
          </div>

          <p className="mt-4 text-xl font-bold text-emerald-700">Tổng tiền: {formatMoney(state.total)}</p>
          <p className="mt-1 text-sm text-neutral-600">Mã hiện tại: {state.couponCode || 'Không có'}</p>
        </div>
      </div>

      <aside className="rounded-lg border border-neutral-200 bg-white p-5 text-sm leading-6 text-neutral-700 shadow-sm">
        <h4 className="font-bold text-neutral-950">Phân tích</h4>
        <p className="mt-2">Nhiều useState rời rạc dễ lệch items, coupon và total khi cập nhật liên tiếp.</p>
        <p className="mt-3">useReducer gom action ADD_COURSE, REMOVE_COURSE, APPLY_COUPON vào pure function.</p>
        <p className="mt-3 font-semibold text-emerald-700">Bẫy dữ liệu: ADD_COURSE trả về nguyên state nếu khóa học đã tồn tại.</p>
      </aside>
    </section>
  )
}

export default Bai8CartReducer
