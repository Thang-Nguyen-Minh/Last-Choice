import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addToCart, clearCart, removeFromCart } from '../../features/cart/cartSlice'
import { clearCheckout, setAddress, setNote } from '../../features/checkout/checkoutSlice'
import { useCreateOrderMutation, useGetProductsQuery } from '../../services/apiSlice'
import { formatVnd } from '../../services/mockData'

function Bai10CheckoutFlow() {
  const dispatch = useAppDispatch()
  const { data: products = [], isFetching } = useGetProductsQuery('')
  const cartItems = useAppSelector((state) => state.cart.items)
  const checkout = useAppSelector((state) => state.checkout)
  const [createOrder, orderState] = useCreateOrderMutation()
  const [message, setMessage] = useState('')
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  async function handlePay(shouldFail = false) {
    setMessage('')

    if (cartItems.length === 0 || checkout.address.trim().length < 8) {
      setMessage('Cần có sản phẩm và địa chỉ giao hàng hợp lệ.')
      return
    }

    try {
      const result = await createOrder({
        shouldFail,
        payload: {
          items: cartItems.map((item) => ({ productId: item.productId, quantity: item.quantity })),
          address: checkout.address,
          note: checkout.note,
        },
      }).unwrap()

      dispatch(clearCart())
      dispatch(clearCheckout())
      setMessage(`Tạo đơn ${result.id} thành công, giỏ hàng đã được clear.`)
    } catch {
      setMessage('Thanh toán lỗi, giữ nguyên giỏ hàng để người dùng thử lại.')
    }
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase text-emerald-700">Bài 10 - Checkout Flow</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">Sản phẩm từ RTK Query</h3>
          <p className="mt-2 text-sm text-slate-500">{isFetching ? 'Đang tải...' : 'Chọn sản phẩm để đưa vào Redux cartSlice.'}</p>

          <ul className="mt-5 grid gap-2">
            {products.slice(0, 4).map((product) => (
              <li key={product.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-slate-500">{formatVnd(product.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(addToCart({ productId: product.id, name: product.name, price: product.price }))}
                  className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white"
                >
                  Thêm
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-950">Giỏ hàng + địa chỉ</h3>
          <ul className="mt-5 grid gap-2">
            {cartItems.map((item) => (
              <li key={item.productId} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.productId))}
                  className="rounded-lg border border-slate-300 px-2 py-1 text-xs font-semibold"
                >
                  Xóa
                </button>
              </li>
            ))}
            {cartItems.length === 0 && <li className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">Giỏ hàng rỗng</li>}
          </ul>

          <label className="mt-5 block text-sm font-semibold text-slate-700" htmlFor="address">
            Địa chỉ giao hàng
          </label>
          <input
            id="address"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            value={checkout.address}
            onChange={(event) => dispatch(setAddress(event.target.value))}
            placeholder="Ví dụ: 12 Nguyễn Trãi, Hà Nội"
          />

          <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="note">
            Ghi chú
          </label>
          <textarea
            id="note"
            className="mt-2 min-h-20 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
            value={checkout.note}
            onChange={(event) => dispatch(setNote(event.target.value))}
          />

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold">Tổng: {formatVnd(total)}</span>
            <button
              type="button"
              onClick={() => void handlePay(false)}
              className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white"
            >
              {orderState.isLoading ? 'Đang thanh toán...' : 'Thanh toán'}
            </button>
            <button
              type="button"
              onClick={() => void handlePay(true)}
              className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700"
            >
              Submit lỗi
            </button>
          </div>

          {message && <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700">{message}</p>}
        </div>
      </div>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Data flow</h4>
        <p className="mt-2">
          RTK Query lấy products, `cartSlice` lưu giỏ hàng, `checkoutSlice` lưu địa chỉ, sau đó mutation `createOrder`
          gửi payload lên server.
        </p>
        <p className="mt-3">Nếu mutation thành công, component dispatch `clearCart()` và `clearCheckout()`. Nếu lỗi mạng, local state được giữ nguyên.</p>
      </aside>
    </section>
  )
}

export default Bai10CheckoutFlow
