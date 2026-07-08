import { Link, useLocation, useNavigate, type Location } from 'react-router-dom'
import { useAuth } from './auth'
import { getRedirectTarget } from './routeUtils'

type LoginState = {
  from?: Location
}

export function ClassroomPage() {
  const { logout } = useAuth()

  return (
    <article className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
      <h4 className="text-xl font-bold">Phòng học ảo</h4>
      <p className="mt-2 text-sm">Nội dung độc quyền chỉ hiển thị sau khi xác thực.</p>
      <button type="button" onClick={logout} className="mt-4 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
        Đăng xuất
      </button>
    </article>
  )
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const target = getRedirectTarget(location.state as LoginState | null)

  function handleLogin() {
    login()
    navigate(target, { replace: true })
  }

  return (
    <article className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sky-950">
      <h4 className="text-xl font-bold">Đăng nhập</h4>
      <p className="mt-2 text-sm">Sau khi đăng nhập, useNavigate đưa người dùng về {target} bằng replace để Back không quay lại form.</p>
      <button type="button" onClick={handleLogin} className="mt-4 rounded-lg bg-sky-700 px-3 py-2 text-sm font-semibold text-white">
        Đăng nhập vào phòng học
      </button>
    </article>
  )
}

export function RouteIndexPage() {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <h4 className="text-xl font-bold">Protected Boundary</h4>
      <p className="mt-2 text-sm text-neutral-600">Thử truy cập trực tiếp phòng học để kiểm tra redirect.</p>
      <Link to="/classroom" className="mt-4 inline-flex rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">
        Vào phòng học ảo
      </Link>
    </article>
  )
}
