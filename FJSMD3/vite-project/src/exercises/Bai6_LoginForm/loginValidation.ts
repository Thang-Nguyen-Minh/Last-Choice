export type LoginPayload = {
  username: string
  password: string
}

export function validateLoginInput({ username, password }: LoginPayload): string | null {
  if (username.trim() === '' || password.trim() === '' || username.includes(' ')) {
    return 'Vui lòng kiểm tra lại thông tin'
  }

  return null
}
