import { useQuery } from '@tanstack/react-query'
import { fetchOrders, type OrderStatus } from '../../api/mockApi'
import { useOrderFilterStore } from '../../stores/orderFilterStore'

const statuses: Array<OrderStatus | 'All'> = ['All', 'Pending', 'Shipped', 'Delivered']

function Bai5FilterDashboard() {
  const { status, search, setStatus, setSearch } = useOrderFilterStore()
  const ordersQuery = useQuery({
    queryKey: ['orders', status, search],
    queryFn: () => fetchOrders(status, search),
  })

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_400px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - Zustand + TanStack Query</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Filter Dashboard đơn hàng</h3>
        <div className="mt-5 flex flex-wrap gap-3">
          <select
            aria-label="Lọc trạng thái"
            value={status}
            onChange={(event) => setStatus(event.target.value as OrderStatus | 'All')}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            aria-label="Tìm đơn hàng"
            defaultValue={search}
            onBlur={(event) => setSearch(event.target.value)}
            placeholder="Nhập mã hoặc khách hàng"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>

        {ordersQuery.isLoading ? <p className="mt-5 text-sm text-slate-600">Đang tải đơn hàng...</p> : null}
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2">Mã</th>
                <th className="px-3 py-2">Khách hàng</th>
                <th className="px-3 py-2">Trạng thái</th>
                <th className="px-3 py-2">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {(ordersQuery.data ?? []).map((order) => (
                <tr key={order.id} className="border-t border-slate-200">
                  <td className="px-3 py-2 font-semibold">{order.id}</td>
                  <td className="px-3 py-2">{order.customer}</td>
                  <td className="px-3 py-2">{order.status}</td>
                  <td className="px-3 py-2">{order.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">I/O và luồng dữ liệu</h4>
        <p className="mt-2">UI select/input -&gt; Zustand lưu status/search -&gt; queryKey ['orders', status, search] -&gt; API tự chạy lại.</p>
        <p className="mt-3">Không dùng useEffect. Search được trim ở tầng Zustand trước khi đi vào queryKey.</p>
      </aside>
    </section>
  )
}

export default Bai5FilterDashboard
