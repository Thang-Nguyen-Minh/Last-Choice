import { chartsData } from './chartData'

type ChartProps = {
  id: number
  title: string
  data: number[]
}

function Chart({ id, title, data }: ChartProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 font-semibold text-slate-900">{title}</h4>
      <div className="flex h-32 items-end gap-1">
        {data.map((value, index) => (
          <div
            key={`${id}-${index}`}
            className="flex-1 rounded-t bg-sky-500"
            style={{ height: `${value * 3}px`, minHeight: '20px' }}
            title={`${title} - ${value}`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Chart #{id} - {data.length} điểm dữ liệu
      </p>
    </div>
  )
}

type DashboardProps = {
  title?: string
}

function Dashboard({ title = 'Dashboard Phân tích' }: DashboardProps) {
  return (
    <div className="space-y-4">
      <header className="rounded-lg border-b-2 border-emerald-500 bg-emerald-50 p-4">
        <h1 className="text-2xl font-bold text-emerald-900">{title}</h1>
        <p className="mt-1 text-sm text-emerald-700">Hệ thống giám sát 10 biểu đồ phức tạp</p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {chartsData.map((chart) => (
          <Chart key={chart.id} {...chart} />
        ))}
      </div>

      <footer className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Tổng cộng: 10 component Chart con, mỗi component có 12 thanh dữ liệu. Mount render toàn bộ cây DOM,
        còn shallow chỉ kiểm tra lớp Dashboard và tiêu đề cần thiết.
      </footer>
    </div>
  )
}

export { Chart, Dashboard }
