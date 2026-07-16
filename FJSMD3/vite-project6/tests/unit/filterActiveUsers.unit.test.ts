import { describe, expect, it } from 'vitest'
import { filterActiveUsers, type User } from '../../src/api/userApi'

describe('Bài 8 - filterActiveUsers matcher analysis', () => {
  const baseUsers: User[] = [
    { id: '1', name: 'Admin', email: 'admin@example.com', isActive: true },
    { id: '2', name: 'Lan', email: 'lan@example.com', isActive: true },
    { id: '3', name: 'Minh', email: 'minh@example.com', isActive: false },
  ]

  function addRuntimeField(users: User[]): User[] {
    return users.map((user) =>
      user.name === 'Admin' ? { ...user, lastLoginDate: '2026-07-16T09:00:00.000Z' } : user,
    )
  }

  it('uses toContainEqual when the object shape is stable', () => {
    const result = filterActiveUsers(baseUsers)

    expect(result).toContainEqual({ id: '1', name: 'Admin', email: 'admin@example.com', isActive: true })
  })

  it('shows why exact equality fails when Admin receives a runtime field', () => {
    const result = filterActiveUsers(addRuntimeField(baseUsers))
    const admin = result.find((user) => user.name === 'Admin')

    expect(admin).not.toEqual({ id: '1', name: 'Admin', email: 'admin@example.com', isActive: true })
  })

  it('uses objectContaining to ignore dynamic fields safely', () => {
    const result = filterActiveUsers(addRuntimeField(baseUsers))

    expect(result).toContainEqual(expect.objectContaining({ name: 'Admin', isActive: true }))
    expect(result.every((user) => user.isActive)).toBe(true)
  })
})
