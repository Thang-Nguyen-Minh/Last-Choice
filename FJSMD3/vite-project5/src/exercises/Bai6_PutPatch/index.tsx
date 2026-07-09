import { explainPutMissingFieldsRisk, replaceUserProfile, sampleUser, updateUserPhone } from '../../api/profileApi'

function Bai6PutPatch() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 6 - PUT vs PATCH</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Cập nhật hồ sơ nhân sự</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg bg-slate-50 p-4">
            <h4 className="font-bold">PUT replaceUserProfile(user)</h4>
            <pre className="mt-3 overflow-auto text-xs">{JSON.stringify(sampleUser, null, 2)}</pre>
          </article>
          <article className="rounded-lg bg-slate-50 p-4">
            <h4 className="font-bold">PATCH updateUserPhone(id, payload)</h4>
            <pre className="mt-3 overflow-auto text-xs">{JSON.stringify({ phone: '0912345678' }, null, 2)}</pre>
          </article>
        </div>
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={() => replaceUserProfile(sampleUser)} className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-semibold text-white">Gửi PUT</button>
          <button type="button" onClick={() => updateUserPhone(sampleUser.id, { phone: '0912345678' })} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">Gửi PATCH</button>
        </div>
      </div>
      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        <h4 className="font-bold">Phân tích I/O</h4>
        <p className="mt-2">PUT gửi toàn bộ User để thay thế tài nguyên, idempotent nhưng payload lớn.</p>
        <p className="mt-3">PATCH gửi phần thay đổi, phù hợp đổi một trường như phone.</p>
        <p className="mt-3 font-semibold">{explainPutMissingFieldsRisk()}</p>
      </aside>
    </section>
  )
}

export default Bai6PutPatch
