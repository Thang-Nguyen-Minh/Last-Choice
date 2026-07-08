export function getWelcomeMessage(isLoggedIn: boolean): string {
  return isLoggedIn ? 'Chào mừng trở lại' : 'Đăng nhập ngay'
}
