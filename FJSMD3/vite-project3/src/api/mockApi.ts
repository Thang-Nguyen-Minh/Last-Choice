export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered'

export type Order = {
  id: string
  customer: string
  status: OrderStatus
  note: string
}

export type Revenue = {
  month: string
  amount: number
  orders: number
}

export type Customer = {
  id: string
  name: string
  segment: string
}

export type ViolationOrder = {
  id: string
  title: string
  resolved: boolean
}

export type InventoryItem = {
  id: string
  name: string
  quantity: number
  warehouse: string
}

const orders: Order[] = [
  { id: 'ORD-101', customer: 'An Phát', status: 'Pending', note: 'Chờ xác nhận thanh toán' },
  { id: 'ORD-102', customer: 'Bình Minh', status: 'Shipped', note: 'Đang giao khu vực Hà Nội' },
  { id: 'ORD-103', customer: 'Cửu Long', status: 'Delivered', note: 'Đã giao thành công' },
  { id: 'ORD-104', customer: 'Delta Edu', status: 'Pending', note: 'Cần gọi lại khách hàng' },
]

let revenueVersion = 1
let violationOrders: ViolationOrder[] = [
  { id: 'V-01', title: 'Đơn hàng vượt hạn xử lý', resolved: false },
  { id: 'V-02', title: 'Sai địa chỉ nhận hàng', resolved: false },
]
let inventoryItems: InventoryItem[] = [
  { id: 'SKU-01', name: 'Tai nghe học online', quantity: 32, warehouse: 'Kho A' },
  { id: 'SKU-02', name: 'Bảng viết điện tử', quantity: 14, warehouse: 'Kho B' },
  { id: 'SKU-03', name: 'Webcam lớp học', quantity: 8, warehouse: 'Kho A' },
]

export const apiCounters = {
  orders: 0,
  revenue: 0,
  customers: 0,
  violations: 0,
  markViolation: 0,
  inventory: 0,
  updateInventory: 0,
}

function delay(ms = 20) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export function resetMockApi() {
  apiCounters.orders = 0
  apiCounters.revenue = 0
  apiCounters.customers = 0
  apiCounters.violations = 0
  apiCounters.markViolation = 0
  apiCounters.inventory = 0
  apiCounters.updateInventory = 0
  revenueVersion = 1
  violationOrders = [
    { id: 'V-01', title: 'Đơn hàng vượt hạn xử lý', resolved: false },
    { id: 'V-02', title: 'Sai địa chỉ nhận hàng', resolved: false },
  ]
  inventoryItems = [
    { id: 'SKU-01', name: 'Tai nghe học online', quantity: 32, warehouse: 'Kho A' },
    { id: 'SKU-02', name: 'Bảng viết điện tử', quantity: 14, warehouse: 'Kho B' },
    { id: 'SKU-03', name: 'Webcam lớp học', quantity: 8, warehouse: 'Kho A' },
  ]
}

export async function fetchOrders(status: OrderStatus | 'All', search: string): Promise<Order[]> {
  apiCounters.orders += 1
  await delay()
  const normalizedSearch = search.toLocaleLowerCase('vi-VN')

  return orders.filter((order) => {
    const statusMatches = status === 'All' || order.status === status
    const searchMatches =
      normalizedSearch === '' ||
      order.customer.toLocaleLowerCase('vi-VN').includes(normalizedSearch) ||
      order.id.toLocaleLowerCase('vi-VN').includes(normalizedSearch)

    return statusMatches && searchMatches
  })
}

export async function fetchRevenue(): Promise<Revenue> {
  apiCounters.revenue += 1
  await delay()
  return {
    month: '07/2026',
    amount: 860_000_000 + revenueVersion++ * 1_000_000,
    orders: 128 + revenueVersion,
  }
}

export async function fetchCustomers(): Promise<Customer[]> {
  apiCounters.customers += 1
  await delay()
  return [
    { id: 'CUS-01', name: 'Lan Nguyễn', segment: 'Enterprise' },
    { id: 'CUS-02', name: 'Minh Trần', segment: 'SMB' },
    { id: 'CUS-03', name: 'Hà Lê', segment: 'Startup' },
  ]
}

export async function fetchViolationOrders(): Promise<ViolationOrder[]> {
  apiCounters.violations += 1
  await delay()
  return violationOrders.map((order) => ({ ...order }))
}

export async function markViolationResolved(id: string): Promise<ViolationOrder> {
  apiCounters.markViolation += 1
  await delay(40)
  violationOrders = violationOrders.map((order) => (order.id === id ? { ...order, resolved: true } : order))
  const updated = violationOrders.find((order) => order.id === id)

  if (!updated) {
    throw new Error('Không tìm thấy đơn vi phạm')
  }

  return { ...updated }
}

export async function fetchInventory(): Promise<InventoryItem[]> {
  apiCounters.inventory += 1
  await delay()
  return inventoryItems.map((item) => ({ ...item }))
}

export async function updateInventoryQuantity(id: string, quantity: number): Promise<InventoryItem> {
  apiCounters.updateInventory += 1
  await delay(30)

  if (quantity < 0) {
    throw new Error('Số lượng không được âm')
  }

  if (quantity > 500) {
    throw new Error('Đã hết hạn mức cập nhật trong ngày')
  }

  inventoryItems = inventoryItems.map((item) => (item.id === id ? { ...item, quantity } : item))
  const updated = inventoryItems.find((item) => item.id === id)

  if (!updated) {
    throw new Error('Không tìm thấy hàng hóa')
  }

  return { ...updated }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}
