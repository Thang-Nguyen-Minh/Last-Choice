export type User = {
  id: string
  name: string
  email: string
  isActive: boolean
  lastLoginDate?: string
}

export function filterActiveUsers(users: User[]): User[] {
  return users.filter((user) => user.isActive)
}

export function getAdminUser(users: User[]): User | undefined {
  return users.find((user) => user.name === 'Admin')
}
