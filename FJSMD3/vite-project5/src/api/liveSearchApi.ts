import axios from 'axios'

export type SearchResult = {
  id: string
  label: string
}

const catalog: SearchResult[] = [
  { id: '1', label: 'An Nguyen' },
  { id: '2', label: 'Binh Tran' },
  { id: '3', label: 'CRM Contact Center' },
]

export async function searchContacts(keyword: string, signal?: AbortSignal) {
  await axios.get('/live-search-delay', { signal })
  const normalized = keyword.trim().toLocaleLowerCase('vi-VN')
  return catalog.filter((item) => item.label.toLocaleLowerCase('vi-VN').includes(normalized))
}

export function isIntentionalCancel(error: unknown) {
  return axios.isCancel(error)
}
