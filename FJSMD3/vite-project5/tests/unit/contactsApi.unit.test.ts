import AxiosMockAdapter from 'axios-mock-adapter'
import { afterEach, describe, expect, it } from 'vitest'
import { addContact, contactsClient, deleteContact, getContacts } from '../../src/api/contactsApi'

const mock = new AxiosMockAdapter(contactsClient)

describe('Bài 5 contacts API', () => {
  afterEach(() => mock.reset())

  it('gets, posts, and handles missing delete 404', async () => {
    mock.onGet('/contacts').reply(200, [{ id: '1', name: 'An', phone: '090' }])
    mock.onPost('/contacts').reply(201, { id: '2', name: 'Binh', phone: '091' })
    mock.onDelete('/contacts/missing').reply(404)

    await expect(getContacts()).resolves.toHaveLength(1)
    await expect(addContact({ name: 'Binh', phone: '091' })).resolves.toMatchObject({ id: '2' })
    await expect(deleteContact('missing')).resolves.toEqual({ ok: false, message: 'Không tìm thấy danh bạ để xóa' })
  })
})
