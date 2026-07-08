import { useState, type FormEvent } from 'react'
import { validateLoginInput } from './loginValidation'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload = { username, password }
    const validationError = validateLoginInput(payload)

    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    setErrorMessage('')
    console.log('Login state:', payload)
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-teal-700">Bài 6 - Controlled Form</p>
        <h3 className="mt-2 text-2xl font-bold text-zinc-950">Component Form Đăng Nhập</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Username, password và lỗi đều nằm trong state. Mỗi ký tự nhập vào cập nhật state qua value và onChange.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="rounded-lg border border-zinc-300 px-3 py-2 font-normal outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              placeholder="Nhập username"
              aria-label="Username"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-zinc-800">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-lg border border-zinc-300 px-3 py-2 font-normal outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
              placeholder="Nhập password"
              aria-label="Password"
            />
          </label>

          {errorMessage ? (
            <p role="alert" className="text-sm font-semibold text-red-600">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            Đăng nhập
          </button>
        </form>
      </div>

      <aside className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        <h4 className="font-bold">I/O cần quản lý</h4>
        <p className="mt-2">Input: username, password. Output: console state khi hợp lệ hoặc thông báo lỗi khi dữ liệu sai.</p>
        <p className="mt-3">State: username, password, errorMessage.</p>
      </aside>
    </section>
  )
}

export default LoginForm
