import { buildCommand, buildDifferences, explainHashedAsset } from './buildReport'

function BuildAnalysis() {
  const sampleAsset = explainHashedAsset('index-Bx3fK9a2.js')

  return (
    <div className="space-y-6">
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 6 - Build Analysis</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Đóng gói và phân tích build production</h3>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
          <p className="font-semibold text-slate-900">Lệnh chuẩn:</p>
          <code className="mt-2 block rounded bg-slate-950 p-3 text-emerald-300">{buildCommand}</code>
          <p className="mt-3 text-slate-700">
            Lệnh này chạy TypeScript check rồi để Vite/Rollup tạo thư mục `dist/` tối ưu cho production.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-900">Hash asset</p>
            <p className="mt-2 text-sm text-amber-950">{sampleAsset.reason}</p>
          </div>
          <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
            <p className="font-semibold text-sky-900">Minification</p>
            <p className="mt-2 text-sm text-sky-950">
              JavaScript bị rút gọn tên biến, bỏ khoảng trắng và loại code chết nên khó đọc hơn nhưng tải nhanh hơn.
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-900">Deploy an toàn</p>
            <p className="mt-2 text-sm text-emerald-950">
              Client cũ vẫn dùng file cache cũ; khi deploy bản mới, URL hash mới buộc trình duyệt tải lại đúng phiên bản.
            </p>
          </div>
        </div>
      </article>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">So sánh Dev vs Prod</h4>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-sky-200">
                <th className="p-2">Đặc điểm</th>
                <th className="p-2">Development</th>
                <th className="p-2">Production</th>
              </tr>
            </thead>
            <tbody>
              {buildDifferences.map((row) => (
                <tr key={row.label} className="border-b border-sky-100">
                  <td className="p-2 font-semibold">{row.label}</td>
                  <td className="p-2">{row.development}</td>
                  <td className="p-2">{row.production}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  )
}

export default BuildAnalysis
