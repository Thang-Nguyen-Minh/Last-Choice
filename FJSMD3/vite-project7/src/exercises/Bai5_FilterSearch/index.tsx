import { skipToken } from '@reduxjs/toolkit/query'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setKeyword } from '../../features/search/searchSlice'
import { formatVnd } from '../../services/mockData'
import { useGetProductsQuery } from '../../services/apiSlice'

function Bai5FilterSearch() {
  const dispatch = useAppDispatch()
  const keyword = useAppSelector((state) => state.search.keyword)
  const queryArg = keyword ? keyword : skipToken
  const { data = [], isFetching, isUninitialized } = useGetProductsQuery(queryArg)

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - Redux Slice + RTK Query</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Đồng bộ Filter/Search</h3>

        <label className="mt-5 block text-sm font-semibold text-slate-700" htmlFor="product-search">
          Từ khóa tìm sản phẩm
        </label>
        <input
          id="product-search"
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-600"
          placeholder="Nhập Laptop hoặc Macbook"
          onChange={(event) => dispatch(setKeyword(event.target.value))}
        />

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-lg bg-slate-100 px-3 py-1 font-semibold">searchSlice: {keyword || '(rỗng)'}</span>
          <span className="rounded-lg bg-sky-50 px-3 py-1 text-sky-800">
            {isUninitialized ? 'API bị skip vì keyword rỗng' : isFetching ? 'Đang fetch...' : `Kết quả: ${data.length}`}
          </span>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Sản phẩm</th>
                <th className="p-3">Nhóm</th>
                <th className="p-3">Giá</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="p-3 font-semibold text-slate-900">{product.name}</td>
                  <td className="p-3 text-slate-600">{product.category}</td>
                  <td className="p-3 text-slate-600">{formatVnd(product.price)}</td>
                </tr>
              ))}
              {data.length === 0 && !isFetching && (
                <tr>
                  <td className="p-3 text-slate-500" colSpan={3}>
                    Nhập keyword hợp lệ để gọi API. Khoảng trắng sẽ được trim và không gọi API.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">Luồng dữ liệu</h4>
        <p className="mt-2">
          UI nhập liệu sang `searchSlice.setKeyword()` trim dữ liệu, selector đọc keyword, rồi RTK Query nhận keyword
          làm query arg.
        </p>
        <p className="mt-3">Nếu keyword sau trim là rỗng, hook nhận `skipToken`, nên không gọi API gây tốn tài nguyên.</p>
      </aside>
    </section>
  )
}

export default Bai5FilterSearch
