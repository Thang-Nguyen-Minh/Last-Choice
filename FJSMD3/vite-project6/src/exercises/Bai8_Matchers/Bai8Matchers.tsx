import { useMemo, useState } from 'react'
import { filterActiveUsers, getAdminUser, type User } from '../../api/userApi'

const sampleUsers: User[] = [
  { id: '1', name: 'Admin', email: 'admin@example.com', isActive: true },
  { id: '2', name: 'Lan', email: 'lan@example.com', isActive: true },
  { id: '3', name: 'Minh', email: 'minh@example.com', isActive: false },
  { id: '4', name: 'Hoa', email: 'hoa@example.com', isActive: true },
]

function withRuntimeLoginDate(users: User[]): User[] {
  return users.map((user) =>
    user.name === 'Admin' ? { ...user, lastLoginDate: new Date('2026-07-16T09:00:00.000Z').toISOString() } : user,
  )
}

function Bai8Matchers() {
  const [includeDynamicField, setIncludeDynamicField] = useState(false)
  const users = useMemo(() => (includeDynamicField ? withRuntimeLoginDate(sampleUsers) : sampleUsers), [includeDynamicField])
  const activeUsers = filterActiveUsers(users)
  const admin = getAdminUser(activeUsers)

  return (
    <div className="space-y-6">
      <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 8 - Array/Object Matchers</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Kiểm tra Admin trong danh sách active users</h3>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setIncludeDynamicField(false)}
            className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-white"
          >
            Dữ liệu cố định
          </button>
          <button
            type="button"
            onClick={() => setIncludeDynamicField(true)}
            className="rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white"
          >
            Thêm lastLoginDate
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <section className="rounded-lg border border-slate-200 p-4">
            <h4 className="font-semibold text-slate-900">Input users</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {users.map((user) => (
                <li key={user.id} className={user.isActive ? 'text-emerald-700' : 'text-rose-700'}>
                  {user.name} - {user.isActive ? 'Active' : 'Inactive'}
                  {user.lastLoginDate ? ` - ${user.lastLoginDate}` : ''}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h4 className="font-semibold text-emerald-900">Kết quả filterActiveUsers</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {activeUsers.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
            {admin && <p className="mt-3 text-sm font-bold text-emerald-700">Admin nằm trong kết quả.</p>}
          </section>
        </div>
      </article>

      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Kết luận matcher</h4>
        <p className="mt-2">
          `toContainEqual` và vòng lặp với `toEqual` đều yêu cầu object khớp sâu. Khi `Admin` có `lastLoginDate`
          sinh tại runtime, hai cách này dễ fail nếu expected object thiếu field đó.
        </p>
        <p className="mt-3">
          Cách ổn định hơn là dùng <code>expect.objectContaining</code> để chỉ kiểm tra thuộc tính quan trọng như
          `name` và `isActive`, còn field động như `lastLoginDate` có thể được bỏ qua.
        </p>
      </aside>
    </div>
  )
}

export default Bai8Matchers
