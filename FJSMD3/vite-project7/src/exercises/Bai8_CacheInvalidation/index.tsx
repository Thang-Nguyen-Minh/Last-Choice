import { useState } from 'react'
import { useAddProductMutation, useGetProductsQuery, useRemoveProductMutation } from '../../services/apiSlice'
import { formatVnd } from '../../services/mockData'

function Bai8CacheInvalidation() {
  const { data = [], isFetching } = useGetProductsQuery('')
  const [addProduct, addState] = useAddProductMutation()
  const [removeProduct, removeState] = useRemoveProductMutation()
  const [message, setMessage] = useState('')

  async function handleAdd(shouldFail = false) {
    setMessage('')
    try {
      await addProduct({
        name: `New Laptop ${data.length + 1}`,
        category: 'Laptop',
        price: 18900000,
        stock: 10,
        shouldFail,
      }).unwrap()
      setMessage('Thêm thành công, cache danh sách tự làm mới.')
    } catch {
      setMessage('Thêm thất bại, không invalidate cache.')
    }
  }

  async function handleDelete(productId: string, shouldFail = false) {
    setMessage('')
    try {
      await removeProduct({ productId, shouldFail }).unwrap()
      setMessage('Xóa thành công')
    } catch {
      setMessage('Xóa thất bại, danh sách giữ nguyên.')
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 8 - InvalidatesTags</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Admin quản lý sản phẩm</h3>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void handleAdd(false)}
            className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white"
          >
            Thêm sản phẩm
          </button>
          <button
            type="button"
            onClick={() => void handleAdd(true)}
            className="rounded-lg border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-700"
          >
            Thêm lỗi
          </button>
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm">
            {isFetching || addState.isLoading || removeState.isLoading ? 'Đang đồng bộ...' : 'Cache ổn định'}
          </span>
        </div>

        {message && <p className="mt-4 rounded-lg bg-sky-50 p-3 text-sm font-semibold text-sky-800">{message}</p>}

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Tên</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold">{product.name}</td>
                  <td className="p-3 text-slate-600">{formatVnd(product.price)}</td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => void handleDelete(product.id)}
                      className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Tags</h4>
        <p className="mt-2">`getProducts` cung cấp `Products/LIST`. `addProduct` và `removeProduct` chỉ invalidatesTags khi mutation thành công.</p>
        <p className="mt-3">Khi API lỗi, UI báo thất bại và cache không bị refetch thừa.</p>
      </aside>
    </section>
  )
}

export default Bai8CacheInvalidation
