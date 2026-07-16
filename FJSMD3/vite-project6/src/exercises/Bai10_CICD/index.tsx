import { pipelineSteps, shouldDeploy, vercelBuildCommand } from './pipeline'

function Bai10CICD() {
  const happyPath = shouldDeploy([true, true, true, true, true])
  const failedTestPath = shouldDeploy([true, false, true, true, true])

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 10 - CI/CD Pipeline Automation</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Git to Test to Build to Deploy</h3>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Vercel build command</p>
          <code className="mt-2 block rounded bg-slate-950 p-3 text-emerald-300">{vercelBuildCommand}</code>
          <p className="mt-3 text-sm text-slate-700">
            Chỉ khi <code>npm run test</code> pass toàn bộ Unit to Integration to System,
            Vercel mới chạy <code>npm run build</code>.
          </p>
        </div>

        <ol className="mt-5 space-y-3">
          {pipelineSteps.map((step, index) => (
            <li key={step.name} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 text-sm">
              <span className="font-semibold">
                {index + 1}. {step.name}
              </span>
              <code className="rounded bg-slate-100 px-2 py-1">{step.command}</code>
            </li>
          ))}
        </ol>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
            <p className="font-semibold">Tất cả test pass</p>
            <p className="mt-1">Deploy: {happyPath ? 'Được phép' : 'Bị chặn'}</p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950">
            <p className="font-semibold">Một test fail</p>
            <p className="mt-1">Deploy: {failedTestPath ? 'Được phép' : 'Bị chặn'}</p>
          </div>
        </div>
      </article>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Báo cáo hành vi pipeline</h4>
        <p className="mt-2">
          <code>vercel.json</code> cấu hình build command là <code>{vercelBuildCommand}</code>.
          Toán tử AND làm build dừng ngay khi test fail, nên bản build lỗi không được xuất bản.
        </p>
        <p className="mt-3">
          <code>.github/workflows/vite-project6-ci.yml</code> cũng chạy cùng chuỗi kiểm tra trên GitHub để log CI
          thể hiện rõ bước nào fail.
        </p>
      </aside>
    </section>
  )
}

export default Bai10CICD
