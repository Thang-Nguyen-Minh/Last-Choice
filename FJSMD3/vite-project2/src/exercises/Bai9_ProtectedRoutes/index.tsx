import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth'
import { ClassroomPage, LoginPage, RouteIndexPage } from './pages'
import ProtectedRoute from './ProtectedRoute'

function Bai9ProtectedRoutes() {
  return (
    <AuthProvider>
      <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-4">
          <p className="text-sm font-semibold uppercase text-emerald-700">Bài 9 - Protected Routes</p>
          <h3 className="text-2xl font-bold text-neutral-950">Kiến trúc luồng truy cập bảo mật</h3>
          <Routes>
            <Route index element={<RouteIndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/classroom"
              element={
                <ProtectedRoute>
                  <ClassroomPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <aside className="rounded-lg border border-neutral-200 bg-white p-5 text-sm leading-6 text-neutral-700 shadow-sm">
          <h4 className="font-bold text-neutral-950">Cây route bảo mật</h4>
          <div className="mt-3 rounded-lg bg-[#f6f7f2] p-4 font-mono text-xs leading-6">
            /classroom
            <br />
            ProtectedRoute
            <br />
            AuthProvider
            <br />
            Login replace history
          </div>
          <p className="mt-3">Truy cập trái phép dùng Navigate replace sang /login. Đăng nhập thành công dùng useNavigate(target, replace).</p>
        </aside>
      </section>
    </AuthProvider>
  )
}

export default Bai9ProtectedRoutes
