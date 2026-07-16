import { chartsData } from './chartData'
import { Dashboard } from './Dashboard'
import { measureMountedDashboard, measureShallowTitle } from './renderStrategies'

function Bai7RenderTradeoff() {
  const shallow = measureShallowTitle('Dashboard Phân tích')
  const mount = measureMountedDashboard('Dashboard Phân tích', chartsData.length, chartsData[0]?.data.length ?? 0)

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="min-h-[500px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <Dashboard title="Dashboard Phân tích" />
      </div>
      <aside className="space-y-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">Ma trận Render</h4>
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-emerald-200">
              <th className="p-2">Chiến lược</th>
              <th className="p-2">Chart render</th>
              <th className="p-2">Node kiểm tra</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-emerald-100">
              <td className="p-2 font-semibold">shallow()</td>
              <td className="p-2">{shallow.chartCount}</td>
              <td className="p-2">{shallow.inspectedNodes}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">mount()</td>
              <td className="p-2">{mount.chartCount}</td>
              <td className="p-2">{mount.inspectedNodes}</td>
            </tr>
          </tbody>
        </table>
        <p>
          Kết luận: với yêu cầu chỉ kiểm tra `<h1>Title</h1>`, shallow nhanh và cô lập hơn. Mount phù hợp khi cần
          xác nhận tương tác thật qua toàn bộ cây component.
        </p>
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950">
          Ghi chú: Enzyme đã lỗi thời với React hiện đại, nên project mô phỏng hai chiến lược bằng helper test ổn định.
        </p>
      </aside>
    </section>
  )
}

export default Bai7RenderTradeoff
