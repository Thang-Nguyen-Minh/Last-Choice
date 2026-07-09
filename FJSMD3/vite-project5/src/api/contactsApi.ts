import axios from 'axios'

export type Contact = {
  id: string
  name: string
  phone: string
}

export type ContactInput = Omit<Contact, 'id'>

export const contactsClient = axios.create({
  baseURL: 'http://localhost:3004',
})

export async function getContacts() {
  const response = await contactsClient.get<Contact[]>('/contacts')
  return response.data
}

export async function addContact(input: ContactInput) {
  const response = await contactsClient.post<Contact>('/contacts', input)
  return response.data
}

export async function deleteContact(id: string) {
  try {
    await contactsClient.delete(`/contacts/${id}`)
    return { ok: true, message: 'Đã xóa danh bạ' }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { ok: false, message: 'Không tìm thấy danh bạ để xóa' }
    }
    throw error
  }
}
