export type ProductStatus = 'draft' | 'active' | 'archived'

export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: ProductStatus
}

export type Post = {
  id: string
  title: string
  liked: boolean
  likes: number
}

export type OrderPayload = {
  items: Array<{ productId: string; quantity: number }>
  address: string
  note: string
}

export type OrderResult = {
  id: string
  totalItems: number
  address: string
}

let products: Product[] = [
  { id: 'p1', name: 'Laptop Pro 14', category: 'Laptop', price: 28900000, stock: 8, status: 'active' },
  { id: 'p2', name: 'Laptop Air 13', category: 'Laptop', price: 21900000, stock: 14, status: 'active' },
  { id: 'p3', name: 'Macbook Studio Dock', category: 'Accessory', price: 3200000, stock: 22, status: 'active' },
  { id: 'p4', name: 'Mechanical Keyboard', category: 'Accessory', price: 1900000, stock: 35, status: 'draft' },
  { id: 'p5', name: 'Wireless Mouse', category: 'Accessory', price: 890000, stock: 40, status: 'active' },
]

let posts: Post[] = [
  { id: 'post-1', title: 'Tối ưu trải nghiệm Like với RTK Query', liked: false, likes: 12 },
]

export function resetMockData() {
  products = [
    { id: 'p1', name: 'Laptop Pro 14', category: 'Laptop', price: 28900000, stock: 8, status: 'active' },
    { id: 'p2', name: 'Laptop Air 13', category: 'Laptop', price: 21900000, stock: 14, status: 'active' },
    { id: 'p3', name: 'Macbook Studio Dock', category: 'Accessory', price: 3200000, stock: 22, status: 'active' },
    { id: 'p4', name: 'Mechanical Keyboard', category: 'Accessory', price: 1900000, stock: 35, status: 'draft' },
    { id: 'p5', name: 'Wireless Mouse', category: 'Accessory', price: 890000, stock: 40, status: 'active' },
  ]
  posts = [{ id: 'post-1', title: 'Tối ưu trải nghiệm Like với RTK Query', liked: false, likes: 12 }]
}

export async function delay(ms = 80) {
  await new Promise((resolve) => window.setTimeout(resolve, ms))
}

export async function fetchProducts(keyword = '') {
  await delay()
  const normalized = keyword.trim().toLocaleLowerCase('vi-VN')

  if (!normalized) {
    return products
  }

  return products.filter((product) =>
    [product.name, product.category].some((value) => value.toLocaleLowerCase('vi-VN').includes(normalized)),
  )
}

export async function fetchPosts() {
  await delay()
  return posts
}

export async function togglePostLike(postId: string, shouldFail = false) {
  await delay(150)

  if (shouldFail) {
    throw new Error('Server từ chối thao tác Like')
  }

  posts = posts.map((post) =>
    post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post,
  )

  return posts.find((post) => post.id === postId)!
}

export async function createProduct(input: Pick<Product, 'name' | 'category' | 'price' | 'stock'>, shouldFail = false) {
  await delay()

  if (shouldFail) {
    throw new Error('Không thể thêm sản phẩm')
  }

  const product: Product = { id: `p${Date.now()}`, status: 'active', ...input }
  products = [product, ...products]
  return product
}

export async function deleteProduct(productId: string, shouldFail = false) {
  await delay()

  if (shouldFail) {
    throw new Error('Xóa thất bại')
  }

  products = products.filter((product) => product.id !== productId)
  return { ok: true, productId }
}

export async function simulateServerError() {
  await delay()
  throw new Error('Lỗi 500 từ server mô phỏng')
}

export async function createOrder(payload: OrderPayload, shouldFail = false): Promise<OrderResult> {
  await delay(180)

  if (shouldFail) {
    throw new Error('Mạng chậm, chưa tạo được đơn hàng')
  }

  return {
    id: `ORD-${Date.now()}`,
    totalItems: payload.items.reduce((sum, item) => sum + item.quantity, 0),
    address: payload.address,
  }
}

export function formatVnd(value: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}
