import BuildAnalysis from './BuildAnalysis'

function Bai6BuildAnalysis() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <BuildAnalysis />
      </div>
      <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        <h4 className="font-bold">Yêu cầu Bài 6</h4>
        <ul className="mt-3 space-y-2 list-disc list-inside">
          <li>Chạy <code className="bg-emerald-100 px-1 rounded">npm run build</code> tạo thư mục <code className="bg-emerald-100 px-1 rounded">dist/</code></li>
          <li>Giải thích hash trong tên file (cache busting)</li>
          <li>So sánh cấu trúc Dev vs Prod</li>
          <li>Minification, tree-shaking, code splitting</li>
        </ul>
      </aside>
    </section>
  )
}

export default Bai6BuildAnalysis