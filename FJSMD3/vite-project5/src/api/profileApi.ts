import axios from 'axios'

export type UserProfile = {
  id: string
  name: string
  email: string
  phone: string
  department: string
  title: string
  city: string
  status: string
  startDate: string
  salaryGrade: string
}

export type ProfilePatch = Pick<UserProfile, 'phone'>

export const sampleUser: UserProfile = {
  id: '1',
  name: 'Lan Le',
  email: 'lan@example.com',
  phone: '0909000001',
  department: 'HR',
  title: 'Recruiter',
  city: 'Ha Noi',
  status: 'active',
  startDate: '2025-01-10',
  salaryGrade: 'G5',
}

export const profileClient = axios.create({
  baseURL: 'http://localhost:3004',
})

export async function replaceUserProfile(user: UserProfile) {
  const response = await profileClient.put<UserProfile>(`/users/${user.id}`, user)
  return response.data
}

export async function updateUserPhone(id: string, payload: ProfilePatch) {
  const response = await profileClient.patch<UserProfile>(`/users/${id}`, payload)
  return response.data
}

export function explainPutMissingFieldsRisk() {
  return 'PUT đại diện cho thay thế toàn bộ tài nguyên; gửi thiếu trường có thể làm server ghi đè và mất dữ liệu không gửi lên.'
}
