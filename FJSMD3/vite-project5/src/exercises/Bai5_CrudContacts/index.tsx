import { useState } from 'react'
import { addContact, deleteContact, getContacts, type Contact } from '../../api/contactsApi'

function Bai5CrudContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'An Nguyen', phone: '0901000001' },
    { id: '2', name: 'Binh Tran', phone: '0901000002' },
  ])
  const [message, setMessage] = useState('Sẵn sàng gọi json-server ở cổng 3004')

  async function handleLoad() {
    try {
      setContacts(await getContacts())
      setMessage('Đã tải danh bạ từ mock server')
    } catch {
      setMessage('Demo đang dùng dữ liệu mẫu nếu json-server chưa bật')
    }
  }

  async function handleAdd() {
    try {
      const created = await addContact({ name: 'Contact mới', phone: '0911222333' })
      setContacts((current) => [...current, created])
      setMessage('Đã thêm danh bạ bằng POST')
    } catch {
      const fallback = { id: crypto.randomUUID(), name: 'Contact mới', phone: '0911222333' }
      setContacts((current) => [...current, fallback])
      setMessage('Đã thêm danh bạ demo')
    }
  }

  async function handleDeleteMissing() {
    const result = await deleteContact('missing-id')
    setMessage(result.message)
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-emerald-700">Bài 5 - json-server CRUD</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">Quản lý danh bạ</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={handleLoad} className="rounded-lg bg-sky-700 px-3 py-2 text-sm font-semibold text-white">GET danh sách</button>
          <button type="button" onClick={handleAdd} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">POST thêm số</button>
          <button type="button" onClick={handleDeleteMissing} className="rounded-lg bg-rose-700 px-3 py-2 text-sm font-semibold text-white">DELETE ID không tồn tại</button>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>
        <ul className="mt-5 grid gap-2">
          {contacts.map((contact) => (
            <li key={contact.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <span className="font-semibold">{contact.name}</span> - {contact.phone}
            </li>
          ))}
        </ul>
      </div>
      <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <h4 className="font-bold">Mock server</h4>
        <p className="mt-2">File `db.json` chứa contacts/users. Chạy `npm run server` để bật json-server ở cổng 3004.</p>
        <p className="mt-3">DELETE ID không tồn tại được bắt 404 và trả message thân thiện.</p>
      </aside>
    </section>
  )
}

export default Bai5CrudContacts
